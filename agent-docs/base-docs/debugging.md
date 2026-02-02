# Debugging (VS Code + Electron)

Reference: `Readme_vscode.md` plus `src/main/WindowManager.ts`.

## VS Code remote debugging flow

1. Install VS Code extension "Debugger for Chrome".
2. If on Windows, update `.vscode/launch.json`:
   - set `runtimeExecutable` to `"${workspaceRoot}/node_modules/.bin/electron.cmd"`.
3. Run:
   - Terminal 1: `yarn development`
   - Terminal 2: `yarn start`
4. In FlipFlip, open the Debug menu (Ctrl-Alt-D) and select "Debug FlipFlip".

## Remote debugging port (9222)

If debugging fails, check for port conflicts:

- macOS/Linux: `netstat -nat | grep 9222`
- Windows (PowerShell): `netstat -nat | Select-String 9222`

If another process is listening, close it or change the port in
`.vscode/launch.json` (both `port` and `runtimeArgs`).

## DevTools vs remote debugger

`src/main/WindowManager.ts` automatically opens DevTools for the main window
in development. The file includes a comment indicating you may need to comment
out the `openDevTools()` call to allow remote debugger attachment.

## Source maps

`webpack.dev.js` sets `devtool: 'source-map'` for the renderer bundle. Keep
this enabled for accurate debugging.
