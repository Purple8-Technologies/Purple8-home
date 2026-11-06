import type { Metadata } from "next";
import BrandShell from "@/components/revamp/BrandShell";
import StartPaths from "@/components/revamp/StartPaths";
import { FACTS as F } from "@/lib/facts";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Licensing & Editions - Purple8 Hyper Graph & DocIntel",
  description:
    "Evaluate Purple8 Hyper Graph and Purple8 DocIntel free in the Cloud Sandbox or Developer Edition ($0 up to 50K nodes). Contact sales@purple8.ai for Commercial, Enterprise, VPC, On-Premise, and Air-Gapped licensing.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <BrandShell>
      <section className="mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--p8-accent)]">
            Licensing &amp; Editions
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Start free in the Sandbox or Developer Edition. License for Production.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--p8-muted)]">
            Purple8 uses a simple two-tier licensing model: evaluate and prototype for{" "}
            <strong className="text-[var(--p8-fg)]">$0</strong> in the Cloud Sandbox or self-hosted
            Developer Edition (up to 50,000 nodes and 1 MCP agent with all {F.mcpTools} MCP tools),
            and license Commercial or Enterprise capacity tailored to your VPC, on-premise,
            Kubernetes, or air-gapped deployment.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-xs text-[var(--p8-muted)]">
            Note: Legacy self-serve monthly tiers (such as Micro, Mini, Growth, or fixed Pro monthly pricing) are retired. All commercial and enterprise production deployments are licensed directly via{" "}
            <a href="mailto:sales@purple8.ai" className="underline text-[var(--p8-accent)]">
              sales@purple8.ai
            </a>.
          </p>
        </div>

        <div className="mt-14">
          <StartPaths product="Hyper Graph" sandboxHref="/try/graph/" />
        </div>

        {/* Side-by-side Edition Comparison */}
        <div className="mt-16 overflow-x-auto rounded-2xl border border-[var(--p8-border)] bg-[var(--p8-surface)] p-6 sm:p-8">
          <h2 className="text-xl font-bold">Edition Capabilities &amp; Guarantees</h2>
          <table className="mt-6 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--p8-border)] text-xs uppercase tracking-wider text-[var(--p8-muted)]">
                <th className="py-3 pr-4">Capability</th>
                <th className="py-3 px-4">Cloud Sandbox &amp; Developer ($0)</th>
                <th className="py-3 pl-4">Commercial &amp; Enterprise (Custom)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--p8-border)] text-[var(--p8-muted)]">
              <tr>
                <td className="py-3 pr-4 font-medium text-[var(--p8-fg)]">Capacity</td>
                <td className="py-3 px-4">Up to 10K nodes (Cloud Sandbox, 30 days) or 50K nodes (Self-Hosted Developer)</td>
                <td className="py-3 pl-4">Unlimited / custom node &amp; edge capacity (validated to 20M+ nodes per node, multi-shard clusters)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[var(--p8-fg)]">MCP Agent Interface ({F.mcpTools} tools)</td>
                <td className="py-3 px-4">All {F.mcpTools} tools across 19 namespaces (starter, builder, ops, full profiles)</td>
                <td className="py-3 pl-4">Unlimited concurrent MCP &amp; A2A agents + per-key tool &amp; label scoping</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[var(--p8-fg)]">Data Model &amp; Storage</td>
                <td className="py-3 px-4">Unified LPG + RDF + Hypergraph + Structured Tables + HNSW Vector + BM25</td>
                <td className="py-3 pl-4">Same unified engine + Raft HA replication (SYNC RPO ≈ 0) &amp; automatic failover</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[var(--p8-fg)]">Security, KMS &amp; Multi-Tenancy</td>
                <td className="py-3 px-4">4-tier RBAC, record-level ownership, Local KMS AES-256-GCM</td>
                <td className="py-3 pl-4">Dedicated/shared multi-tenant isolation, OIDC/SAML SSO, HashiCorp Vault / AWS / GCP / Azure KMS, Autonomous SOC</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[var(--p8-fg)]">Backups, Portability &amp; Compliance</td>
                <td className="py-3 px-4">JSON, CSV, GraphML, N-Quads &amp; 1-call /sandbox/blueprint export</td>
                <td className="py-3 pl-4">Incremental S3 / GCS / Azure Blob backups, point-in-time WAL replay, legal holds, GDPR retention sweeps, hash-chained audit verification</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[var(--p8-fg)]">Support &amp; SLA</td>
                <td className="py-3 px-4">Documentation &amp; community email support (support@purple8.ai)</td>
                <td className="py-3 pl-4">24×7×365 Severity-1 SLA (&lt;1 hr response), dedicated engineering escalation, Red Hat UBI9 / OpenShift &amp; air-gapped images</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </BrandShell>
  );
}
