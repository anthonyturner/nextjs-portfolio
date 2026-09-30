# Architecture

- Preserve the Next.js App Router structure under `src/app`.
- Keep page composition in `src/app/page.tsx` and shared layout concerns in `src/app/layout.tsx`.
- Case studies are the one kind of sub-page: `src/app/case-studies/[slug]/page.tsx` prerenders each `CaseStudy` in `caseStudies` (`lib/data.ts`) through `components/case-study.tsx`, and any other slug is a 404. A project entry links to its case study with `caseStudyUrl`. The header's section links point back to `/` from any page but the home page.
- Keep reusable visual sections in `components/`.
- Keep global or cross-section state in dedicated context files under `context/` when needed.
- Treat `lib/data.ts` as the content layer for portfolio text, links, projects, experience, skills, and certifications.
- `lib/github-projects.ts` overlays project entries that name a `repo` with GitHub data on the server (optional `GITHUB_TOKEN` for private repos), falling back to `lib/data.ts`. It also appends the owner's other public repos, and adds a plain-text README summary for public repos (`lib/readme-summary.ts`). GitHub data revalidates every 10 minutes.
- Use `lib/utils.ts`, `lib/hooks.ts`, and `lib/types.ts` for reusable helpers, hooks, and shared typing rather than duplicating logic.

## Component Boundaries
- Prefer presentational components that receive data through props.
- Move browser-only behavior into client components only when required.
- Keep route-specific logic close to the route and avoid pushing page concerns into reusable components.