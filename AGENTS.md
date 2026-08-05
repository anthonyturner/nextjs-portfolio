# Project Guidelines

This repository keeps the always-on agent guidance here and splits the detailed standards into `/docs`.

## Scope
- Apply these instructions across the entire portfolio workspace unless a more specific file instruction says otherwise.
- Prefer the narrowest change that fits the request.
- Preserve the current app structure and visual language unless the user explicitly asks for a redesign or refactor.

## Source Files
- [docs/code-style.md](docs/code-style.md)
- [docs/architecture.md](docs/architecture.md)
- [docs/content-rules.md](docs/content-rules.md)
- [docs/testing.md](docs/testing.md)
- [docs/accessibility.md](docs/accessibility.md)

## Always-On Rules
- Use TypeScript throughout and keep the existing `@/` import alias.
- Keep route-level logic in `src/app` and reusable UI in `components/`.
- Treat `lib/data.ts` as the source of truth for portfolio content, links, projects, experiences, skills, and certifications.
- Use client components only when interactivity, browser APIs, animation state, or context require them.
- Use `npm run lint` to validate code quality and `npm run build` to verify larger changes still compile.