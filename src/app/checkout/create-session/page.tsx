"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CC_BASE_URL } from "@/lib/cc";

type BillingCycle = "monthly" | "annual";
type CheckoutPlan = "starter" | "pro" | "docintel" | "docintel-solo" | "docintel-enterprise";

const SUPPORTED_PLANS: ReadonlySet<string> = new Set(["starter", "pro", "docintel", "docintel-solo", "docintel-enterprise"]);

function CheckoutCreateSessionContent() {
  const params = useSearchParams();
  const [error, setError] = useState<string>("");

  const plan = useMemo(() => {
    const raw = (params.get("plan") || "").trim().toLowerCase();
    return SUPPORTED_PLANS.has(raw) ? (raw as CheckoutPlan) : null;
  }, [params]);

  const billing = useMemo<BillingCycle>(() => {
    const raw = (params.get("billing") || "monthly").trim().toLowerCase();
    return raw === "annual" ? "annual" : "monthly";
  }, [params]);

  useEffect(() => {
    async function createSession() {
      if (!plan) {
        setError("Invalid plan. Please return to pricing and choose a valid plan.");
        return;
      }

      try {
        const res = await fetch(`${CC_BASE_URL}/billing/checkout/create-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan, billing }),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Checkout bootstrap failed (${res.status})`);
        }

        const data = await res.json();
        const checkoutUrl = data?.checkout_url ?? data?.redirect_url;
        if (!checkoutUrl || typeof checkoutUrl !== "string") {
          throw new Error("Checkout URL missing from billing service response.");
        }

        window.location.assign(checkoutUrl);
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "Could not start checkout right now. Please try again."
        );
      }
    }

    void createSession();
  }, [plan, billing]);

  if (!error) {
    return (
      <main className="min-h-screen bg-[#0a0a0f] px-4 flex items-center justify-center">
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
    <main className="min-h-screen bg-[#0a0a0f] px-4 flex items-center justify-center">
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
    <Suspense>
      <CheckoutCreateSessionContent />
    </Suspense>
  );
}
