"use client";

import { useState } from "react";

type Category = "bug" | "question" | "feature_request" | "security" | "billing" | "other";
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

const CC_BASE_URL = process.env.NEXT_PUBLIC_CC_BASE_URL ?? "";

const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: "bug",             label: "Bug report",       emoji: "🐛" },
  { value: "question",        label: "Question",         emoji: "❓" },
  { value: "feature_request", label: "Feature request",  emoji: "💡" },
  { value: "security",        label: "Security",         emoji: "🔒" },
  { value: "billing",         label: "Billing / account",emoji: "💳" },
  { value: "other",           label: "Other",            emoji: "📋" },
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

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
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
    };

    if (!CC_BASE_URL) {
      // Dev placeholder — simulate success
      await new Promise((r) => setTimeout(r, 800));
      setTicketId("TKT-DEV001");
      setStatus("success");
      return;
    }

    try {
      const res = await fetch(`${CC_BASE_URL}/public/ticket`, {
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
          onClick={() => { setStatus("idle"); setTicketId(""); }}
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
        Billing or account questions always go to a human — never automated.
      </p>
    </form>
  );
}
