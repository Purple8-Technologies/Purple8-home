import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "End User License Agreement",
  description:
    "The End User License Agreement (EULA) governing all Purple8 software, including Purple8 Hyper Graph and Purple8 DocIntel.",
  path: "/legal/eula",
});

export default function EulaPage() {
  return (
    <LegalDoc
      title="End User License Agreement"
      subtitle="Enterprise Platform & Commercial Redistribution License — applies to all Purple8 software, including Purple8 Hyper Graph and Purple8 DocIntel."
      effective="July 13, 2026"
      version="1.1"
    >
      <blockquote>
        <strong>
          IMPORTANT — READ CAREFULLY BEFORE INSTALLING, DOWNLOADING, OR USING
          THIS SOFTWARE.
        </strong>{" "}
        By clicking &ldquo;I Agree&rdquo;, installing, downloading, copying,
        accessing, or otherwise using any Purple8 software, you
        (&ldquo;Licensee&rdquo;) agree to be bound by this Agreement. If you are
        accepting on behalf of a company or other legal entity, you represent
        that you have the authority to bind that entity. If you do not agree to
        these terms, do not install or use the software and promptly destroy or
        return any copies in your possession.
      </blockquote>

      <p>
        This Agreement is between{" "}
        <strong>
          Purple8, Inc., a Delaware corporation (&ldquo;Purple8&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
        </strong>{" "}
        and Licensee.
      </p>

      <h2>1. Definitions</h2>
      <p>
        <strong>1.1 &ldquo;Software&rdquo;</strong> means any Purple8 product
        that you license, download, or use, including{" "}
        <strong>Purple8 Hyper Graph</strong> (the multi-model graph, vector,
        document, and full-text engine) and{" "}
        <strong>Purple8 DocIntel</strong> (the document intelligence service),
        together with their respective engines, indexes, pipelines, MCP servers,
        REST APIs, admin consoles, all compiled binaries, libraries, Docker
        images, pip wheels, SDKs, client libraries, documentation, and any
        updates or upgrades provided by Purple8.
      </p>
      <p>
        <strong>1.2 &ldquo;Core Components&rdquo;</strong> means the compiled
        engine binaries, Docker images, native extensions, storage layer,
        encryption subsystem, and any component that constitutes the core
        infrastructure of the Software.
      </p>
      <p>
        <strong>1.3 &ldquo;Distributable Components&rdquo;</strong> means the
        client libraries, API wrappers, SDK packages, MCP tool definitions, and
        integration code explicitly designated by Purple8 as redistributable.
      </p>
      <p>
        <strong>1.4 &ldquo;Application&rdquo;</strong> means a distinct software
        product or service that you build using the Software as underlying
        infrastructure, which provides substantial new utility to end users
        beyond what the Software itself provides.
      </p>
      <p>
        <strong>1.5 &ldquo;End Users&rdquo;</strong> means the individuals or
        entities who use your Application.
      </p>
      <p>
        <strong>1.6 &ldquo;License Key&rdquo;</strong> means the
        cryptographically signed token issued by Purple8 that activates a
        specific License Tier and enforces the terms of this Agreement at
        runtime.
      </p>
      <p>
        <strong>1.7 &ldquo;Node&rdquo;</strong> means a single running instance
        of the Software, whether in a container, virtual machine, bare-metal
        server, or embedded deployment.
      </p>
      <p>
        <strong>1.8 &ldquo;License Tier&rdquo;</strong> means one of the tiers
        offered by Purple8 from time to time, grouped into the families defined
        in Section 3: <strong>Free</strong> (Developer / Community),{" "}
        <strong>Production</strong>, <strong>Pro</strong>, and{" "}
        <strong>Enterprise</strong>. The specific tiers, their capacities, and
        their prices are published at{" "}
        <a href="/#pricing">purple8.ai pricing</a> and enforced by your License
        Key.
      </p>
      <p>
        <strong>1.9 &ldquo;Entitlements&rdquo;</strong> means the capacity and
        feature limits associated with your License Tier — including permitted
        Node counts, data capacity (e.g. maximum nodes/edges or documents
        processed), seats, agents, and feature availability — as published at{" "}
        <a href="/#pricing">purple8.ai pricing</a> and encoded in your License
        Key.
      </p>

      <h2>2. Grant of License</h2>
      <p>
        <strong>2.1 License Grant.</strong> Subject to your compliance with this
        Agreement and payment of applicable fees, Purple8 grants you a
        non-exclusive, non-transferable, limited license to:
      </p>
      <ul>
        <li>
          (a) Install and run the Software on the number of Nodes permitted by
          your License Tier;
        </li>
        <li>(b) Use the Software as the backend infrastructure for your Applications;</li>
        <li>
          (c) Access and use the REST API and MCP server interfaces to build,
          operate, and automate Applications;
        </li>
        <li>
          (d) Distribute Distributable Components (but not Core Components) to
          your End Users solely as embedded components of your Application.
        </li>
      </ul>
      <p>
        <strong>2.2 Scope of Use.</strong> The license is limited to your
        internal business operations and the operation of your Applications for
        your End Users. It does not include any right to sublicense except as
        expressly provided in Section 5.
      </p>

      <h2>3. License Tiers</h2>
      <p>
        The Software is licensed in tiers grouped into four families. Purple8 may
        add, rename, or adjust the specific tiers and their capacities within
        each family; the current tiers, capacities, and prices are published at{" "}
        <a href="/#pricing">purple8.ai pricing</a> and enforced by your License
        Key. The families below govern the <em>permitted use</em> of each tier.
      </p>
      <p>
        <strong>3.1 Free Family — Developer &amp; Community (Free).</strong>{" "}
        The free tiers of Purple8 (the &ldquo;Developer&rdquo; edition) and
        DocIntel (the &ldquo;Community&rdquo; edition). Permitted for
        development, testing, evaluation, internal prototyping, open-source
        projects, and academic research, including internal commercial
        development, subject to the capacity limits of the free tier. Free tiers
        may not be resold or offered as a hosted service to third parties. Use of
        a free tier is also subject to the{" "}
        <a href="/legal/developer-agreement">Developer Agreement</a> (Purple8) or
        the applicable free-tier terms (DocIntel). When your usage exceeds the
        free-tier capacity, or you deploy in production at scale, you must upgrade
        to a paid tier.
      </p>
      <p>
        <strong>3.2 Production Family (Paid).</strong> The entry paid tiers —
        for Purple8, the production capacity tiers (e.g.{" "}
        <em>Micro, Mini, Growth, Starter</em>); for DocIntel, the metered paid
        tier (e.g. <em>Solo</em>). Permitted for commercial Applications serving
        external End Users, internal enterprise tools, SaaS products, and
        on-premises deployments at Licensee&rsquo;s own facilities, up to the
        Entitlements of the purchased tier. White-label rights are included.
        On-premises deployment at a <strong>client&rsquo;s</strong> facilities
        requires the Enterprise family.
      </p>
      <p>
        <strong>3.3 Pro Family (Paid).</strong> The advanced paid tier — for
        Purple8, the <em>Pro</em> tier; for DocIntel, the <em>Self-Hosted</em>{" "}
        tier. Includes all Production family rights, plus the advanced security,
        compliance, and capability entitlements published for that tier (which
        may include, for Purple8, features such as SSO/OIDC, RBAC, immutable
        audit logging, field/row-level security, change data capture, and
        additional graph and domain modules). Permitted for multi-project
        commercial deployments and Applications requiring these advanced
        capabilities.
      </p>
      <p>
        <strong>3.4 Enterprise Family (Negotiated — Signed Contract).</strong>{" "}
        Includes all Pro family rights, plus: on-premises deployment at client
        facilities; white-label distribution to clients; custom capacity
        allotments and volume pricing; Service Level Agreements; dedicated
        support; audit indemnification; and custom data processing agreements
        (DPA/BAA as applicable). The Purple8 Enterprise tier requires a
        separately negotiated, signed Enterprise Agreement; the DocIntel
        Enterprise tier is available self-serve with the entitlements published
        for it. Where a signed Enterprise Agreement conflicts with this
        Agreement, the signed Enterprise Agreement governs.
      </p>
      <p>
        <strong>3.5 Automatic Tier Upgrade.</strong> If usage exceeds the
        Entitlements of your current tier, the license requires upgrade to a tier
        with sufficient capacity. Purple8 will not disable production systems
        without prior written notice, but continued use beyond your Entitlements
        without upgrade constitutes a material breach. See{" "}
        <a href="/#pricing">purple8.ai pricing</a> for current paid tiers.
      </p>

      <h2>4. Permitted Commercial Use</h2>
      <p>
        <strong>4.1 Right to Build Commercial Applications.</strong> Under a paid
        tier you are explicitly permitted to build, deploy, and commercially
        sell Applications that use the Software as their backend; charge your End
        Users; host the Software on your own infrastructure (subject to tier);
        and integrate the Software with third-party systems to create your
        Application.
      </p>
      <p>
        <strong>4.2 White-Labeling.</strong> Under any paid tier (the
        Production, Pro, and Enterprise families) you may brand your Application
        entirely as your own. However, you may not represent the Software itself
        as your own proprietary technology, may not remove Purple8&rsquo;s
        copyright notices from Distributable Components, and your End User
        agreement must include the flow-down clause in Section 5.2.
      </p>
      <p>
        <strong>4.3 Commercial Scaling Obligation.</strong> As your Application
        scales, your license must scale proportionally. Each additional Node
        required to serve your End Users requires an additional Node license.
        Purple8 provides a 30-day grace period from the date you first exceed
        your Node limit before considering it a breach.
      </p>

      <h2>5. Redistribution Framework</h2>
      <p>
        <strong>5.1 Distributable Components.</strong> You may redistribute the
        Distributable Components only as embedded, integrated parts of your
        Application, in compiled or bundled form, subject to a binding End User
        agreement that includes the flow-down clause below.
      </p>
      <p>
        <strong>5.2 Required End User Flow-Down Clause.</strong> Your End User
        agreement must include language substantially as follows:
      </p>
      <blockquote>
        &ldquo;This application is powered by infrastructure technology owned by
        Purple8, Inc. The underlying infrastructure components are proprietary
        and protected by copyright. End Users may not: (i) attempt to extract,
        isolate, or reverse engineer the underlying infrastructure; (ii) use the
        infrastructure independently of this application; or (iii) transfer or
        sublicense access to the infrastructure to any third party.&rdquo;
      </blockquote>
      <p>
        <strong>5.3 What You May NOT Redistribute.</strong> Regardless of tier,
        you may never redistribute Core Components, License Keys or credentials,
        the admin console as a standalone product, or any component of the
        Software as a competing infrastructure offering (see Section 6).
      </p>

      <h2>6. Restrictions and No-Compete Boundary</h2>
      <p>
        <strong>6.1 Prohibited Uses.</strong> You may not: (a) reverse engineer,
        decompile, or decrypt any Core Component except as permitted by law; (b)
        copy, clone, or create derivative works of Core Components; (c) modify
        Core Components; (d) rent, lease, sell, sublicense, or transfer the
        Software itself (as opposed to your Application) to any third party; (e)
        remove or obscure proprietary notices; (f) circumvent or tamper with
        License Key enforcement or usage metering; or (g) export the Software in
        violation of applicable export-control laws, including US Export
        Administration Regulations and OFAC sanctions.
      </p>
      <p>
        <strong>6.2 No-Compete — Platform Replication Prohibition.</strong> You
        may not use the Software, its APIs, SDKs, or any knowledge gained from
        its use to build a product substantially similar to, or a direct
        substitute for, a Purple8 platform offered to third-party developers as
        infrastructure — including graph databases, vector databases, AI-native
        backends, RAG pipelines, document-intelligence services, or workflow
        orchestration platforms — nor to create a &ldquo;thin wrapper&rdquo; that
        re-exposes Purple8&rsquo;s API, MCP tools, or infrastructure without
        substantial independent Application value.
      </p>
      <p>
        <strong>6.3 Value-Add Requirement.</strong> Any Application you build and
        commercially deploy must provide substantial independent utility to End
        Users beyond raw access to the Software&rsquo;s API.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        <strong>7.1 Ownership.</strong> The Software, including all Core
        Components, Distributable Components, documentation, trade secrets,
        algorithms, and all intellectual property embodied therein, is and shall
        remain the sole and exclusive property of Purple8, Inc. This Agreement
        does not transfer any ownership interest to you.
      </p>
      <p>
        <strong>7.2 Trademarks.</strong> &ldquo;Purple8&rdquo;, &ldquo;Purple8
        Hyper Graph&rdquo;, &ldquo;Purple8 DocIntel&rdquo;, the Purple8 logo, and
        related marks are trademarks or registered trademarks of Purple8, Inc.
        You may not use these marks in your Application name, marketing, or
        domain names without prior written consent.
      </p>
      <p>
        <strong>7.3 Feedback.</strong> If you provide Purple8 with suggestions,
        ideas, or feedback about the Software, Purple8 may use such feedback
        without restriction or obligation to you.
      </p>
      <p>
        <strong>7.4 Patent Rights.</strong> Purple8 grants you no patent rights
        under this Agreement. Purple8 has filed or intends to file patent
        applications covering inventions in the Software.
      </p>

      <h2>8. Audit Rights</h2>
      <p>
        <strong>8.1 Records.</strong> You agree to maintain accurate records of
        your use of the Software, including Node counts, deployment locations,
        and End User counts, for at least three (3) years.
      </p>
      <p>
        <strong>8.2 Audit.</strong> Purple8 may, upon thirty (30) days&rsquo;
        prior written notice, audit your use of the Software no more than once
        per calendar year, during normal business hours.
      </p>
      <p>
        <strong>8.3 Automated Telemetry.</strong> The Software may collect and
        transmit non-personally-identifiable telemetry — Node counts, feature
        usage, and version information — for license compliance and product
        improvement. You may disable telemetry by setting{" "}
        <code>PURPLE8_TELEMETRY_DISABLE=1</code>; disabling telemetry does not
        relieve you of your obligations under Section 8.1. For questions,
        contact{" "}
        <a href="mailto:legal@purple8.ai">legal@purple8.ai</a>.
      </p>

      <h2>9. Confidentiality</h2>
      <p>
        You acknowledge that the Software, its architecture, algorithms,
        pricing, and non-public product roadmap constitute Purple8&rsquo;s
        Confidential Information, and you agree to protect it with at least
        reasonable care. These obligations do not apply to information that is
        publicly known through no fault of yours, was lawfully received without
        restriction, was independently developed, or must be disclosed by law.
      </p>

      <h2>10. Warranty Disclaimer</h2>
      <p>
        <strong>
          THE SOFTWARE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
          AVAILABLE&rdquo; WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT
          PERMITTED BY APPLICABLE LAW, PURPLE8 DISCLAIMS ALL WARRANTIES, EXPRESS,
          IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
          NON-INFRINGEMENT, AND WARRANTIES THAT THE SOFTWARE WILL BE
          UNINTERRUPTED, ERROR-FREE, OR SECURE.
        </strong>
      </p>

      <h2>11. Limitation of Liability</h2>
      <p>
        <strong>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PURPLE8 SHALL NOT BE
          LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
          CONSEQUENTIAL DAMAGES, OR FOR LOSS OF PROFITS, REVENUE, DATA, BUSINESS,
          OR GOODWILL. PURPLE8&rsquo;S TOTAL CUMULATIVE LIABILITY SHALL NOT EXCEED
          THE GREATER OF THE LICENSE FEES PAID IN THE TWELVE (12) MONTHS
          PRECEDING THE CLAIM OR ONE HUNDRED US DOLLARS (USD $100).
        </strong>{" "}
        Nothing in this Agreement excludes liability for death or personal injury
        caused by negligence, fraud, or any liability that cannot be excluded by
        law.
      </p>

      <h2>12. Indemnification</h2>
      <p>
        You agree to defend, indemnify, and hold harmless Purple8 and its
        affiliates from any claims, damages, losses, and expenses (including
        reasonable attorneys&rsquo; fees) arising out of your use of the Software
        in violation of this Agreement, your Application (including claims by
        your End Users), your breach of this Agreement, or your infringement of
        third-party intellectual property rights.
      </p>

      <h2>13. Termination</h2>
      <p>
        <strong>13.1</strong> You may terminate at any time by ceasing all use
        and destroying all copies. <strong>13.2</strong> Purple8 may terminate
        immediately on written notice if you materially breach and fail to cure
        within thirty (30) days, become insolvent, challenge Purple8&rsquo;s IP
        rights, or violate Section 6. <strong>13.3</strong> On termination all
        licenses cease, you must destroy all copies (including cached copies in
        container registries), and Sections 7–13.3 and 14 survive.
      </p>

      <h2>14. General Provisions</h2>
      <p>
        <strong>14.1 Governing Law.</strong> This Agreement is governed by the
        laws of the State of Delaware, USA, without regard to conflict-of-law
        principles. <strong>14.2 Dispute Resolution.</strong> Disputes shall be
        resolved by binding arbitration administered by JAMS under its Commercial
        Arbitration Rules in Wilmington, Delaware; either party may seek
        equitable relief to protect IP rights. <strong>14.3</strong> This
        Agreement, with any Order Form, is the entire agreement.{" "}
        <strong>14.4</strong> Purple8 may update this Agreement; material changes
        to existing licensees will be communicated with at least 60 days&rsquo;
        notice. <strong>14.5</strong> If any provision is unenforceable it will
        be modified to the minimum extent necessary and the remainder continues.{" "}
        <strong>14.6</strong> You may not assign without Purple8&rsquo;s consent;
        Purple8 may assign freely. Notices to{" "}
        <a href="mailto:legal@purple8.ai">legal@purple8.ai</a>.
      </p>
    </LegalDoc>
  );
}
