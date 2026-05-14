export default function BuiltOnPurple8() {
  return (
    <section className="bg-[#0d0d17] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-purple-900/40 bg-[#11111b] px-8 py-12 sm:px-14 sm:py-16">
          {/* Background glows */}
          <div className="pointer-events-none absolute -top-32 -left-32 h-64 w-64 rounded-full bg-purple-800/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-violet-800/10 blur-3xl" />

          <div className="relative flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* Left — copy */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
                Built on Purple8
              </div>

              <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
                We run our own stack on Purple8.
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  Zero external databases.
                </span>
              </h2>

              <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-400">
                Purple8&apos;s backend operations and customer portal — the entire
                commercial backend — runs on a single{" "}
                <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-xs text-purple-300">
                  Purple8 Hyper Graph
                </code>{" "}
                instance. No Postgres. No Redis. No message queue. One process,
                one port.
              </p>

              <p className="mt-3 text-sm text-zinc-500">
                If we trust it for our own operations, you can trust it for yours.
              </p>
            </div>

            {/* Right — architecture card */}
            <div className="w-full shrink-0 lg:w-80">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 font-mono text-xs leading-relaxed">
                <p className="mb-3 text-zinc-600">{`# Purple8 Command Center`}</p>
                <p className="text-zinc-400">
                  <span className="text-violet-400">Customer</span>
                  <span className="text-zinc-600"> ──PURCHASED──► </span>
                  <span className="text-purple-400">LicenseKey</span>
                </p>
                <p className="text-zinc-400">
                  <span className="text-violet-400">LicenseKey</span>
                  <span className="text-zinc-600"> ──ISSUED_FOR──► </span>
                  <span className="text-purple-400">Product</span>
                </p>
                <p className="text-zinc-400">
                  <span className="text-violet-400">StripeEvent</span>
                  <span className="text-zinc-600"> ──TRIGGERED──► </span>
                  <span className="text-purple-400">LicenseKey</span>
                </p>
                <p className="mt-3 text-zinc-400">
                  <span className="text-violet-400">Install</span>
                  <span className="text-zinc-600"> ──SENT──► </span>
                  <span className="text-purple-400">TelemetryEvent</span>
                </p>

                <div className="mt-4 border-t border-zinc-800 pt-4 space-y-1.5">
                  {[
                    ["Licensing",  "RS256 JWT issuance & validation"],
                    ["Billing",    "Stripe → license delivery"],
                    ["Telemetry",  "Anonymised install heartbeats"],
                    ["Portal",     "Internal ops dashboard"],
                  ].map(([label, desc]) => (
                    <div key={label} className="flex items-baseline gap-2">
                      <span className="w-20 shrink-0 text-purple-400">{label}</span>
                      <span className="text-zinc-600">{desc}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t border-zinc-800 pt-3 text-zinc-600">
                  <span className="text-green-500">✓</span> 0 external services &nbsp;
                  <span className="text-green-500">✓</span> 1 process &nbsp;
                  <span className="text-green-500">✓</span> 1 port
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
