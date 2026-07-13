import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Beta Software Agreement — Purple8",
  description:
    "The Beta Software Agreement governing evaluation use of Purple8 beta software, including Purple8 Hyper Graph and Purple8 DocIntel.",
};

export default function BetaAgreementPage() {
  return (
    <LegalDoc
      title="Beta Software Agreement"
      subtitle="Terms for evaluation use of Purple8 beta software, including Purple8 Hyper Graph and Purple8 DocIntel. This Agreement supplements the End User License Agreement."
      effective="the date Purple8, Inc. issues your beta license key"
      version="2026-06-08"
    >
      <blockquote>
        The beta is provided for <strong>evaluation and testing only</strong>.
        This Agreement is supplemental to, and incorporates by reference, the{" "}
        <a href="/legal/eula">End User License Agreement</a>{" "}
        (&ldquo;EULA&rdquo;). Where a term is defined in the EULA, it has the
        same meaning here. If there is a direct conflict, this Agreement governs
        for the Beta Period.
      </blockquote>

      <p>
        <strong>Parties:</strong> <strong>Purple8, Inc.</strong>, a Delaware
        corporation (&ldquo;Purple8&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;),
        and <strong>you</strong>, the individual or entity that has received a
        beta license key (&ldquo;Participant&rdquo;, &ldquo;you&rdquo;). By
        accepting a beta license, pulling the Docker image, or otherwise using
        the beta software, you agree to this Agreement.
      </p>

      <h2>1. Beta License Grant</h2>
      <p>
        Subject to this Agreement, Purple8 grants you a{" "}
        <strong>
          non-exclusive, non-transferable, revocable, time-limited
        </strong>{" "}
        licence to use the Purple8 beta software (&ldquo;Beta Software&rdquo;)
        solely for internal evaluation and testing purposes during the Beta
        Period. The Beta Period is <strong>30 calendar days</strong> from the
        date your license key is issued, unless Purple8 extends or terminates it
        earlier in writing.
      </p>

      <h2>2. Restrictions</h2>
      <p>You must not:</p>
      <ul>
        <li>
          use the Beta Software in production environments or for any
          revenue-generating activity
        </li>
        <li>
          sublicense, sell, resell, transfer, assign, or commercially exploit
          the Beta Software or any rights to it
        </li>
        <li>
          reverse-engineer, decompile, disassemble, or attempt to derive the
          source code of the Beta Software (except to the extent permitted by
          applicable law)
        </li>
        <li>remove or alter any proprietary notices, labels, or marks</li>
        <li>
          use the Beta Software in any way that violates applicable laws or
          regulations
        </li>
        <li>
          use the Beta Software to process data subject to HIPAA, PCI-DSS, or
          similar compliance frameworks without Purple8&rsquo;s prior written
          consent
        </li>
        <li>share your license key or Docker credentials with any third party</li>
      </ul>

      <h2>3. Feedback</h2>
      <p>
        Any feedback, suggestions, bug reports, or ideas you provide about the
        Beta Software (&ldquo;Feedback&rdquo;) is voluntary. By submitting
        Feedback you grant Purple8 a perpetual, irrevocable, royalty-free,
        worldwide licence to use, incorporate, and commercialise the Feedback in
        any way, without compensation or attribution to you.
      </p>

      <h2>4. Confidentiality</h2>
      <p>
        The Beta Software, all associated documentation, and any information
        about Purple8&rsquo;s roadmap, architecture, or business that you learn
        during the Beta Period is <strong>Purple8&rsquo;s confidential
        information</strong>. You agree to:
      </p>
      <ul>
        <li>
          keep it strictly confidential and not disclose it to any third party
          without Purple8&rsquo;s prior written consent
        </li>
        <li>
          use at least the same degree of care to protect it that you use for
          your own confidential information (and no less than reasonable care)
        </li>
        <li>
          not use it for any purpose other than evaluating the Beta Software
          under this Agreement
        </li>
      </ul>
      <p>
        This obligation survives termination of the Beta Period for{" "}
        <strong>three (3) years</strong>.
      </p>

      <h2>5. Intellectual Property</h2>
      <p>
        The Beta Software, including all modifications, enhancements, and
        derivative works, remains the exclusive property of Purple8, Inc. This
        Agreement does not transfer any intellectual-property rights to you. All
        rights not expressly granted herein are reserved.
      </p>

      <h2>6. Data</h2>
      <p>
        The Beta Software may transmit anonymised telemetry to Purple8&rsquo;s
        Command Center (machine ID hash, version, platform, approximate
        node/edge counts, uptime). No personally identifiable information or
        customer data is transmitted. You may opt out by setting{" "}
        <code>PURPLE8_TELEMETRY_DISABLE=1</code>. Purple8 will handle any
        personal data you provide during registration in accordance with its
        Privacy Policy.
      </p>

      <h2>7. Disclaimer of Warranties</h2>
      <p>
        <strong>
          THE BETA SOFTWARE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
          AVAILABLE&rdquo; WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR
          IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. THE BETA
          SOFTWARE MAY CONTAIN BUGS, ERRORS, AND OTHER DEFECTS. USE IS AT YOUR
          SOLE RISK.
        </strong>
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL
        PURPLE8 BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
        EXEMPLARY, OR PUNITIVE DAMAGES, OR DAMAGES FOR LOSS OF PROFITS, REVENUE,
        DATA, BUSINESS, OR GOODWILL, ARISING OUT OF OR RELATED TO THIS AGREEMENT
        OR YOUR USE OF THE BETA SOFTWARE, EVEN IF PURPLE8 HAS BEEN ADVISED OF THE
        POSSIBILITY OF SUCH DAMAGES. PURPLE8&rsquo;S TOTAL CUMULATIVE LIABILITY
        ARISING OUT OF OR RELATED TO THIS AGREEMENT SHALL NOT EXCEED US$100.
      </p>

      <h2>9. Term and Termination</h2>
      <ul>
        <li>
          This Agreement begins on the date you accept it and ends at the expiry
          of the Beta Period.
        </li>
        <li>
          Purple8 may terminate this Agreement immediately at any time for any
          reason by revoking your license key.
        </li>
        <li>
          Upon termination or expiry, all rights granted herein immediately
          cease. You must delete all copies of the Beta Software and any Purple8
          confidential information in your possession.
        </li>
      </ul>

      <h2>10. Export Controls</h2>
      <p>
        You represent that you are not located in, under the control of, or a
        national or resident of any country subject to a U.S. Government embargo
        or that has been designated a &ldquo;terrorist-supporting country&rdquo;,
        and that you are not on any U.S. Government list of prohibited or
        restricted parties.
      </p>

      <h2>11. Governing Law</h2>
      <p>
        This Agreement is governed by the laws of the{" "}
        <strong>State of Delaware, USA</strong>, without regard to
        conflict-of-law principles. Any dispute arising under this Agreement
        shall be resolved exclusively in the state or federal courts located in
        Delaware, and you consent to personal jurisdiction there.
      </p>

      <h2>12. Entire Agreement</h2>
      <p>
        This Agreement constitutes the entire agreement between the parties with
        respect to the Beta Software and supersedes all prior or contemporaneous
        agreements, representations, or understandings relating to the subject
        matter herein.
      </p>
    </LegalDoc>
  );
}
