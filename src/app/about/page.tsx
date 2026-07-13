import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About — Purple8",
  description:
    "Purple8 is the infrastructure layer AI apps are finally built on. One embedded backend for data, retrieval, workflow orchestration, and agent execution — replacing the fragmented stack of 29 separately billed services.",
};

// ── Slide 1 stats ────────────────────────────────────────────────────────────
const STATS = [
  { value: "9 GB", label: "peak RAM", sub: "vs 80+ GB for equivalent stacks" },
  { value: "70+", label: "document formats", sub: "parsed on-prem, zero data egress" },
  { value: "1", label: "deployment", sub: "replaces 29 separately billed services" },
];

// ── Slide 3 — the four beliefs ───────────────────────────────────────────────
const PILLARS = [
  {
    eyebrow: "What we proved",
    body: "Consolidation is not a trade-off. Purple8 outperforms fragmented stacks on memory, latency, and operational simplicity — simultaneously.",
  },
  {
    eyebrow: "What we rejected",
    body: 'The idea that "enterprise-grade" means complex. One process. One port. Zero external dependencies. That is the most defensible security architecture. We didn\'t add to the stack — we collapsed it.',
  },
  {
    eyebrow: "What we built for",
    body: "Anyone with an idea and a server — not just those with a hyperscaler contract.",
  },
  {
    eyebrow: "What we believe",
    body: "How Purple8 is built shows who it is built for. We designed Purple8 to put control back in the hands of builders. The architecture is the values.",
  },
];

