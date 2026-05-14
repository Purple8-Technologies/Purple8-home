const cypherSnippet = `// Ask the graph a question your LLM can't answer alone
MATCH path = (company:Company {name: $name})
  -[:EMPLOYS*1..3]->(:Person)
  -[:AUTHORED]->(doc:Document)
WHERE doc.risk_score > 0.7
RETURN path, doc.summary
ORDER BY doc.risk_score DESC
LIMIT 20`;

const mcpSnippet = `// Your AI agent, talking to Purple8 natively
{
  "tool": "hypergraph_hybrid_rag",
  "arguments": {
    "query": "summarise open RFIs on block C",
    "rag_mode": "hybrid",
    "tenant_id": "acme-construction"
  }
}

// → subgraph context + vector results, fused
// → no custom glue code, no wrapper API`;

const docIntelSnippet = `POST /v1/extract
{
  "source": "s3://contracts/project-omega.ifc",
  "output": "hypergraph"
}

// DocIntel response:
// 847 entities extracted
// 2,341 relationships mapped
// Ingested directly into Hyper Graph
// Time: 3.2s`;

export default function Features() {
  return (
    <section id="features" className="bg-[#0d0d17]">

      {/* ── Section 1: Hyper Graph ── */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">
              Hyper Graph
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              One process.{" "}
              <span className="text-zinc-500">No orchestration tax.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-zinc-400">
              Graph, vector, full-text search, and workflow orchestration in a
              single embedded engine. No Postgres. No Redis. No separate vector
              DB. No message queue. One binary, one port — and three production
              RAG architectures ready to query the moment you start.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "openCypher with native graph-vector hybrid search — plus query plan explain endpoint",
                "Flat Vector, GraphRAG, and Hybrid RAG — all three built in; autonomous MCP-driven tuning",
                "Journey Engine: stateful pipelines, SLA monitoring, HITL gates, AI step persistence",
                "AES-256-GCM envelope encryption · per-tenant key isolation · 5 KMS providers",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Code block */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0f] p-1">
            <div className="flex items-center gap-1.5 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-600">query.cypher</span>
            </div>
            <pre className="overflow-x-auto px-5 pb-6 text-sm leading-relaxed">
              <code>
                {cypherSnippet.split("\n").map((line, i) => {
                  if (line.startsWith("//")) {
                    return <div key={i} className="text-zinc-600">{line}</div>;
                  }
                  if (/^(MATCH|WHERE|RETURN|ORDER|LIMIT)/.test(line)) {
                    return <div key={i}><span className="text-violet-400">{line.split(" ")[0]}</span><span className="text-zinc-300">{" " + line.slice(line.indexOf(" ") + 1)}</span></div>;
                  }
                  return <div key={i} className="text-zinc-300">{line}</div>;
                })}
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl border-t border-zinc-900 px-4 sm:px-6 lg:px-8" />

      {/* ── Section 2: MCP + Journey Engine ── */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Code block — left this time */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0f] p-1 lg:order-first">
            <div className="flex items-center gap-1.5 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-600">mcp-tool-call.json</span>
            </div>
            <pre className="overflow-x-auto px-5 pb-6 text-sm leading-relaxed">
              <code>
                {mcpSnippet.split("\n").map((line, i) => {
                  if (line.startsWith("//")) {
                    return <div key={i} className="text-zinc-600">{line}</div>;
                  }
                  if (line.includes('"tool"') || line.includes('"arguments"') || line.includes('"query"') || line.includes('"rag_mode"') || line.includes('"tenant_id"')) {
                    const parts = line.split(":");
                    return <div key={i}><span className="text-purple-400">{parts[0]}</span><span className="text-zinc-300">:{parts.slice(1).join(":")}</span></div>;
                  }
                  return <div key={i} className="text-zinc-300">{line}</div>;
                })}
              </code>
            </pre>
          </div>

          {/* Text */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">
              Native MCP Server
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              AI agents call your database{" "}
              <span className="text-zinc-500">natively.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-zinc-400">
              Purple8 ships as a first-class MCP server. Claude Code, Cursor,
              GitHub Copilot, and Windsurf connect directly — no wrapper API,
              no custom glue code. Agents query knowledge graphs, run hybrid
              RAG, and trigger workflow journeys as native tools.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "22 tools across graph.*, rag.*, journey.*, data.* — all RBAC-enforced",
                "Works with Claude Code, Cursor, GitHub Copilot, Windsurf, and any MCP-compatible agent",
                "Model-agnostic: OpenAI, Anthropic, Gemini, Ollama, or any open-weight model",
                "Agents autonomously tune RAG, track SLAs, and resolve HITL decisions — no human intermediary",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl border-t border-zinc-900 px-4 sm:px-6 lg:px-8" />

      {/* ── Section 3: DocIntel ── */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
              DocIntel
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Documents in.{" "}
              <span className="text-zinc-500">Knowledge graph out.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-zinc-400">
              A stateless document intelligence microservice that turns 70+
              enterprise formats — PDFs, contracts, CAD drawings, BIM models,
              spreadsheets — into structured entity graphs, ready to query.
              Proprietary GLiNER-Purple8 NER model, five OCR engines, zero data
              egress.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "IFC/BIM, DXF/DWG, STEP, STL, G-code — full CAD & engineering format support",
                "Proprietary GLiNER-Purple8 NER (v3) — two-pass hybrid entity + relationship extraction",
                "Self-hosted Purple8 OCR — documents never leave your infrastructure",
                "SharePoint, Confluence, S3, and webhook connectors built in — batch and push modes",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Code block */}
          <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0f] p-1">
            <div className="flex items-center gap-1.5 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-600">extract.http</span>
            </div>
            <pre className="overflow-x-auto px-5 pb-6 text-sm leading-relaxed">
              <code>
                {docIntelSnippet.split("\n").map((line, i) => {
                  if (line.startsWith("//")) {
                    return <div key={i} className="text-zinc-600">{line}</div>;
                  }
                  if (line.startsWith("POST")) {
                    return <div key={i}><span className="text-violet-400">POST</span><span className="text-zinc-300">{line.slice(4)}</span></div>;
                  }
                  if (line.includes('"source"') || line.includes('"output"')) {
                    const parts = line.split(":");
                    return <div key={i}><span className="text-purple-400">{parts[0]}</span><span className="text-zinc-300">:{parts.slice(1).join(":")}</span></div>;
                  }
                  return <div key={i} className="text-zinc-300">{line}</div>;
                })}
              </code>
            </pre>
          </div>
        </div>
      </div>

    </section>
  );
}
