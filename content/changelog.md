---
title: "Changelog"
description: "What's new in Purple8 Hyper Graph — bug fixes, new features, and improvements shipped to the developer tier."
date: "2026-07-22"
---

Every release shipped to the free developer tier is listed here. We follow [Semantic Versioning](https://semver.org/) and [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
