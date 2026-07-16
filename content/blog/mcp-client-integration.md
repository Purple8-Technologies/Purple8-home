---
title: "Connect any AI client to Purple8 over MCP"
description: "Copy-paste configs to wire Claude Desktop, Claude Code, Claude Web, VS Code, Codex, Cursor, and more into a running Purple8 instance."
date: "2026-07-17"
author: "Purple8 Team"
tags: ["mcp", "agents", "integration", "guide"]
---

Purple8 exposes its entire backend — graph, vector, RAG, workflow engine,
ingestion, memory — as **MCP tools**. Any MCP-compatible AI client can discover
and call them. You do not write application code to give an agent this power;
you point the client at Purple8 and the agent has the whole backend.

This post is the practical, copy-paste reference for wiring in the major
clients.

## Two transports — pick one

Purple8 speaks MCP over two transports, and every client below supports at
least one:

- **Remote (HTTP + SSE).** The client connects directly to a URL:
  `https://<host>/mcp/sse` with an `X-API-Key` header. Best for deployed or
  shared instances, Claude Web, and team setups. No local install.
- **stdio bridge.** The client launches a local process that proxies to the
  REST API: `purple8-hyper-graph mcp-server --url <API_URL> --api-key <KEY>`.
  Best for local development and clients without remote-MCP support.

Rule of thumb: if your client can add a **remote/URL** MCP server, use the SSE
endpoint. If it only supports **local/command** servers, install the SDK
(`pip install 'purple8-hyper-graph[mcp]'`) and use the stdio bridge.

Both transports enforce the same tool-level permissions and use the same **API
key** — the one generated inside your Purple8 instance. That key is not your
license and not a user password.

## Get an API key

The easiest way is the admin console: open `https://<host>/lcnc/api-keys`,
create a key, name it after the client (e.g. `claude-desktop`), pick its
scopes, and copy it once. Or via REST:

```bash
curl -X POST https://<host>/auth/api-keys \
  -H "Authorization: Bearer <ADMIN_JWT>" \
  -H "Content-Type: application/json" \
  -d '{"name":"claude-desktop","permissions":["read","write"]}'
```

Scope each key to the minimum the agent needs — the MCP server additionally
gates every tool by role.

## Verify before configuring

```bash
curl -s https://<host>/health                          # liveness
curl -N -H "X-API-Key: <KEY>" https://<host>/mcp/sse   # should stream, not 401
```

A `401` means the key is wrong; a `404` on `/mcp/sse` means the MCP transport
is not mounted on that build. `Ctrl-C` to stop the stream.

## Claude Desktop

Claude Desktop launches local servers, so use the stdio bridge. Edit
`~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or
`%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "purple8": {
      "command": "purple8-hyper-graph",
      "args": ["mcp-server", "--url", "http://localhost:8100", "--api-key", "YOUR_API_KEY"]
    }
  }
}
```

If `purple8-hyper-graph` is not on your global PATH, use the absolute path to
the binary in your virtualenv. Recent builds also support remote Custom
Connectors — if yours does, add a connector at `https://<host>/mcp/sse` with an
`X-API-Key` header instead.

## Claude Code (CLI)

Remote, for a deployed instance:

```bash
claude mcp add --transport sse purple8 \
  https://<host>/mcp/sse \
  --header "X-API-Key: YOUR_API_KEY"
```

Or stdio, for local dev:

```bash
claude mcp add purple8 -- \
  purple8-hyper-graph mcp-server --url http://localhost:8100 --api-key YOUR_API_KEY
```

Check it with `claude mcp list`.

## Claude Web (claude.ai)

Claude Web connects to remote servers only. In **Settings → Connectors → Add
custom connector**, set the URL to `https://<host>/mcp/sse` and add the header
`X-API-Key: YOUR_API_KEY`. Claude Web needs a publicly reachable **HTTPS** URL —
a `localhost` instance will not work, so deploy first or expose it through a
tunnel.

## VS Code (Copilot Agent Mode)

VS Code has native MCP support. Add `.vscode/mcp.json`:

```json
{
  "servers": {
    "purple8": {
      "type": "sse",
      "url": "https://<host>/mcp/sse",
      "headers": { "X-API-Key": "${input:p8gKey}" }
    }
  },
  "inputs": [
    { "id": "p8gKey", "type": "promptString", "description": "Purple8 API key", "password": true }
  ]
}
```

Open Copilot Chat in Agent mode and the Purple8 tools appear in the picker. The
`${input:...}` prompt keeps your key out of source control. For local dev, swap
the server block for `"type": "stdio"` with `command` / `args`.

## OpenAI Codex

Codex reads `~/.codex/config.toml`:

```toml
[mcp_servers.purple8]
command = "purple8-hyper-graph"
args = ["mcp-server", "--url", "http://localhost:8100", "--api-key", "YOUR_API_KEY"]
```

If your Codex version supports URL servers, use `url` and `headers` instead.

## Cursor

Cursor reads `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (per-project):

```json
{
  "mcpServers": {
    "purple8": {
      "url": "https://<host>/mcp/sse",
      "headers": { "X-API-Key": "YOUR_API_KEY" }
    }
  }
}
```

For local dev, use `command` / `args` instead of `url` / `headers`. Settings →
MCP shows a green dot and the tool count when it connects.

## Windsurf, Cline, Continue, and others

The same two shapes cover the rest:

- **Windsurf** — `~/.codeium/windsurf/mcp_config.json`, same schema as Cursor.
- **Cline / Roo Code** — configure through the extension's MCP Servers panel
  (`cline_mcp_settings.json`).
- **Continue** — add an `mcpServers` entry to `~/.continue/config.yaml`.
- **Any other client** — remote-capable clients point at
  `https://<host>/mcp/sse` with the `X-API-Key` header; stdio-only clients
  launch `purple8-hyper-graph mcp-server --url <API_URL> --api-key <KEY>`.

## First things to ask the agent

Once connected, confirm the toolbelt is live:

- "List the available Purple8 MCP tools by namespace."
- "Profile the default collection and recommend RAG settings."
- "Ingest this text into the graph, then answer a question from it."
- "Define a three-stage approval workflow with an SLA and a human gate."

You can also browse the full catalogue, permission badges, and a live
connection snippet in the admin console's MCP page at `https://<host>/lcnc/mcp`.

## A few things that trip people up

- A `401` on connect means a wrong or expired key, or the header name is not
  exactly `X-API-Key`.
- An empty tool list means the key has no role — give it at least read access.
- "Server exited" on stdio usually means `purple8-hyper-graph` is not on PATH;
  use the absolute virtualenv path.
- Claude Web can't reach `localhost` — it needs a public HTTPS URL.
- Long agent sessions dropping mid-stream usually means a load-balancer idle
  timeout set below your session length.

Use one named key per client so you can revoke them individually, scope to
least privilege, and always keep TLS in front. Every tool call is attributed
and written to Purple8's immutable audit trail.
