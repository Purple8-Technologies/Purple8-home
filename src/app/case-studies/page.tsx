import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllMeta, formatDate } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description:
    "How teams replace a multi-service stack with a single Purple8 process — real workloads, real numbers.",
  path: "/case-studies",
});

export default function CaseStudiesIndexPage() {
  const studies = getAllMeta("case-studies");

  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0f] pt-16">
        <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            Case Studies
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Real workloads, real numbers
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
            How teams collapse a multi-service backend into a single Purple8
            process — and what it does for their infrastructure.
          </p>

          {studies.length === 0 ? (
            <p className="mt-16 text-zinc-500">
              No case studies yet — check back soon.
            </p>
          ) : (
            <div className="mt-16 space-y-4">
              {studies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className="group block rounded-2xl border border-purple-900/40 bg-[#11111b] p-6 transition-all hover:border-purple-600/50 sm:p-8"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                    {study.customer && (
                      <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-0.5 font-medium text-purple-300">
                        {study.customer}
                      </span>
                    )}
                    {study.industry && <span>{study.industry}</span>}
                    <span>·</span>
                    <time dateTime={study.date}>{formatDate(study.date)}</time>
                  </div>
                  <h2 className="mt-3 text-xl font-bold text-white group-hover:text-purple-200">
                    {study.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {study.description}
                  </p>
                  {study.result && (
                    <p className="mt-4 text-sm font-semibold text-purple-300">
                      {study.result}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center text-sm text-purple-400 group-hover:text-purple-300">
                    Read the study →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
