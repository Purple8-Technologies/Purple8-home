// The three ways to start. Shared by both product pages so the wording
// never drifts (docs/revamp/10-site-pages.md §2.1, decisions PP1/PP2).
// Colours come only from var(--p8-*) so day and night both work.

import DocIntelWorkspaceLink from "@/components/DocIntelWorkspaceLink";

type Props = {
  product: "Hyper Graph" | "DocIntel";
  sandboxHref: string;
};

function mailto(subject: string) {
  return `mailto:hello@purple8.ai?subject=${encodeURIComponent(subject)}`;
}

export default function StartPaths({ product, sandboxHref }: Props) {
  const paths = [
    {
      name: "Sandbox",
      line: "Try it now with synthetic data.",
      note: "$10 free credit · 30 days",
      cta: `Try ${product}`,
      href: sandboxHref,
      primary: true,
    },
    {
      name: "Self-hosted",
      line: "Your infrastructure, your data.",
      note: "Pro and Enterprise",
      cta: "Talk to us",
      href: mailto(`Purple8 ${product}: self-hosted (Pro / Enterprise)`),
      primary: false,
    },
    {
      name: "Purple8 Cloud",
      line: "Fully managed by Purple8.",
      note: product === "DocIntel" ? "Hosted document intelligence" : "Coming soon",
      cta: product === "DocIntel" ? "Explore Cloud in the workspace" : "Join the waitlist",
      href: mailto(`Purple8 ${product}: Cloud waitlist`),
      primary: false,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {paths.map((p) => (
        <div
          key={p.name}
          className={
            "flex flex-col rounded-2xl border bg-[var(--p8-surface)] p-7 " +
            (p.primary ? "border-[var(--p8-accent)]" : "border-[var(--p8-border)]")
          }
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--p8-accent)]">{p.note}</p>
          <h3 className="mt-3 text-xl font-semibold">{p.name}</h3>
          <p className="mt-2 flex-1 text-[var(--p8-muted)]">{p.line}</p>
          {product === "DocIntel" && p.name !== "Self-hosted" ? (
            <DocIntelWorkspaceLink
              view={p.name === "Sandbox" ? "playground" : "billing"}
              className={
                "mt-8 rounded-full px-5 py-2.5 text-center text-sm font-semibold transition " +
                (p.primary
                  ? "bg-[var(--p8-button)] text-white hover:opacity-90"
                  : "border border-[var(--p8-border)] hover:border-[var(--p8-accent)] hover:text-[var(--p8-accent)]")
              }
            >
              {p.cta}
            </DocIntelWorkspaceLink>
          ) : <a
            href={p.href}
            className={
              "mt-8 rounded-full px-5 py-2.5 text-center text-sm font-semibold transition " +
              (p.primary
                ? "bg-[var(--p8-button)] text-white hover:opacity-90"
                : "border border-[var(--p8-border)] hover:border-[var(--p8-accent)] hover:text-[var(--p8-accent)]")
            }
          >
            {p.cta}
          </a>}
        </div>
      ))}
    </div>
  );
}
