"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CC_BASE_URL } from "@/lib/cc";

// ─── Types ───────────────────────────────────────────────────────────────────
type BetaState = "unknown" | "pending" | "invited" | "approved";

interface BetaStatusResponse {
  found: boolean;
  state: BetaState;
  approved: boolean;
  invited: boolean;
  agreements_required: boolean;
  agreements_accepted: boolean;
  agreement_version: string;
  download_enabled: boolean;
  beta_image: string;
  quickstart_url: string;
  beta_agreement_url: string;
  email: string;
}

const SOFTWARE_USAGE_URL = "/legal/eula";
const BETA_AGREEMENT_URL = "/legal/beta-agreement";
const BETA_IMAGE = "ghcr.io/purple8-technologies/purple8-graph:beta";
const QUICKSTART_URL =
  "https://github.com/Purple8-Technologies/Purple8-home/blob/main/BETA_QUICKSTART.md";

// ─── Registration mode (Developer CTA → ?plan=developer) ─────────────────────

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [useType, setUseType] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setErr("Enter a valid work email.");
      return;
    }
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`${CC_BASE_URL}/public/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          company: company.trim(),
          use_type: useType,
          intent: "beta",
          source: "purple8.ai/pricing/developer",
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Registration failed (${res.status})`);
      }
      setSubmitted(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#0a0a0f] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl border border-purple-900/40 bg-[#11111b] p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-400">Purple8 Developer</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">You're on the list 🎉</h1>
          <p className="mt-3 text-sm text-zinc-400">
            We received your request for <span className="text-white font-medium">{email}</span>.
            You'll receive an email with your beta invite link and Docker instructions shortly.
          </p>

          <div className="mt-8 rounded-2xl border border-purple-800/40 bg-purple-950/20 p-5">
            <p className="text-xs uppercase tracking-wider text-purple-300">What happens next</p>
            <ol className="mt-4 space-y-3 text-sm text-zinc-400 list-none">
              <li className="flex gap-3"><span className="text-purple-400 font-bold">1.</span> We review your request (usually within a few hours)</li>
              <li className="flex gap-3"><span className="text-purple-400 font-bold">2.</span> You get an email with a personal invite link</li>
              <li className="flex gap-3"><span className="text-purple-400 font-bold">3.</span> Click the link, accept the agreements, and get the Docker pull command + license</li>
            </ol>
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-800 bg-[#0c0c14] p-5">
            <p className="text-xs uppercase tracking-wider text-zinc-500">Beta image (preview)</p>
            <p className="mt-2 font-mono text-xs text-zinc-300 break-all">{`docker pull ${BETA_IMAGE}`}</p>
            <p className="mt-2 text-xs text-zinc-600">Your license key will arrive in your invite email.</p>
          </div>

          <a
            href={QUICKSTART_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-full border border-purple-700/60 px-4 py-2 text-sm font-semibold text-purple-300 hover:border-purple-500 hover:text-white transition-colors"
          >
            Preview the quickstart →
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-3xl border border-purple-900/40 bg-[#11111b] p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-400">Purple8 Developer — Free</p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Get the beta Docker image</h1>
        <p className="mt-3 text-sm text-zinc-400">
          Full engine, all 49 MCP tools, all RAG pipelines. No credit card, no expiry.
          Tell us a bit about yourself and we'll send you your invite link and license.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">Full name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full rounded-xl border border-purple-900/50 bg-[#09090f] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">Work email <span className="text-red-400">*</span></span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-purple-900/50 bg-[#09090f] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">Company / project</span>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Inc (or personal project)"
              className="w-full rounded-xl border border-purple-900/50 bg-[#09090f] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500">How will you use Purple8?</span>
            <select
              value={useType}
              onChange={(e) => setUseType(e.target.value)}
              className="w-full rounded-xl border border-purple-900/50 bg-[#09090f] px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
            >
              <option value="professional">Professional / work project</option>
              <option value="personal">Personal project</option>
              <option value="research">Research / academia</option>
              <option value="evaluation">Evaluating for a team</option>
            </select>
          </label>

          {err && (
            <p className="rounded-xl border border-red-900/60 bg-red-950/30 px-4 py-3 text-sm text-red-300">{err}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Request free beta access →"}
          </button>

          <p className="text-center text-xs text-zinc-600">
            Already have an invite?{" "}
            <a href="/beta" className="text-purple-400 hover:text-purple-300">Activate it here →</a>
          </p>
        </form>
      </div>
    </main>
  );
}

// ─── Activation mode (invite link → ?invite=token or ?email=xxx) ──────────────

function ActivationForm() {
  const params = useSearchParams();
  const inviteToken = (params.get("invite") || "").trim();
  const initialEmail = (params.get("email") || "").trim().toLowerCase();

  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<BetaStatusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [err, setErr] = useState("");
  const [okMsg, setOkMsg] = useState("");

  const [acceptedBetaAgreement, setAcceptedBetaAgreement] = useState(false);
  const [acceptedSoftwareUsage, setAcceptedSoftwareUsage] = useState(false);

  const dockerPull = useMemo(() => {
    const image = status?.beta_image || BETA_IMAGE;
    return `docker pull ${image}`;
  }, [status?.beta_image]);

  const canLookup = Boolean(inviteToken || email.trim());

  async function lookupStatus() {
    if (!canLookup) {
      setErr("Enter your work email or use your invite link.");
      return;
    }
    setLoading(true);
    setErr("");
    setOkMsg("");
    try {
      const q = new URLSearchParams();
      if (inviteToken) q.set("invite_token", inviteToken);
      if (email.trim()) q.set("email", email.trim().toLowerCase());
      const res = await fetch(`${CC_BASE_URL}/public/beta/status?${q.toString()}`);
      if (!res.ok) throw new Error(await res.text() || `Status check failed (${res.status})`);
      const data = (await res.json()) as BetaStatusResponse;
      setStatus(data);
      if (data.email) setEmail(data.email);
      if (data.agreements_accepted) {
        setAcceptedBetaAgreement(true);
        setAcceptedSoftwareUsage(true);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Unable to check beta status right now.");
    } finally {
      setLoading(false);
    }
  }

  async function acceptAgreements() {
    if (!acceptedBetaAgreement || !acceptedSoftwareUsage) {
      setErr("Please accept both agreements to continue.");
      return;
    }
    if (!status) return;
    setAccepting(true);
    setErr("");
    setOkMsg("");
    try {
      const res = await fetch(`${CC_BASE_URL}/public/beta/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          invite_token: inviteToken,
          accepted_beta_agreement: true,
          accepted_software_usage_agreement: true,
          source: "purple8.ai/beta",
        }),
      });
      if (!res.ok) throw new Error(await res.text() || `Agreement submit failed (${res.status})`);
      setOkMsg("Agreement accepted. Your beta access has been unlocked.");
      await lookupStatus();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not save agreement acceptance.");
    } finally {
      setAccepting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-purple-900/40 bg-[#11111b] p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-400">Purple8 Beta Access</p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Activate and Download Beta</h1>
        <p className="mt-3 text-sm text-zinc-400">
          Enter your approved work email or open this page from your invite link.
          Once agreements are accepted, your Docker access path is unlocked.
        </p>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-[#0c0c14] p-5">
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">Work email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-xl border border-purple-900/50 bg-[#09090f] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
          />
          {inviteToken && (
            <p className="mt-2 text-xs text-zinc-500">Invite token detected — email optional.</p>
          )}
          <button
            onClick={lookupStatus}
            disabled={loading}
            className="mt-4 rounded-full bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:opacity-60"
          >
            {loading ? "Checking…" : "Check my beta status"}
          </button>
          <p className="mt-3 text-xs text-zinc-600">
            New here?{" "}
            <a href="/beta?plan=developer" className="text-purple-400 hover:text-purple-300">Request Developer access →</a>
          </p>
        </div>

        {err && <p className="mt-5 rounded-xl border border-red-900/60 bg-red-950/30 px-4 py-3 text-sm text-red-300">{err}</p>}
        {okMsg && <p className="mt-5 rounded-xl border border-green-900/60 bg-green-950/30 px-4 py-3 text-sm text-green-300">{okMsg}</p>}

        {status && (
          <section className="mt-8 space-y-5">
            <div className="rounded-2xl border border-zinc-800 bg-[#0c0c14] p-5">
              <p className="text-xs uppercase tracking-wider text-zinc-500">Current status</p>
              <p className="mt-2 text-lg font-semibold text-white capitalize">{status.state}</p>
              {status.state === "pending" && (
                <p className="mt-2 text-sm text-zinc-400">Received — we'll notify you when your invite is ready.</p>
              )}
              {status.state === "unknown" && (
                <p className="mt-2 text-sm text-zinc-400">
                  Not found.{" "}
                  <a href="/beta?plan=developer" className="text-purple-400 hover:text-purple-300">Request access →</a>
                </p>
              )}
              {(status.state === "approved" || status.state === "invited") && (
                <p className="mt-2 text-sm text-zinc-400">Access confirmed. Accept agreements below to unlock the Docker image.</p>
              )}
            </div>

            {(status.approved || status.invited) && !status.agreements_accepted && (
              <div className="rounded-2xl border border-zinc-800 bg-[#0c0c14] p-5">
                <p className="text-xs uppercase tracking-wider text-zinc-500">Required agreements</p>
                <div className="mt-4 space-y-3">
                  <label className="flex items-start gap-3 text-sm text-zinc-300">
                    <input type="checkbox" className="mt-0.5" checked={acceptedBetaAgreement} onChange={(e) => setAcceptedBetaAgreement(e.target.checked)} />
                    <span>I agree to the{" "}<a className="text-purple-400 hover:text-purple-300" href={status.beta_agreement_url || BETA_AGREEMENT_URL} target="_blank" rel="noreferrer">Beta User Agreement</a>.</span>
                  </label>
                  <label className="flex items-start gap-3 text-sm text-zinc-300">
                    <input type="checkbox" className="mt-0.5" checked={acceptedSoftwareUsage} onChange={(e) => setAcceptedSoftwareUsage(e.target.checked)} />
                    <span>I agree to the{" "}<a className="text-purple-400 hover:text-purple-300" href={SOFTWARE_USAGE_URL} target="_blank" rel="noreferrer">Software Usage Agreement (EULA)</a>.</span>
                  </label>
                </div>
                <button
                  onClick={acceptAgreements}
                  disabled={accepting}
                  className="mt-5 rounded-full bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:opacity-60"
                >
                  {accepting ? "Saving…" : `Accept and unlock (v${status.agreement_version})`}
                </button>
              </div>
            )}

            {status.download_enabled && (
              <div className="rounded-2xl border border-purple-800/40 bg-purple-950/20 p-5">
                <p className="text-xs uppercase tracking-wider text-purple-300">Beta unlocked ✓</p>
                <p className="mt-2 text-sm text-zinc-300">Pull the beta Docker image and follow the quickstart. Your license key is in your approval email.</p>
                <div className="mt-4 rounded-xl border border-zinc-800 bg-[#09090f] p-4">
                  <p className="font-mono text-xs text-zinc-300 break-all">{dockerPull}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href={status.quickstart_url || QUICKSTART_URL} target="_blank" rel="noreferrer"
                    className="rounded-full border border-purple-700/60 px-4 py-2 text-sm font-semibold text-purple-300 hover:border-purple-500 hover:text-white transition-colors">
                    Open Beta Quickstart
                  </a>
                  <button onClick={() => navigator.clipboard.writeText(dockerPull)}
                    className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-500 transition-colors">
                    Copy docker pull
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

// ─── Page router ─────────────────────────────────────────────────────────────

function BetaPageContent() {
  const params = useSearchParams();
  const plan = params.get("plan") || "";
  const inviteToken = params.get("invite") || "";

  // Developer CTA → show registration form
  // Invite link or direct /beta → show activation form
  if (plan === "developer" && !inviteToken) {
    return <RegistrationForm />;
  }
  return <ActivationForm />;
}

export default function BetaPage() {
  return (
    <Suspense>
      <BetaPageContent />
    </Suspense>
  );
}
