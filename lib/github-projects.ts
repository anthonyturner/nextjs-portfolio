import { projectsData } from "./data";
import type { Project } from "./types";

const PORTFOLIO_FILE_PATH = ".github/portfolio.json";
const REVALIDATE_SECONDS = 3600;
const REQUEST_TIMEOUT_MS = 5000;

type RepoMetadata = {
  html_url: string;
  description: string | null;
  homepage: string | null;
  private: boolean;
};

type PortfolioFile = {
  title?: string;
  description?: string;
  tags?: string[];
  website?: string;
  video?: {
    src: string;
    poster?: string;
    caption?: string;
  };
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

async function fetchGitHubJson<T>(url: string, accept: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers: githubHeaders(accept),
      next: { revalidate: REVALIDATE_SECONDS, tags: ["github-projects"] },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

// Drops anything malformed so a bad edit in a repo can't break the page.
function parsePortfolioFile(raw: unknown): PortfolioFile {
  if (!raw || typeof raw !== "object") {
    return {};
  }
  const data = raw as Record<string, unknown>;
  const video = data.video as Record<string, unknown> | undefined;

  return {
    title: isNonEmptyString(data.title) ? data.title : undefined,
    description: isNonEmptyString(data.description) ? data.description : undefined,
    tags:
      Array.isArray(data.tags) && data.tags.every(isNonEmptyString)
        ? data.tags
        : undefined,
    website: isNonEmptyString(data.website) ? data.website : undefined,
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

async function withGitHubData(fallback: Project): Promise<Project> {
  if (!fallback.repo) {
    return fallback;
  }

  const apiBase = `https://api.github.com/repos/${fallback.repo}`;
  const [repo, portfolioRaw] = await Promise.all([
    fetchGitHubJson<RepoMetadata>(apiBase, "application/vnd.github+json"),
    fetchGitHubJson<unknown>(
      `${apiBase}/contents/${PORTFOLIO_FILE_PATH}`,
      "application/vnd.github.raw+json",
    ),
  ]);

  if (!repo) {
    return fallback;
  }

  const portfolio = parsePortfolioFile(portfolioRaw);

  return {
    ...fallback,
    title: portfolio.title ?? fallback.title,
    description: portfolio.description ?? (repo.description || fallback.description),
    tags: portfolio.tags ?? fallback.tags,
    // Private repos 404 for visitors, so only link public ones.
    github: repo.private ? undefined : repo.html_url,
    website: portfolio.website ?? (repo.homepage || fallback.website),
    videoUrl: portfolio.video?.src ?? fallback.videoUrl,
    videoPosterUrl: portfolio.video?.poster ?? fallback.videoPosterUrl,
    videoCaption: portfolio.video?.caption ?? fallback.videoCaption,
  };
}

/**
 * Returns the portfolio projects, preferring live GitHub data for entries that
 * name a `repo` and falling back to `lib/data.ts` when GitHub is unreachable.
 */
export async function getProjects(): Promise<Project[]> {
  return Promise.all((projectsData as readonly Project[]).map(withGitHubData));
}
