import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Developer Agreement — Purple8",
  description:
    "The Developer Agreement for the free Purple8 Developer edition, covering Purple8 Hyper Graph and Purple8 DocIntel.",
};

export default function DeveloperAgreementPage() {
  return (
    <LegalDoc
      title="Developer Agreement"
      subtitle="Terms for the free Developer edition of all Purple8 software, including Purple8 Hyper Graph and Purple8 DocIntel. This Agreement supplements the End User License Agreement."
      effective="June 8, 2026"
      version="2026-06-08"
    >
      <blockquote>
        The Developer edition is <strong>free</strong>. In exchange, we ask for
        occasional feedback to help improve the product. This Agreement is
        supplemental to, and incorporates by reference, the{" "}
        <a href="/legal/eula">End User License Agreement</a>{" "}
        (&ldquo;EULA&rdquo;). Where a term is defined in the EULA, it has the
        same meaning here. If there is a direct conflict, the EULA governs except
        where this Agreement is more specific about the Developer edition.
      </blockquote>

      <p>
        This Developer Agreement is between{" "}
        <strong>Purple8, Inc., a Delaware corporation</strong> and you, the
        individual or entity that registers for and receives a free Developer
        license key (&ldquo;you&rdquo;, &ldquo;Developer&rdquo;). By registering,
        accepting a Developer license, pulling a Developer image, or otherwise
        using the Developer edition, you agree to these terms.
      </p>

      <h2>1. License Grant</h2>
      <p>
        Subject to your compliance with this Agreement and the EULA, Purple8
        grants you a{" "}
        <strong>
          non-exclusive, non-transferable, revocable, royalty-free
        </strong>{" "}
        license to install and run the Developer edition of the Software for the
        permitted purposes in Section 2. The Developer edition corresponds to the
        Developer Tier described in Section 3.1 of the EULA.
      </p>

      <h2>2. Permitted Use</h2>
      <p>The Developer edition may be used for:</p>
      <ul>
        <li>Development, prototyping, and internal testing</li>
        <li>Evaluation of Purple8 for yourself or your team</li>
        <li>Personal and side projects</li>
        <li>Open-source projects and academic or research work</li>
      </ul>

      <h2>3. Commercial Use Requires an Upgrade</h2>
      <p>
        The Developer edition may <strong>not</strong> be used for commercial
        purposes. A deployment is commercial when it generates revenue, serves
        external users in production, or is offered as a service to third
        parties. Upon commercial launch you must upgrade to a paid tier (Builder,
        Business, or Enterprise) under the EULA. See{" "}
        <a href="/#pricing">purple8.ai pricing</a> for paid tiers, or contact{" "}
        <a href="mailto:sales@purple8.ai">sales@purple8.ai</a>.
      </p>

      <h2>4. Feedback</h2>
      <p>
        In exchange for the free Developer edition, we ask that you provide{" "}
        <strong>occasional feedback</strong> — bug reports, feature suggestions,
        and your experience using the product. Feedback is voluntary and there is
        no fixed obligation, but it is the consideration we value in place of a
        fee. By submitting feedback, suggestions, bug reports, or ideas
        (&ldquo;Feedback&rdquo;), you grant Purple8 a perpetual, irrevocable,
        worldwide, royalty-free license to use, incorporate, and commercialize
        the Feedback in any way, without compensation or attribution to you.
      </p>

      <h2>5. Telemetry &amp; Data</h2>
      <p>
        The Developer edition may transmit anonymized telemetry to Purple8 — for
        example a machine-ID hash, version, platform, approximate node/edge or
        document counts, and uptime. No personally identifiable information or
        your customer data is transmitted for this purpose. You may opt out by
        setting <code>PURPLE8_TELEMETRY_DISABLE=1</code>. Purple8 handles any
        personal data you provide during registration in accordance with its
        Privacy Policy.
      </p>

      <h2>6. Restrictions</h2>
      <p>
        In addition to the restrictions in Section 6 of the EULA, you must not:
      </p>
      <ul>
        <li>use the Developer edition in production or for revenue-generating activity</li>
        <li>share your Developer license key or image credentials with any third party</li>
        <li>
          reverse-engineer, decompile, or disassemble the Software, except to the
          extent permitted by applicable law
        </li>
        <li>remove or alter any proprietary notices, labels, or marks</li>
        <li>
          use the Developer edition to build a product that competes with a
          Purple8 platform (see Section 6.2 of the EULA)
        </li>
      </ul>

      <h2>7. No Warranty; Limitation of Liability</h2>
      <p>
        <strong>
          THE DEVELOPER EDITION IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
          AVAILABLE&rdquo; WITHOUT WARRANTY OF ANY KIND.
        </strong>{" "}
        The warranty disclaimer (Section 10) and limitation of liability (Section
        11) in the EULA apply in full to the Developer edition. Because the
        Developer edition is free, Purple8&rsquo;s total cumulative liability
        arising out of or related to it shall not exceed{" "}
        <strong>US $100</strong>.
      </p>

      <h2>8. Term &amp; Termination</h2>
      <p>
        This Agreement begins when you accept it and continues until terminated.
        You may terminate at any time by ceasing all use and destroying all
        copies. Purple8 may terminate or suspend your Developer license at any
        time — including by revoking your license key — for any reason,
        including breach of this Agreement or the EULA. Upon termination, all
        rights granted here immediately cease and you must delete all copies of
        the Developer edition in your possession. Sections 4, 5, 7, and this
        sentence survive termination.
      </p>

      <h2>9. General</h2>
      <p>
        This Agreement is governed by the laws of the State of Delaware, USA, and
        is subject to the dispute-resolution, amendment, assignment, and notice
        provisions in Section 14 of the EULA. Purple8 may update this Agreement;
        the version and effective date above identify the terms in force.
        Notices to <a href="mailto:legal@purple8.ai">legal@purple8.ai</a>.
      </p>
    </LegalDoc>
  );
}
