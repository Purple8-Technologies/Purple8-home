import CodeTerminal from "@/components/CodeTerminal";
import NeuralCanvas from "@/components/NeuralCanvas";

const techTags = [
  "openCypher",
  "Vector Search",
  "Full-Text Search",
  "Journey Engine",
  "MCP Native",
  "Claude Code",
  "Cursor",
  "GitHub Copilot",
  "Model-Agnostic",
  "SuperGraph Federation",
  "GLiNER-Purple8 NER",
  "70+ File Formats",
  "Rust Core",
  "AES-256-GCM",
  "Multi-Tenant",
  "Docker & Native Installers",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0f] pt-16">
      {/* ── Neural graph canvas — fills the entire hero ── */}
      <NeuralCanvas />

      {/* Background glows — sit on top of canvas, below content */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-purple-900/20 blur-3xl" />
        <div className="absolute top-1/3 -left-56 h-[500px] w-[500px] rounded-full bg-purple-800/10 blur-3xl" />
        <div className="absolute top-1/3 -right-56 h-[500px] w-[500px] rounded-full bg-violet-900/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center gap-16 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-8">

        {/* ── Left column ── */}
        <div className="flex flex-1 flex-col items-start text-left">
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-300">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
            AI-Native Infrastructure · Built for What Comes Next
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            The infrastructure layer
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              AI apps are built on
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            From idea to production in days, not months. Graph, vector, document
            intelligence, and workflow orchestration in one embedded process —
            no external services, no sprawl.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#products"
              className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500"
            >
              Explore Products
            </a>
            <a
              href="#waitlist"
              className="rounded-full border border-purple-500/40 bg-purple-500/5 px-8 py-3.5 text-base font-semibold text-purple-300 transition-colors hover:border-purple-400/60 hover:bg-purple-500/10"
            >
              Request Early Access
            </a>
          </div>

          {/* Tech tags */}
          <div className="mt-12 flex flex-wrap gap-2">
            {techTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-800 bg-zinc-900/70 px-3.5 py-1 text-xs text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right column — animated terminal ── */}
        <div className="w-full flex-1 lg:max-w-[560px]">
          <CodeTerminal />
        </div>

      </div>
    </section>
  );
}
