"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CC_BASE_URL } from "@/lib/cc";

interface ActivateResponse {
  activated: boolean;
  email: string;
  key_id: string;
  jwt_token: string;
  tier: string;
  expires_at: string;
  docker_image: string;
  docker_pull: string;
  quickstart_url: string;
}

/**
 * Free Developer edition — activation (step 2 of 2).
 *
 * Reads the single-use magic-link token from the URL, exchanges it for the
 * license via /public/developer/activate, and shows the key + Docker pull
 * command. The license is also emailed as a backup.
 */
function Activate() {
  const params = useSearchParams();
  const token = params.get("token") || "";
  const [state, setState] = useState<"loading" | "done" | "error">("loading");
  const [data, setData] = useState<ActivateResponse | null>(null);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState<string>("");
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return; // activation is one-shot; never double-fire
    ran.current = true;

    if (!token) {
      setErr("Missing activation token. Please use the link from your email.");
      setState("error");
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${CC_BASE_URL}/public/developer/activate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        if (!res.ok) {
          const text = await res.text();
          let detail = text;
          try {
            detail = JSON.parse(text).detail || text;
          } catch {
            /* keep raw text */
          }
          throw new Error(detail || `Activation failed (${res.status})`);
        }
        setData(await res.json());
        setState("done");
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Activation failed.");
        setState("error");
      }
    })();
  }, [token]);

  function copy(label: string, value: string) {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(""), 1500);
    });
  }

  if (state === "loading") {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-purple-900/40 bg-[#11111b] p-8 sm:p-10">
        <h1 className="text-2xl font-bold text-white">Activating your license…</h1>
        <p className="mt-3 text-gray-400">One moment.</p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-red-900/40 bg-[#11111b] p-8 sm:p-10">
        <h1 className="text-2xl font-bold text-white">Activation link problem</h1>
        <p className="mt-4 rounded-lg border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-300">
          {err}
        </p>
        <p className="mt-4 text-gray-400">
          <Link href="/register" className="text-purple-400 underline">
            Register again
          </Link>{" "}
          to get a fresh link.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-purple-900/40 bg-[#11111b] p-8 sm:p-10">
      <h1 className="text-2xl font-bold text-white sm:text-3xl">
        You&apos;re in 🎉
      </h1>
      <p className="mt-3 text-gray-300">
        Your free Developer license is active. We also emailed a copy to{" "}
        <span className="text-purple-300">{data?.email}</span>.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            1. Pull the image
          </p>
          <div className="mt-2 flex items-center gap-2">
            <code className="flex-1 overflow-x-auto rounded-lg border border-gray-700 bg-[#0a0a0f] px-3 py-2 text-sm text-purple-200">
              {data?.docker_pull}
            </code>
            <button
              onClick={() => copy("pull", data?.docker_pull || "")}
              className="shrink-0 rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-300 hover:border-purple-500"
            >
              {copied === "pull" ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            2. Your license key (PURPLE8_LICENSE_JWT)
          </p>
          <div className="mt-2 flex items-center gap-2">
            <code className="flex-1 truncate rounded-lg border border-gray-700 bg-[#0a0a0f] px-3 py-2 text-sm text-purple-200">
              {data?.jwt_token}
            </code>
            <button
              onClick={() => copy("jwt", data?.jwt_token || "")}
              className="shrink-0 rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-300 hover:border-purple-500"
            >
              {copied === "jwt" ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-600">Key ID: {data?.key_id}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            3. Start &amp; open the console
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Run the container with{" "}
            <code className="text-purple-200">PURPLE8_LICENSE_JWT</code> set, then open{" "}
            <code className="text-purple-200">http://localhost:8100/lcnc</code>.{" "}
            <a
              href={data?.quickstart_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 underline"
            >
              Full quickstart →
            </a>
          </p>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-gray-600">
        Ready to scale beyond the free tier?{" "}
        <Link href="/#pricing" className="text-purple-400 underline">
          See paid plans
        </Link>
      </p>
    </div>
  );
}

export default function ActivatePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto mb-6 max-w-2xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-300"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to purple8.ai
        </a>
      </div>
      <Suspense
        fallback={
          <div className="mx-auto max-w-2xl rounded-3xl border border-purple-900/40 bg-[#11111b] p-8 sm:p-10">
            <h1 className="text-2xl font-bold text-white">Activating…</h1>
          </div>
        }
      >
        <Activate />
      </Suspense>
    </main>
  );
}
