"use client";

import Purple8Logo from "@/components/Purple8Logo";
import {
  siAnthropic,
  siClaude,
  siDocker,
  siGithubcopilot,
  siGooglegemini,
  siKubernetes,
  siOllama,
  siMeta,
  siMistralai,
} from "simple-icons";

/* ─── Primitive: simple-icons brand icon ─────────────────────────────── */
function SiIcon({
  path,
  hex,
  title,
  className = "h-5 w-5",
}: {
  path: string;
  hex: string;
  title: string;
  className?: string;
}) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      aria-label={title}
      fill={`#${hex}`}
    >
      <path d={path} />
    </svg>
  );
}

/* ─── Custom OpenAI badge (no simple-icons entry in v16) ─────────────── */
function OpenAIIcon({ className = "h-5 w-5" }: { className?: string }) {
  // Simplified geometric approximation of the OpenAI logo polygon
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="OpenAI" fill="#412991">
      <path d="M22.28 10.08a6.2 6.2 0 0 0-.54-5.1 6.28 6.28 0 0 0-6.75-3.01A6.22 6.22 0 0 0 10.3 0a6.28 6.28 0 0 0-5.98 4.35 6.22 6.22 0 0 0-4.16 3.02 6.28 6.28 0 0 0 .77 7.36 6.2 6.2 0 0 0 .54 5.1 6.28 6.28 0 0 0 6.75 3.01A6.22 6.22 0 0 0 13.7 24a6.28 6.28 0 0 0 5.99-4.36 6.22 6.22 0 0 0 4.16-3.02 6.28 6.28 0 0 0-.77-7.36zM13.7 22.48a4.66 4.66 0 0 1-2.99-1.09l.15-.08 4.97-2.87a.82.82 0 0 0 .41-.71v-7l2.1 1.21a.08.08 0 0 1 .04.05v5.8a4.69 4.69 0 0 1-4.68 4.69zm-10.06-4.3a4.66 4.66 0 0 1-.56-3.15l.15.09 4.97 2.87a.82.82 0 0 0 .82 0l6.07-3.5v2.42a.08.08 0 0 1-.03.06L9.97 20.1a4.69 4.69 0 0 1-6.33-1.92zm-1.31-10.88a4.66 4.66 0 0 1 2.43-2.05v5.9a.82.82 0 0 0 .41.71l6.07 3.5-2.1 1.21a.08.08 0 0 1-.07 0L4.98 13.4a4.69 4.69 0 0 1-2.65-6.1zm17.23 4.02-6.07-3.5 2.1-1.21a.08.08 0 0 1 .07 0l5.1 2.95a4.69 4.69 0 0 1-.73 8.46v-5.9a.82.82 0 0 0-.47-.8zm2.09-3.17-.15-.09-4.97-2.87a.82.82 0 0 0-.82 0l-6.07 3.5V7.27a.08.08 0 0 1 .03-.06L14.8 4.18a4.69 4.69 0 0 1 6.85 4.85v.12zm-13.14 4.32-2.1-1.21a.08.08 0 0 1-.04-.05V6.42a4.69 4.69 0 0 1 7.69-3.6l-.15.08-4.97 2.87a.82.82 0 0 0-.41.71v7zm1.14-2.46 2.7-1.56 2.7 1.56v3.1l-2.7 1.56-2.7-1.56V10z" />
    </svg>
  );
}

/* ─── Arrow primitives ───────────────────────────────────────────────── */
function ArrowDown({
  label,
  bidirectional = false,
}: {
  label?: string;
  bidirectional?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 py-0.5">
      {label && (
        <span className="rounded-full border border-zinc-800 bg-zinc-900/70 px-2.5 py-0.5 text-[10px] font-medium text-zinc-500">
          {label}
        </span>
      )}
      <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="shrink-0">
        {bidirectional && (
          <polygon points="3,9 17,9 10,1" fill="#4b5563" />
        )}
        <line
          x1="10" y1={bidirectional ? "9" : "2"}
          x2="10" y2="24"
          stroke="#4b5563" strokeWidth="1.5"
        />
        <polygon points="3,21 17,21 10,29" fill="#4b5563" />
      </svg>
    </div>
  );
}

