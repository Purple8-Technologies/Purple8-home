# Purple8 Hyper Graph — Beta Quickstart

> **Beta license:** 30 days full access, all features unlocked (DEVELOPER tier).
> This guide gets you from zero to a running instance in under 5 minutes.

---

## Prerequisites

| Requirement | Notes |
|---|---|
| Docker ≥ 24 | `docker --version` to verify |
| 4 GB RAM minimum | 8 GB+ recommended for larger corpora |
| Your beta license JWT | Emailed to you on approval |
| Internet access | Required for first `docker pull`; engine runs fully offline after that |

---

## Step 1 — Pull the Docker image

```bash
docker pull ghcr.io/purple8-technologies/purple8-graph:beta
```

The image is hosted on GitHub Container Registry (GHCR). If you see an auth error, log in first:

```bash
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

---

## Step 2 — Start the engine

```bash
docker run -d \
  --name purple8 \
  -e PURPLE8_LICENSE_JWT="<your-jwt-from-email>" \
  -p 8100:8100 \
  -v purple8-data:/data \
  ghcr.io/purple8-technologies/purple8-graph:beta
```

**What each flag does:**

| Flag | Purpose |
|---|---|
| `-e PURPLE8_LICENSE_JWT` | Your license — required for the engine to start |
| `-p 8100:8100` | Exposes the REST API and admin console on port 8100 |
| `-v purple8-data:/data` | Persists graph data across restarts (recommended) |

Check it started:

```bash
docker logs purple8 --tail 20
```

You should see `purple8_graph_ready` within a few seconds.

---

## Step 3 — Open the admin console

Navigate to: **[http://localhost:8100/lcnc](http://localhost:8100/lcnc)**

The LCNC admin console gives you:
- Graph browser (nodes + edges, visual)
- Tenant and user management
- API key management
- Storage settings
- Health + metrics dashboard

Default credentials: `admin` / `changeme` — **change the password immediately** via the Settings tab.

---

## Step 4 — Your first API call

```bash
# Health check
curl http://localhost:8100/health

# Add a node
curl -X POST http://localhost:8100/graph/nodes \
  -H "Content-Type: application/json" \
  -H "X-API-Key: <your-api-key>" \
  -d '{"label": "Document", "properties": {"title": "Hello Purple8", "content": "First node"}}'

# Vector search
curl -X POST http://localhost:8100/rag/hybrid_query \
  -H "Content-Type: application/json" \
  -H "X-API-Key: <your-api-key>" \
  -d '{"query": "Hello", "k": 5}'
```

Get your API key from the admin console: **Settings → API Keys → Create**.

---

## Step 5 — Ingest a document (DocIntel)

Purple8 DocIntel (port 8200) handles 70+ document formats. To run it alongside the graph engine:

```bash
docker run -d \
  --name purple8-docintel \
  -e LLM__PROVIDER=openai \
  -e LLM__API_KEY="<your-openai-key>" \
  -e GRAPH__BASE_URL=http://host.docker.internal:8100 \
  -e GRAPH__API_KEY="<your-api-key>" \
  -p 8200:8200 \
  ghcr.io/purple8-technologies/purple8-docintel:beta

# Upload a PDF
curl -X POST http://localhost:8200/process \
  -F "file=@/path/to/document.pdf" \
  -F "auto_commit=true"
```

---

## Step 6 — Use the MCP server (AI agents)

Point Claude Desktop, Cursor, or any MCP-compatible agent at:

```json
{
  "mcpServers": {
    "purple8": {
      "url": "http://localhost:8100/mcp",
      "headers": {
        "X-API-Key": "<your-api-key>"
      }
    }
  }
}
```

The MCP server exposes 22 tools across `graph.*`, `rag.*`, `journey.*`, and `data.*` namespaces. Your AI agent can now build and query the entire backend in natural language.

---

## Configuration reference

All settings are environment variables (pass via `-e` to Docker):

| Variable | Default | Description |
|---|---|---|
| `PURPLE8_LICENSE_JWT` | — | **Required.** Your license JWT |
| `PURPLE8_ADMIN_PASSWORD` | `changeme` | Admin console password |
| `P8G_API_KEY` | auto-generated | REST API key (set explicitly for reproducibility) |
| `PURPLE8_TELEMETRY_DISABLE` | `0` | Set to `1` to disable telemetry (air-gapped installs) |
| `P8G_DATA_PATH` | `/data` | Graph storage directory |
| `P8G_LOG_LEVEL` | `info` | `debug` / `info` / `warning` |
| `P8G_PORT` | `8100` | HTTP port |

---

## Stopping and cleaning up

```bash
# Stop
docker stop purple8

# Remove container (data volume is preserved)
docker rm purple8

# Remove data volume (destructive — all graph data lost)
docker volume rm purple8-data
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `StartupBlockedError` in logs | Check your `PURPLE8_LICENSE_JWT` is set correctly and hasn't expired |
| Port 8100 already in use | Change to `-p 8101:8100` and access at `localhost:8101` |
| `Out of memory` error | Reduce corpus size or increase Docker memory limit: `--memory 8g` |
| Admin console blank | Clear browser cache; try `http://localhost:8100/lcnc/login` directly |
| Vector search returns no results | Ingest at least one document first; embeddings are built on ingestion |

---

## Getting help during beta

- **Email**: [hello@purple8.ai](mailto:hello@purple8.ai) — reply directly to your approval email
- **Docs**: [docs.purple8.ai](https://docs.purple8.ai)
- **Issues**: [github.com/Purple8-Technologies/Purple8-home/issues](https://github.com/Purple8-Technologies/Purple8-home/issues)

We read every piece of feedback during beta. Your experience directly shapes what ships in August 2026.

---

## After your beta expires

Your 30-day beta gives you full access to all features (DEVELOPER tier). To continue:

| Plan | Price | Best for |
|---|---|---|
| **Starter** | $1,199/mo | Solo developer or small team (1 machine, 5M nodes) |
| **Pro** | $6,999/mo | Production deployment (10 machines, 50M nodes) |
| **Enterprise** | Custom | Unlimited machines, dedicated support |

[See pricing →](https://purple8.ai/pricing)
