# Style and standards

Reference: `docs/developers.md`.

## TypeScript

- Use proper TypeScript; small hacks are ok but be reasonable.
- Use `import`, not `require`.
- If a non-TypeScript module is needed, add it to `src/declarations.d.ts`.
- Indentation uses 2-space tabs (match existing files).

## CSS class conventions

- Top-level class on a component matches the component name.
  - Example: `<div className="Modal">`
- Nested elements use `ClassName__Element`.
  - Example: `Modal__CloseButton`
- State modifiers use `m-*`.
  - Example: `Checkbox m-disabled`
- Utilities use `u-*`.
  - Example: `u-fill-screen`

## Contribution guidelines

- Keep code and content G-rated.
- Ensure changes work on both Mac and Windows.
- The project follows "open open source" principles (see `docs/developers.md`).