/* One box above → two boxes below */
function ForkArrow({ leftLabel, rightLabel }: { leftLabel?: string; rightLabel?: string }) {
  return (
    <div className="relative flex items-start justify-center py-0.5">
      <svg viewBox="0 0 260 44" className="w-full max-w-xs" height="44" fill="none">
        {/* trunk */}
        <line x1="130" y1="0" x2="130" y2="22" stroke="#4b5563" strokeWidth="1.5" />
        {/* crossbar */}
        <line x1="50" y1="22" x2="210" y2="22" stroke="#4b5563" strokeWidth="1.5" />
        {/* left drop */}
        <line x1="50" y1="22" x2="50" y2="38" stroke="#4b5563" strokeWidth="1.5" />
        <polygon points="43,35 57,35 50,43" fill="#4b5563" />
        {/* right drop */}
        <line x1="210" y1="22" x2="210" y2="38" stroke="#4b5563" strokeWidth="1.5" />
        <polygon points="203,35 217,35 210,43" fill="#4b5563" />
        {/* labels */}
        {leftLabel && (
          <text x="50" y="17" textAnchor="middle" fontSize="9" fill="#6b7280">{leftLabel}</text>
        )}
        {rightLabel && (
          <text x="210" y="17" textAnchor="middle" fontSize="9" fill="#6b7280">{rightLabel}</text>
        )}
      </svg>
    </div>
  );
}

/* One box above → three boxes below */
function TriForkArrow() {
  return (
    <svg viewBox="0 0 380 44" className="w-full" height="44" fill="none">
      <line x1="190" y1="0" x2="190" y2="22" stroke="#4b5563" strokeWidth="1.5" />
      <line x1="50" y1="22" x2="330" y2="22" stroke="#4b5563" strokeWidth="1.5" />
      {[50, 190, 330].map((x) => (
        <g key={x}>
          <line x1={x} y1="22" x2={x} y2="38" stroke="#4b5563" strokeWidth="1.5" />
          <polygon points={`${x - 7},35 ${x + 7},35 ${x},43`} fill="#4b5563" />
        </g>
      ))}
    </svg>
  );
}

