# Build and release packaging

## Bundles

- Development bundle: `yarn build` (dev config)
- Production bundle: `yarn production` (prod config)

Both produce `dist/main.bundle.js`, `dist/renderer.bundle.js`, and
`dist/index.html`.

## Packaging releases

`Makefile` target `app` builds and packages multi-platform releases:

- Runs `yarn production`
- Creates `app/` and `release/`
- Copies `dist/` and `package.json` into `app/`
- Runs `electron-packager` for:
  - macOS x64
  - Windows x64 + ia32
  - Linux x64 + ia32
- Zips each packaged app into `release/`

Icons are pulled from `src/renderer/icons/` (mac `.icns`, Windows `.ico`, Linux
uses the iconset PNG).
