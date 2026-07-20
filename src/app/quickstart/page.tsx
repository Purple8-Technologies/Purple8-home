import type { Metadata } from "next";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Install Purple8 — Docker Quickstart",
  description:
    "Install Purple8 Hyper Graph in one command. The one-click script installs Docker if needed, pulls the Developer image, starts the container, and opens the admin console. Manual Docker steps included.",
  path: "/quickstart",
});

/**
 * Developer / Docker install page — the destination for "Full quickstart →" on
 * the activation success screen and in the license-delivery email
 * (_DEVELOPER_QUICKSTART_URL in purple8-command-center).
 *
 * Server component (mostly static) so it exports cleanly to the GitHub Pages
 * static build; the only client island is <CopyButton>.
 */

const INSTALL_SH = "curl -fsSL https://www.purple8.ai/install.sh | bash";
const INSTALL_PS1 = "irm https://www.purple8.ai/install.ps1 | iex";
const PULL_CMD = "docker pull ghcr.io/purple8-technologies/purple8-graph:developer";
const RUN_CMD = `docker run -d \\
  --name purple8 \\
  -p 8100:8100 \\
  -e PURPLE8_LICENSE_JWT="<your-license-key>" \\
  -v purple8-data:/data \\
  ghcr.io/purple8-technologies/purple8-graph:developer`;

// DocIntel — free Community edition (no license key). Needs an LLM key for the
// extraction pipeline, and points its emit callback at your Purple8 graph.
const DOCINTEL_RUN_CMD = `docker run -d \\
  --name purple8-docintel \\
  -p 8200:8200 \\
  -e LLM__API_KEY="sk-..." \\
  -e GRAPH__BASE_URL="http://host.docker.internal:8100" \\
  ghcr.io/purple8-technologies/purple8-docintel:developer`;

function CommandBlock({ code }: { code: string }) {
  return (
    <div className="group relative mt-3">
      <pre className="overflow-x-auto rounded-lg border border-gray-700 bg-black px-4 py-3 pr-24 text-sm text-purple-200">
        <code>{code}</code>
      </pre>
      <div className="absolute right-2 top-2">
        <CopyButton text={code} />
      </div>
    </div>
  );
}

