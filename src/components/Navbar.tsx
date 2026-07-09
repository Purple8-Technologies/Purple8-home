"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Purple8Logo from "@/components/Purple8Logo";

const links = [
  { href: "#products", label: "Products" },
  { href: "#features", label: "Features" },
  { href: "#industries", label: "Industries" },
  { href: "/support", label: "Support" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
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
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-zinc-400 transition-colors hover:text-purple-400"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#pricing"
              className="rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500 shadow-lg shadow-purple-900/30"
            >
              Get Started
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden text-zinc-400 hover:text-white"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-purple-900/30 py-4 flex flex-col gap-4 pb-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-zinc-400 hover:text-purple-400"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white text-center"
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
