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
  const isDocIntel = product === "DocIntel";
  const paths = isDocIntel
    ? [
        {
          name: "DocIntel Playground ($0)",
          line: "Evaluate DocIntel immediately in your browser or connect your AI agent over MCP (/mcp, 13 tools).",
          note: "$0 Free · Browser & MCP Sandbox",
          cta: "Try DocIntel",
          href: sandboxHref,
          primary: false,
        },
        {
          name: "DocIntel Cloud & Self-Hosted",
          line:
            "Start with DocIntel Builder ($79/mo for 10K docs/mo), Production ($299/mo unlimited docs + SharePoint/Confluence/S3 connectors), or Growth ($599/mo multi-tenant + SSO).",
          note: "$79 · $299 · $599/mo (or Annual)",
          cta: "View DocIntel Plans →",
          href: "/pricing/#docintel",
          primary: true,
        },
        {
          name: "Enterprise / BYOC (VPC & Air-Gapped)",
          line: "Deploy inside your own AWS/Azure/GCP VPC, Red Hat OpenShift (UBI9), on-premise, or air-gapped network with custom domain adapters and 24×7 Severity-1 SLAs.",
          note: "Custom Annual License · Sovereign & Enterprise",
          cta: "Contact Us",
          href: mailto("Purple8 DocIntel - Enterprise Licensing Inquiry"),
          primary: false,
        },
      ]
    : [
        {
          name: "Free Playground ($0)",
          line: "Evaluate immediately in the Cloud Sandbox (10K nodes), connect your AI agent over MCP in 0 seconds, or run locally via Docker (50K nodes).",
          note: "$0 Free · Unlimited MCP Connections",
          cta: "Try Hyper Graph",
          href: sandboxHref,
          primary: false,
        },
        {
          name: "Builder, Production & Growth",
          line:
            "Start with Builder ($39/mo · 250K nodes · BYO LLM), Production ($149/mo · 1M nodes · Daily Backups & HA), or Growth ($499/mo · 5M nodes · Multi-Tenant RBAC & SSO).",
          note: "$39 · $149 · $499/mo (Cloud or Self-Hosted)",
          cta: "View Plans & Subscribe →",
          href: "/pricing/",
          primary: true,
        },
        {
          name: "Enterprise / BYOC (VPC & Air-Gapped)",
          line: "Deploy inside your own AWS/Azure/GCP VPC, Red Hat OpenShift (UBI9), on-premise, or air-gapped network with unlimited nodes, BYO KMS, SuperGraph, Autonomous SOC, and 24×7 SLAs.",
          note: "Custom Annual License · Sovereign & Enterprise",
          cta: "Contact Us",
          href: mailto("Purple8 Hyper Graph - Enterprise Licensing Inquiry"),
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
