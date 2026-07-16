---
title: "Deploy Purple8 on Fly.io and AWS"
description: "A practical developer guide: stand up the single-container Purple8 backend on Fly.io or AWS, then wire your app and your AI agents to it."
date: "2026-07-17"
author: "Purple8 Team"
tags: ["deployment", "fly", "aws", "guide"]
---

Purple8 is a **single in-process backend** — graph, vector, document,
full-text, workflow, and auth in one container on one port (`8100`). There is
no separate database, vector store, workflow engine, or auth service to
deploy. That is the whole point: **one artifact to run, two ways to integrate**
— REST/SDK for your app, MCP for your AI agents.

This guide covers the two most common cloud targets: **Fly.io** and **AWS**.

## What you need first

- **The commercial image:** `ghcr.io/purple8-technologies/graph-api:latest`.
  It bundles the REST API, the admin console, and the MCP transport.
- **A persistent volume.** Purple8 is stateful (write-ahead log + storage +
  vector index). Never run it on an ephemeral filesystem — you will lose data
  on redeploy.
- **A few secrets:** a strong `P8G_JWT_SECRET`, a bootstrap `P8G_API_KEY`, your
  `PURPLE8_LICENSE_JWT`, and `P8G_CORS_ORIGINS` set to your frontend origin.

One thing to internalise up front: **set `P8G_DATA_PATH` to your mounted
volume** (e.g. `/data`). It defaults to `./data` *inside* the container, which
disappears on redeploy.

## Fly.io — the fastest path to a public HTTPS instance

Fly gives deterministic RAM sizing, secrets that take effect without a
redeploy, and volumes that persist across deploys. It also gives you a public
HTTPS URL out of the box — which remote AI clients (like Claude Web) require.

```bash
fly launch --no-deploy --name my-purple8
fly volumes create p8g_data --size 3 --region iad
```

A minimal `fly.toml`:

```toml
app = "my-purple8"
primary_region = "iad"

[build]
  image = "ghcr.io/purple8-technologies/graph-api:latest"

[env]
  P8G_DATA_PATH = "/data"
  P8G_CORS_ORIGINS = "https://app.yourco.com"
  PURPLE8_REQUIRE_LICENSE = "1"

[[mounts]]
  source = "p8g_data"
  destination = "/data"

[http_service]
  internal_port = 8100
  force_https = true
  auto_stop_machines = false
  min_machines_running = 1

[[vm]]
  memory = "2gb"
  cpu_kind = "shared"
  cpus = 2
```

Set your secrets — they apply immediately, no redeploy:

```bash
fly secrets set \
  P8G_JWT_SECRET="$(openssl rand -hex 32)" \
  PURPLE8_LICENSE_JWT="$(cat license.jwt)" \
  P8G_API_KEY="$(openssl rand -hex 24)"
fly deploy
```

Your instance is now live at `https://my-purple8.fly.dev`, with TLS handled by
Fly.

A few Fly notes worth knowing:

- **RAM is not corpus-sized.** Purple8's storage engine holds a bounded working
  set — the same 2 GB machine ingests two million or twenty million nodes. You
  trade *time*, not *memory*. Start at 2 GB and only raise it if ingestion
  latency matters.
- **Keep one machine always on** (`min_machines_running = 1`). A single volume
  attaches to one machine; keeping it warm keeps the write-ahead log and vector
  index resident.
- **Health checks** should point at `GET /health`.

## AWS — for teams already in the ecosystem

The general answer on AWS is **ECS Fargate + EFS**. Fargate has no persistent
local disk, so all state goes to an EFS mount. The task definition mounts EFS
at `/data`, sets `P8G_DATA_PATH=/data`, pulls secrets from SSM Parameter Store
or Secrets Manager, and health-checks `/health`.

Front the service with an **Application Load Balancer**:

- HTTPS listener with an ACM certificate — this is where TLS terminates.
- **Raise the idle timeout** above your longest agent session. MCP uses
  long-lived streaming connections, and the default 60-second timeout will cut
  them.
- If you run more than one task and rely on streaming, enable stickiness so the
  stream and its follow-up messages hit the same task. For a single stateful
  primary — the common case — run exactly one task and scale vertically.

If you prefer the lowest-effort option, **App Runner** works too, but it has no
native block storage; attach EFS via a VPC connector, or reserve App Runner for
stateless read-replica use and keep your stateful primary on ECS.

For encryption at rest, Purple8's envelope encryption plugs straight into
**AWS KMS**: set `KMS_PROVIDER=aws` and `KMS_KEY_ID` to your key ARN, and give
the task role `kms:GenerateDataKey` and `kms:Decrypt`.

## Connect your application

Once the instance is up, your app talks to it two ways.

**Over REST** — ingestion is a two-step preview-then-commit flow, and querying
is a single call:

```bash
# 1. Preview — extracts entities/relationships, writes nothing
curl -X POST https://<host>/ingest/preview \
  -H "X-API-Key: $KEY" -H "Content-Type: application/json" \
  -d '{"text":"Acme signed a supply contract with Globex in 2026.","source_name":"note-1"}'

# 2. Commit the reviewed payload into the graph
curl -X POST https://<host>/ingest/commit \
  -H "X-API-Key: $KEY" -H "Content-Type: application/json" \
  -d '{ ...preview payload... }'

# Ask a question with hybrid graph + vector RAG
curl -X POST https://<host>/rag/hybrid-query \
  -H "X-API-Key: $KEY" -H "Content-Type: application/json" \
  -d '{"question":"Who did Acme contract with?","k":8}'
```

**Or embedded**, when your service *is* the backend:

```python
# pip install 'purple8-hyper-graph'
from purple8_graph import GraphEngine

engine = GraphEngine("/data", auto_config=True)
engine.add_node("acme", labels=["Company"], properties={"name": "Acme"})
results = engine.vector_search(embedding, k=8)
```

This is the "frontend-only" pattern: point your React/Next frontend at the REST
API, authenticate with a user JWT or a scoped API key, and call `/rag`,
`/graph`, and `/journey`. Set `P8G_CORS_ORIGINS` to your frontend origin so the
browser is allowed through.

## Connect your AI agents

Agents connect to the **same instance** over MCP — no extra deployment. Point
any MCP client at `https://<host>/mcp/sse` with an `X-API-Key` header, and it
gets the entire backend as callable tools. A quick sanity check against your
deployment:

```bash
curl -N -H "X-API-Key: $KEY" https://<host>/mcp/sse   # should stream, not 401
```

Per-client setup — Claude Desktop, Claude Code, Claude Web, VS Code, Codex,
Cursor, and more — is covered in the companion post,
[Connect any AI client to Purple8 over MCP](/blog/mcp-client-integration).

## Before you call it production

- Persistent volume mounted, `P8G_DATA_PATH` pointing at it.
- `P8G_JWT_SECRET` set to a strong random value.
- `PURPLE8_LICENSE_JWT` set, with `PURPLE8_REQUIRE_LICENSE=1` so a commercial
  install fails closed rather than silently dropping to the free tier.
- TLS terminated in front (automatic on Fly; ALB + ACM on AWS).
- `P8G_CORS_ORIGINS` restricted to your real frontend origin.
- KMS configured for encryption at rest.
- Load-balancer idle timeout raised above your longest agent session.
- One named, least-privilege API key per app and per agent.
- Backups of the data volume scheduled.

That is the whole backend — deployed, encrypted, and ready for both your app
and your agents, from a single container.
