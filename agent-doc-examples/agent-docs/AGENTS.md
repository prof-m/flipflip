# AI Agent Guide (AGENTS.md)

This repository contains **Szurubooru**, a self-hosted image board engine.
It is split into a Python backend (`server/`) and a JavaScript frontend
(`client/`), typically deployed together via Docker Compose.

If you are an AI agent working in this repo, treat this file as the default
runbook you should follow for almost any task (bugfixes, features, refactors,
docs).

## Repo map (where to look first)

- `server/`: Python backend (WSGI app served by `waitress`; migrations via
  Alembic; tests via `pytest`)
- `client/`: browser client (legacy JS build pipeline driven by `build.js`;
  frontend API calls live in `client/js/api.js`)
- `doc/`: project documentation
  - `doc/INSTALL.md`: Docker-based setup & operation
  - `doc/API.md`: REST API contract (update when API behavior changes)
  - `doc/aws-deployment-instructions/`: AWS deployment notes (situational)
- `agent-docs/`: additional AI-focused runbooks (created for agents; see below)

## Defaults (follow these unless the user says otherwise)

- Prefer **small, reviewable diffs**; avoid drive-by refactors.
- Prefer **Docker-based workflows** (matches upstream docs and CI).
- If the user asks for an answer to a question, **DO NOT** under any circumstances make code changes. Instead, provide a detailed answer to the user's question.
  - When the user says things like "what do you think?" or "can we...?", they are asking a question, and do not want you to make code changes yet.
- Keep config changes explicit:
  - Do **not** silently change `server/config.yaml` or `.env` unless asked.
  - If a task needs config changes, propose them and explain impact.
- Match existing style and tooling:
  - **Python**: `black` + `isort`, line length **79**.
  - **Client JS**: `prettier` config at `client/.prettierrc.yml` (79 width,
    4 spaces) and `eslint` (pre-commit is configured to auto-fix).
- When changing backend endpoints/JSON shapes/auth behavior, update **both**
  server + client as needed and update `doc/API.md`.
- To run the docker container in dev mode (where changes become immediately active), run `docker-compose -f ./docker-compose.dev.yml up`
### Verifying Frontend Changes
- To verify frontend changes, view the website at `http://sensate-1.fawn-goblin.ts.net/`
- If the website is not running, start the docker containers using the instructions above.
- Log in to the website using the username `test_dummy` and the password `password1` before verifying changes.
- Navigate to the relevant pages to verify the changes you have made match what has been requested.
- If they do not match, make the necessary changes to ensure they do and retest.


## Quick start (Docker)

1. Create `.env` in the repo root (Compose reads it automatically):
   - Copy: `cp doc/example.env .env`
   - Edit as needed (notably `POSTGRES_USER`, `POSTGRES_PASSWORD`, `PORT`,
     `MOUNT_DATA`, `MOUNT_SQL`).
2. Create backend config:
   - If `server/config.yaml` is missing, copy:
     `cp server/config.yaml.dist server/config.yaml`
   - Edit (pay special attention to `secret` and `smtp` per `doc/INSTALL.md`).
3. Start:
   - First run (DB first): `docker compose up -d sql`
   - Then all services: `docker compose up -d`
   - Logs: `docker compose logs -f`

For dev iteration with live rebuild/reload, use `docker-compose.dev.yml`
instead (details in `agent-docs/development.md`).

## Common commands (agent-friendly)

### Formatting / linting (preferred: pre-commit)

- Run everything: `pre-commit run -a`

Direct equivalents:
- Python format: `python -m black server/` and `python -m isort server/`
- Python lint: `python -m flake8 --config=server/.flake8 server/szurubooru/`
- Client format: `npx prettier --config client/.prettierrc.yml --write client/js/`
- Client lint: `npx eslint --fix client/js/`

### Backend unit tests

CI runs server tests in the Docker **testing** stage. Locally you can mirror
that:

- Build: `docker buildx build --load --target testing -t szuru-server-tests ./server`
- Run: `docker run --rm -t szuru-server-tests --color=no szurubooru/`

More detail (coverage, common failures) in `agent-docs/testing.md`.

### Database migrations (Alembic)

Migrations live in `server/szurubooru/migrations/`, and containers run
`alembic upgrade head` on startup.

If you need to create a migration, start with:
- `doc/developer-utils/create-alembic-migration.sh "your message"`

More detail in `agent-docs/migrations.md`.

## Additional agent docs (when to read them)

Read these when you hit the corresponding situation:

- Development environment / hot reload / Compose quirks:
  - `agent-docs/development.md`
- Running tests, coverage, and test-container workflow:
  - `agent-docs/testing.md`
- Alembic migrations and schema-change workflow:
  - `agent-docs/migrations.md`
- Working with/around the API contract (server + client + docs):
  - `agent-docs/api-contract.md`
- AWS deployment context (only if asked to deploy/operate on AWS):
  - `agent-docs/aws-deployment.md`
