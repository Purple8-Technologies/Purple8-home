/**
 * /checkout/success
 *
 * Landing page after a successful Stripe Checkout.
 * Polls Command Center for the fulfilled product and its credentials.
 *
 * URL params (set by Stripe on redirect):
 *   session_id — Stripe Checkout Session ID
 */
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CC_BASE_URL } from "@/lib/cc";
import { ClassicShell } from "@/components/revamp/BrandShell";
import DocIntelWorkspaceLink from "@/components/DocIntelWorkspaceLink";

const CC_URL = CC_BASE_URL;

interface FulfilledProduct {
  jwt_token: string;
  key_id: string;
  product: "graph" | "docintel";
  product_tier?: string;
  tier?: string;
  api_base_url?: string | null;
}

type LicenseResult =
  | { status: "pending" }
  | { status: "ready"; product: FulfilledProduct }
  | { status: "error"; error: string };

function fulfilledProduct(data: unknown): FulfilledProduct {
  if (
    typeof data !== "object" || data === null ||
    !("jwt_token" in data) || typeof data.jwt_token !== "string" || !data.jwt_token ||
    !("key_id" in data) || typeof data.key_id !== "string" || !data.key_id ||
    !("product" in data) || (data.product !== "graph" && data.product !== "docintel")
  ) {
    throw new Error("The activation service returned incomplete product details. Contact support.");
  }
  const productTier = "product_tier" in data && typeof data.product_tier === "string"
    ? data.product_tier : undefined;
  if (data.product === "docintel" && !productTier) {
    throw new Error("DocIntel access details are unavailable. Contact support before using this key.");
  }
  if (data.product === "docintel" && productTier === "saas" &&
      (!("access_status" in data) || data.access_status !== "active")) {
    throw new Error("DocIntel Cloud access is not active. Contact support.");
  }
  const apiBase = "api_base_url" in data && typeof data.api_base_url === "string"
    ? data.api_base_url : null;
  if (apiBase) {
    let url: URL;
    try {
      url = new URL(apiBase);
    } catch {
      throw new Error("The activation service returned an invalid API endpoint. Contact support.");
    }
    if (!["https:", "http:"].includes(url.protocol) || url.username || url.password ||
        url.search || url.hash) {
      throw new Error("The activation service returned an invalid API endpoint. Contact support.");
    }
  }
  return {
    jwt_token: data.jwt_token,
    key_id: data.key_id,
    product: data.product,
    product_tier: productTier,
    tier: "tier" in data && typeof data.tier === "string" ? data.tier : undefined,
    api_base_url: apiBase?.replace(/\/$/, ""),
  };
}

function CheckoutSuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id") ?? "";
  const [result, setResult] = useState<LicenseResult>({ status: "pending" });
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const product = result.status === "ready" ? result.product : null;
  const isDocIntel = product?.product === "docintel";
  const isCloud = isDocIntel && product.product_tier === "saas";

  useEffect(() => {
    if (!sessionId) {
      setResult({ status: "error", error: "Missing session ID" });
      return;
    }

    let attempts = 0;
    const MAX_ATTEMPTS = 20;
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    setResult({ status: "pending" });

    const poll = async () => {
      try {
        const resp = await fetch(
          `${CC_URL}/license/by-session?session_id=${encodeURIComponent(sessionId)}`,
          { signal: controller.signal, cache: "no-store" }
        );
        if (controller.signal.aborted) return;
        if (resp.ok) {
          const data: unknown = await resp.json();
          if (controller.signal.aborted) return;
          setResult({ status: "ready", product: fulfilledProduct(data) });
          return;
        }
        if (resp.status !== 404 && resp.status !== 429 && resp.status < 500) {
          setResult({
            status: "error",
            error: resp.status === 403
              ? "Your product access is not active. Contact support."
              : `Could not confirm product access (HTTP ${resp.status}). Contact support.`,
          });
          return;
        }
        console.warn("Checkout fulfillment is pending", { status: resp.status });
      } catch (error) {
        if (controller.signal.aborted) return;
        if (!(error instanceof TypeError)) {
          setResult({
            status: "error",
            error: error instanceof Error ? error.message : "Could not read product access details.",
          });
          return;
        }
        console.warn("Checkout activation service is unreachable");
      }

      attempts++;
      if (attempts < MAX_ATTEMPTS) {
        timer = setTimeout(poll, 3000);
      } else {
        setResult({
          status: "error",
          error:
            "Activation is taking longer than expected. Check your email or contact support with your receipt.",
        });
      }
    };

    timer = setTimeout(poll, 2000);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [sessionId]);

  const copy = async () => {
    if (!product) return;
    try {
      await navigator.clipboard.writeText(product.jwt_token);
      setCopyError("");
      setCopied(true);
    } catch {
      setCopyError("Could not copy automatically. Select and copy the key above.");
    }
  };

  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full rounded-2xl border border-zinc-800 bg-[#11111b] p-10 text-center">

        {result.status === "pending" && (
          <>
            <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-purple-500" />
            <h1 className="text-xl font-bold text-white">Confirming your product access…</h1>
            <p className="mt-3 text-sm text-zinc-500">
              Confirming payment with Stripe and issuing your key. This takes a few seconds.
            </p>
          </>
        )}

        {product && (
          <>
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-purple-900/40">
              <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">
              {isCloud ? "Your DocIntel Cloud access is active" : (
                <>You&apos;re on {isDocIntel ? "DocIntel" : "Purple8"}{" "}
                  <span className="capitalize text-purple-400">
                    {isDocIntel ? product.product_tier : product.tier}
                  </span>
                </>
              )}
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              {isCloud
                ? "Use this API key with the hosted DocIntel service. No installation or Graph database is required."
                : <>Your self-hosted license key is below. Set it as{" "}
                    <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-purple-300">
                      {isDocIntel ? "LICENSE_KEY" : "PURPLE8_LICENSE_JWT"}
                    </code>{" "}in your environment.</>}
            </p>

            <div className="mt-6 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
              <p className="break-all font-mono text-xs leading-relaxed text-zinc-300">
                {product.jwt_token}
              </p>
            </div>

            <button
              onClick={copy}
              className="mt-4 rounded-full bg-purple-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
            >
              {copied ? "Copied ✓" : isCloud ? "Copy API key" : "Copy license key"}
            </button>
            {copyError && <p role="alert" className="mt-3 text-sm text-red-300">{copyError}</p>}

            {isCloud ? (
              <div className="mt-8 border-t border-zinc-800 pt-6 text-left">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Connect to DocIntel Cloud
                </p>
                {product.api_base_url ? (
                  <>
                    <p className="mt-3 text-sm text-zinc-400">API base URL</p>
                    <code className="mt-2 block break-all text-sm text-purple-300">{product.api_base_url}</code>
                    <DocIntelWorkspaceLink
                      href={`${product.api_base_url}/try#key=${encodeURIComponent(product.jwt_token)}`}
                      view="playground"
                      className="mt-5 inline-block rounded-full bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-purple-500"
                    >
                      Open DocIntel workspace
                    </DocIntelWorkspaceLink>
                    <p className="mt-3 text-sm text-zinc-400">
                      Submit documents with your key in the Authorization: Bearer header.
                      Retrieve processing status and results using the returned job ID.
                    </p>
                    <a href={`${product.api_base_url}/docs`} rel="noreferrer"
                      className="mt-4 inline-block text-sm text-purple-400 underline">
                      Open DocIntel API documentation
                    </a>
                  </>
                ) : (
                  <p role="alert" className="mt-3 text-sm text-amber-300">
                    Your API endpoint has not been configured. Contact support before submitting documents.
                  </p>
                )}
                <p className="mt-4 text-xs text-zinc-500">Keep this API key private.</p>
              </div>
            ) : (
              <div className="mt-8 border-t border-zinc-800 pt-6 text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Next steps
              </p>
              <ol className="mt-3 space-y-2 text-sm text-zinc-400">
                <li><span className="text-purple-400 font-medium">1.</span> Install {isDocIntel ? "DocIntel" : "Purple8"}: <a href="/quickstart/" className="text-purple-400 underline hover:text-purple-300">Quickstart →</a></li>
                <li><span className="text-purple-400 font-medium">2.</span> Set <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs">{isDocIntel ? "LICENSE_KEY" : "PURPLE8_LICENSE_JWT"}=&lt;key above&gt;</code></li>
                <li><span className="text-purple-400 font-medium">3.</span> <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs">docker compose up</code></li>
              </ol>
              </div>
            )}
          </>
        )}

        {result.status === "error" && (
          <>
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-red-900/40">
              <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">Something went wrong</h1>
            <p className="mt-3 text-sm text-zinc-500">{result.error}</p>
            <p className="mt-4 text-sm text-zinc-600">
              Email <a href="mailto:support@purple8.ai" className="text-purple-400 underline hover:text-purple-300">support@purple8.ai</a> with your Stripe receipt and we&apos;ll sort it out.
            </p>
          </>
        )}

      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <ClassicShell>
    <Suspense>
      <CheckoutSuccessContent />
    </Suspense>
    </ClassicShell>
  );
}
