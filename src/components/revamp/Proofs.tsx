// "By the numbers" — the proofs section. Shared by both product pages
// so layout, heading and link wording are identical; only the data differs.
// Max three proofs; each must link to its evidence.

export type Proof = { figure: string; unit: string; detail: string; href: string };

export default function Proofs({ proofs }: { proofs: [Proof, Proof, Proof] }) {
  return (
    <section className="border-y border-[var(--p8-border)] bg-[var(--p8-subtle)]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-[var(--p8-muted)]">By the numbers</h2>
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {proofs.map((p) => (
            <a key={p.unit} href={p.href} className="group text-center">
              <p className="text-5xl font-bold tracking-tight text-[var(--p8-accent)]">{p.figure}</p>
              <p className="mt-2 font-semibold">{p.unit}</p>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[var(--p8-muted)]">{p.detail}</p>
              <p className="mt-3 text-sm font-medium text-[var(--p8-accent)] opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">See the evidence →</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
