"use client";

import { useState } from "react";
import { CC_BASE_URL } from "@/lib/cc";

type Category = "bug" | "installation" | "question" | "feature_request" | "documentation" | "security" | "billing" | "other";
type Product   = "hyper_graph" | "docintel" | "general";
type Status    = "idle" | "loading" | "success" | "error";

interface FormData {
  email:    string;
  name:     string;
  subject:  string;
  body:     string;
  category: Category;
  product:  Product;
  version:  string;
}

const CC_BASE = CC_BASE_URL;

// Screenshot limits — must mirror the server (public.py) validation.
const MAX_ATTACHMENTS = 3;
const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024; // 4 MB
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp"];

interface Attachment {
  filename: string;
  content_type: string;
  data_b64: string; // full data: URL — server strips the prefix
  previewUrl: string;
  sizeBytes: number;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: "bug",             label: "Bug report",         emoji: "🐛" },
  { value: "installation",    label: "Installation / setup",emoji: "⚙️" },
  { value: "question",        label: "Question",           emoji: "❓" },
  { value: "feature_request", label: "Feature request",    emoji: "💡" },
  { value: "documentation",   label: "Documentation",      emoji: "📖" },
  { value: "security",        label: "Security",           emoji: "🔒" },
  { value: "billing",         label: "Billing / account",  emoji: "💳" },
  { value: "other",           label: "Other",              emoji: "📋" },
];

const PRODUCTS: { value: Product; label: string }[] = [
  { value: "hyper_graph", label: "Purple8 Hyper Graph" },
  { value: "docintel",    label: "Purple8 DocIntel"    },
  { value: "general",     label: "General / other"     },
];

export default function SupportTicket() {
  const [form, setForm] = useState<FormData>({
    email:    "",
    name:     "",
    subject:  "",
    body:     "",
    category: "question",
    product:  "hyper_graph",
    version:  "",
  });
  const [status,   setStatus]   = useState<Status>("idle");
  const [ticketId, setTicketId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setErrorMsg("");
    const next: Attachment[] = [...attachments];
    for (const file of Array.from(files)) {
      if (next.length >= MAX_ATTACHMENTS) {
        setErrorMsg(`You can attach up to ${MAX_ATTACHMENTS} screenshots.`);
        break;
      }
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        setErrorMsg("Only PNG, JPEG, GIF or WEBP images are allowed.");
        continue;
      }
      if (file.size > MAX_ATTACHMENT_BYTES) {
        setErrorMsg(`"${file.name}" is too large (max 4 MB).`);
        continue;
      }
      try {
        const dataUrl = await readFileAsDataUrl(file);
        next.push({
          filename: file.name,
          content_type: file.type,
          data_b64: dataUrl,
          previewUrl: dataUrl,
          sizeBytes: file.size,
        });
      } catch {
        setErrorMsg(`Could not read "${file.name}".`);
      }
    }
    setAttachments(next);
  }

  function removeAttachment(idx: number) {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const payload = {
      email:    form.email.trim(),
      name:     form.name.trim(),
      subject:  form.subject.trim(),
      body:     form.body.trim(),
      category: form.category,
      product:  form.product,
      version:  form.version.trim(),
      attachments: attachments.map((a) => ({
        filename:     a.filename,
        content_type: a.content_type,
        data_b64:     a.data_b64,
      })),
    };

    if (!CC_BASE) {
      // Should never happen — CC_BASE_URL always resolves to a live CC URL.
      // Surface a real error rather than silently faking a submission.
      setStatus("error");
      setErrorMsg("Support is temporarily unavailable. Please email support@purple8.ai.");
      return;
    }

    try {
      const res = await fetch(`${CC_BASE}/public/ticket`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail ?? `${res.status}`);
      setTicketId(data.ticket_id ?? "");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong — please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-purple-900/40 bg-[#0d0d17] p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-900/40">
          <svg className="h-7 w-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Report received</h3>
        {ticketId && (
          <p className="font-mono text-sm text-purple-400 mb-3">{ticketId}</p>
        )}
        <p className="text-sm text-slate-400">
          We&apos;ve sent a confirmation to <strong className="text-slate-300">{form.email}</strong>.
          {" "}Our agent is already looking into it — you&apos;ll hear back soon.
        </p>
        <button
          onClick={() => { setStatus("idle"); setTicketId(""); setAttachments([]); }}
          className="mt-6 text-xs text-purple-400 hover:text-purple-300 underline underline-offset-2"
        >
          Submit another report
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Category pills */}
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-3 uppercase tracking-widest">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => update("category", c.value)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium
                transition-colors border
                ${form.category === c.value
                  ? "border-purple-500 bg-purple-900/40 text-purple-300"
                  : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500"
                }`}
            >
              <span>{c.emoji}</span> {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product + version row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-widest">
            Product
          </label>
          <select
            value={form.product}
            onChange={(e) => update("product", e.target.value as Product)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5
                       text-sm text-slate-200 focus:border-purple-500 focus:outline-none focus:ring-1
                       focus:ring-purple-500"
          >
            {PRODUCTS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-widest">
            Version <span className="normal-case text-slate-600">(optional)</span>
          </label>
          <input
            type="text"
            value={form.version}
            onChange={(e) => update("version", e.target.value)}
            placeholder="e.g. 0.50.1"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5
                       text-sm text-slate-200 placeholder-slate-600
                       focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-widest">
          Subject
        </label>
        <input
          type="text"
          required
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          placeholder="Brief description of the issue"
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5
                     text-sm text-slate-200 placeholder-slate-600
                     focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
      </div>

      {/* Body */}
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-widest">
          Description
        </label>
        <textarea
          required
          rows={6}
          value={form.body}
          onChange={(e) => update("body", e.target.value)}
          placeholder={"What happened?\nWhat did you expect?\nSteps to reproduce (for bugs):"}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5
                     text-sm text-slate-200 placeholder-slate-600 resize-y
                     focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
      </div>

      {/* Screenshots */}
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-widest">
          Screenshots <span className="normal-case text-slate-600">(optional — up to {MAX_ATTACHMENTS}, PNG/JPEG/GIF/WEBP, 4 MB each)</span>
        </label>
        {attachments.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-3">
            {attachments.map((a, i) => (
              <div key={i} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.previewUrl}
                  alt={a.filename}
                  className="h-20 w-20 rounded-lg border border-slate-700 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeAttachment(i)}
                  aria-label={`Remove ${a.filename}`}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center
                             rounded-full bg-red-600 text-xs text-white opacity-90
                             hover:bg-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        {attachments.length < MAX_ATTACHMENTS && (
          <label
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border
                       border-dashed border-slate-700 bg-slate-900 px-3 py-4 text-sm text-slate-400
                       hover:border-purple-500 hover:text-slate-300 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Attach a screenshot
            <input
              type="file"
              accept="image/png,image/jpeg,image/gif,image/webp"
              multiple
              className="hidden"
              onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
            />
          </label>
        )}
      </div>

      {/* Name + Email row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-widest">
            Your name <span className="normal-case text-slate-600">(optional)</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Alex"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5
                       text-sm text-slate-200 placeholder-slate-600
                       focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-widest">
            Email
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5
                       text-sm text-slate-200 placeholder-slate-600
                       focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Error */}
      {status === "error" && (
        <p className="rounded-lg border border-red-800 bg-red-900/20 px-4 py-3 text-sm text-red-400">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white
                   transition-colors hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Submitting…" : "Submit report"}
      </button>

      <p className="text-center text-xs text-slate-600">
        All tickets are reviewed by the Purple8 team.
      </p>
    </form>
  );
}
