"use client";

/**
 * /account — self-serve key retrieval (magic-link).
 *
 * The permanent "where are my keys" surface: enter the email your licenses
 * were purchased under → receive a single-use sign-in link → view and copy
 * every license you own. Keys are never sent by email; the link signs you in
 * here instead.
 */
import { useEffect, useRef, useState } from "react";
import { CC_BASE_URL } from "@/lib/cc";
import { ClassicShell } from "@/components/revamp/BrandShell";

interface AccountKey {
  key_id: string;
  product: string;
  tier: string;
  status: string;
  environment_label: string;
  expires_at: string | null;
  license_key: string;
}

const PRODUCT_LABELS: Record<string, string> = {
  graph: "Purple8 AI Engine",
  docintel: "Purple8 DocIntel",
};

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<"start" | "sent" | "resolving" | "keys" | "error">("start");
  const [err, setErr] = useState<string | null>(null);
  const [keys, setKeys] = useState<AccountKey[]>([]);
  const [who, setWho] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const ran = useRef(false);

  // Arriving from the sign-in email: /account/?token=…
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) return;
    window.history.replaceState(null, "", "/account/");
    setPhase("resolving");
    (async () => {
      try {
        const r = await fetch(`${CC_BASE_URL}/public/account/login/resolve`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        if (!r.ok) throw new Error((await r.json())?.detail || "Sign-in link invalid");
        const { session_token, email: addr } = await r.json();
        const kr = await fetch(`${CC_BASE_URL}/public/account/keys`, {
          headers: { Authorization: `Bearer ${session_token}` },
        });
        if (!kr.ok) throw new Error("Could not load your keys");
        const body = await kr.json();
        setWho(addr);
        setKeys(body.keys ?? []);
        setPhase("keys");
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Something went wrong");
        setPhase("error");
      }
    })();
  }, []);

  const requestLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!email.includes("@")) {
      setErr("Enter a valid email address.");
      return;
    }
    try {
      const r = await fetch(`${CC_BASE_URL}/public/account/login/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      if (r.status === 429) throw new Error("Too many requests — try again in a little while.");
      if (!r.ok) throw new Error("Something went wrong. Please try again.");
      setPhase("sent");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    }
  };

  const copy = async (k: AccountKey) => {
    await navigator.clipboard.writeText(k.license_key);
    setCopied(k.key_id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <ClassicShell>
      <section className="mx-auto max-w-2xl px-4 pt-28 pb-24 sm:px-6">
        <h1 className="text-3xl font-bold text-white">Your account</h1>
        <p className="mt-2 text-sm text-white/60">
          View and copy your Purple8 license keys any time. We email you a
          sign-in link — keys themselves are never sent by email.
        </p>

        {phase === "start" && (
          <form onSubmit={requestLink} className="mt-10 space-y-4">
            {err && <p className="text-sm text-red-400">{err}</p>}
            <label htmlFor="email" className="block text-sm font-medium text-white/70">
              Email your licenses were purchased under
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@company.com"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-purple-400 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
            >
              Email me a sign-in link
            </button>
          </form>
        )}

        {phase === "sent" && (
          <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Check your inbox</h2>
            <p className="mt-2 text-sm text-white/60">
              If <span className="text-white">{email}</span> has Purple8 licenses, a
              sign-in link is on its way. It works once and expires in 15 minutes.
            </p>
          </div>
        )}

        {phase === "resolving" && <p className="mt-10 text-sm text-white/60">Signing you in…</p>}

        {phase === "error" && (
          <div className="mt-10 space-y-4">
            <p className="text-sm text-red-400">{err}</p>
            <button
              onClick={() => { setPhase("start"); setErr(null); }}
              className="text-sm font-medium text-purple-300 hover:text-purple-200"
            >
              ← Request a new link
            </button>
          </div>
        )}

        {phase === "keys" && (
          <div className="mt-10 space-y-4">
            <p className="text-sm text-white/60">
              Signed in as <span className="text-white">{who}</span>
            </p>
            {keys.length === 0 && (
              <p className="text-sm text-white/60">No licenses found for this email.</p>
            )}
            {keys.map((k) => (
              <div key={k.key_id} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {PRODUCT_LABELS[k.product] ?? k.product} · {k.tier}
                    </p>
                    <p className="mt-1 text-xs text-white/50">
                      {k.environment_label || "—"} · {k.status}
                      {k.expires_at ? ` · expires ${k.expires_at.slice(0, 10)}` : " · perpetual"}
                    </p>
                  </div>
                  <button
                    onClick={() => copy(k)}
                    className="shrink-0 rounded-lg border border-purple-400/40 px-3 py-2 text-xs font-medium text-purple-200 hover:bg-purple-500/10"
                  >
                    {copied === k.key_id ? "Copied ✓" : "Copy key"}
                  </button>
                </div>
                <code className="mt-3 block max-h-16 overflow-hidden text-ellipsis break-all rounded bg-black/30 px-3 py-2 text-[10px] leading-relaxed text-white/60">
                  {k.license_key || "(key unavailable — contact support)"}
                </code>
              </div>
            ))}
          </div>
        )}
      </section>
    </ClassicShell>
  );
}
