import Link from "next/link";
import BrandShell from "@/components/revamp/BrandShell";
import DocIntelWorkspaceLink from "@/components/DocIntelWorkspaceLink";

export default function TryDocIntelPage() {
  return (
    <BrandShell>
      <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <Link href="/products/docintel/" className="text-sm text-[var(--p8-accent)]">
          Back to DocIntel
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Try DocIntel in your browser</h1>
        <p className="mt-4 text-lg text-[var(--p8-muted)]">
          Sign in once, upload a sample document, and review the entities and relationships.
          No installation, API key, or Graph database required.
        </p>
        <DocIntelWorkspaceLink view="playground" className="mt-8 inline-block rounded-full bg-[var(--p8-button)] px-7 py-3 text-sm font-semibold text-white hover:opacity-90">
          Open DocIntel
        </DocIntelWorkspaceLink>
        <p className="mt-3 text-sm text-[var(--p8-muted)]">
          Start with the free sandbox. Paid processing is a separate subscription you choose to activate.
          Your available sandbox allowance is shown in the workspace.
        </p>
        <ol className="mt-10 space-y-4 text-[var(--p8-muted)]">
          <li><strong className="text-[var(--p8-fg)]">Sign in.</strong> Use Your account in the workspace. No separate website registration.</li>
          <li><strong className="text-[var(--p8-fg)]">Upload and review.</strong> Check the extraction before downloading or sending it to your chosen destination.</li>
          <li><strong className="text-[var(--p8-fg)]">Integrate when ready.</strong> Create a project and activate Cloud from Usage &amp; billing. API keys are optional for browser use.</li>
        </ol>
        <div className="mt-10 rounded-2xl border border-[var(--p8-border)] bg-[var(--p8-surface)] p-6">
          <h2 className="font-semibold">Your documents, your choice</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--p8-muted)]">
            Hosted document content and extraction results are held in memory for the processing
            session, not saved to document storage. Account, job, and billing metadata are retained
            separately. Selected AI providers may process content under their own policies.
            Use synthetic, non-confidential documents in the sandbox and download results before the session ends.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--p8-accent)]">
            <Link href="/legal/privacy/">Privacy policy</Link>
            <Link href="/legal/terms/">Terms</Link>
            <Link href="/quickstart/#add-docintel">Self-host DocIntel</Link>
          </div>
        </div>
        <p className="mt-6 text-sm text-[var(--p8-muted)]">
          Already have an emailed or integration key?{" "}
          <DocIntelWorkspaceLink view="api" className="text-[var(--p8-accent)] underline">
            Connect your existing key
          </DocIntelWorkspaceLink>
          .
        </p>
      </section>
    </BrandShell>
  );
}
