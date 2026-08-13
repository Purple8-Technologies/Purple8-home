"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Purple8Logo from "@/components/Purple8Logo";

const solutions = [
  {
    href: "/products/purple8/agentic-process-automation/",
    name: "Agentic Process Automation",
    desc: "Journey Engine · SLA · HITL · audit trail",
    icon: "🤖",
    color: "text-purple-300",
  },
  {
    href: "/products/purple8/workflow-orchestration/",
    name: "Workflow Orchestration",
    desc: "Stateful pipelines · SLA · CDC triggers · no Airflow",
    icon: "🔄",
    color: "text-purple-300",
  },
  {
    href: "/products/purple8/rag-pipeline/",
    name: "GraphRAG & RAG Pipeline",
    desc: "Flat vector · GraphRAG · hybrid · self-tuning",
    icon: "🔍",
    color: "text-purple-300",
  },
  {
    href: "/products/purple8/multi-agent-systems/",
    name: "Multi-Agent Systems",
    desc: "Shared graph memory · swarm coordination · RBAC",
    icon: "🤝",
    color: "text-purple-300",
  },
  {
    href: "/products/purple8/opinion-engine/",
    name: "Opinion Engine",
    desc: "Belief graphs · stance detection · influence tracking",
    icon: "💡",
    color: "text-purple-300",
  },
  {
    href: "/products/purple8/scenario-simulation/",
    name: "Scenario Simulation",
    desc: "What-if analysis · supply chain · stress testing",
    icon: "🔮",
    color: "text-violet-300",
  },
  {
    href: "/products/purple8/quantum-optimisation/",
    name: "Quantum-Inspired Optimisation",
    desc: "VRP · scheduling · portfolio · QUBO",
    icon: "⚛️",
    color: "text-violet-300",
  },
  {
    href: "/products/purple8/medical-research/",
    name: "Medical Research",
    desc: "Drug discovery · clinical trials · genomics · imaging · VQE",
    icon: "🧬",
    color: "text-violet-300",
  },
  {
    href: "/products/purple8/ma-due-diligence/",
    name: "M&A Due Diligence",
    desc: "Data room to board paper · agents · audit trail",
    icon: "🏦",
    color: "text-purple-300",
  },
  {
    href: "/products/purple8/financial-crime-intelligence/",
    name: "Financial Crime Intelligence",
    desc: "AML · fraud · sanctions screening · KYC · SAR filing",
    icon: "�️",
    color: "text-purple-300",
  },
  {
    href: "/products/purple8/fashion-intelligence/",
    name: "Fashion Trend Intelligence",
    desc: "Trend origin · influencer graph · SKU · dead stock",
    icon: "👗",
    color: "text-violet-300",
  },
  {
    href: "/products/purple8/ai-architect/",
    name: "AI Architect Intelligence",
    desc: "Project graph · RIBA lifecycle · Phase 8 algorithms · BIM",
    icon: "🏛️",
    color: "text-teal-300",
  },
  {
    href: "/products/purple8/equity-research-management/",
    name: "Equity Research Management",
    desc: "Data lineage · HITL approval · publishing · semantic portal · audit",
    icon: "📈",
    color: "text-amber-300",
  },
];

const platformProducts = [
  {
    href: "/products/purple8/",
    name: "Purple8 Hyper Graph",
    desc: "Multi-model embedded backend — graph, vector, RAG, workflows, auth",
    color: "text-purple-400",
    dot: "bg-purple-500",
  },
  {
    href: "/products/docintel/",
    name: "DocIntel",
    desc: "70-format document intelligence — parse, extract, emit to Purple8",
    color: "text-violet-400",
    dot: "bg-violet-500",
  },
];

const appProducts = [
  {
    href: "/focus/",
    name: "Focus",
    desc: "On-device cognitive capacity agent for deep work",
    color: "text-purple-300",
    dot: "bg-purple-400",
    badge: "Personal · $5/mo",
  },
  {
    href: "/products/nexus/",
    name: "Nexus",
    desc: "AI-powered enterprise Knowledge Management System",
    color: "text-blue-400",
    dot: "bg-blue-500",
    badge: "Enterprise KMS",
  },
  {
    href: "/products/architect/",
    name: "Architect",
    desc: "Design intelligence for AEC teams — BIM, structural, MEP",
    color: "text-teal-400",
    dot: "bg-teal-500",
    badge: "AEC & Engineering",
  },
];

