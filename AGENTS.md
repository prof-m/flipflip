# AI Agent Guide (AGENTS.md)

FlipFlip is an Electron desktop app written in TypeScript and React. Use this
file as the minimal runbook for every request, and refer to the agent docs
below for deeper context.

## Repo map (quick orientation)

- `src/main/`: Electron main process
- `src/renderer/`: React renderer (UI + styles + assets)
- `docs/`: user manual + developer docs
- `package.json`: scripts and dependencies
- `webpack.dev.js`, `webpack.prod.js`: bundling config
- `Makefile`: release packaging

## Defaults (follow unless the user says otherwise)

- Keep changes small and reviewable; avoid broad refactors.
- Use the Node version in `.tool-versions` (v10.11.0) for compatibility with
  Electron’s bundled runtime.
- Use `import`, not `require`; add non-TS modules to `src/declarations.d.ts`.
- Follow the CSS class conventions from `docs/developers.md`.
- Maintain Mac/Windows compatibility.
- Update `docs/` when user-facing behavior changes.
- If the user is asking a question or design direction, answer first; don’t
  edit code unless they explicitly ask for changes.

## Additional agent docs (read as needed)

- Development workflow and commands: `agent-docs/base-docs/development.md`
- Debugging (VS Code + Electron): `agent-docs/base-docs/debugging.md`
- Architecture overview: `agent-docs/base-docs/architecture.md`
- Style and contribution standards: `agent-docs/base-docs/style-and-standards.md`
- Storage and backups: `agent-docs/base-docs/storage-and-backups.md`
- Build and release packaging: `agent-docs/base-docs/build-release.md`
- User documentation map: `agent-docs/base-docs/user-docs.md`
- Task-specific plans (when requested): `agent-docs/specific-plans/`
