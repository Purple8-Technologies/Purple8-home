"use client";

/**
 * /admin - website publishing dashboard for the communications team.
 *
 * Editors sign in with their Command Center account (needs the "Website
 * Publishing" grant or admin role). Saving commits the Markdown to this repo
 * through Command Center, which triggers the normal GitHub Pages deploy - no
 * GitHub account needed. See content/README.md.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import { CC_BASE_URL } from "@/lib/cc";

type Collection = "blog" | "case-studies";

interface Item {
  slug: string;
  sha: string;
  title: string;
  description: string;
  date: string;
  author: string;
  draft: boolean;
  url: string;
}

interface Draft {
  slug: string;
  sha: string | null;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string;
  cover: string;
  customer: string;
  industry: string;
  result: string;
  body: string;
  draft: boolean;
}

interface DeployStatus {
  status?: string;
  conclusion?: string | null;
  commit_message?: string;
}

const TOKEN_KEY = "p8_cms_token";
const COLLECTIONS: { id: Collection; label: string }[] = [
  { id: "blog", label: "Blog posts" },
  { id: "case-studies", label: "Case studies" },
];

const today = () => new Date().toISOString().slice(0, 10);
const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

const emptyDraft = (): Draft => ({
  slug: "", sha: null, title: "", description: "", date: today(), author: "",
  tags: "", cover: "", customer: "", industry: "", result: "", body: "", draft: true,
});

const input =
  "w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none";
const btn =
  "rounded-lg px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [who, setWho] = useState("");
  const [ready, setReady] = useState(false);

  const signOut = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setWho("");
  }, []);

  const api = useCallback(
    async (path: string, init: RequestInit = {}) => {
      const headers = new Headers(init.headers);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      if (init.body && typeof init.body === "string") headers.set("Content-Type", "application/json");
      const r = await fetch(`${CC_BASE_URL}/cms${path}`, { ...init, headers });
      if (r.status === 401) {
        signOut();
        throw new Error("Your session expired. Please sign in again.");
      }
      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        const detail = (data as { detail?: unknown }).detail;
        throw new Error(
          typeof detail === "string" ? detail
            : Array.isArray(detail) ? detail.map((d: { msg?: string }) => d.msg).join("; ")
            : `Request failed (${r.status})`,
        );
      }
      return data;
    },
    [token, signOut],
  );

  useEffect(() => {
    setToken(sessionStorage.getItem(TOKEN_KEY));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!token) return;
    api("/me").then((d) => setWho(d.email)).catch(() => undefined);
  }, [token, api]);

  if (!ready) return null;

  return (
    <main className="p8-themed relative z-10 min-h-screen w-full text-zinc-100">
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">Purple8</p>
            <h1 className="text-lg font-bold text-white">Website publishing</h1>
          </div>
          {token && (
            <div className="flex items-center gap-4 text-sm text-zinc-400">
              <span>{who}</span>
              <button onClick={signOut} className="text-purple-300 hover:text-purple-200">Sign out</button>
            </div>
          )}
        </div>
      </header>
      {token ? (
        <Dashboard api={api} />
      ) : (
        <Login
          onToken={(t) => {
            sessionStorage.setItem(TOKEN_KEY, t);
            setToken(t);
          }}
        />
      )}
    </main>
  );
}

function Login({ onToken }: { onToken: (t: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const r = await fetch(`${CC_BASE_URL}/cms/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(typeof d.detail === "string" ? d.detail : "Sign-in failed.");
      onToken(d.token);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-24 max-w-sm space-y-4 px-4">
      <h2 className="text-2xl font-bold text-white">Sign in</h2>
      <p className="text-sm text-zinc-400">Use your Purple8 Command Center email and password.</p>
      <label className="block text-sm">
        <span className="admin-field-label mb-1 block">Email</span>
        <input className={input} type="email" autoComplete="username" required value={email}
          onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="block text-sm">
        <span className="admin-field-label mb-1 block">Password</span>
        <input className={input} type="password" autoComplete="current-password" required value={password}
          onChange={(e) => setPassword(e.target.value)} />
      </label>
      {err && <p role="alert" className="text-sm text-red-400">{err}</p>}
      <button type="submit" disabled={busy} className={`${btn} w-full bg-purple-600 text-white hover:bg-purple-500`}>
        {busy ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

type Api = (path: string, init?: RequestInit) => Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

function Dashboard({ api }: { api: Api }) {
  const [collection, setCollection] = useState<Collection>("blog");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [editing, setEditing] = useState<{ collection: Collection; draft: Draft } | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [deploy, setDeploy] = useState<DeployStatus | null>(null);
  const [watchDeploy, setWatchDeploy] = useState(false);
  const collectionRef = useRef(collection);
  const listRequest = useRef(0);
  const openRequest = useRef(0);

  const load = useCallback(async () => {
    const requestId = ++listRequest.current;
    const requestedCollection = collection;
    setLoading(true);
    setErr(null);
    try {
      const result = await api(`/posts/${requestedCollection}`);
      if (requestId === listRequest.current && collectionRef.current === requestedCollection) {
        setItems(result.items);
      }
    } catch (e) {
      if (requestId === listRequest.current && collectionRef.current === requestedCollection) {
        setErr(e instanceof Error ? e.message : "Could not load.");
      }
    } finally {
      if (requestId === listRequest.current && collectionRef.current === requestedCollection) {
        setLoading(false);
      }
    }
  }, [api, collection]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!watchDeploy) return;
    let stop = false;
    const tick = async () => {
      try {
        const s: DeployStatus = await api("/deploy-status");
        if (stop) return;
        setDeploy(s);
        if (s.status === "completed") setWatchDeploy(false);
      } catch {
        /* keep polling */
      }
    };
    const first = setTimeout(tick, 5000);
    const id = setInterval(tick, 15000);
    return () => {
      stop = true;
      clearTimeout(first);
      clearInterval(id);
    };
  }, [watchDeploy, api]);

  async function open(slug: string) {
    const requestedCollection = collectionRef.current;
    const requestId = ++openRequest.current;
    setErr(null);
    try {
      const d = await api(`/posts/${requestedCollection}/${slug}`);
      if (requestId !== openRequest.current || collectionRef.current !== requestedCollection) return;
      setEditing({
        collection: requestedCollection,
        draft: {
          slug: d.slug, sha: d.sha, title: d.title, description: d.description, date: d.date || today(),
          author: d.author, tags: (d.tags || []).join(", "), cover: d.cover, customer: d.customer,
          industry: d.industry, result: d.result, body: d.body, draft: d.draft,
        },
      });
    } catch (e) {
      if (requestId === openRequest.current && collectionRef.current === requestedCollection) {
        setErr(e instanceof Error ? e.message : "Could not open.");
      }
    }
  }

  function saved(message: string) {
    setNotice(message);
    setDeploy({ status: "queued" });
    setWatchDeploy(true);
    setEditing(null);
    load();
  }

  if (editing) {
    return (
      <Editor
        api={api}
        collection={editing.collection}
        initial={editing.draft}
        onCancel={() => setEditing(null)}
        onSaved={saved}
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {notice && (
        <div className="mb-6 rounded-lg border border-purple-800 bg-purple-950/40 p-4 text-sm">
          <p className="text-purple-100">{notice}</p>
          {deploy && <DeployLine deploy={deploy} />}
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {COLLECTIONS.map((c) => (
            <button key={c.id} onClick={() => {
              if (collectionRef.current === c.id) return;
              collectionRef.current = c.id;
              listRequest.current += 1;
              openRequest.current += 1;
              setItems([]);
              setLoading(true);
              setErr(null);
              setCollection(c.id);
            }}
              className={`${btn} ${collection === c.id ? "admin-selected-surface" : "text-zinc-400 hover:text-white"}`}>
              {c.label}
            </button>
          ))}
        </div>
        <button onClick={() => setEditing({ collection, draft: emptyDraft() })} className={`${btn} bg-purple-600 text-white hover:bg-purple-500`}>
          + New {collection === "blog" ? "post" : "case study"}
        </button>
      </div>
      {err && <p role="alert" className="mt-6 text-sm text-red-400">{err}</p>}
      <div className="mt-6 divide-y divide-zinc-800 rounded-xl border border-zinc-800">
        {loading && <p className="p-6 text-sm text-zinc-500">Loading...</p>}
        {!loading && items.length === 0 && <p className="p-6 text-sm text-zinc-500">Nothing here yet.</p>}
        {!loading && items.map((it) => (
          <button key={it.slug} onClick={() => open(it.slug)}
            className="flex w-full items-start justify-between gap-4 p-4 text-left hover:bg-zinc-900">
            <div>
              <p className="font-semibold text-white">{it.title}</p>
              <p className="mt-1 line-clamp-1 text-sm text-zinc-400">{it.description}</p>
              <p className="mt-1 text-xs text-zinc-500">{it.date}{it.author ? ` · ${it.author}` : ""} · {it.url}</p>
            </div>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
              it.draft ? "admin-draft-badge" : "bg-emerald-900/60 text-emerald-300"}`}>
              {it.draft ? "Draft" : "Live"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DeployLine({ deploy }: { deploy: DeployStatus }) {
  if (deploy.status === "completed") {
    return deploy.conclusion === "success"
      ? <p className="mt-1 text-emerald-300">The website has been updated.</p>
      : <p className="mt-1 text-red-300">The website update failed. Please contact engineering - your content is saved.</p>;
  }
  return <p className="mt-1 text-zinc-400">Updating the website - this usually takes 2-4 minutes...</p>;
}

function Editor({
  api, collection, initial, onCancel, onSaved,
}: {
  api: Api;
  collection: Collection;
  initial: Draft;
  onCancel: () => void;
  onSaved: (message: string) => void;
}) {
  const [d, setD] = useState<Draft>(initial);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.sha));
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  // Uploaded images are not on the live site until it redeploys; preview them locally.
  const [localImages, setLocalImages] = useState<Record<string, string>>({});
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const coverInput = useRef<HTMLInputElement>(null);
  const isNew = !initial.sha;

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    if (tab !== "preview") return;
    remark().use(html).process(d.body).then((out) => {
      let h = out.toString();
      for (const [path, url] of Object.entries(localImages)) h = h.split(`src="${path}"`).join(`src="${url}"`);
      setPreview(h);
    });
  }, [tab, d.body, localImages]);

  const wrap = useCallback((before: string, after = "", placeholder = "") => {
    const el = bodyRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const sel = value.slice(s, e) || placeholder;
    const next = value.slice(0, s) + before + sel + after + value.slice(e);
    setD((p) => ({ ...p, body: next }));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + sel.length);
    });
  }, []);

  async function upload(file: File): Promise<string | null> {
    const fd = new FormData();
    fd.append("file", file);
    setBusy(true);
    setErr(null);
    try {
      const { path } = await api("/images", { method: "POST", body: fd });
      const dataUrl = await new Promise<string>((res) => {
        const fr = new FileReader();
        fr.onload = () => res(String(fr.result));
        fr.readAsDataURL(file);
      });
      setLocalImages((m) => ({ ...m, [path]: dataUrl }));
      return path;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed.");
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function save(asDraft: boolean) {
    const slug = slugify(d.slug || d.title);
    if (!d.title.trim() || !d.description.trim() || !slug) {
      setErr("Title, summary and URL name are required.");
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      await api(`/posts/${collection}/${slug}`, {
        method: "POST",
        body: JSON.stringify({
          title: d.title, description: d.description, date: d.date, author: d.author,
          tags: d.tags.split(",").map((t) => t.trim()).filter(Boolean),
          cover: d.cover, customer: d.customer, industry: d.industry, result: d.result,
          body: d.body, draft: asDraft, sha: d.sha,
        }),
      });
      onSaved(asDraft
        ? `"${d.title}" saved as a draft (not visible on the website).`
        : `"${d.title}" published - it will be live at /${collection}/${slug}/ shortly.`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!d.sha || !confirm(`Delete "${d.title}" permanently from the website?`)) return;
    setBusy(true);
    setErr(null);
    try {
      await api(`/posts/${collection}/${d.slug}/delete`, { method: "POST", body: JSON.stringify({ sha: d.sha }) });
      onSaved(`"${d.title}" deleted.`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Delete failed.");
    } finally {
      setBusy(false);
    }
  }

  const coverPreview = useMemo(() => localImages[d.cover] || d.cover, [localImages, d.cover]);
  const toolbar: [string, () => void][] = [
    ["Bold", () => wrap("**", "**", "bold text")],
    ["Italic", () => wrap("_", "_", "italic text")],
    ["Heading", () => wrap("\n## ", "\n", "Heading")],
    ["Bullet list", () => wrap("\n- ", "\n", "List item")],
    ["Quote", () => wrap("\n> ", "\n", "Quote")],
    ["Link", () => {
      const url = prompt("Link address (https://...)");
      if (url) wrap("[", `](${url})`, "link text");
    }],
    ["Image", () => imageInput.current?.click()],
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <button onClick={onCancel} className="text-sm text-purple-300 hover:text-purple-200">← Back to list</button>
      <h2 className="mt-4 text-2xl font-bold text-white">
        {isNew ? `New ${collection === "blog" ? "blog post" : "case study"}` : "Edit"}
      </h2>
      {!isNew && (
        <p className="mt-1 text-sm text-zinc-400">
          Status: {initial.draft ? "Draft (not on the website)" : "Live"}
          {!initial.draft && (
            <> · <a className="text-purple-300 underline" href={`/${collection}/${initial.slug}/`} target="_blank" rel="noreferrer">View on site</a></>
          )}
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Title" className="sm:col-span-2">
          <input className={input} value={d.title} maxLength={200} onChange={(e) => {
            set("title", e.target.value);
            if (!slugTouched) set("slug", slugify(e.target.value));
          }} />
        </Field>
        <Field label="Summary (shown on cards and in Google)" className="sm:col-span-2">
          <textarea className={input} rows={2} maxLength={400} value={d.description}
            onChange={(e) => set("description", e.target.value)} />
        </Field>
        <Field label={`Web address: purple8.ai/${collection}/…`}>
          <input className={`${input} ${isNew ? "" : "opacity-60"}`} value={d.slug} disabled={!isNew}
            onChange={(e) => {
              setSlugTouched(true);
              set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-").slice(0, 80));
            }}
            onBlur={(e) => set("slug", slugify(e.target.value))} />
        </Field>
        <Field label="Date">
          <input className={input} type="date" value={d.date} onChange={(e) => set("date", e.target.value)} />
        </Field>
        <Field label="Author">
          <input className={input} value={d.author} placeholder="Purple8 Team" onChange={(e) => set("author", e.target.value)} />
        </Field>
        <Field label="Tags (comma separated)">
          <input className={input} value={d.tags} placeholder="announcement, product" onChange={(e) => set("tags", e.target.value)} />
        </Field>
        {collection === "case-studies" && (
          <>
            <Field label="Customer"><input className={input} value={d.customer} onChange={(e) => set("customer", e.target.value)} /></Field>
            <Field label="Industry"><input className={input} value={d.industry} onChange={(e) => set("industry", e.target.value)} /></Field>
            <Field label="Headline result" className="sm:col-span-2">
              <input className={input} value={d.result} onChange={(e) => set("result", e.target.value)} />
            </Field>
          </>
        )}
        <div className="text-sm sm:col-span-2">
          <span className="admin-field-label mb-1 block">Cover image (optional)</span>
          <div className="flex items-center gap-3">
            {d.cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverPreview} alt="" className="h-16 w-28 rounded object-cover" />
            )}
            <button type="button" disabled={busy} onClick={() => coverInput.current?.click()}
              className={`${btn} border border-zinc-700 text-zinc-200 admin-hover-surface`}>
              {d.cover ? "Replace" : "Upload"}
            </button>
            {d.cover && <button type="button" onClick={() => set("cover", "")} className="text-sm text-zinc-400 hover:text-white">Remove</button>}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-800">
        <div className="flex flex-wrap items-center gap-1 border-b border-zinc-800 p-2">
          <button type="button" onClick={() => setTab("write")}
            className={`${btn} py-1 ${tab === "write" ? "admin-selected-surface" : "text-zinc-400"}`}>Write</button>
          <button type="button" onClick={() => setTab("preview")}
            className={`${btn} py-1 ${tab === "preview" ? "admin-selected-surface" : "text-zinc-400"}`}>Preview</button>
          {tab === "write" && (
            <span className="ml-2 flex flex-wrap gap-1 border-l border-zinc-800 pl-2">
              {toolbar.map(([label, fn]) => (
                <button key={label} type="button" onClick={fn} disabled={busy}
                  className="admin-field-label admin-hover-surface rounded px-2 py-1 text-xs">{label}</button>
              ))}
            </span>
          )}
        </div>
        {tab === "write" ? (
          <textarea ref={bodyRef} rows={22} value={d.body} onChange={(e) => set("body", e.target.value)}
            placeholder="Write your article here. Use the buttons above for formatting."
            className="w-full resize-y bg-transparent p-4 font-mono text-sm text-zinc-100 focus:outline-none" />
        ) : (
          <div className="prose-p8 p-6" dangerouslySetInnerHTML={{ __html: preview }} />
        )}
      </div>

      <input ref={imageInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden
        onChange={async (e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (!f) return;
          const path = await upload(f);
          if (path) wrap(`![`, `](${path})`, f.name.replace(/\.[^.]+$/, ""));
        }} />
      <input ref={coverInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden
        onChange={async (e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (!f) return;
          const path = await upload(f);
          if (path) set("cover", path);
        }} />

      {err && <p role="alert" className="mt-4 text-sm text-red-400">{err}</p>}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button disabled={busy} onClick={() => save(false)} className={`${btn} bg-purple-600 text-white hover:bg-purple-500`}>
          {busy ? "Working..." : isNew || initial.draft ? "Publish" : "Update live page"}
        </button>
        <button disabled={busy} onClick={() => save(true)} className={`${btn} border border-zinc-700 text-zinc-200 admin-hover-surface`}>
          {!isNew && !initial.draft ? "Unpublish (move to drafts)" : "Save draft"}
        </button>
        {!isNew && (
          <button disabled={busy} onClick={remove} className={`${btn} ml-auto text-red-400 hover:bg-red-950/40`}>Delete</button>
        )}
      </div>
    </div>
  );
}

function Field({ label, className = "", children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="admin-field-label mb-1 block">{label}</span>
      {children}
    </label>
  );
}
