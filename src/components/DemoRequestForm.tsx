"use client";

import { useState } from "react";
import { CC_BASE_URL } from "@/lib/cc";

type State = "idle" | "submitting" | "success" | "error";

const USE_CASES = [
  "AI application backend",
  "Document intelligence / RAG pipeline",
  "Enterprise knowledge graph",
  "Security operations (SOC)",
  "AEC / BIM workloads",
  "Multi-tenant SaaS platform",
  "Other",
];

export default function DemoRequestForm() {
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    useCase: "",
    message: "",
  });

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.company.trim()) return;

    setState("submitting");
    setErrorMsg("");

    const subject = `Demo request — ${form.company} (${form.useCase || "General"})`;
    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Use case: ${form.useCase || "Not specified"}`,
      form.message ? `\nMessage:\n${form.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      // 1. Create a ticket so the ops agent surfaces it to sales immediately
      const ticketRes = await fetch(`${CC_BASE_URL}/public/ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          name: form.name.trim(),
          subject,
          body,
          category: "other",
          product: "hyper_graph",
          version: "",
          source: "architecture-demo-request",
          attachments: [],
        }),
      });

      // 2. Register as a lead (upsert — idempotent, won't duplicate)
      await fetch(`${CC_BASE_URL}/public/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          name: form.name.trim(),
          company: form.company.trim(),
          intent: "waitlist",
          use_type: "professional",
          source: "architecture-demo-request",
        }),
      });

      if (!ticketRes.ok) {
        const err = await ticketRes.json().catch(() => ({}));
        throw new Error((err as { detail?: string }).detail ?? "Submission failed.");
      }

      setState("success");
    } catch (err) {
      setState("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-purple-700/40 bg-purple-950/20 px-8 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-600/20">
          <svg className="h-7 w-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Request received</h3>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
          Thank you, {form.name.split(" ")[0]}. Someone from the Purple8 team will be in
          touch at <span className="text-purple-300">{form.email}</span> within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name + Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-zinc-400" htmlFor="demo-name">
            Full name <span className="text-purple-400">*</span>
          </label>
          <input
            id="demo-name"
            type="text"
            required
            placeholder="Alex Johnson"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-purple-600 focus:ring-1 focus:ring-purple-600/40"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-zinc-400" htmlFor="demo-email">
            Work email <span className="text-purple-400">*</span>
          </label>
          <input
            id="demo-email"
            type="email"
            required
            placeholder="alex@company.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-purple-600 focus:ring-1 focus:ring-purple-600/40"
          />
        </div>
      </div>

      {/* Company + Use case */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-zinc-400" htmlFor="demo-company">
            Company <span className="text-purple-400">*</span>
          </label>
          <input
            id="demo-company"
            type="text"
            required
            placeholder="Acme Corp"
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-purple-600 focus:ring-1 focus:ring-purple-600/40"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-zinc-400" htmlFor="demo-usecase">
            Primary use case
          </label>
          <select
            id="demo-usecase"
            value={form.useCase}
            onChange={(e) => set("useCase", e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-white outline-none transition focus:border-purple-600 focus:ring-1 focus:ring-purple-600/40"
          >
            <option value="">Select one…</option>
            {USE_CASES.map((uc) => (
              <option key={uc} value={uc}>{uc}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-zinc-400" htmlFor="demo-message">
          Anything specific you would like to cover? <span className="text-zinc-600">(optional)</span>
        </label>
        <textarea
          id="demo-message"
          rows={3}
          placeholder="Describe your current stack, team size, data scale, or any specific questions…"
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-purple-600 focus:ring-1 focus:ring-purple-600/40"
        />
      </div>

      {/* Error */}
      {state === "error" && errorMsg && (
        <p className="rounded-xl border border-red-900/40 bg-red-950/20 px-4 py-2.5 text-xs text-red-400">
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="rounded-full bg-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "submitting" ? "Sending…" : "Request a demo"}
        </button>
        <p className="text-xs text-zinc-600">
          No commitment. Typically responds within one business day.
        </p>
      </div>
    </form>
  );
}
