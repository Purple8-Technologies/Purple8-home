# Content - repo-authored blog & case studies

The repo is the CMS - the Purple8.ai site is a static export served from GitHub
Pages, and every page is rebuilt from the Markdown files in this folder.

## Publishing without GitHub (communications team)

Go to **https://purple8.ai/admin/** and sign in with your Command Center
email and password. From there you can write, preview, publish, unpublish and
delete blog posts and case studies, and upload images. The website updates
2-4 minutes after you press Publish; the dashboard shows when it is live.

Behind the scenes, Command Center (`/cms/*` API) commits the Markdown to this
repo on your behalf - each commit names the editor, so git history is the
revision history and audit trail.

**Granting access (admin):** in Command Center → Access & Roles, tick
**Website Publishing** for the person (any role works - a `viewer` with this
grant can only publish website content). Admins and above always have access.

**One-time setup (engineering):** set `CMS_GITHUB_TOKEN` on the Command Center
app to a fine-grained GitHub token scoped to this repo only, with
*Contents: Read and write* and *Actions: Read*:

```bash
fly secrets set CMS_GITHUB_TOKEN=github_pat_... -a purple8-command-center
```

## Publishing with git (engineers)

1. Create a Markdown file:
   - Blog post → `content/blog/my-post.md`
   - Case study → `content/case-studies/acme-corp.md`
   The file name (without `.md`) becomes the URL slug:
   `/blog/my-post`, `/case-studies/acme-corp`.
2. Add front-matter at the top (see schema below).
3. Write the body in Markdown.
4. Commit / open a PR. On merge to `main`, GitHub Actions rebuilds and deploys.

## Front-matter schema

```yaml
---
title: "Your headline"
description: "One-sentence summary - shown on cards and in search results."
date: "2026-07-16"          # ISO YYYY-MM-DD
author: "Your Name"          # optional
tags: ["engineering", "rag"] # optional
cover: "/blog/cover.png"     # optional, from /public
draft: false                 # optional - true keeps it off the live site
# Case studies may also set:
customer: "Acme Corp"        # optional
industry: "Fintech"          # optional
result: "8.84M docs on one 24 GB box"  # optional headline outcome
---
```

Set `draft: true` to keep a work-in-progress out of the live site while it sits
in the repo.

## Preview locally

```bash
npm run dev
# then open http://localhost:3000/blog or /case-studies
```
