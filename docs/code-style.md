# Code Style

- Match the existing React and Next.js patterns already established in `src/app/layout.tsx`, `src/app/page.tsx`, and `components/*.tsx`.
- Prefer small, focused components over large multi-purpose files.
- Use shared types from `lib/types.ts` when a value shape is reused.
- Keep imports organized and prefer the existing `@/` alias for internal modules.
- Use Tailwind utility classes first; only add custom CSS when utilities cannot express the design cleanly.
- Keep formatting consistent with the surrounding file instead of reformatting unrelated code.

## Practical Preferences
- Use descriptive component and prop names.
- Avoid one-off abstractions unless they remove real duplication or clarify a repeated pattern.
- Keep inline comments rare and only use them when the code would otherwise be ambiguous.