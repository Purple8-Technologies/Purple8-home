import Purple8Logo from "@/components/Purple8Logo";

const productLinks = [
  { label: "Hyper Graph", href: "#products" },
  { label: "DocIntel", href: "#products" },
  { label: "More coming soon", href: "#waitlist" },
];

const companyLinks = [
  { label: "About", href: "#" },
  { label: "Early Access", href: "/beta" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "mailto:hello@purple8.ai" },
];

export default function Footer() {
  return (
    <footer className="border-t border-purple-900/30 bg-[#0a0a0f]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5">
              <Purple8Logo className="h-8 w-16" />
              <span className="text-sm font-semibold tracking-tight text-white">
                Purple<span className="text-purple-400">8</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-600">
              AI infrastructure software for enterprises and developers — deploy
              anywhere, no external dependencies.
            </p>
            <p className="mt-4 text-xs text-zinc-700">
              Purple8 Inc.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Products
            </h4>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-purple-400"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-purple-400"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-900 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-700">
            © {new Date().getFullYear()} Purple8 Inc. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-zinc-700 transition-colors hover:text-purple-400"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-zinc-700 transition-colors hover:text-purple-400"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
