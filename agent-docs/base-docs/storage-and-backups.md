# Storage and backups

FlipFlip persists state in JSON on disk. Key paths are defined in
`src/renderer/data/utils.ts` and used by `src/renderer/data/AppStorage.tsx`.

## Default save location

- `saveDir`: `${appData}/flipflip`
- `savePath`: `${appData}/flipflip/data.json`

Where `appData` is resolved via `electron.remote.app.getPath('appData')`.

## Portable mode

A portable save file lives alongside the app:

- `portablePath`: `<app directory>/data.json`

If portable mode is enabled in config, `AppStorage` prefers the portable
file and logs the path on startup. If a portable file is present but portable
mode is off, it falls back to the standard `savePath`.

## Backups

`AppStorage` archives older data by copying the file with a
`.{epoch}` suffix (see `archiveFile` and `getBackups()` in
`src/renderer/data/utils.ts`). This is used to preserve data when the
stored version changes.
