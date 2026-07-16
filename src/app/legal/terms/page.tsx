import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The Terms of Service governing your use of the purple8.ai website and the purchase of Purple8 licences. Use of the software itself is governed by the EULA.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms of Service"
      subtitle="These Terms govern your use of purple8.ai and your purchase of Purple8 licences. Your use of the software itself is governed by the EULA."
      effective="July 13, 2026"
      version="1.0"
    >
      <blockquote>
        These Terms of Service (&ldquo;Terms&rdquo;) apply to your use of the
        Purple8 website and the purchase of Purple8 products and licences. Your``
        installation and use of the software is separately governed by the{" "}
        <a href="/legal/eula">End User License Agreement (EULA)</a>. If there is a
        conflict about the software itself, the EULA controls.
      </blockquote>

      <h2>1. Agreement to terms</h2>
      <p>
        These Terms are a binding agreement between you and{" "}
        <strong>Purple8, Inc., a Delaware corporation</strong> (&ldquo;Purple8&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;). By accessing the Site, creating an
        account, or purchasing a licence, you agree to these Terms. If you are
        acting for an organisation, you represent that you are authorised to bind
        it.
      </p>

      <h2>2. Accounts</h2>
      <p>
        You must provide accurate information and keep your account credentials
        secure. You are responsible for all activity under your account. Notify
        us promptly of any unauthorised use.
      </p>

      <h2>3. Licences, editions &amp; the software</h2>
      <p>
        Purple8 offers free and paid editions of its software. What each edition
        includes — capacity, features, and support — is described on our pricing
        page and may change over time. Your right to use the software is granted
        under the <a href="/legal/eula">EULA</a>; these Terms cover the
        commercial relationship (ordering, billing, and website use) around it.
      </p>

      <h2>4. Fees, billing &amp; renewal</h2>
      <ul>
        <li>
          Paid plans are billed in advance on a monthly or annual basis through
          our payment provider (Stripe).
        </li>
        <li>
          Unless stated otherwise, subscriptions renew automatically for the same
          term until cancelled. You can cancel before the next renewal to avoid
          further charges.
        </li>
        <li>
          Fees are exclusive of taxes, which are added where applicable. You are
          responsible for any taxes other than Purple8&apos;s income taxes.
        </li>
        <li>
          Except where required by law or expressly stated, fees are
          non-refundable.
        </li>
      </ul>

      <h2>5. Free, beta &amp; pre-release editions</h2>
      <p>
        Free, beta, developer, and other pre-release editions are provided
        &ldquo;as is&rdquo; for evaluation and development, may change or be
        discontinued, and may carry usage limits. Any additional beta or
        developer terms apply in addition to these Terms.
      </p>

      <h2>6. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Site or software unlawfully or to infringe others&apos; rights;</li>
        <li>
          Circumvent licence, capacity, or authentication controls, or resell or
          redistribute the software except as permitted by the EULA;
        </li>
        <li>
          Interfere with or disrupt the Site, or attempt to gain unauthorised
          access to it;
        </li>
        <li>Misrepresent your affiliation with Purple8.</li>
      </ul>

      <h2>7. Intellectual property</h2>
      <p>
        The Site and the software, including all associated intellectual property
        rights, are owned by Purple8 or its licensors. These Terms do not grant
        you any rights to our trademarks or branding. Feedback you provide may be
        used by us without obligation to you.
      </p>

      <h2>8. Your data</h2>
      <p>
        Purple8 is embedded software that runs in your environment; the data you
        process with it stays on your infrastructure and is not sent to Purple8.
        Information we do handle in connection with the Site and your account is
        described in our <a href="/legal/privacy">Privacy Policy</a>.
      </p>

      <h2>9. Third-party services</h2>
      <p>
        The software can connect to third-party services you choose to configure
        (for example, model providers or cloud storage). Your use of those
        services is governed by their terms, and Purple8 is not responsible for
        them.
      </p>

      <h2>10. Disclaimers</h2>
      <p>
        The Site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
        without warranties of any kind, to the fullest extent permitted by law.
        Warranty terms for the software are set out in the EULA.
      </p>

      <h2>11. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Purple8 will not be liable for
        any indirect, incidental, special, consequential, or punitive damages, or
        for lost profits or data, arising from your use of the Site. Our total
        liability arising out of or relating to these Terms will not exceed the
        amounts you paid to Purple8 in the twelve months before the claim.
      </p>

      <h2>12. Indemnification</h2>
      <p>
        You agree to indemnify and hold Purple8 harmless from claims arising out
        of your breach of these Terms or your misuse of the Site.
      </p>

      <h2>13. Termination</h2>
      <p>
        We may suspend or terminate your access to the Site or your account if
        you breach these Terms. Provisions that by their nature should survive
        termination (such as intellectual property, disclaimers, and limitations
        of liability) will survive.
      </p>

      <h2>14. Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of Delaware, USA,
        without regard to its conflict-of-laws rules. The courts located in
        Delaware will have exclusive jurisdiction, unless a mandatory law
        provides otherwise.
      </p>

      <h2>15. Changes</h2>
      <p>
        We may update these Terms from time to time. We will post the updated
        version here and revise the &ldquo;Effective&rdquo; date above. Your
        continued use of the Site after changes take effect constitutes
        acceptance.
      </p>

      <h2>16. Contact</h2>
      <p>
        Questions about these Terms? Contact{" "}
        <a href="mailto:legal@purple8.ai">legal@purple8.ai</a>.
      </p>
    </LegalDoc>
  );
}
