// File-based content loader for repo-authored Markdown.
//
// The repo IS the CMS. To publish a blog post or case study, a team member
// adds a Markdown file with front-matter under `content/<collection>/` and
// opens a PR (or commits directly). On merge, the GitHub Pages build
// regenerates the static routes — no database, no admin server, no login flow.
//
// Front-matter schema (YAML):
//   title:       string   (required)
//   description: string   (required — used for cards + SEO)
//   date:        string   (required — ISO YYYY-MM-DD)
//   author:      string   (optional)
//   tags:        string[] (optional)
//   cover:       string   (optional — absolute or /public path)
//   draft:       boolean  (optional — true hides from the site)
//   For case studies additionally:
//   customer:    string   (optional)
//   industry:    string   (optional)
//   result:      string   (optional — headline outcome)

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type Collection = "blog" | "case-studies";

export interface ContentMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  tags?: string[];
  cover?: string;
  draft?: boolean;
  // case-study extras
  customer?: string;
  industry?: string;
  result?: string;
}

export interface ContentDoc extends ContentMeta {
  /** Rendered HTML body. */
  html: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "content");

function collectionDir(collection: Collection): string {
  return path.join(CONTENT_ROOT, collection);
}

/** All published slugs in a collection (drafts excluded). */
export function getSlugs(collection: Collection): string[] {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function readRaw(collection: Collection, slug: string) {
  const file = path.join(collectionDir(collection), `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  return matter(raw);
}

function toMeta(collection: Collection, slug: string): ContentMeta | null {
  const parsed = readRaw(collection, slug);
  if (!parsed) return null;
  const d = parsed.data as Record<string, unknown>;
  return {
    slug,
    title: String(d.title ?? slug),
    description: String(d.description ?? ""),
    date: String(d.date ?? ""),
    author: d.author ? String(d.author) : undefined,
    tags: Array.isArray(d.tags) ? (d.tags as string[]) : undefined,
    cover: d.cover ? String(d.cover) : undefined,
    draft: Boolean(d.draft),
    customer: d.customer ? String(d.customer) : undefined,
    industry: d.industry ? String(d.industry) : undefined,
    result: d.result ? String(d.result) : undefined,
  };
}

/** All published entries, newest first. Drafts are excluded. */
export function getAllMeta(collection: Collection): ContentMeta[] {
  return getSlugs(collection)
    .map((slug) => toMeta(collection, slug))
    .filter((m): m is ContentMeta => m !== null && !m.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** A single rendered document, or null if missing / draft. */
export async function getDoc(
  collection: Collection,
  slug: string,
): Promise<ContentDoc | null> {
  const parsed = readRaw(collection, slug);
  const meta = toMeta(collection, slug);
  if (!parsed || !meta || meta.draft) return null;
  const processed = await remark().use(html).process(parsed.content);
  return { ...meta, html: processed.toString() };
}

/** Load a single standalone markdown page from content/<name>.md */
export async function getPage(
  name: string,
): Promise<{ title: string; description: string; date: string; html: string } | null> {
  const file = path.join(CONTENT_ROOT, `${name}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  const d = parsed.data as Record<string, unknown>;
  const processed = await remark().use(html).process(parsed.content);
  return {
    title:       (d.title as string) ?? name,
    description: (d.description as string) ?? "",
    date:        (d.date as string) ?? "",
    html:        processed.toString(),
  };
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
