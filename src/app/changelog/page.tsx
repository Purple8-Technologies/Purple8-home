import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPage, formatDate } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Changelog",
  description:
    "What's new in Purple8 Hyper Graph — bug fixes, new features, and improvements shipped to the developer tier.",
  path: "/changelog",
});

export default async function ChangelogPage() {
  const page = await getPage("changelog");
  if (!page) notFound();

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#0a0a0f] pt-16">
        <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          {/* Header */}
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            Product updates
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Changelog
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
            Every release shipped to the free developer tier. We ship small,
            frequently, and tell you exactly what changed.
          </p>

          {/* Latest badge */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-purple-700/50 bg-purple-900/20 px-4 py-1.5 text-sm text-purple-300">
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
            Latest: {page.date ? formatDate(page.date) : ""}
          </div>

          {/* Rendered markdown */}
          <div
            className="
              prose prose-invert prose-zinc mt-16 max-w-none
              prose-headings:text-white
              prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-16 prose-h2:mb-4
              prose-h3:text-lg prose-h3:font-semibold prose-h3:text-purple-300 prose-h3:mt-8 prose-h3:mb-2
              prose-p:text-zinc-300 prose-p:leading-relaxed
              prose-li:text-zinc-300
              prose-strong:text-white
              prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
              prose-code:text-purple-300 prose-code:bg-zinc-800 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:text-sm
              prose-hr:border-zinc-800
            "
            dangerouslySetInnerHTML={{ __html: page.html }}
          />

          {/* Footer CTA */}
          <div className="mt-24 border-t border-zinc-800 pt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div>
              <p className="text-sm font-medium text-white">Get notified of new releases</p>
              <p className="text-sm text-zinc-500 mt-1">
                <Link href="/beta" className="text-purple-400 hover:underline">
                  Join the beta
                </Link>{" "}
                to receive release emails.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
