# Architecture

- Preserve the Next.js App Router structure under `src/app`.
- Keep page composition in `src/app/page.tsx` and shared layout concerns in `src/app/layout.tsx`.
- Keep reusable visual sections in `components/`.
- Keep global or cross-section state in dedicated context files under `context/` when needed.
- Treat `lib/data.ts` as the content layer for portfolio text, links, projects, experience, skills, and certifications.
- Use `lib/utils.ts`, `lib/hooks.ts`, and `lib/types.ts` for reusable helpers, hooks, and shared typing rather than duplicating logic.

## Component Boundaries
- Prefer presentational components that receive data through props.
- Move browser-only behavior into client components only when required.
- Keep route-specific logic close to the route and avoid pushing page concerns into reusable components.