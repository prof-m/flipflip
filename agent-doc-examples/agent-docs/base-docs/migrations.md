# Database migrations (Alembic)

## Key facts

- Backend uses **SQLAlchemy** models (`server/szurubooru/model/`) and **Alembic**
  migrations (`server/szurubooru/migrations/`).
- Containers run `alembic upgrade head` automatically on startup
  (`server/docker-start.sh` and `server/docker-start-dev.sh`).

## Creating a migration (recommended workflow)

If you changed models and need a migration, the repo includes a helper that
creates a migration file via Docker:

- `doc/developer-utils/create-alembic-migration.sh "describe change"`

This script:
- Builds a temporary server image
- Runs `alembic revision -m ...` in a disposable container
- Copies the generated file into `server/szurubooru/migrations/versions/`

After generating a migration:
- Review the new file for correctness (Alembic autogeneration is not always
  perfect).
- Ensure the app still boots (startup runs `alembic upgrade head`).
- Run backend unit tests via the Docker testing stage (see `agent-docs/testing.md`).

## When to touch migrations

- Adding/removing columns, constraints, or tables.
- Changing enum-like values stored in DB.
- Any change that would break an existing database schema.

If you are only changing API behavior/validation and not schema, avoid creating
unnecessary migrations.

