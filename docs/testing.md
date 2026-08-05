# Testing

- Run `npm run lint` after meaningful code changes.
- Run `npm run build` before finishing larger changes or anything that can affect rendering or routing.
- If a change affects runtime behavior, verify the affected page or component path in addition to linting.
- Prefer the narrowest validation that covers the touched code before widening scope.

## What To Verify
- Route changes should be checked in the relevant page flow.
- Data changes should be checked in the components that consume the data.
- Styling changes should be checked for layout regressions and responsive behavior.