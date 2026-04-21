#!/usr/bin/env bash
NODE25="$(asdf where nodejs 25.4.0)"
CODEX_JS="$NODE25/lib/node_modules/@openai/codex/bin/codex.js"
exec "$NODE25/bin/node" "$CODEX_JS" "$@"