export default function QuickstartPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10">
          <a
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-300"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to purple8.ai
          </a>
          <p className="text-sm font-medium uppercase tracking-wide text-purple-400">
            Developer Edition — Free
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Install Purple8
          </h1>
          <p className="mt-3 text-gray-400">
            Purple8 Hyper Graph is your entire backend in one container — graph,
            vector, document &amp; full-text storage, a built-in RAG pipeline, a
            49-tool MCP server, workflows, auth, and encryption. No external
            services. The free Developer edition runs it all locally.
          </p>
        </div>

        {/* ── One-click install (recommended) ── */}
        <section className="mb-12 rounded-2xl border border-purple-700/50 bg-gradient-to-b from-purple-950/30 to-[#11111b] p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-600 px-3 py-0.5 text-xs font-semibold text-white">
              Recommended
            </span>
            <h2 className="text-lg font-semibold text-white">One-click install</h2>
          </div>
          <p className="mt-3 text-sm text-gray-400">
            One command does everything: it installs Docker if you don&rsquo;t
            have it, pulls the image, starts the container, and opens the console.
            Safe to re-run — it never deletes your data.
          </p>

          <div className="mt-5">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              macOS &amp; Linux
            </p>
            <CommandBlock code={INSTALL_SH} />
          </div>

          <div className="mt-5">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Windows (PowerShell)
            </p>
            <CommandBlock code={INSTALL_PS1} />
          </div>

          {/* What the script does — flow diagram */}
          <div className="mt-7">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              What the script does
            </p>
            <div className="mt-3 overflow-x-auto">
              <svg
                viewBox="0 0 720 96"
                role="img"
                aria-label="Install flow: install Docker, pull image, run container, open console"
                className="h-auto w-full min-w-[640px]"
              >
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#7c3aed" />
                  </marker>
                </defs>
                {[
                  { x: 8, t: "1 · Install", s: "Docker" },
                  { x: 188, t: "2 · Pull", s: "image" },
                  { x: 368, t: "3 · Run", s: "container :8100" },
                  { x: 548, t: "4 · Open", s: "console" },
                ].map((n, i) => (
                  <g key={n.t}>
                    <rect
                      x={n.x}
                      y={20}
                      width={156}
                      height={56}
                      rx={12}
                      fill="#11111b"
                      stroke={i === 3 ? "#7c3aed" : "#3f3f46"}
                    />
                    <text x={n.x + 78} y={46} textAnchor="middle" fill="#e4e4e7" fontSize="13" fontWeight="600">
                      {n.t}
                    </text>
                    <text x={n.x + 78} y={64} textAnchor="middle" fill="#a1a1aa" fontSize="12">
                      {n.s}
                    </text>
                    {i < 3 && (
                      <line
                        x1={n.x + 156}
                        y1={48}
                        x2={n.x + 180}
                        y2={48}
                        stroke="#7c3aed"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                      />
                    )}
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <p className="mt-5 text-xs text-gray-500">
            Prefer to read before you run?{" "}
            <a
              href="https://www.purple8.ai/install.sh"
              className="text-purple-400 underline"
              target="_blank"
              rel="noreferrer"
            >
              View install.sh
            </a>{" "}
            ·{" "}
            <a
              href="https://www.purple8.ai/install.ps1"
              className="text-purple-400 underline"
              target="_blank"
              rel="noreferrer"
            >
              View install.ps1
            </a>
            . The script only pulls the public image — nothing phones home.
          </p>
        </section>

        {/* ── Architecture diagram ── */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white">One container, your whole backend</h2>
          <p className="mt-2 text-sm text-gray-400">
            Everything below runs inside the single <code className="text-purple-200">purple8</code>{" "}
            container on port <code className="text-purple-200">8100</code> — replacing the stack
            you&rsquo;d normally wire together yourself.
          </p>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-gray-800 bg-[#0c0c14] p-5">
            <svg
              viewBox="0 0 720 300"
              role="img"
              aria-label="Purple8 architecture: your frontend talks to one Purple8 container that replaces 20+ services"
              className="h-auto w-full min-w-[660px]"
            >
              <defs>
                <marker id="arrow2" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#a855f7" />
                </marker>
              </defs>

              {/* Your frontend */}
              <rect x="12" y="118" width="150" height="64" rx="12" fill="#11111b" stroke="#3f3f46" />
              <text x="87" y="146" textAnchor="middle" fill="#e4e4e7" fontSize="14" fontWeight="600">Your frontend</text>
              <text x="87" y="166" textAnchor="middle" fill="#a1a1aa" fontSize="12">React · Vue · any</text>

              {/* Arrow to container */}
              <line x1="162" y1="150" x2="214" y2="150" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow2)" />
              <text x="188" y="140" textAnchor="middle" fill="#71717a" fontSize="10">HTTP / MCP</text>

              {/* Purple8 container */}
              <rect x="220" y="26" width="488" height="248" rx="18" fill="#160f24" stroke="#7c3aed" strokeWidth="1.5" />
              <text x="240" y="52" fill="#c4b5fd" fontSize="13" fontWeight="700">Purple8 · one container · :8100</text>

              {[
                "Graph engine", "Vector search", "Document store",
                "Full-text", "Hybrid RAG", "Journey / workflows",
                "MCP server (49)", "Auth + RBAC", "AES-256 encryption",
                "LCNC console", "Multi-tenancy", "WAL durability",
              ].map((label, i) => {
                const col = i % 3;
                const row = Math.floor(i / 3);
                const x = 240 + col * 156;
                const y = 68 + row * 46;
                return (
                  <g key={label}>
                    <rect x={x} y={y} width={144} height={34} rx={8} fill="#1e1633" stroke="#4c1d95" />
                    <text x={x + 72} y={y + 22} textAnchor="middle" fill="#ddd6fe" fontSize="11.5">{label}</text>
                  </g>
                );
              })}

              {/* Replaces strip */}
              <text x="12" y="238" fill="#71717a" fontSize="11" fontWeight="600">Replaces</text>
              <text x="12" y="258" fill="#52525b" fontSize="11">Postgres · Pinecone · Neo4j</text>
              <text x="12" y="274" fill="#52525b" fontSize="11">LangChain · Airflow · Auth0 · Elastic</text>
            </svg>
          </div>
        </section>

        {/* ── Manual install ── */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white">Prefer to do it by hand?</h2>
          <p className="mt-2 text-sm text-gray-400">
            Three commands. You just need Docker 20.10+ (Docker Desktop on
            macOS/Windows, Docker Engine on Linux) and ~2&nbsp;GB free RAM.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-base font-semibold text-white">
            <span className="mr-2 text-purple-400">1.</span> Pull the image
          </h3>
          <CommandBlock code={PULL_CMD} />
        </section>

        <section className="mb-8">
          <h3 className="text-base font-semibold text-white">
            <span className="mr-2 text-purple-400">2.</span> Start the container
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            Port <code className="text-purple-200">8100</code> serves the REST API,
            MCP server, and admin console; the volume persists your data across
            restarts. Replace{" "}
            <code className="text-purple-300">&lt;your-license-key&gt;</code> with the{" "}
            <code className="text-purple-300">PURPLE8_LICENSE_JWT</code> from your
            activation screen or email.
          </p>
          <CommandBlock code={RUN_CMD} />
        </section>

        <section className="mb-8">
          <h3 className="text-base font-semibold text-white">
            <span className="mr-2 text-purple-400">3.</span> Open the console
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            Once the container is healthy, open the built-in admin console:
          </p>
          <CommandBlock code={"http://localhost:8100/lcnc"} />
          <p className="mt-3 text-sm text-gray-400">
            Check it&rsquo;s running with{" "}
            <code className="text-purple-200">docker logs -f purple8</code>, or hit{" "}
            <code className="text-purple-200">http://localhost:8100/health</code>.
          </p>
        </section>

        {/* Connect an agent */}
        <section className="mb-10">
          <h3 className="text-base font-semibold text-white">
            <span className="mr-2 text-purple-400">4.</span> Connect an AI agent (MCP)
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            Purple8 is MCP-native — point Claude Desktop, Cursor, or any MCP client
            at the server to build and query your backend in natural language:
          </p>
          <CommandBlock code={"http://localhost:8100/mcp"} />
        </section>

        {/* What you get */}
        <section className="mb-10 rounded-2xl border border-purple-900/40 bg-[#11111b] p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white">
            What&rsquo;s in the Developer edition
          </h2>
          <div className="mt-4 grid gap-3 text-sm text-gray-400 sm:grid-cols-2">
            <div>• Graph + vector + document + full-text engine</div>
            <div>• Built-in RAG pipeline (hybrid retrieval)</div>
            <div>• MCP server — 49 tools across 9 namespaces</div>
            <div>• Journey Engine (workflows, SLA, HITL, audit)</div>
            <div>• LCNC admin console</div>
            <div>• AES-256-GCM encryption at rest</div>
            <div>• 50K nodes, 1 MCP agent (free tier)</div>
            <div>• Perpetual license — no expiry</div>
          </div>
        </section>

        {/* ── Add DocIntel (optional) ── */}
        <section id="add-docintel" className="mb-10 rounded-2xl border border-violet-900/40 bg-gradient-to-b from-violet-950/20 to-[#11111b] p-6 sm:p-8 scroll-mt-24">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-violet-600 px-3 py-0.5 text-xs font-semibold text-white">
              Optional
            </span>
            <h2 className="text-lg font-semibold text-white">
              Add Purple8 DocIntel — turn any document into graph knowledge
            </h2>
          </div>
          <p className="mt-3 text-sm text-gray-400">
            DocIntel is a separate microservice that parses 70+ formats (PDF,
            Office, HTML, images, CAD &amp; BIM), extracts entities and
            relationships, and emits them straight into your Purple8 graph. The{" "}
            <span className="text-violet-300">Community edition is free</span> —
            no license key, no expiry. It only needs an LLM API key for the
            extraction pipeline.
          </p>

          <div className="mt-5">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Run DocIntel (Community edition)
            </p>
            <CommandBlock code={DOCINTEL_RUN_CMD} />
            <p className="mt-3 text-sm text-gray-400">
              Port <code className="text-violet-200">8200</code> serves the
              document API. <code className="text-violet-200">GRAPH__BASE_URL</code>{" "}
              points DocIntel&rsquo;s emit callback at the Purple8 container you
              started above (<code className="text-violet-200">host.docker.internal</code>{" "}
              reaches your host from inside Docker Desktop; on Linux use{" "}
              <code className="text-violet-200">--network host</code> or the
              container IP). Check health at{" "}
              <code className="text-violet-200">http://localhost:8200/health</code>.
            </p>
          </div>

          <div className="mt-6">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Send it a document
            </p>
            <CommandBlock
              code={
                "curl -X POST http://localhost:8200/process -F \"file=@contract.pdf\""
              }
            />
            <p className="mt-3 text-sm text-gray-400">
              Extracted entities land in your graph automatically. Community
              edition covers 500 documents/mo on a single worker; paid tiers add
              throughput and managed connectors (SharePoint, Confluence, S3).{" "}
              <Link href="/#pricing" className="text-violet-400 underline">
                See DocIntel plans
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Footer links */}
        <div className="flex flex-col items-center gap-4 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            Don&rsquo;t have a license yet?{" "}
            <Link href="/register" className="text-purple-400 underline">
              Get one free in one click
            </Link>
          </p>
          <p className="text-sm text-gray-400">
            Ready to scale beyond the free tier?{" "}
            <Link href="/#pricing" className="text-purple-400 underline">
              See paid plans
            </Link>
          </p>
          <p className="text-xs text-gray-600">
            Lost your key?{" "}
            <Link href="/register" className="text-purple-400 underline">
              Recover it here
            </Link>{" "}
            · Need help?{" "}
            <a href="mailto:support@purple8.ai" className="text-purple-400 underline">
              support@purple8.ai
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
