import Purple8Logo from "@/components/Purple8Logo";
import { NVIDIA_LEGAL_ATTRIBUTION } from "@/components/NvidiaInceptionBadge";

const productLinks = [
  { label: "Purple8 Hyper Graph", href: "/products/hyper-graph/" },
  { label: "Purple8 DocIntel", href: "/products/docintel/" },
  { label: "Architecture", href: "/architecture/" },
  { label: "Features", href: "/features/" },
  { label: "Industries", href: "/industries/" },
  { label: "Benchmarks", href: "/benchmarks/" },
];

const solutionLinks = [
  { label: "Agentic Process Automation", href: "/products/purple8/agentic-process-automation/" },
  { label: "Workflow Orchestration", href: "/products/purple8/workflow-orchestration/" },
  { label: "GraphRAG & RAG Pipeline", href: "/products/purple8/rag-pipeline/" },
  { label: "Multi-Agent Systems", href: "/products/purple8/multi-agent-systems/" },
  { label: "Financial Crime Intelligence", href: "/products/purple8/financial-crime-intelligence/" },
  { label: "M&A Due Diligence", href: "/products/purple8/ma-due-diligence/" },
  { label: "Medical Research", href: "/products/purple8/medical-research/" },
  { label: "Quantum-Inspired Optimisation", href: "/products/purple8/quantum-optimisation/" },
  { label: "All Solutions →", href: "/solutions/" },
];

const resourceLinks = [
  { label: "Hyper Graph Docs ↗", href: "https://docs.graph.purple8.ai", external: true },
  { label: "DocIntel Docs ↗", href: "https://docs.docintel.purple8.ai", external: true },
  { label: "Developers & Quickstart", href: "/quickstart/" },
  { label: "Case Studies", href: "/case-studies/" },
  { label: "Blog", href: "/blog/" },
  { label: "Changelog", href: "/changelog/" },
];

const companyLinks = [
  { label: "About", href: "/about/" },
  { label: "Careers", href: "/careers/" },
  { label: "Support", href: "/support/" },
  { label: "Contact Us", href: "mailto:sales@purple8.ai?subject=Purple8%20Inquiry" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--p8-border,#2e1065)] bg-[var(--p8-surface,#0a0a0f)] text-[var(--p8-fg,#f4f4f5)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2.5">
              <Purple8Logo className="h-8 w-16" />
              <span className="text-sm font-semibold tracking-tight">
                Purple<span className="text-[var(--p8-accent,#a855f7)]">8</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--p8-muted,#a1a1aa)]">
              AI-Native Execution Infrastructure. Built for AI, Operated by AI and Supervised by Humans.
            </p>
            <p className="mt-2 max-w-xs text-xs text-[var(--p8-muted,#a1a1aa)]">
              Read · Remember · Reason · Answer · Run · Protect · Prove
            </p>
            <p className="mt-4 text-xs text-[var(--p8-muted,#a1a1aa)]">
              Purple8 Inc. is a member of the NVIDIA Inception program
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--p8-muted,#a1a1aa)]">
              Products &amp; Platform
            </h4>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-[var(--p8-muted,#a1a1aa)] transition-colors hover:text-[var(--p8-accent,#a855f7)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--p8-muted,#a1a1aa)]">
              Solutions
            </h4>
            <ul className="mt-4 space-y-2.5">
              {solutionLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-[var(--p8-muted,#a1a1aa)] transition-colors hover:text-[var(--p8-accent,#a855f7)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Docs & Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--p8-muted,#a1a1aa)]">
              Docs &amp; Resources
            </h4>
            <ul className="mt-4 space-y-2.5">
              {resourceLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-[var(--p8-muted,#a1a1aa)] transition-colors hover:text-[var(--p8-accent,#a855f7)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--p8-muted,#a1a1aa)]">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-[var(--p8-muted,#a1a1aa)] transition-colors hover:text-[var(--p8-accent,#a855f7)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--p8-border,#27272a)] pt-8 sm:flex-row">
          <div>
            <p className="text-xs text-[var(--p8-muted,#a1a1aa)]">
              © {new Date().getFullYear()} Purple8 Inc. All rights reserved.
            </p>
            <p className="mt-1 text-[11px] text-[var(--p8-muted,#a1a1aa)] opacity-80">
              {NVIDIA_LEGAL_ATTRIBUTION}
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <a
              href="/legal/privacy/"
              className="text-xs text-[var(--p8-muted,#a1a1aa)] transition-colors hover:text-[var(--p8-accent,#a855f7)]"
            >
              Privacy Policy
            </a>
            <a
              href="/legal/terms/"
              className="text-xs text-[var(--p8-muted,#a1a1aa)] transition-colors hover:text-[var(--p8-accent,#a855f7)]"
            >
              Terms of Service
            </a>
            <a
              href="/legal/eula/"
              className="text-xs text-[var(--p8-muted,#a1a1aa)] transition-colors hover:text-[var(--p8-accent,#a855f7)]"
            >
              EULA
            </a>
            <a
              href="/legal/developer-agreement/"
              className="text-xs text-[var(--p8-muted,#a1a1aa)] transition-colors hover:text-[var(--p8-accent,#a855f7)]"
            >
              Developer Agreement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
