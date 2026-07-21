import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { benchmarkGroups, benchmarkMeta } from "@/lib/benchmarks";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Benchmarks",
  description:
    "Real, reproducible performance data for Purple8 — latency, throughput, and hardware-bounded memory. Every number carries its test conditions.",
  path: "/benchmarks",
});

export default function BenchmarksPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0f] pt-16">
        <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          {/* Header */}
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            Benchmarks
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Real numbers, with the conditions attached.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
            Every figure below comes from a reproducible run in our benchmark
            suite. We publish the test conditions next to each number, because a
            latency figure without its workload is marketing, not measurement.
          </p>

          {/* Groups */}
          <div className="mt-16 space-y-16">
            {benchmarkGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-2xl font-bold text-white">{group.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
                  {group.blurb}
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-purple-900/40 bg-[#11111b] p-6"
                    >
                      <div className="text-3xl font-bold tabular-nums text-purple-400">
                        {item.value}
                      </div>
                      <div className="mt-1 text-sm font-medium text-white">
                        {item.label}
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                        {item.conditions}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Methodology / reproducibility */}
          <div className="mt-20 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 p-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              Methodology
            </h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-zinc-600">
                  Instance
                </dt>
                <dd className="mt-1 text-sm text-zinc-400">
                  {benchmarkMeta.instance}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-zinc-600">
                  Engine
                </dt>
                <dd className="mt-1 text-sm text-zinc-400">
                  {benchmarkMeta.engine}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-zinc-600">
                  Suite
                </dt>
                <dd className="mt-1 text-sm text-zinc-400">
                  {benchmarkMeta.suite}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-zinc-600">
                  Last run
                </dt>
                <dd className="mt-1 text-sm text-zinc-400">
                  {benchmarkMeta.date}
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-zinc-600">
              Latency figures marked as single-user are not measured under
              concurrent load. Direct-engine figures exclude HTTP, auth, and
              serialization overhead. Memory behavior is bounded by available
              RAM via hardware-aware auto-config; a fixed-corpus deployment
              reaches steady state once index pages are warm.{" "}
              {benchmarkMeta.engineNote}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
