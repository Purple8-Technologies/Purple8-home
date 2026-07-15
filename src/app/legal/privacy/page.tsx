import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy Policy — Purple8",
  description:
    "How Purple8, Inc. collects, uses, and protects information across purple8.ai and the Purple8 software. Purple8 is embedded software — your operational data stays on your infrastructure.",
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      subtitle="How Purple8, Inc. handles information for purple8.ai and the Purple8 software."
      effective="July 13, 2026"
      version="1.0"
    >
      <blockquote>
        <strong>The short version.</strong> Purple8 is embedded, self-hosted
        software. The data you ingest, index, and query — your documents, graphs,
        vectors, and workflows — is processed inside your own deployment and is{" "}
        <strong>never sent to Purple8</strong>. This policy covers the limited
        information we collect when you visit our website, register for an
        account, or purchase a licence.
      </blockquote>

      <h2>1. Who we are</h2>
      <p>
        This Privacy Policy is issued by{" "}
        <strong>
          Purple8, Inc., a Delaware corporation (&ldquo;Purple8&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
        </strong>
        . It applies to the website <code>purple8.ai</code> and related
        Purple8-operated services (together, the &ldquo;Site&rdquo;), and
        explains what we do with information relating to you.
      </p>

      <h2>2. The most important point: your operational data</h2>
      <p>
        Purple8 Hyper Graph and Purple8 DocIntel run <strong>in your own
        environment</strong> — your hardware, your cloud, or your on-premises
        infrastructure. The content you process with the Software (documents,
        entities, embeddings, graph data, prompts, and query results) is stored
        and processed locally within your deployment. Purple8 does{" "}
        <strong>not</strong> receive, collect, store, or have access to that
        operational data. Where you configure a third-party model provider (for
        example, an LLM API), your data flows directly from your deployment to
        that provider under their terms — not through Purple8.
      </p>

      <h2>3. Information we do collect</h2>
      <p>
        We collect a limited amount of information in connection with the Site
        and our commercial relationship with you:
      </p>
      <ul>
        <li>
          <strong>Account &amp; registration data</strong> — name, work email,
          company, and the plan or edition you select.
        </li>
        <li>
          <strong>Billing data</strong> — processed by our payment provider
          (Stripe). We receive confirmation of a transaction and limited billing
          metadata; we do not store full card numbers.
        </li>
        <li>
          <strong>Licence &amp; activation data</strong> — the licence key
          issued to you and non-content metadata needed to validate it (such as
          tier and expiry).
        </li>
        <li>
          <strong>Support &amp; communications</strong> — messages you send us
          (support tickets, email, or waitlist sign-ups) and our replies.
        </li>
        <li>
          <strong>Site usage data</strong> — basic, aggregated analytics and
          server logs (such as pages viewed and approximate region) used to keep
          the Site secure and improve it.
        </li>
      </ul>

      <h2>4. How we use information</h2>
      <ul>
        <li>To create and manage your account and issue licences.</li>
        <li>To process payments and provide receipts.</li>
        <li>To provide support and respond to your enquiries.</li>
        <li>
          To send you service and transactional messages (for example, licence,
          security, or billing notices).
        </li>
        <li>
          To operate, secure, and improve the Site and our products, and to meet
          legal and accounting obligations.
        </li>
      </ul>

      <h2>5. Legal bases</h2>
      <p>
        Where applicable law (such as the UK GDPR or EU GDPR) requires a legal
        basis, we rely on: performance of a contract (to provide the account,
        licence, and support you request); our legitimate interests (to secure
        and improve the Site); consent (for optional marketing, which you can
        withdraw at any time); and compliance with legal obligations.
      </p>

      <h2>6. Sharing</h2>
      <p>
        We do not sell your personal information. We share limited information
        only with service providers who help us run our business, under
        appropriate contractual protections:
      </p>
      <ul>
        <li>
          <strong>Payments</strong> — Stripe, for billing and fraud prevention.
        </li>
        <li>
          <strong>Infrastructure &amp; hosting</strong> — providers that host the
          Site and our email/support systems.
        </li>
        <li>
          <strong>Legal</strong> — where required by law, regulation, legal
          process, or to protect our rights, users, or the public.
        </li>
      </ul>

      <h2>7. International transfers</h2>
      <p>
        Purple8 is based in the United States. Where information is transferred
        internationally, we use appropriate safeguards (such as Standard
        Contractual Clauses) where required.
      </p>

      <h2>8. Retention</h2>
      <p>
        We keep account, licence, and billing records for as long as your
        account is active and as needed to comply with legal, tax, and
        accounting requirements, after which we delete or anonymise them.
      </p>

      <h2>9. Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct,
        delete, or port your personal information, to object to or restrict
        certain processing, and to withdraw consent. To exercise any of these,
        contact us at{" "}
        <a href="mailto:privacy@purple8.ai">privacy@purple8.ai</a>. You also have
        the right to complain to your local data protection authority.
      </p>

      <h2>10. Security</h2>
      <p>
        We use technical and organisational measures appropriate to the limited
        data we hold. Because your operational data stays within your own
        deployment, you remain the controller of, and are responsible for
        securing, that data — for which the Software provides encryption at rest,
        RBAC, tenancy isolation, and audit controls.
      </p>

      <h2>11. Children</h2>
      <p>
        The Site and Software are not directed to children and are not intended
        for use by anyone under 16. We do not knowingly collect information from
        children.
      </p>

      <h2>12. Changes</h2>
      <p>
        We may update this Privacy Policy from time to time. We will post the
        updated version here and revise the &ldquo;Effective&rdquo; date above.
        Material changes will be communicated where appropriate.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about this policy or your information? Contact{" "}
        <a href="mailto:privacy@purple8.ai">privacy@purple8.ai</a>.
      </p>
    </LegalDoc>
  );
}
