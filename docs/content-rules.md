# Content Rules

- Keep portfolio copy, project details, experience entries, and certification details consistent with the existing data-driven sections.
- Update `lib/data.ts` before duplicating content directly inside components.
- Projects with a `repo` field take their card copy, links and video from that repo's `.github/portfolio.json` (via `lib/github-projects.ts`); edit it there first. The `lib/data.ts` entry is the fallback and supplies the images unless `portfolio.json` sets `image`.
- Other public, non-fork, non-archived repos of `githubProjectsOwner` with a description are listed automatically after the curated projects. A repo opts out with `"hidden": true` in its `.github/portfolio.json`, and can set `title`, `description`, `tags`, `website`, `image` and `video` there.
- Keep media references aligned with the `public/` directory structure and the current image-import pattern.
- Preserve the current section order and navigation labels unless the user asks to change them.
- Avoid introducing new page architecture or content taxonomy unless the request explicitly calls for it.

## Editing Guidance
- When changing data content, check the affected section components for any label, title, or description assumptions.
- Keep terminology consistent across navigation, section headings, and data entries.