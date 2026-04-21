# Testing guide

## Backend unit tests (recommended: Docker testing stage)

The repo’s CI builds the server Docker image using the `testing` stage and runs
`pytest` inside it (see `.github/workflows/run-unit-tests.yml`).

Local equivalent:

1. Build the test image:
   - Preferred (matches CI): `docker buildx build --load --target testing -t szuru-server-tests ./server`
   - If you don’t have `buildx`, try: `DOCKER_BUILDKIT=1 docker build --target testing -t szuru-server-tests ./server`
2. Run tests:
   - `docker run --rm -t szuru-server-tests --color=no szurubooru/`

Optional coverage (mirrors CI flags):
- `docker run --rm -t szuru-server-tests --color=no --cov=szurubooru --cov-report=term-missing:skip-covered szurubooru/`

Why this works well:
- The `testing` stage includes PostgreSQL binaries and `pytest-pgsql`, so tests
  can spin up ephemeral DB instances without you managing a separate Postgres.

## Local (non-Docker) test runs (only if asked)

Only attempt this if your environment already has the required system deps
(Python, PostgreSQL binaries, and headers for native wheels if needed).

High-level steps:
- Install runtime deps: `pip install -r server/requirements.txt`
- Install dev deps: `pip install -r server/dev-requirements.txt`
- Run: `pytest server/szurubooru/`

If `pytest-pgsql` cannot find `initdb`/`pg_ctl`, prefer the Docker test image.
