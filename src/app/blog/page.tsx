import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllMeta, formatDate } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Engineering notes, architecture deep-dives, and product updates from the Purple8 team.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllMeta("blog");

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#0a0a0f] pt-16">
        <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            Blog
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Notes from the team
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
            Engineering deep-dives, architecture decisions, and product updates
            as we build toward launch.
          </p>

          {posts.length === 0 ? (
            <p className="mt-16 text-zinc-500">No posts yet — check back soon.</p>
          ) : (
            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-purple-900/40 bg-[#11111b] p-6 transition-all hover:border-purple-600/50 sm:p-8"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.author && (
                      <>
                        <span>·</span>
                        <span>{post.author}</span>
                      </>
                    )}
                  </div>
                  <h2 className="mt-3 text-xl font-bold text-white group-hover:text-purple-200">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                    {post.description}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-zinc-800 bg-zinc-900/60 px-2.5 py-0.5 text-xs text-zinc-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="mt-4 inline-flex items-center text-sm text-purple-400 group-hover:text-purple-300">
                    Read more →
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
