import type { Metadata } from "next";
import BrandShell from "@/components/revamp/BrandShell";
import StartPaths from "@/components/revamp/StartPaths";
import { FACTS as F } from "@/lib/facts";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pricing & Editions - Purple8 Cloud SaaS ($49/mo) & Enterprise VPC",
  description:
    "Start free in the Cloud Sandbox ($0), launch production apps on Purple8 Cloud SaaS with Full HA ($49/mo for indie developers & small teams), or license Purple8 for Enterprise VPC, On-Premise, OpenShift, and Air-Gapped deployments.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <BrandShell>
      <section className="mx-auto max-w-6xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--p8-accent)]">
            Pricing &amp; Deployment Editions
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Managed Cloud SaaS for Indie &amp; Small Teams. Sovereign VPC &amp; Air-Gapped for Enterprise.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[var(--p8-muted)]">
            A traditional AI stack (Postgres + Pinecone + Neo4j + Temporal + Auth0 + Unstructured) costs{" "}
            <strong className="text-[var(--p8-fg)]">$450+/month across 6 vendors</strong> before you write a single line of application code.
            Because Purple8 runs all of them in a single hardware-bounded engine,{" "}
            <strong className="text-[var(--p8-fg)]">Purple8 Cloud SaaS delivers the entire stack with Full HA for $49/month</strong> ($39/mo annual) for indie builders and small businesses - while mid-market and enterprise teams deploy self-hosted in their own VPC, OpenShift, or air-gapped network.
          </p>
        </div>

        <div className="mt-14">
          <StartPaths product="Hyper Graph" sandboxHref="/try/graph/" />
        </div>

        {/* 3-Column Comparison Table */}
        <div className="mt-16 overflow-x-auto rounded-2xl border border-[var(--p8-border)] bg-[var(--p8-surface)] p-6 sm:p-8">
          <h2 className="text-xl font-bold">Compare All Three Editions</h2>
          <table className="mt-6 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--p8-border)] text-xs uppercase tracking-wider text-[var(--p8-muted)]">
                <th className="py-3 pr-4">Capability</th>
                <th className="py-3 px-4">1. Cloud Sandbox &amp; Local Dev ($0)</th>
                <th className="py-3 px-4 text-[var(--p8-accent)]">2. Purple8 Cloud SaaS ($49/mo)</th>
                <th className="py-3 pl-4">3. Enterprise VPC &amp; Air-Gapped (Custom)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--p8-border)] text-[var(--p8-muted)]">
              <tr>
                <td className="py-3 pr-4 font-medium text-[var(--p8-fg)]">Who it&apos;s for</td>
                <td className="py-3 px-4">Prototyping, testing &amp; local development</td>
                <td className="py-3 px-4 font-medium text-[var(--p8-fg)]">Indie developers, startups &amp; small businesses</td>
                <td className="py-3 pl-4">Mid-market, enterprise &amp; regulated industries</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[var(--p8-fg)]">Hosting Model</td>
                <td className="py-3 px-4">Hosted Sandbox (30-day TTL) or Local Docker</td>
                <td className="py-3 px-4 font-medium text-[var(--p8-fg)]">Fully Managed Cloud SaaS by Purple8 (Zero DevOps)</td>
                <td className="py-3 pl-4">Customer VPC (AWS/Azure/GCP), Red Hat OpenShift (UBI9), On-Prem, or Air-Gapped</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[var(--p8-fg)]">Capacity</td>
                <td className="py-3 px-4">10K nodes (Cloud Sandbox) / 50K nodes (Local Docker)</td>
                <td className="py-3 px-4 font-medium text-[var(--p8-fg)]">Up to 500,000 nodes &amp; 2M edges · No daily query caps</td>
                <td className="py-3 pl-4">Unlimited / custom capacity (validated to 20M+ nodes per node &amp; multi-shard clusters)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[var(--p8-fg)]">MCP &amp; A2A Agents ({F.mcpTools} tools)</td>
                <td className="py-3 px-4">1 concurrent MCP agent · All {F.mcpTools} tools</td>
                <td className="py-3 px-4 font-medium text-[var(--p8-fg)]">Up to 5 concurrent MCP/A2A agents + per-key tool &amp; label scoping</td>
                <td className="py-3 pl-4">Unlimited concurrent MCP/A2A agents + custom RBAC &amp; SuperGraph federation</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[var(--p8-fg)]">DocIntel (70+ Formats, 75+ Languages)</td>
                <td className="py-3 px-4">Sandbox evaluation</td>
                <td className="py-3 px-4 font-medium text-[var(--p8-fg)]">Included (bundled in your Cloud SaaS subscription)</td>
                <td className="py-3 pl-4">Dedicated self-hosted DocIntel workers + SharePoint/Confluence/S3 connectors</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[var(--p8-fg)]">High Availability &amp; Backups</td>
                <td className="py-3 px-4">Single instance · JSON/CSV/GraphML/Blueprint export</td>
                <td className="py-3 px-4 font-medium text-[var(--p8-fg)]">Managed Full HA (SYNC replication RPO ≈ 0 + auto-failover) &amp; daily automated cloud backups</td>
                <td className="py-3 pl-4">Multi-node Raft HA quorum, cross-region failover, S3/GCS/Azure Blob incremental backups</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[var(--p8-fg)]">Security, KMS &amp; Compliance</td>
                <td className="py-3 px-4">4-tier RBAC, Local KMS AES-256-GCM</td>
                <td className="py-3 px-4 font-medium text-[var(--p8-fg)]">Cryptographic tenant isolation, AES-256-GCM encryption, hash-chained audit trail</td>
                <td className="py-3 pl-4">Dedicated DB/VPC isolation, OIDC/SAML SSO, BYO KMS (Vault/AWS/GCP/Azure), Legal Holds, GDPR sweeps, Autonomous SOC</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[var(--p8-fg)]">Sandbox → Production Path</td>
                <td className="py-3 px-4">—</td>
                <td className="py-3 px-4 font-medium text-[var(--p8-fg)]">1-click in-place promotion (keep your Sandbox tenant_id &amp; data) or /sandbox/import-blueprint</td>
                <td className="py-3 pl-4">1-call GET /sandbox/blueprint → POST /sandbox/import-blueprint into your VPC</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[var(--p8-fg)]">Price</td>
                <td className="py-3 px-4 font-bold text-[var(--p8-fg)]">$0</td>
                <td className="py-3 px-4">
                  <span className="font-bold text-[var(--p8-accent)]">$49/mo</span>{" "}
                  <span className="text-xs">($39/mo billed annually)</span>
                </td>
                <td className="py-3 pl-4 font-bold text-[var(--p8-fg)]">Custom Annual License</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </BrandShell>
  );
}
