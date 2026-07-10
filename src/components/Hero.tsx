import CodeTerminal from "@/components/CodeTerminal";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0f] pt-16">
      {/* Subtle background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-purple-900/15 blur-3xl" />
        <div className="absolute top-1/2 -left-64 h-[400px] w-[400px] rounded-full bg-purple-800/8 blur-3xl" />
        <div className="absolute top-1/2 -right-64 h-[400px] w-[400px] rounded-full bg-violet-900/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center gap-16 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8">

        {/* Left column */}
        <div className="flex flex-1 flex-col items-start text-left">

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.5rem] xl:leading-[1.08]">
            Your entire backend.
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              One process. Zero to wire.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-zinc-400">
            Purple8 is the AI-native backend that replaces 20+ services — database,
            vector search, graph, RAG, document intelligence, workflow orchestration,
            auth, and encryption — with one embedded engine. You build the frontend;
            Purple8 is everything behind it.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="/register"
              className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500"
            >
              Start free — Developer edition
            </a>
            <a
              href="#calculator"
              className="group inline-flex items-center gap-1.5 text-base font-semibold text-zinc-300 transition-colors hover:text-white"
            >
              Find your tier
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>

          <p className="mt-4 text-sm text-zinc-600">
            Free forever · No credit card · Runs on your own machine
          </p>

          {/* 4 tags max */}
          <div className="mt-12 flex flex-wrap gap-2.5">
            {["openCypher", "MCP Native", "Model-Agnostic", "Self-Hosted"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3.5 py-1 text-xs text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right column — terminal */}
        <div className="w-full flex-1 lg:max-w-[560px]">
          <CodeTerminal />
        </div>

      </div>
    </section>
  );
}
