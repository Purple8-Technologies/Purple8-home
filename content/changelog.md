---
title: "Changelog"
description: "What's new in Purple8 Hyper Graph — bug fixes, new features, and improvements shipped to the developer tier."
date: "2026-07-22"
---

Every release shipped to the free developer tier is listed here. We follow [Semantic Versioning](https://semver.org/) and [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
