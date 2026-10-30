---
title: "Changelog"
description: "What's new in Purple8 Hyper Graph and Purple8 DocIntel: bug fixes, new features, and improvements shipped to the developer tier."
date: "2026-10-30"
---

Every release shipped to the free developer tier is listed here. We follow [Semantic Versioning](https://semver.org/) and [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## v0.72.0 (Hyper Graph) & v0.12.5 (DocIntel) - 30 October 2026

### New features

**AI-Native Execution Infrastructure, 50M-Object Single-Node Scale & Sandbox MCP**

- **AI-Native Execution Infrastructure Positioning**: Updated Purple8 Hyper Graph positioning around autonomous application building, execution, and operation with native intelligence, adaptive computing, and human-supervised governance (*Built for AI. Operated by AI. Supervised by Humans.*).
- **20M-Node / 30M-Edge (`50M` Graph Objects) Single-Node Scale & 100K-Joint AEC Structural Analysis**: Added single-batch `BrickWAL.append_batch` + Rayon `batch_add_edges` acceleration (`23.5x` faster edge ingestion), power-law intermediate super-hub fan-out protection (`P8G_MAX_HUB_FANOUT`, tested up to `6,000,000` edges on a single hub with zero timeouts), auto-indexed foreign-key table row linking (`34.2x` speedup), and iterative Tarjan bridge/BCC analysis scaling to `100,000` 3-D joints and `478,840` structural members.
- **Universal MCP Experience Across Self-Hosted & Sandbox (Hyper Graph & DocIntel)**: Every self-hosted Docker, OpenShift, cloud, or sandbox deployment gets the exact same zero-friction MCP experience. Both `/mcp` and `/mcp/sse` on Hyper Graph accept `p8g_...` API keys, session JWTs, and Sandbox Keys, and the in-browser MCP Console (`POST /mcp/invoke`) executes all 124+ MCP tools across all 16 namespaces. DocIntel's `/mcp` endpoint accepts `X-API-Key` alongside `Authorization: Bearer`, defaults `auto_commit=false` when no graph target is configured, and avoids job-store WAL replay in spawned CPU workers.
- **Red Hat OpenShift UBI9 Containers (`Dockerfile.rhel`)**: Both Purple8 Hyper Graph and Purple8 DocIntel now ship Red Hat Universal Base Image 9 (`ubi9/python-312:9.5`) containers engineered for OpenShift's default `restricted` Security Context Constraint (arbitrary-UID, group `0`, `/licenses/LICENSE`).
- **Hardware & Accelerator Auto-Discovery (`CortexAutoConfig`)**: Automatic detection of multi-socket CPU and NUMA topologies (`recommended_shards = max(cpu_sockets, numa_nodes)`), Intel AMX tile instructions, Intel XPU (`torch.xpu`), and NVIDIA Tensor Core GPUs up to **Blackwell Ultra B300 / GB300** (`288 GB` HBM3e, `sm_103`, FP4).
- **120+ MCP Tools Across 16 Namespaces**: Expanded the MCP agent server with `evolution.*` (multi-objective evolutionary optimisation), `sentinel.*` (autonomous model/threshold governance and drift detection), `quantum.*` (QUBO/Ising solvers), and `admin.*` (legal holds, retention policies, and audit verification).
- **Structured Tables, Pages, and Source-Bound Commits (DocIntel v0.12.5)**: DocIntel extracts structured tables (`docintel.get_tables` with row paging), page character spans, and entity mention spans across 70+ document formats and 75+ languages, with deterministic `EntityValidator` checks and source-hash commit verification.

### Six-Sigma Operational Hardening & Fixes

- **Online Storage Scrubber (`POST /admin/storage/scrub`)**: Non-destructive verification of WAL CRC32 frames and cold-slab records without taking the database offline.
- **Disk High-Watermark Write Admission Gate**: `WriteAdmissionController` monitors the `/data` volume (`P8G_WRITE_ADMISSION_DISK_MAX_PCT`, default `95%`) to reject writes cleanly before `ENOSPC`.
- **Durable Journey AI Outbox**: `JourneyEngine` tracks `ai_dispatched` on stage transitions and replays pending AI steps automatically on startup.
- **OIDC Identity Provider (`POST /auth/idp/token`)**: Added single-use `refresh_token` rotation and strict confidential client secret verification.
- **Security Hardening**: Added 100 MiB ODF zip-bomb and XML entity (`<!ENTITY`) expansion guards in DocIntel, and upgraded `vite` (`8.3.5`) and `vitest` (`4.1.12`).

---

## v0.66.6 — 25 July 2026

### Fixed

- **Deadlock protection now active** — concurrent write deadlocks are now automatically detected and resolved. The deadlock detector runs in the background from the moment the engine starts; no configuration required.
- **AWS Bedrock RAG** — embedding model was not being passed through to the Bedrock provider in the RAG pipeline. Fixed — Bedrock-backed RAG queries now use the correct embedding model from your tenant config.

### Security

- **`axios` upgraded to 1.18.1** in the frontend — resolves a batch of prototype pollution and proxy bypass CVEs.

---

## v0.66.6 — 22 July 2026

### New features

**Versioned file editing**

Files can now be replaced, patched, and inspected through a full version history — via the API, AI agents, and the admin console.

- **Replace a file (`PUT /files/{id}`)**: Upload a new version of any stored document. The original is automatically archived as version 1. The new bytes become version 2, 3, and so on. An audit edge is written to the graph on every replacement. Pass `re_extract=true` to automatically re-run document intelligence on the new content in the background.
- **Edit metadata (`PATCH /files/{id}/properties`)**: Update the filename, description, tags, or classification of a file without touching the stored bytes or bumping the version number.
- **Version history (`GET /files/{id}/versions`)**: Returns the full ordered list of every stored version — version number, filename, size, and timestamp. Existing uploads before this release get a synthesised v1 record automatically; no migration required.
- **Download a specific version (`GET /files/{id}/versions/{n}`)**: Fetch any historical version by number.

**Three new MCP tools in the `data.*` namespace (74 tools total)**

AI agents can now manage file versions without human intermediaries:

- `data.replace_file` — fetch a new version from a URL and replace the stored file. Required: `file_id`, `url`. Optional: `re_extract`.
- `data.patch_file_properties` — update metadata fields. Required: `file_id`. Optional: `filename`, `description`, `tags`, `classification`.
- `data.list_file_versions` — return the complete version history. Required: `file_id`.

**Admin console File Library improvements**

Three new per-file actions in the Files section:

- **Edit** — opens a metadata modal (filename, description, tags).
- **Replace** — file picker with an optional "re-run extraction" checkbox; shows the new version number after upload.
- **History** — panel listing every stored version with per-version download links.

A version column is now visible in the file table.

---

## v0.66.5 — 22 July 2026

### New features

**SMTP configuration — in the admin console and via AI agents**

Outbound email (for password-reset and user-invite flows) can now be configured without touching environment variables or restarting the server:

- **Admin console**: Settings → Outbound Email. Live status badge, form fields for host, port, credentials, and from address, plus a "Send Test Email" button to confirm delivery before it matters.
- **AI agents (MCP)**: Two new tools in the `admin.*` namespace — `admin.smtp_status` to check whether email is configured, and `admin.smtp_configure` to set it up through a HITL-gated flow. The agent is explicitly instructed to collect credentials from the human operator before saving anything. Works with any SMTP provider: Postmark, SES, Gmail, Migadu, and others.

**Smarter forgot-password page**

The `/lcnc/forgot` page now detects whether SMTP is configured and shows the appropriate recovery path — email reset when available, CLI escape hatch when not — instead of always implying an email will be sent.

### Bug fixes

- Forgot-password page showed "We'll issue a one-time reset link" even when no email provider was configured, leaving self-hosted users locked out with no explanation. Fixed.

---

## v0.66.4 — 21 July 2026

### Bug fixes

**Offline admin password recovery works in all deployment modes**

The `purple8-hyper-graph reset-password` CLI subcommand now works correctly across all installation types, including self-hosted Docker deployments. Run it directly inside the container — no server running, no email required:

```
purple8-hyper-graph reset-password --email you@example.com
```

Add `--create` to bootstrap a fresh super-admin if all accounts are locked.

---

## v0.66.3 — 20 July 2026

### New features

**`DELETE /graph` — bulk graph clear with dry-run**

For deployments where Purple8 is a rebuildable projection of an external authoritative store. Clears all nodes and edges for the caller's own tenant only (never cross-tenant), preserving auth, schema, and AI config. Supports `?dry_run=true` to preview the operation before committing. Recorded in the audit trail.

### Bug fixes

- Vector search latency on memory-constrained hardware (under 128 GB RAM) no longer degrades when the working set fits in RAM. A miscalculation in the hot-segment cache sizing caused unnecessary disk reads. Fixed — query p50 on a 16 GB machine dropped from ~12 s to ~16 ms with no change to recall or ranking accuracy.
