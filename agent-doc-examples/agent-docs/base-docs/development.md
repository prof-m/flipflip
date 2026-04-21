# Development workflow (Docker-first)

This project is designed to run as three services:

- `server`: Python API (waitress in prod; hupper+waitress in dev container)
- `client`: NGINX serving built assets; in dev it watches and rebuilds
- `sql`: PostgreSQL

## Preferred dev loop (docker-compose.dev.yml)

Use this when you need quick iteration on `server/` or `client/` source code.

1. Ensure you have a `.env` in the repo root (see `doc/example.env`).
2. Start dev stack:
   - `docker compose -f docker-compose.dev.yml up --build`

If the build fails with an error about an invalid/empty platform specifier,
enable BuildKit (also mentioned in `doc/INSTALL.md`):
- `export DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1`

Notes:
- `docker-compose.dev.yml` mounts `./server/` into the server container and
  `./client/` into the client container.
- The client dev container runs `npm i` and then `npm run watch`. This is a
  known compromise due to how volumes clobber `node_modules` inside the
  container (see comment in `client/docker-start-dev.sh`).
- The dev compose file exposes:
  - `${PORT}:80` (the main web UI)
  - `8081:8081` (used by the client build/watch tooling)

## Production-like local run (docker-compose.yml)

Use this when you’re validating behavior that depends on the production images
or a closer-to-prod setup.

1. Set up `.env` and `server/config.yaml` (see `doc/INSTALL.md`).
2. Start:
   - `docker compose up -d sql`
   - `docker compose up -d`
3. View logs:
   - `docker compose logs -f`

## Where code changes usually go

- Backend API endpoints and business logic: `server/szurubooru/api/` and
  `server/szurubooru/func/`
- Data model: `server/szurubooru/model/` (SQLAlchemy)
- Request/response handling: `server/szurubooru/rest/` and
  `server/szurubooru/middleware/`
- Frontend views/controllers: `client/js/controllers/` and `client/js/controls/`
- Frontend API wrapper: `client/js/api.js`
