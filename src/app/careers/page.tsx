import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { activeRoles } from "@/lib/careers";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Help build the AI-native backend that replaces 20+ services with one process. Open engineering, developer experience, and operations roles at Purple8.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0f] pt-16">
        <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          {/* Header */}
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            Careers
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Build the backend that replaces the stack.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
            Purple8 is an embedded, AI-native backend — storage, vector search,
            RAG, workflows, auth, and encryption in a single process. We&apos;re a
            small, senior team shipping toward launch with a &ldquo;zero
            gaps&rdquo; quality bar. If you want deep ownership of a real systems
            problem, read on.
          </p>

          {/* Roles */}
          <div className="mt-16 space-y-4">
            {activeRoles.map((role) => (
              <Link
                key={role.slug}
                href={`/careers/${role.slug}`}
                className="group block rounded-2xl border border-purple-900/40 bg-[#11111b] p-6 transition-all hover:border-purple-600/50 sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-0.5 text-xs font-medium text-purple-300">
                    {role.team}
                  </span>
                  <span className="text-xs text-zinc-500">{role.location}</span>
                  <span className="text-xs text-zinc-500">·</span>
                  <span className="text-xs text-zinc-500">{role.type}</span>
                  <span className="text-xs text-zinc-500">·</span>
                  <span className="text-xs text-zinc-500">{role.level}</span>
                </div>
                <h2 className="mt-3 text-xl font-bold text-white group-hover:text-purple-200">
                  {role.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {role.tagline}
                </p>
                <span className="mt-4 inline-flex items-center text-sm text-purple-400 group-hover:text-purple-300">
                  View role &rarr;
                </span>
              </Link>
            ))}
          </div>

          {/* No exact match */}
          <div className="mt-12 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 px-8 py-8 text-center">
            <p className="text-sm text-zinc-400">
              Don&apos;t see your exact role? We still want to hear from
              exceptional systems, AI, and developer-experience people.
            </p>
            <a
              href="mailto:careers@purple8.ai?subject=Purple8%20%E2%80%94%20General%20application"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
            >
              Get in touch
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