/* ─── Service box: Purple8 product ───────────────────────────────────── */
function P8Box({
  name,
  subtitle,
  caps,
  violet = false,
}: {
  name: string;
  subtitle: string;
  caps: string[];
  violet?: boolean;
}) {
  const ring = violet
    ? "border-violet-600/50 ring-violet-600/20 shadow-violet-950/30"
    : "border-purple-600/50 ring-purple-600/20 shadow-purple-950/30";
  return (
    <div
      className={`flex w-full flex-col items-center rounded-2xl border bg-purple-950/10 px-5 py-5 shadow-lg ring-1 ${ring}`}
    >
      <Purple8Logo className="h-7 w-14" />
      <p className="mt-2 text-sm font-bold text-white">{name}</p>
      <p className={`text-[11px] ${violet ? "text-violet-300" : "text-purple-300"}`}>{subtitle}</p>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {caps.map((c) => (
          <span
            key={c}
            className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${
              violet
                ? "bg-violet-900/40 text-violet-200"
                : "bg-purple-900/40 text-purple-200"
            }`}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── External service box ───────────────────────────────────────────── */
function ExtBox({
  title,
  subtitle,
  children,
  dashed = false,
  accent = "zinc",
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  dashed?: boolean;
  accent?: "zinc" | "amber" | "teal" | "blue";
}) {
  const borderMap: Record<string, string> = {
    zinc: "border-zinc-700/60",
    amber: "border-amber-700/50",
    teal: "border-teal-700/50",
    blue: "border-blue-700/50",
  };
  return (
    <div
      className={`flex flex-col items-center rounded-xl border bg-zinc-900/40 px-4 py-4 ${borderMap[accent]} ${dashed ? "border-dashed" : ""}`}
    >
      {children && <div className="mb-2 flex items-center justify-center gap-2">{children}</div>}
      <p className="text-xs font-semibold text-zinc-300">{title}</p>
      {subtitle && <p className="mt-0.5 text-[10px] text-zinc-600">{subtitle}</p>}
    </div>
  );
}

/* ─── Reusable logo rows for LLM providers ───────────────────────────── */
function LLMProviderBox() {
  return (
    <ExtBox title="LLM Provider" subtitle="Your choice — model-agnostic">
      <OpenAIIcon className="h-4 w-4" />
      <SiIcon path={siAnthropic.path} hex={siAnthropic.hex} title="Anthropic" className="h-4 w-4" />
      <SiIcon path={siGooglegemini.path} hex={siGooglegemini.hex} title="Gemini" className="h-4 w-4" />
      <SiIcon path={siOllama.path} hex={siOllama.hex} title="Ollama" className="h-4 w-4 opacity-80" />
      <SiIcon path={siMistralai.path} hex={siMistralai.hex} title="Mistral" className="h-4 w-4" />
    </ExtBox>
  );
}

function AIAgentBox() {
  return (
    <ExtBox title="AI Agent" subtitle="Calls Purple8 via 74 MCP tools" accent="amber">
      <SiIcon path={siClaude.path} hex={siClaude.hex} title="Claude" className="h-4 w-4" />
      <SiIcon path={siGithubcopilot.path} hex={siGithubcopilot.hex} title="GitHub Copilot" className="h-4 w-4" />
      <OpenAIIcon className="h-4 w-4" />
      <SiIcon path={siMeta.path} hex={siMeta.hex} title="Meta AI" className="h-4 w-4" />
    </ExtBox>
  );
}

/* ─── Browser / frontend icon (inline heroicon) ─────────────────────── */
function BrowserIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
    </svg>
  );
}

/* ─── Server / on-prem icon ──────────────────────────────────────────── */
function ServerIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
    </svg>
  );
}

/* ─── Document icon ──────────────────────────────────────────────────── */
function DocIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

/* ─── Load balancer icon ─────────────────────────────────────────────── */
function LBIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  );
}

/* ─── Users icon ─────────────────────────────────────────────────────── */
function UsersIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

/* ─── Environment badge ──────────────────────────────────────────────── */
function EnvBadge({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/60 bg-zinc-900/50 px-3 py-1 text-xs font-medium text-zinc-400">
      {icon}
      {label}
    </span>
  );
}

/* ─── Scenario card wrapper ──────────────────────────────────────────── */
function ScenarioCard({
  number,
  title,
  description,
  envBadges,
  children,
}: {
  number: string;
  title: string;
  description: string;
  envBadges: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-purple-900/30 bg-[#0f0f1a] overflow-hidden">
      {/* Header */}
      <div className="border-b border-purple-900/20 px-6 py-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-purple-500">
              Scenario {number}
            </p>
            <h3 className="mt-1 text-lg font-bold text-white">{title}</h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-zinc-500">{description}</p>
          </div>
          <div className="flex flex-wrap gap-2 pt-0.5">{envBadges}</div>
        </div>
      </div>

      {/* Diagram */}
      <div className="flex flex-col items-center px-6 py-8">
        {children}
      </div>
    </div>
  );
}

/* ─── SCENARIO 1 — Start simple ──────────────────────────────────────── */
function Scenario1() {
  return (
    <ScenarioCard
      number="01"
      title="The core pattern — you build the frontend, Purple8 is everything else"
      description="The minimum viable AI backend. One process, no external services. Works identically on a developer laptop and in production."
      envBadges={
        <>
          <EnvBadge label="Any cloud" icon={<BrowserIcon className="h-3 w-3" />} />
          <EnvBadge label="On-premises" icon={<ServerIcon className="h-3 w-3" />} />
          <EnvBadge label="Local / laptop" icon={<ServerIcon className="h-3 w-3" />} />
        </>
      }
    >
      {/* Row: Frontend */}
      <div className="w-full max-w-sm">
        <ExtBox title="Your Application / Frontend" subtitle="Web · Mobile · Desktop · CLI" accent="blue">
          <BrowserIcon className="h-5 w-5 text-blue-400" />
        </ExtBox>
      </div>

      <ArrowDown label="REST API / WebSocket" />

      {/* Row: Purple8 */}
      <div className="w-full max-w-lg">
        <P8Box
          name="Purple8"
          subtitle="Your complete AI backend — one process"
          caps={["Graph + Vector + RAG", "Journey Engine", "Auth + RBAC", "Encryption", "AI Evaluation", "SOC Agent", "MCP · 74 tools"]}
        />
      </div>

      <ForkArrow leftLabel="LLM calls" rightLabel="MCP tools" />

      {/* Row: LLM + Agent */}
      <div className="grid w-full max-w-lg grid-cols-2 gap-4">
        <LLMProviderBox />
        <AIAgentBox />
      </div>
    </ScenarioCard>
  );
}

/* ─── SCENARIO 2 — Document-intensive workloads ──────────────────────── */
function Scenario2() {
  return (
    <ScenarioCard
      number="02"
      title="Document-intensive workloads — parse, extract, and reason over any content"
      description="Adds DocIntel to the pipeline for organisations with dense document corpora: contracts, BIM files, financial reports, research papers. 70 formats in, structured knowledge graph out."
      envBadges={
        <>
          <EnvBadge label="Cloud" icon={<BrowserIcon className="h-3 w-3" />} />
          <EnvBadge label="On-premises" icon={<ServerIcon className="h-3 w-3" />} />
        </>
      }
    >
      {/* Row: Documents */}
      <div className="w-full max-w-lg">
        <ExtBox
          title="Source documents"
          subtitle="PDF · Word · Excel · PowerPoint · IFC · DXF · Email · HTML · Code · SAP IDocs · and 60+ more"
          accent="teal"
        >
          <DocIcon className="h-5 w-5 text-teal-400" />
        </ExtBox>
      </div>

      <ArrowDown label="70 formats" />

      {/* Row: DocIntel + LLM side by side */}
      <div className="grid w-full max-w-lg grid-cols-2 gap-4">
        <P8Box
          name="DocIntel"
          subtitle="Document intelligence · port 8200"
          caps={["Parse", "Chunk", "Extract", "Classify", "Emit"]}
          violet
        />
        <LLMProviderBox />
      </div>

      <ArrowDown label="Entities + relationships → graph" />

      {/* Row: Purple8 */}
      <div className="w-full max-w-lg">
        <P8Box
          name="Purple8"
          subtitle="Knowledge graph + semantic search + workflows"
          caps={["Graph + Vector + RAG", "Journey Engine", "Auth + RBAC", "AI Evaluation", "SOC Agent"]}
        />
      </div>

      <ForkArrow leftLabel="REST API" rightLabel="MCP tools" />

      {/* Row: Frontend + Agent */}
      <div className="grid w-full max-w-lg grid-cols-2 gap-4">
        <ExtBox title="Your Frontend" subtitle="Web · Mobile · Portal" accent="blue">
          <BrowserIcon className="h-5 w-5 text-blue-400" />
        </ExtBox>
        <AIAgentBox />
      </div>
    </ScenarioCard>
  );
}

/* ─── SCENARIO 3 — AI Agent as the developer ─────────────────────────── */
function Scenario3() {
  return (
    <ScenarioCard
      number="03"
      title="AI agent as the developer — natural language is the only interface"
      description="No application code written by humans. An AI agent uses 74 MCP tools to build, operate, and evolve the entire backend. End users interact via the built-in admin portal or a thin frontend."
      envBadges={
        <>
          <EnvBadge label="Any environment" icon={<BrowserIcon className="h-3 w-3" />} />
        </>
      }
    >
      {/* Row: AI Agent */}
      <div className="w-full max-w-md">
        <ExtBox
          title="AI Agent"
          subtitle="Operates the entire backend via 74 MCP tools — no human writing backend code"
          accent="amber"
        >
          <SiIcon path={siClaude.path} hex={siClaude.hex} title="Claude" className="h-5 w-5" />
          <SiIcon path={siGithubcopilot.path} hex={siGithubcopilot.hex} title="GitHub Copilot" className="h-5 w-5" />
          <OpenAIIcon className="h-5 w-5" />
          <SiIcon path={siMeta.path} hex={siMeta.hex} title="Meta AI" className="h-5 w-5" />
        </ExtBox>
      </div>

      <div className="flex flex-col items-center py-1">
        <span className="rounded-full border border-amber-800/50 bg-amber-950/30 px-2.5 py-0.5 text-[10px] font-medium text-amber-400">
          74 MCP tools (graph · rag · journey · data · schema · admin…)
        </span>
        <svg width="20" height="24" viewBox="0 0 20 24" fill="none" className="mt-1 shrink-0">
          <line x1="10" y1="2" x2="10" y2="18" stroke="#4b5563" strokeWidth="1.5" />
          <polygon points="3,15 17,15 10,23" fill="#4b5563" />
        </svg>
      </div>

      <TriForkArrow />

      {/* Row: Purple8 + DocIntel + LCNC */}
      <div className="grid w-full grid-cols-3 gap-3">
        <P8Box
          name="Purple8"
          subtitle="Storage · RAG · Workflows · Security"
          caps={["Graph + Vector", "Journey Engine", "SOC Agent", "Audit trail"]}
        />
        <P8Box
          name="DocIntel"
          subtitle="70-format document ingestion"
          caps={["Parse", "Extract", "Emit"]}
          violet
        />
        <ExtBox title="Admin Portal (LCNC)" subtitle="Built-in — no separate CMS" accent="teal">
          <UsersIcon className="h-5 w-5 text-teal-400" />
        </ExtBox>
      </div>

      <ArrowDown label="LLM calls for RAG + extraction" />

      <div className="w-full max-w-sm">
        <LLMProviderBox />
      </div>

      <ArrowDown label="Serves end users" />

      <div className="w-full max-w-sm">
        <ExtBox title="End users / citizens / officers" subtitle="Web portal · Mobile app · API consumers" accent="zinc">
          <UsersIcon className="h-5 w-5 text-zinc-400" />
        </ExtBox>
      </div>
    </ScenarioCard>
  );
}

/* ─── SCENARIO 4 — Production HA ─────────────────────────────────────── */
function Scenario4() {
  return (
    <ScenarioCard
      number="04"
      title="Production HA — horizontally scaled, cloud or on-premises Kubernetes"
      description="High-availability topology for production workloads. Three Purple8 query nodes behind a load balancer, a DocIntel cluster for parallel document processing, deployed on any container platform."
      envBadges={
        <>
          <EnvBadge label="Cloud (AWS / Azure / GCP)" icon={<BrowserIcon className="h-3 w-3" />} />
          <EnvBadge label="On-premises Kubernetes" icon={<ServerIcon className="h-3 w-3" />} />
        </>
      }
    >
      {/* Row: Internet + Load Balancer */}
      <div className="w-full max-w-2xl">
        <ExtBox title="Load Balancer / API Gateway" subtitle="HTTPS · TLS termination · health checks" accent="zinc" dashed>
          <LBIcon className="h-5 w-5 text-zinc-400" />
        </ExtBox>
      </div>

      <TriForkArrow />

      {/* Row: 3 Purple8 nodes */}
      <div className="grid w-full max-w-2xl grid-cols-3 gap-3">
        {["Query Node 1", "Query Node 2", "Query Node 3"].map((label) => (
          <div key={label} className="flex flex-col items-center rounded-2xl border border-purple-600/40 bg-purple-950/10 px-3 py-4 shadow-md shadow-purple-950/20 ring-1 ring-purple-600/15">
            <Purple8Logo className="h-6 w-12" />
            <p className="mt-1.5 text-xs font-bold text-white">Purple8</p>
            <p className="mt-0.5 text-[9px] text-purple-300">{label}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              {["RAG", "Graph", "MCP"].map((c) => (
                <span key={c} className="rounded-full bg-purple-900/40 px-1.5 py-0.5 text-[8px] text-purple-200">{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ArrowDown label="Document ingestion pipeline" />

      {/* DocIntel cluster */}
      <div className="w-full max-w-2xl rounded-2xl border border-violet-700/35 bg-violet-950/10 px-5 py-4">
        <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-widest text-violet-400">DocIntel Cluster</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {["Instance 1", "Instance 2", "Instance 3 (scale-out)"].map((label) => (
            <div key={label} className="flex flex-col items-center rounded-xl border border-violet-700/30 bg-violet-950/20 px-3 py-3">
              <Purple8Logo className="h-5 w-10" />
              <p className="mt-1 text-[10px] font-semibold text-white">DocIntel</p>
              <p className="text-[9px] text-violet-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <ArrowDown label="Shared WAL / persistent storage" />

      {/* Shared storage */}
      <div className="w-full max-w-2xl">
        <ExtBox
          title="Persistent storage + Write-Ahead Log"
          subtitle="Replicated across nodes · crash-safe · bounded memory model"
          accent="zinc"
          dashed
        >
          <ServerIcon className="h-5 w-5 text-zinc-400" />
        </ExtBox>
      </div>

      {/* Environment stack */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ExtBox title="Docker" subtitle="Container runtime" accent="blue">
          <SiIcon path={siDocker.path} hex={siDocker.hex} title="Docker" className="h-6 w-6" />
        </ExtBox>
        <ExtBox title="Kubernetes" subtitle="Orchestration" accent="blue">
          <SiIcon path={siKubernetes.path} hex={siKubernetes.hex} title="Kubernetes" className="h-6 w-6" />
        </ExtBox>
        <ExtBox title="LLM Provider" subtitle="Model-agnostic" accent="zinc">
          <div className="flex gap-1.5">
            <OpenAIIcon className="h-4 w-4" />
            <SiIcon path={siAnthropic.path} hex={siAnthropic.hex} title="Anthropic" className="h-4 w-4" />
            <SiIcon path={siGooglegemini.path} hex={siGooglegemini.hex} title="Gemini" className="h-4 w-4" />
            <SiIcon path={siOllama.path} hex={siOllama.hex} title="Ollama (local)" className="h-4 w-4 opacity-80" />
          </div>
        </ExtBox>
      </div>
    </ScenarioCard>
  );
}

/* ─── Public export ──────────────────────────────────────────────────── */
export default function RefArchDiagrams() {
  return (
    <section className="border-t border-purple-900/20 bg-[#0d0d16]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
          Reference architecture
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Building with Purple8
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
          Four deployment patterns for architects — from a solo developer&apos;s first
          app to a production Kubernetes cluster. Every scenario runs the same binary;
          only the topology changes.
        </p>

        <div className="mt-12 space-y-10">
          <Scenario1 />
          <Scenario2 />
          <Scenario3 />
          <Scenario4 />
        </div>
      </div>
    </section>
  );
}
