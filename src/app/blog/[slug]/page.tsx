import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSlugs, getDoc, formatDate } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getSlugs("blog").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDoc("blog", slug);
  if (!doc) {
    return { title: "Post not found", robots: { index: false, follow: false } };
  }
  return pageMetadata({
    title: doc.title,
    description: doc.description,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const doc = await getDoc("blog", slug);
  if (!doc) notFound();

  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0f] pt-16">
        <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-purple-400"
          >
            ← Back to blog
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <time dateTime={doc.date}>{formatDate(doc.date)}</time>
            {doc.author && (
              <>
                <span>·</span>
                <span>{doc.author}</span>
              </>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {doc.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            {doc.description}
          </p>

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
