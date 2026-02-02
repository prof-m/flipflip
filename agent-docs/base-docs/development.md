# Development workflow

FlipFlip is an Electron app built from TypeScript and React. The dev loop is
webpack watch for `dist/` plus a separate Electron run process.

## Prereqs

From `docs/developers.md`:

- Git
- Yarn (classic)
- NodeJS

## Recommended local dev loop

1. Install dependencies:
   - `yarn install --dev`
2. Terminal 1 (bundle + watch):
   - `yarn development`
3. Terminal 2 (run Electron):
   - `yarn start`

Notes:
- `yarn development` uses `webpack.dev.js` and writes bundles to `dist/`.
- The Electron entry is `dist/main.bundle.js` (see `package.json` "start").
- If you only need a one-off build, use `yarn build` (dev config).
- For a production bundle, use `yarn production` (prod config).

## No tests or lint scripts

There are no test or lint scripts defined in `package.json`. If you add tests
or linting, document the commands here.
