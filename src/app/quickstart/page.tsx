import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developer Quickstart — Purple8",
  description:
    "Get Purple8 Hyper Graph running in minutes: pull the Docker image, set your license key, start the container, and open the admin console.",
};

/**
 * Developer Quickstart — the destination for the "Full quickstart →" link on
 * the activation success screen and in the license-delivery email
 * (_DEVELOPER_QUICKSTART_URL in purple8-command-center).
 *
 * Static content page (no client interactivity) so it exports cleanly to the
 * GitHub Pages static build. Styled to match the site's dark theme.
 */
export default function QuickstartPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wide text-purple-400">
            Developer Edition
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Quickstart
          </h1>
          <p className="mt-3 text-gray-400">
            Purple8 Hyper Graph is an embedded multi-model database (graph +
            vector + document + full-text) with a built-in RAG pipeline, MCP
            server, and admin console. The free Developer edition runs the entire
            backend in a single container — no external services required.
          </p>
        </div>

        {/* Prerequisites */}
        <section className="mb-10 rounded-2xl border border-gray-800 bg-[#11111b] p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white">Prerequisites</h2>
          <ul className="mt-4 space-y-2 text-sm text-gray-400">
            <li>
              • <span className="text-gray-300">Docker</span> 20.10 or newer
              (Docker Desktop on macOS/Windows, or Docker Engine on Linux).
            </li>
            <li>
              • Your <span className="text-gray-300">license key</span>{" "}
              (<code className="text-purple-200">PURPLE8_LICENSE_JWT</code>) —
              shown on your activation screen and emailed to you.
            </li>
            <li>
              • ~2&nbsp;GB free RAM for the Developer tier (50K nodes, 1 MCP
              agent).
            </li>
          </ul>
        </section>

        {/* Step 1 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white">
            <span className="mr-2 text-purple-400">1.</span> Pull the image
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Download the Developer edition container from the GitHub Container
            Registry.
          </p>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-purple-200">
            <code>docker pull ghcr.io/purple8-technologies/purple8-graph:developer</code>
          </pre>
        </section>

        {/* Step 2 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white">
            <span className="mr-2 text-purple-400">2.</span> Start the container
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Set your license key and start the engine. Port{" "}
            <code className="text-purple-200">8100</code> serves the REST API,
            MCP server, and admin console; the mounted volume persists your data
            across restarts.
          </p>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-purple-200">
            <code>{`docker run -d \\
  --name purple8 \\
  -p 8100:8100 \\
  -e PURPLE8_LICENSE_JWT="<your-license-key>" \\
  -v purple8-data:/data \\
  ghcr.io/purple8-technologies/purple8-graph:developer`}</code>
          </pre>
          <p className="mt-3 text-xs text-gray-500">
            Replace{" "}
            <code className="text-purple-300">&lt;your-license-key&gt;</code>{" "}
            with the full <code className="text-purple-300">PURPLE8_LICENSE_JWT</code>{" "}
            value from your activation screen or email.
          </p>
        </section>

        {/* Step 3 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white">
            <span className="mr-2 text-purple-400">3.</span> Open the console
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Once the container is healthy, open the built-in admin console (LCNC)
            in your browser:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-purple-200">
            <code>http://localhost:8100/lcnc</code>
          </pre>
          <p className="mt-3 text-sm text-gray-400">
            Check the container is running with{" "}
            <code className="text-purple-200">docker logs -f purple8</code>, or
            hit the health endpoint at{" "}
            <code className="text-purple-200">http://localhost:8100/health</code>.
          </p>
        </section>

        {/* Step 4 — connect an agent */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white">
            <span className="mr-2 text-purple-400">4.</span> Connect an AI agent
            (MCP)
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Purple8 is MCP-native — point Claude Desktop, Cursor, or any MCP
            client at the server to build and query your backend in natural
            language. The MCP endpoint is served on the same port:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-purple-200">
            <code>http://localhost:8100/mcp</code>
          </pre>
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

        {/* Footer links */}
        <div className="flex flex-col items-center gap-4 border-t border-gray-800 pt-8 text-center">
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
            <a
              href="mailto:support@purple8.ai"
              className="text-purple-400 underline"
            >
              support@purple8.ai
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