// ── Slide 2 — the fragmented stack ───────────────────────────────────────────
const FRAGMENTS = [
  "vector database",
  "graph database",
  "orchestration framework",
  "OCR",
  "auth layer",
  "workflow engine",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0f] text-zinc-100">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left — headline */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
                About Purple8
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
                The infrastructure layer AI apps are{" "}
                <span className="text-purple-400">finally</span> built on.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-zinc-400">
                AI teams shouldn&apos;t have to stitch together 8–12 backend
                services just to ship one production workflow. Purple8 replaces
                fragmented AI infrastructure with{" "}
                <span className="text-white">one</span> embedded backend for
                data, retrieval, workflow orchestration, and agent execution.
              </p>
              <p className="mt-6 text-xl font-bold text-purple-300">
                Less Complexity. Infinite Possibility. Real Impact.
              </p>
              <p className="mt-1 text-base text-zinc-500">
                Stop managing infrastructure. Start owning it.
              </p>
            </div>

            {/* Right — stat panel */}
            <div className="rounded-3xl border border-purple-900/40 bg-gradient-to-b from-purple-900/25 to-[#11111b] p-8 sm:p-10">
              <div className="divide-y divide-purple-900/30">
                {STATS.map((s) => (
                  <div key={s.label} className="py-6 first:pt-0 last:pb-0 text-center">
                    <div className="text-5xl font-extrabold text-purple-400">
                      {s.value}
                    </div>
                    <div className="mt-2 text-base font-bold text-white">
                      {s.label}
                    </div>
                    <div className="mt-1 text-xs text-zinc-500">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Challenge / Solution ── */}
        <FadeIn direction="up">
          <section className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800 bg-[#11111b] p-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  The challenge
                </p>
                <p className="mt-3 text-base leading-relaxed text-zinc-300">
                  Building a production AI workflow today means assembling a
                  vector database, a graph database, an orchestration layer, a
                  document parser, and an auth service — then writing glue code
                  to hold it all together.
                </p>
              </div>
              <div className="rounded-2xl border border-purple-700/50 bg-purple-900/10 p-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                  The solution
                </p>
                <p className="mt-3 text-base leading-relaxed text-zinc-200">
                  Purple8 is all of that in a single binary. Deploy once. Own
                  everything. Your hardware, your data — no vendor bill for each
                  piece. Purple8 gives AI agents high-leverage execution over
                  enterprise data and workflows, with built-in governance,
                  isolation, and observability.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── Why we exist ── */}
        <FadeIn direction="up">
          <section className="border-y border-purple-900/20 bg-[#0d0d17] px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-5xl font-extrabold leading-none text-white">
                  Why
                  <br />
                  we
                  <br />
                  exist
                </h2>
                <p className="mt-8 max-w-md text-lg font-semibold text-purple-300">
                  To unlock infinite abundance by removing the barriers between
                  human ideas and real-world impact.
                </p>
                <p className="mt-2 text-sm italic text-purple-400/70">
                  Less Complexity. Infinite Possibility. Real Impact.
                </p>
              </div>

              <div>
                {/* scattered fragments */}
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {FRAGMENTS.map((f) => (
                    <span key={f} className="text-sm text-purple-300/70">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-8 rounded-2xl border border-purple-900/50 bg-[#11111b] p-7">
                  <p className="text-lg leading-relaxed text-zinc-300">
                    It was an accident of how the market evolved. And it has been
                    quietly blocking a generation of builders who had the ideas
                    but couldn&apos;t afford the infrastructure to build them.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── The origin ── */}
        <FadeIn direction="up">
          <section className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
                The origin
              </p>
              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                {/* Left — narrative */}
                <div className="rounded-3xl border border-zinc-800 bg-[#11111b] p-8 sm:p-10">
                  <div className="text-4xl leading-none text-purple-500">“</div>
                  <h2 className="mt-2 text-3xl font-bold text-white">
                    Built out of <span className="text-purple-400">frustration</span>.
                    Refined into <span className="text-purple-400">purpose</span>.
                  </h2>
                  <p className="mt-6 leading-relaxed text-zinc-400">
                    Purple8 was founded on a simple observation: the complexity
                    of modern AI infrastructure isn&apos;t inevitable. It&apos;s
                    the result of an ecosystem where organisations assemble
                    multiple specialised tools to deliver a single AI solution.
                  </p>
                  <p className="mt-4 leading-relaxed text-zinc-400">
                    Every integration adds cost, risk, governance challenges, and
                    operational overhead.
                  </p>
                  <p className="mt-4 font-semibold italic text-purple-300">
                    We decided to build differently. Not by adding to the stack —
                    but by collapsing it.
                  </p>
                </div>

                {/* Right — four pillars */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {PILLARS.map((p) => (
                    <div
                      key={p.eyebrow}
                      className="flex flex-col rounded-2xl border border-zinc-800 bg-[#11111b] p-5"
                    >
                      <span className="mb-3 w-fit rounded-md bg-purple-600/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-purple-300">
                        {p.eyebrow}
                      </span>
                      <p className="text-sm leading-relaxed text-zinc-400">
                        {p.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── The name ── */}
        <FadeIn direction="up">
          <section className="border-y border-purple-900/20 bg-[#0d0d17] px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
                The name
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-purple-900/50 bg-[#11111b] p-8">
                  <div className="text-6xl font-extrabold text-purple-400">P</div>
                  <h3 className="mt-4 text-lg font-bold text-white">
                    Purple — Abundant Possibility
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    For centuries, purple represented those who dared to build
                    something that didn&apos;t exist yet — technology that opens
                    possibility rather than gatekeeping it.
                  </p>
                </div>
                <div className="rounded-3xl border border-purple-900/50 bg-[#11111b] p-8">
                  <div className="text-6xl font-extrabold text-purple-400">8</div>
                  <h3 className="mt-4 text-lg font-bold text-white">
                    8 — Infinite Scale
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    Turn it on its side: ∞. Infinite reach. A system that does
                    not run out of capability as the problem grows. Together:
                    Infinite Abundance.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── Founding leadership ── */}
        <FadeIn direction="up">
          <section className="px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
                Founding leadership
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Built by people who had to live with the problem first.
              </h2>

              <div className="mt-12 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start">
                {/* Founder photo. Drop the image at public/founders/nikhil.jpg */}
                <img
                  src="/founders/nikhil.jpg"
                  alt="Nikhil, Founder & CEO of Purple8"
                  className="h-32 w-32 shrink-0 rounded-full object-cover ring-2 ring-purple-600/50"
                />

                <div>
                  <h3 className="text-2xl font-bold text-white">Nikhil</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-purple-400">
                    Founder &amp; CEO
                  </p>
                  <p className="mt-5 leading-relaxed text-zinc-400">
                    Nikhil spent over two decades leading AI, ML, and cloud
                    infrastructure programmes at HSBC across risk operations,
                    enterprise intelligence, and large-scale delivery. He knows
                    exactly what it costs to build production-grade AI inside a
                    real institution — fragmented vendors, compliance overhead,
                    infrastructure that takes months to assemble and breaks at
                    3am.
                  </p>
                  <p className="mt-4 leading-relaxed text-zinc-400">
                    That direct experience is why he built Purple8 differently.
                    Not as another service to add to the stack, but as the
                    infrastructure layer that replaces it. His work now spans
                    AI-native platforms for architecture firms to GeoHarvestAI, a
                    sovereign intelligence layer helping state governments
                    optimise agricultural infrastructure at national scale.
                  </p>
                  <p className="mt-5 text-sm italic text-purple-400/80">
                    He builds for the long problems. The ones with real
                    consequences.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── CTA ── */}
        <FadeIn direction="up">
          <section className="px-4 pb-28 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl rounded-3xl border border-purple-700/50 bg-gradient-to-b from-purple-900/25 to-[#11111b] p-10 text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Stop managing infrastructure. Start owning it.
              </h2>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/#pricing"
                  className="rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
                >
                  Get started free →
                </a>
                <a
                  href="mailto:hello@purple8.ai"
                  className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-purple-600 hover:text-white"
                >
                  Talk to us
                </a>
              </div>
            </div>
          </section>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
