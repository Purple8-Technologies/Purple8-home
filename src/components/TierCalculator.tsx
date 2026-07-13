"use client";

/**
 * TierCalculator — "What are you building?"
 *
 * Users don't think in nodes/edges. They think "I'm building a loan system for
 * 50,000 customers." This widget translates use-case + total users (NOT
 * concurrency — people always under-count it) into a recommended tier.
 *
 * Strategy: every path still starts free (Developer). The recommendation just
 * orients them to the right paid tier for when they outgrow it.
 */

import { useMemo, useState } from "react";
import {
  USE_CASES,
  recommendTier,
  priceLabel,
  formatCount,
} from "@/lib/pricing";

// Log-scale slider: 100 → 10,000,000 total users.
const USERS_MIN = 100;
const USERS_MAX = 10_000_000;
const LOG_MIN = Math.log10(USERS_MIN);
const LOG_MAX = Math.log10(USERS_MAX);

/** Snap a raw number to a clean 1 / 2 / 5 × 10ⁿ value. */
function niceRound(raw: number): number {
  if (raw <= USERS_MIN) return USERS_MIN;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const lead = raw / mag;
  const snapped = lead < 1.5 ? 1 : lead < 3.5 ? 2 : lead < 7.5 ? 5 : 10;
  return Math.min(USERS_MAX, snapped * mag);
}

