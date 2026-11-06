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
      name: "Cloud Sandbox & Local Dev",
      line: "Evaluate immediately in your browser, connect your AI agent over MCP in 0 seconds, or run locally via Docker up to 50K nodes.",
      note: "$0 Free · Instant MCP & Local Dev",
      cta: `Try ${product}`,
      href: sandboxHref,
      primary: false,
    },
    {
      name: "Purple8 Cloud SaaS (Managed HA)",
      line:
        "Built for indie developers, startups, and small businesses: fully managed Cloud SaaS with Full HA (RPO ≈ 0), automated backups, 500K nodes, 5 MCP agents, and bundled DocIntel - replacing a $450/mo 6-vendor stack.",
      note: "$49/mo ($39/mo annual) · Indie & Small Teams",
      cta: "Start Cloud SaaS →",
      href: "/checkout/create-session/?plan=cloud-saas&billing=monthly",
      primary: true,
    },
    {
      name: "Enterprise VPC, On-Prem & Air-Gapped",
      line: "Deploy inside your own AWS/Azure/GCP VPC, Red Hat OpenShift (UBI9), on-premise, or air-gapped network with unlimited nodes & agents, SSO/OIDC, BYO KMS, SuperGraph, Autonomous SOC, and 24×7 SLAs.",
      note: "Custom Annual License · Sovereign & Enterprise",
      cta: "Contact Us",
      href: mailto(`Purple8 ${product} - Enterprise Licensing Inquiry`),
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
          {product === "DocIntel" && p.name === "Cloud Sandbox" ? (
            <DocIntelWorkspaceLink
              view="playground"
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
