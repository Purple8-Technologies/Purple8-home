"use client";

import Link from "next/link";

const individualFeatures = [
  "Measures real cognitive capacity — deep work hours, focus score, distraction cost — not proxy signals",
  "Runs entirely on your device. No data leaves your machine without explicit opt-in",
  "Menubar presence: live focus score and session timer always visible",
  "Daily and weekly personal reports — clarity, trends, burnout trajectory",
  "Focus session timer with distraction alerts",
  "Wellbeing signals: after-hours detection, consecutive high-load day warnings",
  "Works silently in the background — zero workflow disruption",
  "macOS native · Windows support coming August 2026",
];

const tribeFeatures = [
  "Global baseline — see how your deep work hours compare to the Purple8 Focus community by role",
  "Form a private Tribe of 5–50 peers who opt in together — no employer involved, ever",
  "Week-over-week trend lines for the group — deep work, meeting load, burnout trajectory",
  "Nobody above you can see anything. Tribe members are peers, not managers",
  "Built for freelancers, indie consultants, and remote workers outside employment relationships",
  "k-Anonymity (k=5) — no individual is ever identifiable from tribe aggregates",
  "Rotating pseudonyms — the server cannot link your contributions across weeks",
];

const enterpriseFeatures = [
  "Aggregate org dashboard — deep work capacity, meeting load index, fragmentation score",
  "Burnout Risk Index (0.0–3.0) across the organisation, updated daily",
  "Focus window alignment — find when teams are in cognitive sync",
  "Week-over-week trends with AI-generated intervention recommendations",
  "Multi-team and department-level views for People ops and CHROs",
  "SAML SSO, custom data retention, and SLA",
  "EU AI Act compliant — Limited risk (Article 52) by architecture, not policy",
  "No individual breakdown — structurally impossible, not just policy-restricted",
];

const comparisonRows: {
  label: string;
  vivaInsights: boolean | "partial";
  cultureAmp: boolean | "partial";
  focus: boolean | "partial";
}[] = [
  {
    label: "EU AI Act compliant",
    vivaInsights: false,
    cultureAmp: "partial",
    focus: true,
  },
  {
    label: "Individual data sovereignty",
    vivaInsights: false,
    cultureAmp: false,
    focus: true,
  },
  {
    label: "Measures cognitive capacity directly",
    vivaInsights: "partial",
    cultureAmp: false,
    focus: true,
  },
  {
    label: "Data never leaves employee device",
    vivaInsights: false,
    cultureAmp: false,
    focus: true,
  },
  {
    label: "Employee trusts it first",
    vivaInsights: false,
    cultureAmp: "partial",
    focus: true,
  },
  {
    label: "No employer surveillance risk",
    vivaInsights: false,
    cultureAmp: "partial",
    focus: true,
  },
];

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Cell({ value }: { value: boolean | "partial" }) {
  if (value === true)
    return (
      <span className="flex justify-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600/20">
          <CheckIcon className="h-3.5 w-3.5 text-purple-400" />
        </span>
      </span>
    );
  if (value === "partial")
    return <span className="block text-center text-xs text-zinc-400">Partial</span>;
  return (
    <span className="flex justify-center">
      <span className="block h-1.5 w-4 rounded-full bg-zinc-700" />
    </span>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-600/20 text-purple-400">
            <CheckIcon className="h-3 w-3" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-0.5 text-xs font-medium text-purple-300">
      {label}
    </span>
  );
}