const plainLinks = [
  { href: "/features/", label: "Features" },
  { href: "/industries/", label: "Industries" },
  { href: "/architecture/", label: "Architecture" },
  { href: "/benchmarks/", label: "Benchmarks" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/about/", label: "About" },
  { href: "/support/", label: "Support" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const productsActive =
    pathname.startsWith("/products/") || pathname.startsWith("/focus/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:bg-purple-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-purple-900/50 bg-[#0a0a0f]/95 shadow-lg shadow-purple-950/30 backdrop-blur-lg"
            : "border-purple-900/30 bg-[#0a0a0f]/80 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <Purple8Logo className="h-8 w-16" />
              <span className="text-sm font-semibold tracking-tight text-white">
                Purple<span className="text-purple-400">8</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden items-center gap-8 md:flex">
              {/* Products dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  className={`group relative flex items-center gap-1 text-sm transition-colors ${
                    productsActive ? "text-purple-400" : "text-zinc-400 hover:text-purple-400"
                  }`}
                >
                  Products
                  <svg
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  <span
                    className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-purple-500 transition-all duration-300 ${
                      productsActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-72 rounded-xl border border-purple-900/40 bg-[#0f0f1a]/98 py-3 shadow-xl shadow-purple-950/40 backdrop-blur-xl">
                    {/* Platform section */}
                    <p className="px-4 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                      Platform
                    </p>

                    {/* Purple8 Hyper Graph — hover to reveal capabilities */}
                    <div className="group/p8 relative">
                      <Link
                        href="/products/purple8/"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 transition-colors hover:bg-purple-500/10"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
                        <span className="text-sm font-medium text-purple-400 flex-1">Purple8 Hyper Graph</span>
                        {/* chevron — rotates when group hovered */}
                        <svg
                          className="h-3 w-3 text-zinc-600 transition-transform duration-200 group-hover/p8:rotate-90"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>

                      {/* Capabilities — hidden until hover on parent row */}
                      <div className="grid grid-rows-[0fr] transition-all duration-200 group-hover/p8:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          {solutions.map((s) => (
                            <Link
                              key={s.href}
                              href={s.href}
                              onClick={() => setDropdownOpen(false)}
                              className="flex items-center gap-2.5 pl-9 pr-4 py-1.5 transition-colors hover:bg-purple-500/10"
                            >
                              <span className={`text-xs font-medium ${s.color}`}>{s.name}</span>
                            </Link>
                          ))}
                          <div className="ml-9 mr-4 mb-1 border-b border-purple-900/20" />
                        </div>
                      </div>
                    </div>

                    {/* Rest of platform products */}
                    {platformProducts.slice(1).map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 transition-colors hover:bg-purple-500/10"
                      >
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${p.dot}`} />
                        <span className={`text-sm font-medium ${p.color}`}>{p.name}</span>
                      </Link>
                    ))}

                    {/* Divider */}
                    <div className="my-2 border-t border-purple-900/30" />

                    {/* Apps section */}
                    <p className="px-4 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                      Applications
                    </p>
                    {appProducts.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 transition-colors hover:bg-purple-500/10"
                      >
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${p.dot}`} />
                        <span className={`text-sm font-medium ${p.color}`}>{p.name}</span>
                        {p.badge && (
                          <span className="ml-auto text-[10px] text-zinc-600">{p.badge.split(" · ")[0]}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Plain links */}
              {plainLinks.map((l) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative text-sm transition-colors ${
                      active ? "text-purple-400" : "text-zinc-400 hover:text-purple-400"
                    }`}
                  >
                    {l.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-purple-500 transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="/#calculator"
                className="rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500 shadow-lg shadow-purple-900/30"
              >
                Get Started
              </a>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="md:hidden text-zinc-400 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div id="mobile-menu" className="md:hidden border-t border-purple-900/30 py-4 flex flex-col gap-1 pb-6 px-4">
            {/* Platform */}
            <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Platform</p>
            {platformProducts.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-2 py-2 text-sm font-medium ${p.color}`}
              >
                {p.name}
              </Link>
            ))}
            {/* Apps */}
            <p className="mt-2 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Applications</p>
            {appProducts.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-2 py-2 text-sm font-medium ${p.color}`}
              >
                {p.name}
                {p.badge && <span className="ml-2 text-xs text-zinc-500">{p.badge}</span>}
              </Link>
            ))}
            {/* Solutions */}
            <p className="mt-2 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Solutions</p>
            {solutions.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm font-medium text-purple-300 flex items-center gap-2"
              >
                {s.name}
              </Link>
            ))}
            {/* Plain links */}
            <div className="mt-2 border-t border-purple-900/30 pt-3 flex flex-col gap-2">
              {plainLinks.map((l) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`px-2 py-1 text-sm ${active ? "font-semibold text-purple-400" : "text-zinc-400 hover:text-purple-400"}`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
            <a
              href="/#calculator"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white text-center"
            >
              Get Started
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
