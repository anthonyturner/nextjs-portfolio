# Project Guidelines

## Code Style
- Use TypeScript throughout and keep the existing `@/` import alias.
- Match the current React/Next.js style in `src/app/layout.tsx`, `src/app/page.tsx`, and `components/*.tsx`.
- Prefer small, focused components and shared types in `lib/types.ts` or `lib/data.ts` instead of duplicating content.
- Keep styling utility-first with Tailwind classes and only add custom CSS when a utility-based approach is not practical.

## Architecture
- Preserve the Next.js App Router structure under `src/app`.
- Keep route-level logic in `src/app` and reusable UI in `components/`.
- Treat `lib/data.ts` as the source of truth for portfolio content, links, projects, experiences, skills, and certifications.
- Use client components only when interactivity, browser APIs, animation state, or context require them.

## Build and Test
- Use `npm run lint` to validate code quality.
- Use `npm run build` to verify the app still compiles before finishing larger changes.
- If a change affects runtime behavior, verify the affected page or component path in addition to linting.

## Conventions
- Keep the portfolio copy and media references consistent with the existing data-driven sections.
- Preserve semantic HTML and accessible heading structure when editing UI components.
- Follow the established section layout and navigation patterns instead of introducing a new page architecture.
- Avoid broad refactors that change the visual language or content organization unless the request explicitly asks for them.