# API contract (server + client + docs)

## Source of truth

- The REST API is documented in `doc/API.md`.
- Server-side handlers are in `server/szurubooru/api/` (and related modules).
- Client-side API calls are wrapped in `client/js/api.js`.

## When you must update `doc/API.md`

Update `doc/API.md` when a change affects any of the following:
- URL paths, methods, query params
- request/response JSON shapes
- auth requirements or permission gates
- error response shapes/status codes

## Practical workflow for API changes

1. Implement backend change in `server/` (and add/adjust tests in
   `server/szurubooru/tests/`).
2. Update frontend call sites in `client/` if they depend on the changed shape.
3. Update `doc/API.md` to match the new behavior.

If the user asks for “API-only” changes, clarify whether the client is expected
to continue working without modification.

