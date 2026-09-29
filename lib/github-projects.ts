import { githubProjectsOwner, projectsData } from "./data";
import { summarizeReadme } from "./readme-summary";
import type { Project, ReadmeBlock } from "./types";

const PORTFOLIO_FILE_PATH = ".github/portfolio.json";
const REVALIDATE_SECONDS = 600;
const REQUEST_TIMEOUT_MS = 5000;

type RepoMetadata = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  private: boolean;
  fork: boolean;
  archived: boolean;
  language: string | null;
  topics?: string[];
};

type PortfolioFile = {
  hidden?: boolean;
  title?: string;
  description?: string;
  tags?: string[];
  website?: string;
  image?: string;
  video?: {
    src: string;
    poster?: string;
    caption?: string;
  };
  readme?: false;
};

const githubHeaders = (accept: string): HeadersInit => {
  const headers: Record<string, string> = {
    Accept: accept,
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Optional: needed for private repos and a higher rate limit. Trimmed because
  // a stray newline from a pasted value makes the header invalid.
  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// "missing" is a definite 404; "error" is anything else that stopped the read
// (rate limit, 5xx, timeout, invalid JSON), where the content is unknown.
type GitHubResult = { status: "ok"; data: unknown } | { status: "missing" | "error" };

async function fetchGitHub(
  url: string,
  accept: string,
  body: "json" | "text" = "json",
): Promise<GitHubResult> {
  try {
    const response = await fetch(url, {
      headers: githubHeaders(accept),
      next: { revalidate: REVALIDATE_SECONDS, tags: ["github-projects"] },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (response.status === 404) {
      return { status: "missing" };
    }
    if (!response.ok) {
      return { status: "error" };
    }
    return { status: "ok", data: await (body === "json" ? response.json() : response.text()) };
  } catch {
    return { status: "error" };
  }
}

const repoApiUrl = (fullName: string) => `https://api.github.com/repos/${fullName}`;

async function fetchRepo(fullName: string): Promise<RepoMetadata | null> {
  const result = await fetchGitHub(repoApiUrl(fullName), "application/vnd.github+json");
  return result.status === "ok" && isRepoMetadata(result.data) ? result.data : null;
}

// Returns {} when the repo has no portfolio.json, and null when the file
// could not be read or parsed, so callers can decide how to fail.
async function fetchPortfolioFile(fullName: string): Promise<PortfolioFile | null> {
  const result = await fetchGitHub(
    `${repoApiUrl(fullName)}/contents/${PORTFOLIO_FILE_PATH}`,
    "application/vnd.github.raw+json",
  );
  if (result.status === "missing") {
    return {};
  }
  return result.status === "ok" ? parsePortfolioFile(result.data) : null;
}

// Public repos only: a private README may hold what its owner hasn't published.
async function fetchReadmeSummary(
  repo: RepoMetadata,
  portfolio: PortfolioFile,
): Promise<readonly ReadmeBlock[] | undefined> {
  if (repo.private || portfolio.readme === false) {
    return undefined;
  }
  const result = await fetchGitHub(
    `${repoApiUrl(repo.full_name)}/readme`,
    "application/vnd.github.raw",
    "text",
  );
  if (result.status !== "ok" || typeof result.data !== "string") {
    return undefined;
  }
  const summary = summarizeReadme(result.data);
  return summary.length ? summary : undefined;
}

function isRepoMetadata(value: unknown): value is RepoMetadata {
  if (!value || typeof value !== "object") {
    return false;
  }
  const repo = value as Record<string, unknown>;
  return (
    typeof repo.name === "string" &&
    typeof repo.full_name === "string" &&
    typeof repo.html_url === "string" &&
    typeof repo.private === "boolean" &&
    typeof repo.fork === "boolean" &&
    typeof repo.archived === "boolean"
  );
}

// GitHub descriptions are plain text, but some carry Markdown emphasis.
const stripMarkdownEmphasis = (text: string) => text.replace(/\*\*|__/g, "");

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

// Drops malformed fields so a bad edit in a repo can't break the page; a file
// that isn't a JSON object at all counts as unreadable.
function parsePortfolioFile(raw: unknown): PortfolioFile | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return null;
  }
  const data = raw as Record<string, unknown>;
  const video = data.video as Record<string, unknown> | undefined;

  return {
    hidden: data.hidden === true,
    title: isNonEmptyString(data.title) ? data.title : undefined,
    description: isNonEmptyString(data.description) ? data.description : undefined,
    tags:
      Array.isArray(data.tags) && data.tags.every(isNonEmptyString)
        ? data.tags
        : undefined,
    website: isNonEmptyString(data.website) ? data.website : undefined,
    readme: data.readme === false ? false : undefined,
    image: isNonEmptyString(data.image) ? data.image : undefined,
    video:
      video && isNonEmptyString(video.src)
        ? {
            src: video.src,
            poster: isNonEmptyString(video.poster) ? video.poster : undefined,
            caption: isNonEmptyString(video.caption) ? video.caption : undefined,
          }
        : undefined,
  };
}

// "cna-study-app" -> "Cna Study App"; a portfolio.json title reads better.
const titleFromRepoName = (name: string) =>
  name
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

async function withGitHubData(fallback: Project): Promise<Project | null> {
  if (!fallback.repo) {
    return fallback;
  }

  const [repo, portfolioFile] = await Promise.all([
    fetchRepo(fallback.repo),
    fetchPortfolioFile(fallback.repo),
  ]);

  if (!repo) {
    return fallback;
  }
  // Curated projects fail open: an unreadable file just means no overrides.
  const portfolio = portfolioFile ?? {};
  if (portfolio.hidden) {
    return null;
  }
  const readmeSummary = await fetchReadmeSummary(repo, portfolio);

  return {
    ...fallback,
    title: portfolio.title ?? fallback.title,
    description:
      portfolio.description ??
      (repo.description ? stripMarkdownEmphasis(repo.description) : fallback.description),
    tags: portfolio.tags ?? fallback.tags,
    imageUrl: portfolio.image ?? fallback.imageUrl,
    thumbnailUrl: portfolio.image ?? fallback.thumbnailUrl,
    // Private repos 404 for visitors, so only link public ones.
    github: repo.private ? undefined : repo.html_url,
    website: portfolio.website ?? (repo.homepage || fallback.website),
    videoUrl: portfolio.video?.src ?? fallback.videoUrl,
    videoPosterUrl: portfolio.video?.poster ?? fallback.videoPosterUrl,
    videoCaption: portfolio.video?.caption ?? fallback.videoCaption,
    readmeSummary,
    readmeUrl: readmeSummary && `${repo.html_url}#readme`,
  };
}

async function toDiscoveredProject(repo: RepoMetadata): Promise<Project | null> {
  const portfolio = await fetchPortfolioFile(repo.full_name);
  // Discovered repos fail closed: if the file can't be read, a "hidden" flag
  // in it can't be honoured, so leave the repo out until the next refresh.
  if (!portfolio || portfolio.hidden) {
    return null;
  }
  const description =
    portfolio.description ?? stripMarkdownEmphasis(repo.description?.trim() ?? "");
  if (!description) {
    return null;
  }
  const readmeSummary = await fetchReadmeSummary(repo, portfolio);

  const fallbackTags = repo.topics?.length
    ? repo.topics
    : repo.language
      ? [repo.language]
      : [];

  return {
    title: portfolio.title ?? titleFromRepoName(repo.name),
    description,
    tags: portfolio.tags ?? fallbackTags,
    imageUrl: portfolio.image,
    thumbnailUrl: portfolio.image,
    github: repo.html_url,
    website: portfolio.website ?? (repo.homepage || undefined),
    repo: repo.full_name,
    videoUrl: portfolio.video?.src,
    videoPosterUrl: portfolio.video?.poster,
    videoCaption: portfolio.video?.caption,
    readmeSummary,
    readmeUrl: readmeSummary && `${repo.html_url}#readme`,
  };
}

// Private repos only appear when curated in lib/data.ts. One page of 100 is
// plenty for this account; add pagination if it ever grows past that.
async function discoverProjects(curatedRepos: Set<string>): Promise<Project[]> {
  const result = await fetchGitHub(
    `https://api.github.com/users/${githubProjectsOwner}/repos?type=owner&sort=pushed&per_page=100`,
    "application/vnd.github+json",
  );
  if (result.status !== "ok" || !Array.isArray(result.data)) {
    return [];
  }

  const candidates = result.data.filter(isRepoMetadata).filter(
    (repo) =>
      !repo.private &&
      !repo.fork &&
      !repo.archived &&
      // The profile README repo is not a project.
      repo.name.toLowerCase() !== githubProjectsOwner.toLowerCase() &&
      !curatedRepos.has(repo.full_name.toLowerCase()),
  );

  const projects = await Promise.all(candidates.map(toDiscoveredProject));
  return projects.filter((project): project is Project => project !== null);
}

/**
 * Returns the curated projects from `lib/data.ts` (overlaid with live GitHub
 * data where they name a `repo`), followed by any other public repos of
 * `githubProjectsOwner`. Falls back to `lib/data.ts` when GitHub is unreachable.
 */
export async function getProjects(): Promise<Project[]> {
  const curated = projectsData as readonly Project[];
  const curatedRepos = new Set(
    curated.flatMap((project) => (project.repo ? [project.repo.toLowerCase()] : [])),
  );

  const [curatedProjects, discoveredProjects] = await Promise.all([
    Promise.all(curated.map(withGitHubData)),
    discoverProjects(curatedRepos),
  ]);

  return [
    ...curatedProjects.filter((project): project is Project => project !== null),
    ...discoveredProjects,
  ];
}
