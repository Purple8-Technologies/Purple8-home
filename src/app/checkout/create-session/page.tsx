"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CC_BASE_URL } from "@/lib/cc";
import { PURCHASABLE_PLAN_IDS } from "@/lib/pricing";
import { ClassicShell } from "@/components/revamp/BrandShell";
import DocIntelWorkspaceLink from "@/components/DocIntelWorkspaceLink";

type BillingCycle = "monthly" | "annual";

const SUPPORTED_PLANS: ReadonlySet<string> = PURCHASABLE_PLAN_IDS;

function CheckoutCreateSessionContent() {
  const params = useSearchParams();
  const [error, setError] = useState<string>("");
  const sessionRequest = useRef<{
    plan: string;
    billing: BillingCycle;
    checkoutUrl: Promise<string>;
  } | null>(null);

  const plan = useMemo(() => {
    const raw = (params.get("plan") || "").trim().toLowerCase();
    return SUPPORTED_PLANS.has(raw) ? raw : null;
  }, [params]);

  const billing = useMemo<BillingCycle>(() => {
    const raw = (params.get("billing") || "monthly").trim().toLowerCase();
    return raw === "annual" ? "annual" : "monthly";
  }, [params]);

  useEffect(() => {
    if (!plan) {
      setError("Invalid plan. Please return to pricing and choose a valid plan.");
      return;
    }
    if (plan === "docintel-graduated" || plan === "docintel-payg") {
      return;
    }
    let cancelled = false;
    setError("");
    if (sessionRequest.current?.plan !== plan || sessionRequest.current.billing !== billing) {
      // Reuse the in-flight request when React replays this effect.
      const checkoutUrl = (async () => {
        const res = await fetch(`${CC_BASE_URL}/billing/checkout/create-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plan, billing,
            theme: document.documentElement.dataset.p8Theme === "night" ? "night" : "day",
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          let detail: unknown;
          try { detail = JSON.parse(text).detail; } catch { /* response is not JSON */ }
          throw new Error(typeof detail === "string" ? detail : `Checkout request failed (HTTP ${res.status}).`);
        }

        const data = await res.json();
        const checkoutUrl = data?.checkout_url ?? data?.redirect_url;
        if (!checkoutUrl || typeof checkoutUrl !== "string") {
          throw new Error("Checkout URL missing from billing service response.");
        }
        const target = new URL(checkoutUrl);
        if (target.protocol !== "https:" || target.hostname !== "checkout.stripe.com" ||
            target.username || target.password || target.port) {
          throw new Error("The billing service returned an invalid Stripe checkout URL.");
        }

        return checkoutUrl;
      })();
      sessionRequest.current = { plan, billing, checkoutUrl };
    }
    sessionRequest.current.checkoutUrl.then((url) => {
      if (!cancelled) window.location.assign(url);
    }).catch((e: unknown) => {
      if (!cancelled) {
        setError(
          e instanceof Error
            ? e.message
            : "Could not start checkout right now. Please try again."
        );
      }
    });
    return () => { cancelled = true; };
  }, [plan, billing]);

  if (plan === "docintel-graduated" || plan === "docintel-payg") {
    return (
      <main id="main-content" className="min-h-screen px-4 flex items-center justify-center">
        <div className="max-w-lg w-full rounded-2xl border border-zinc-800 bg-[#11111b] p-8 text-center">
          <h1 className="text-xl font-bold text-white">DocIntel subscription</h1>
          <p className="mt-3 text-sm text-zinc-400">
            Sign in to your DocIntel workspace to manage the subscription for all your projects.
          </p>
          <DocIntelWorkspaceLink view="billing" className="mt-6 inline-block text-sm text-purple-400 underline">
            Open DocIntel workspace
          </DocIntelWorkspaceLink>
        </div>
      </main>
    );
  }

  if (!error) {
    return (
      <main id="main-content" className="min-h-screen px-4 flex items-center justify-center">
        <div className="max-w-lg w-full rounded-2xl border border-zinc-800 bg-[#11111b] p-8 text-center">
          <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-purple-500" />
          <h1 className="text-xl font-bold text-white">Redirecting to secure checkout…</h1>
          <p className="mt-3 text-sm text-zinc-500">
            We&apos;re creating your Stripe session for the selected plan.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen px-4 flex items-center justify-center">
      <div className="max-w-lg w-full rounded-2xl border border-red-900/40 bg-[#11111b] p-8 text-center">
        <h1 className="text-xl font-bold text-white">Couldn&apos;t start checkout</h1>
        <p className="mt-3 text-sm text-red-300">{error}</p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <a
            href="/#pricing"
            className="rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
          >
            Back to pricing
          </a>
          <a
            href="mailto:sales@purple8.ai?subject=Checkout%20issue"
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            Contact sales support
          </a>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutCreateSessionPage() {
  return (
    <ClassicShell>
    <Suspense>
      <CheckoutCreateSessionContent />
    </Suspense>
    </ClassicShell>
  );
}
