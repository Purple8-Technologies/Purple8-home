import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSlugs, getDoc, formatDate } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getSlugs("case-studies").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDoc("case-studies", slug);
  if (!doc) {
    return {
      title: "Case study not found",
      robots: { index: false, follow: false },
    };
  }
  return pageMetadata({
    title: doc.title,
    description: doc.description,
    path: `/case-studies/${slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const doc = await getDoc("case-studies", slug);
  if (!doc) notFound();

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#0a0a0f] pt-16">
        <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <Link
            href="/case-studies/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-purple-400"
          >
            ← Back to case studies
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            {doc.customer && (
              <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-0.5 font-medium text-purple-300">
                {doc.customer}
              </span>
            )}
            {doc.industry && <span>{doc.industry}</span>}
            <span>·</span>
            <time dateTime={doc.date}>{formatDate(doc.date)}</time>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {doc.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            {doc.description}
          </p>

          {doc.result && (
            <div className="mt-8 rounded-2xl border border-purple-700/40 bg-purple-950/30 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                Result
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {doc.result}
              </p>
            </div>
          )}

          <div
            className="prose-p8 mt-12"
            dangerouslySetInnerHTML={{ __html: doc.html }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
