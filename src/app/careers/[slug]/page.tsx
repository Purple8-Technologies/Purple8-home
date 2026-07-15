import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { activeRoles, getRole } from "@/lib/careers";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return activeRoles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) return { title: "Role not found — Purple8" };
  return {
    title: `${role.title} — Careers — Purple8`,
    description: role.tagline,
  };
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-10">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-purple-400">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-600/20 text-purple-400">
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function RolePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) notFound();

  const subject = encodeURIComponent(`Purple8 — Application: ${role.title}`);

  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0f] pt-16">
        <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <Link
            href="/careers"
            className="text-sm text-purple-400 transition-colors hover:text-purple-300"
          >
            &larr; All roles
          </Link>

          {/* Header */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-0.5 text-xs font-medium text-purple-300">
              {role.team}
            </span>
            <span className="text-xs text-zinc-500">{role.location}</span>
            <span className="text-xs text-zinc-500">·</span>
            <span className="text-xs text-zinc-500">{role.type}</span>
            <span className="text-xs text-zinc-500">·</span>
            <span className="text-xs text-zinc-500">{role.level}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            {role.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            {role.tagline}
          </p>

          {/* About */}
          <div className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              About the role
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              {role.about}
            </p>
          </div>

          <Section title={"What you\u2019ll own"} items={role.responsibilities} />
          <Section title={"What we\u2019re looking for"} items={role.requirements} />
          <Section title="Nice to have" items={role.niceToHave} />

          {/* Apply */}
          <div className="mt-14 rounded-2xl border border-purple-900/40 bg-[#11111b] p-8 text-center">
            <h2 className="text-lg font-bold text-white">Interested?</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Send a short note and anything that shows how you work — code,
              writing, or a project you&apos;re proud of.
            </p>
            <a
              href={`mailto:careers@purple8.ai?subject=${subject}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
            >
              Apply for this role
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
