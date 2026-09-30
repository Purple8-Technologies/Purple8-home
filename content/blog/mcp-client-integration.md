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

- **Remote (Streamable HTTP).** The client connects directly to a URL:
  `https://<host>/mcp` with an `X-API-Key` header. `<host>` can be your own
  AWS, Fly or Kubernetes deployment or a Purple8 SaaS instance. Best for
  deployed or shared instances, Claude Web, and team setups. No local install.
  (Legacy SSE-only clients can use `https://<host>/mcp/sse`.)
- **stdio bridge.** The client launches a local process that proxies to the
  REST API: `purple8-hyper-graph mcp-server --url <API_URL> --api-key <KEY>`.
  Best for local development and clients without remote-MCP support.
  `<API_URL>` can also be a hosted instance.

Rule of thumb: if your client can add a **remote/URL** MCP server, use the
`/mcp` endpoint. If it only supports **local/command** servers, install the
SDK (`pip install 'purple8-hyper-graph[mcp]'`) and use the stdio bridge.

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
curl -s -o /dev/null -w "%{http_code}\n" -X POST https://<host>/mcp -H "X-API-Key: <KEY>" -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"curl","version":"0"}}}'   # 200 OK, 401 bad key, 404 no [mcp] extra
```

A `401` means the key is wrong, often because it was issued by a different
instance. Keys don't carry over between local and hosted. A `404` on `/mcp`
means the MCP transport is not mounted on that build.

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
Connectors — if yours does, add a connector at `https://<host>/mcp` with an
`X-API-Key` header instead.

## Claude Code (CLI)

Remote, for a deployed instance:

```bash
claude mcp add --transport http purple8 \
  https://<host>/mcp \
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
custom connector**, set the URL to `https://<host>/mcp` and add the header
`X-API-Key: YOUR_API_KEY`. Claude Web needs a publicly reachable **HTTPS** URL —
a `localhost` instance will not work, so deploy first or expose it through a
tunnel.

## VS Code (Copilot Agent Mode)

VS Code has native MCP support. Add `.vscode/mcp.json`:

```json
{
  "servers": {
    "purple8": {
      "type": "http",
      "url": "https://<host>/mcp",
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
      "url": "https://<host>/mcp",
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
  `https://<host>/mcp` with the `X-API-Key` header; stdio-only clients
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
  timeout set below your session length (the AWS ALB default is 60 s, so raise
  it to 300 s or more).

## Running it in the cloud yourself

If you self-host on AWS, Fly or Kubernetes, check these before handing the URL
to agents. On Purple8 SaaS they are handled for you.

- Install the `[mcp]` extra in your image. Without it, `/mcp` returns 404.
- Terminate TLS in front of the server, because keys travel in headers.
- Set `P8G_PUBLIC_URL=https://<host>`. Each MCP session sends its tool calls
  back through this URL. Behind a proxy, the fallback is often an internal
  `http://` address.
- Turn off proxy buffering for `/mcp*`, because both transports stream.
- Use sticky sessions only if clients use legacy `/mcp/sse`. `/mcp` is
  stateless per request.

Use one named key per client so you can revoke them individually, scope to
least privilege, and always keep TLS in front. Every tool call is attributed
and written to Purple8's immutable audit trail.