export default function FocusAgent() {
  return (
    <div className="bg-[#0a0a0f]">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(109,40,217,0.18),transparent)]" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-4">
            Purple8 Focus
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your cognitive capacity,{" "}
            <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              finally visible.
            </span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
            Purple8 Focus runs quietly on your device, measures real deep-work
            capacity — not proxy signals — and gives you a honest daily picture
            of where your cognitive energy actually went. Your data. Your machine.
            Nobody else&apos;s.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register?product=focus"
              className="rounded-lg bg-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 hover:bg-purple-500 transition-colors"
            >
              Get started — $5 / month
            </Link>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              See how it works ↓
            </a>
          </div>
          <p className="mt-4 text-xs text-zinc-400">
            macOS available now · Windows coming August 2026 · No card required for 14-day trial
          </p>
        </div>
      </section>

      {/* ── The problem ───────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-3">
                The problem
              </p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                You feel busy all day and productive for two hours.
              </h2>
              <p className="mt-4 text-zinc-400">
                Every productivity tool measures <em>output</em> — tickets closed,
                commits pushed, meetings attended. None of them tell you whether you
                had the cognitive conditions to do your best work. You only find out
                you were running on empty when you burn out.
              </p>
              <p className="mt-4 text-zinc-400">
                Purple8 Focus measures the thing that actually determines output:
                your available cognitive capacity, hour by hour. Not what you
                produced — what you were capable of producing.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/3 p-8 space-y-5">
              {[
                { label: "Deep work", value: "2.4 h", sub: "of 8h active — 70% spent on shallow tasks", color: "text-teal-400" },
                { label: "Focus score", value: "61 / 100", sub: "dropped from 74 last Tuesday", color: "text-purple-400" },
                { label: "Distraction cost", value: "47 min", sub: "lost to context switches today", color: "text-amber-400" },
                { label: "Burnout signal", value: "WATCH", sub: "3rd consecutive high-load day", color: "text-red-400" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wide">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <p className="text-xs text-zinc-400 text-right max-w-[180px]">{stat.sub}</p>
                </div>
              ))}
              <p className="pt-2 text-xs text-zinc-400 border-t border-white/5">
                All computed on-device · nothing transmitted without your consent
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-3">
              How it works
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Installs in 60 seconds. Runs invisibly.
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Install the agent", body: "One installer. No admin rights needed. Adds a menubar icon — that's it." },
              { step: "02", title: "It watches, not you", body: "Tracks app focus, keystroke rhythm, and context switches. No content, no screenshots, no keylogging." },
              { step: "03", title: "Signals stay on your device", body: "All computation is local. Your data lives in ~/.purple8/. Nothing leaves without an explicit opt-in from you." },
              { step: "04", title: "You get honest daily reports", body: "Focus score, deep work hours, distraction cost, and a burnout trajectory. One terminal command or menubar tap away." },
            ].map((s) => (
              <div key={s.step} className="rounded-xl border border-white/8 bg-white/3 p-6">
                <p className="text-3xl font-bold text-purple-500/40 mb-3">{s.step}</p>
                <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Individual + Team features ────────────────────────────────── */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-3">
              Three layers
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Personal clarity. Your tribe. Your organisation.
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
              Start with your own data. Join a Tribe of peers by choice.
              Or deploy across your whole organisation — your data stays yours at every level.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">

            {/* Individual */}
            <div className="rounded-2xl border border-purple-500/20 bg-white/3 p-8">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge label="Individual" />
                <Badge label="$5 / seat / month" />
              </div>
              <h3 className="text-xl font-bold text-white mt-4">
                Your personal focus intelligence
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Everything runs on your machine. You own the data. The agent gives
                you the honest picture your calendar can&apos;t.
              </p>
              <FeatureList items={individualFeatures} />
              <div className="mt-8">
                <Link
                  href="/register?product=focus"
                  className="inline-block rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
                >
                  Get started — $5 / month
                </Link>
              </div>
            </div>

            {/* Tribe */}
            <div className="rounded-2xl border border-teal-500/20 bg-white/3 p-8">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge label="Tribe" />
                <Badge label="$8 / seat / month" />
              </div>
              <h3 className="text-xl font-bold text-white mt-4">
                Your people, by choice
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                For freelancers, remote workers, and indie teams. Form a private peer group,
                compare against the global baseline, and see aggregate insights — no employer
                ever involved.
              </p>
              <FeatureList items={tribeFeatures} />
              <div className="mt-8">
                <Link
                  href="/register?product=focus-tribe"
                  className="inline-block rounded-lg border border-teal-500/40 bg-teal-500/10 px-6 py-3 text-sm font-semibold text-teal-300 hover:bg-teal-500/20 transition-colors"
                >
                  Join the waitlist →
                </Link>
              </div>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl border border-zinc-500/20 bg-white/3 p-8">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge label="Enterprise" />
                <Badge label="Custom pricing" />
              </div>
              <h3 className="text-xl font-bold text-white mt-4">
                Org-wide cognitive dashboard
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                For People ops, CHROs, and engineering leaders. Aggregate insights
                across the organisation — no individual is ever identifiable, structurally.
              </p>
              <FeatureList items={enterpriseFeatures} />
              <div className="mt-8">
                <a
                  href="mailto:hello@purple8.ai?subject=Purple8 Focus Enterprise"
                  className="inline-block rounded-lg border border-zinc-500/40 bg-zinc-500/10 px-6 py-3 text-sm font-semibold text-zinc-300 hover:bg-zinc-500/20 transition-colors"
                >
                  Talk to us →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Comparison ────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-3">
              vs. the alternatives
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              The only one employees actually trust.
            </h2>
            <p className="mt-4 text-zinc-400">
              Microsoft Viva Insights and Humanyze put the employer in control of
              employee data. Under the EU AI Act (enforced August 2026), that&apos;s
              a high-risk classification. Purple8 Focus is limited-risk by architecture.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  <th className="px-4 py-3 text-left text-zinc-400 font-medium">Capability</th>
                  <th className="px-4 py-3 text-center text-zinc-400 font-medium">Viva Insights</th>
                  <th className="px-4 py-3 text-center text-zinc-400 font-medium">Culture Amp</th>
                  <th className="px-4 py-3 text-center text-purple-300 font-semibold">Purple8 Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3 text-zinc-300">{row.label}</td>
                    <td className="px-4 py-3"><Cell value={row.vivaInsights} /></td>
                    <td className="px-4 py-3"><Cell value={row.cultureAmp} /></td>
                    <td className="px-4 py-3 bg-purple-600/5"><Cell value={row.focus} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Privacy guarantees ────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-3">
              Privacy by architecture
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Not a policy. A structural guarantee.
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
              The server is mathematically incapable of identifying individuals — not
              because of a privacy policy, but because the cryptographic design makes
              it impossible.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "k-Anonymity (k=5)", body: "The team dashboard only activates when 5+ people contribute. Any aggregate derived from fewer than 5 is refused by the server." },
              { title: "Rotating pseudonyms", body: "Your contributor ID is an HMAC that changes every Monday. The server cannot link your contributions across weeks." },
              { title: "Local differential privacy", body: "Laplace noise (ε=1.5) is added to your focus peak on-device before any transmission. Individual scores cannot be recovered." },
              { title: "No IP storage", body: "The server strips your IP address before any handler runs. It is never logged or stored." },
              { title: "Raw data purged in 8 days", body: "Individual contribution logs are deleted after one pseudonym rotation cycle. Only aggregate team data persists." },
              { title: "Right to erasure", body: "Run one command to tombstone your data. The server removes all your records and recomputes affected aggregates immediately." },
            ].map((g) => (
              <div key={g.title} className="rounded-xl border border-white/8 bg-white/3 p-6">
                <h3 className="font-semibold text-white mb-2">{g.title}</h3>
                <p className="text-sm text-zinc-400">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Know where your best work actually goes.
          </h2>
          <p className="mt-4 text-zinc-400">
            $5 a month. Runs on your machine. Your data stays yours.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register?product=focus"
              className="rounded-lg bg-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 hover:bg-purple-500 transition-colors"
            >
              Get started — $5 / month
            </Link>
            <a
              href="mailto:hello@purple8.ai?subject=Purple8 Focus — team access"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Talk to us about team access →
            </a>
          </div>
          <p className="mt-4 text-xs text-zinc-400">
            14-day trial · No credit card required to start · macOS now · Windows August 2026
          </p>
        </div>
      </section>

    </div>
  );
}
