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
## Hard stops

These hold even if you read nothing else:

- **Never commit to `main`**, never force-push, never rewrite history, never
  delete a branch.
- **Never merge without a posted review.** Merge only after the review in
  [qa-review.md](docs/agent-workflows/qa-review.md) is on the pull request and
  its blocking findings are fixed. Never bypass branch protection.
- **Never close or delete a GitHub issue or comment.**
- **Never commit or print a real secret.** Name credentials; never values.
- **Never start a grilling session on your own initiative** — it is opt-in, by
  name only.

The complete list, which other documents cite by number, is
[docs/rules.md](docs/rules.md). Read it before generating code.

## Autonomy

Work runs from request to **merged pull request without stopping for
approval**: file the issue, branch, open the PR, implement, verify, push, post
a code review on the PR, fix what it finds, then merge with a merge commit.
Filing and updating issues, commenting, branching, committing, pushing, opening
pull requests and merging a reviewed one are all pre-authorized.

Routine judgement calls are yours to make. Pick the sensible option, state the
assumption in one line, and carry on to a finished change. Stop and ask only
when proceeding would be unsafe or irreversible, when a hard stop above is in
the way, or when a wrong guess would make the whole change useless. The
authorization and its limits are in
[docs/agent-workflows/pipeline.md](docs/agent-workflows/pipeline.md).

The agent workflow (PM → refinement → UX design → dev → QA) lives in
[docs/agent-workflows/](docs/agent-workflows/); decisions are logged in
[docs/decisions/](docs/decisions/).
