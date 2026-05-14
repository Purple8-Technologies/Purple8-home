const tiers = [
  { name: "Developer", price: "Free", priceNote: "Forever" },
  { name: "Starter", priceNote: "Pricing finalising" },
  { name: "Pro", priceNote: "Pricing finalising" },
  { name: "Enterprise", priceNote: "Volume · OEM · air-gap" },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#0a0a0f] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Start free. Scale when you need to.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-500">
            Purple8 products are self-hosted — you run them in your own
            infrastructure. No usage metering, no data leaving your environment.
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-2xl rounded-2xl border border-purple-900/40 bg-[#11111b] p-10 text-center">
          <span className="inline-block rounded-full bg-purple-900/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-purple-400">
            Coming Soon
          </span>
          <h3 className="mt-5 text-xl font-bold text-white">
            Hyper Graph &amp; DocIntel
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
            Paid tiers are finalising — join the waitlist to be notified when
            they launch and lock in early-access pricing.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {tiers.map((t) => (
              <span
                key={t.name}
                className="rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-sm text-zinc-400"
              >
                {t.name}
                {"price" in t ? (
                  <span className="ml-1.5 text-purple-400">{t.price}</span>
                ) : (
                  <span className="ml-1.5 text-zinc-600">{t.priceNote}</span>
                )}
              </span>
            ))}
          </div>

          <a
            href="#waitlist"
            className="mt-8 inline-block rounded-full bg-purple-600 px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
          >
            Join the waitlist →
          </a>
        </div>

        <p className="mt-10 text-center text-xs text-zinc-600">
          All paid tiers will also be available through{" "}
          <span className="text-zinc-500">AWS Marketplace</span>,{" "}
          <span className="text-zinc-500">GCP Marketplace</span>, and{" "}
          <span className="text-zinc-500">Azure Marketplace</span>.
        </p>
      </div>
    </section>
  );
}