const usersToPos = (u: number): number =>
  Math.max(0, Math.min(100, ((Math.log10(u) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100));

const posToUsers = (pos: number): number =>
  Math.pow(10, LOG_MIN + (pos / 100) * (LOG_MAX - LOG_MIN));

const PRESETS = [1_000, 10_000, 100_000, 1_000_000];

function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-start gap-3 rounded-xl border border-zinc-800 bg-[#0a0a0f] p-4 text-left transition-colors hover:border-purple-800/60"
    >
      <span
        className={`mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
          checked ? "bg-purple-600" : "bg-zinc-700"
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </span>
      <span>
        <span className="block text-sm font-medium text-white">{label}</span>
        <span className="mt-0.5 block text-xs text-zinc-500">{hint}</span>
      </span>
    </button>
  );
}

export default function TierCalculator() {
  const [useCaseId, setUseCaseId] = useState(USE_CASES[0].id);
  const [pos, setPos] = useState(usersToPos(10_000));
  const [needsGovernance, setNeedsGovernance] = useState(false);
  const [needsHA, setNeedsHA] = useState(false);

  const useCase = USE_CASES.find((u) => u.id === useCaseId) ?? USE_CASES[0];
  const totalUsers = niceRound(posToUsers(pos));

  // Selecting a use case sets governance to its domain default, so the
  // recommendation always reflects the *current* selection. (Regulated domains
  // like lending pre-check governance; switching to a non-regulated domain
  // clears it — otherwise the toggle would stay stuck ON and keep forcing Pro.)
  function chooseUseCase(id: string) {
    setUseCaseId(id);
    const uc = USE_CASES.find((u) => u.id === id);
    setNeedsGovernance(!!uc?.typicallyRegulated);
  }

  const result = useMemo(
    () =>
      recommendTier({
        useCaseId,
        totalUsers,
        needsGovernance,
        needsHighAvailability: needsHA,
      }),
    [useCaseId, totalUsers, needsGovernance, needsHA],
  );

  const price = priceLabel(result.tier, "monthly");
  const usersDisplay =
    totalUsers >= USERS_MAX ? "10M+" : totalUsers.toLocaleString();

  return (
    <section id="calculator" className="bg-[#0a0a0f] py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            Find your tier in 10 seconds
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            What are you building?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-500">
            No node counting, no capacity math. Tell us the app and how many
            people it serves — we&apos;ll point you to the right tier. You still
            start free either way.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ── Inputs ── */}
          <div className="rounded-3xl border border-purple-900/40 bg-[#11111b] p-6 sm:p-8">
            {/* Step 1 — use case */}
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              1 · I&apos;m building a…
            </label>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-2">
              {USE_CASES.map((uc) => (
                <button
                  key={uc.id}
                  type="button"
                  onClick={() => chooseUseCase(uc.id)}
                  className={`rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${
                    uc.id === useCaseId
                      ? "border-purple-600/70 bg-purple-600/15 text-white"
                      : "border-zinc-800 bg-[#0a0a0f] text-zinc-400 hover:border-purple-800/60 hover:text-zinc-200"
                  }`}
                >
                  {uc.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-600">{useCase.blurb}</p>

            {/* Step 2 — total users */}
            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  2 · Total {useCase.userNoun} to support
                </label>
                <span className="text-lg font-bold tabular-nums text-purple-300">
                  {usersDisplay}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={0.5}
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                aria-label={`Total ${useCase.userNoun} to support`}
                className="mt-3 w-full accent-purple-600"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPos(usersToPos(p))}
                    className="rounded-full border border-zinc-800 px-2.5 py-0.5 text-xs text-zinc-500 transition-colors hover:border-purple-700 hover:text-purple-300"
                  >
                    {formatCount(p)}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-zinc-600">
                Total people over the app&apos;s life — not concurrent users.
                (500 concurrent usually means millions of total customers.)
              </p>
            </div>

            {/* Step 3 — overrides */}
            <div className="mt-8 space-y-2.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                3 · Anything special?
              </label>
              <Toggle
                checked={needsGovernance}
                onChange={setNeedsGovernance}
                label="SSO, audit logs, or regulated data"
                hint="Finance, healthcare, government — enterprise compliance controls."
              />
              <Toggle
                checked={needsHA}
                onChange={setNeedsHA}
                label="Mission-critical, always-on"
                hint="High availability, automatic failover, zero-downtime uptime."
              />
            </div>
          </div>

          {/* ── Result ── */}
          <div className="flex flex-col rounded-3xl border border-purple-600/40 bg-gradient-to-b from-purple-900/25 to-[#11111b] p-6 sm:p-8">
            <p className="text-xs font-medium leading-relaxed text-zinc-400">
              A <span className="text-white">{useCase.label.toLowerCase()}</span>{" "}
              for <span className="text-white">{usersDisplay}</span>{" "}
              {useCase.userNoun} — we recommend:
            </p>

            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white">
                  {result.tier.name}
                </span>
                {result.tier.badge && (
                  <span className="rounded-full bg-purple-600/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-purple-300">
                    {result.tier.badge}
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-purple-300">
                  {price.amount}
                </span>
                {price.suffix && (
                  <span className="text-sm text-zinc-500">{price.suffix}</span>
                )}
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              {result.reason}
            </p>

            <p className="mt-2 text-xs text-zinc-600">
              ≈ {formatCount(result.estimatedNodes)} graph objects ·{" "}
              {result.tier.nodesLabel} capacity
            </p>

            {/* CTAs — everyone starts free */}
            <div className="mt-auto space-y-3 pt-6">
              <a
                href="/beta?plan=developer"
                className="block rounded-full bg-purple-600 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-purple-500"
              >
                Start free with Developer →
              </a>
              {result.tier.id === "enterprise" ? (
                <a
                  href="mailto:sales@purple8.ai?subject=Enterprise%20inquiry"
                  className="block rounded-full border border-zinc-700 px-5 py-3 text-center text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
                >
                  Talk to sales about Enterprise
                </a>
              ) : (
                <a
                  href="#pricing"
                  className="block rounded-full border border-purple-800/60 px-5 py-3 text-center text-sm font-semibold text-purple-300 transition-colors hover:border-purple-600 hover:text-white"
                >
                  See {result.tier.name} in pricing →
                </a>
              )}
              <p className="text-center text-xs text-zinc-600">
                Upgrade only when you outgrow the free tier. No card to start.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
