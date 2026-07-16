# Content — repo-authored blog & case studies

The repo is the CMS. There is no admin login, no database, and no server — the
Purple8.ai site is a static export served from GitHub Pages. To publish, you add
a Markdown file here and merge it. The build regenerates the pages.

## How to publish

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
description: "One-sentence summary — shown on cards and in search results."
date: "2026-07-16"          # ISO YYYY-MM-DD
author: "Your Name"          # optional
tags: ["engineering", "rag"] # optional
cover: "/blog/cover.png"     # optional, from /public
draft: false                 # optional — true keeps it off the live site
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
