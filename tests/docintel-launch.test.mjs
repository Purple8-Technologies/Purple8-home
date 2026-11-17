import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const exports = {};
vm.runInNewContext(ts.transpileModule(
  readFileSync(new URL("src/lib/pricing.ts", root), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
).outputText, { exports });

test("current and legacy Cloud links select account billing, not anonymous checkout", () => {
  for (const plan of ["docintel-graduated", "docintel-payg", " DOCINTEL-PAYG "]) {
    assert.equal(exports.checkoutPlan(plan), exports.DOCINTEL_CLOUD_PLAN);
  }
  for (const tier of exports.GRAPH_TIERS) {
    if (typeof tier.priceMonthly === "number" && tier.priceMonthly > 0) {
      assert.equal(exports.checkoutPlan(tier.id), null);
    }
  }
  for (const value of ["", "prepaid", "docintel", "enterprise", "unknown"]) {
    assert.equal(exports.checkoutPlan(value), null);
  }
});

test("monthly access and graduated usage match the published bill at boundaries", () => {
  for (const [pages, total] of [[0, 100], [1, 100], [9999, 100], [10000, 100], [10001, 100.01], [50000, 500]]) {
    assert.equal(exports.docIntelCloudBill(pages), total);
  }
  for (const pages of [-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => exports.docIntelCloudBill(pages), /non-negative safe integer/);
  }
  const sandbox = exports.DOCINTEL_TIERS.find((tier) => tier.id === "beta");
  assert.match(sandbox.name, /Sandbox/);
  assert.equal(sandbox.ctaHref, "/try/docintel/");
  const cloud = exports.DOCINTEL_TIERS.find((tier) => tier.id === "cloud");
  assert.equal(cloud.quota, "10,000 pages/month included");
  assert.match(cloud.tagline, /\$0\.01 per additional page/);
});

test("exported pricing advertises the hosted included-page contract", () => {
  const html = readFileSync(new URL("out/pricing/index.html", root), "utf8");
  assert.match(html, /\$100\/month includes 10,000 pages/);
  assert.match(html, /\$0\.01 per additional page/);
  assert.match(html, /Included pages reset each billing month/);
  assert.match(html, /\$0\.015/);
  assert.match(html, /Sign in to buy page credits/);
  assert.match(html, /href="https:\/\/docintel\.purple8\.ai\/try\?view=billing"[^>]*>Sign in to add credits<\/a>/);
  assert.doesNotMatch(html, /Prepaid billing is not yet available|<button disabled=""[^>]*>Not yet available<\/button>/);
  const docintel = html.split('id="docintel"')[1].split("</main>")[0];
  assert.doesNotMatch(docintel, /DocIntel Builder|DocIntel Production|DocIntel Growth|\$79|\$299|\$799|plan=docintel-(builder|production|growth)/);
});

test("exported trial uses account handoff and retains existing-key support", () => {
  const html = readFileSync(new URL("out/try/docintel/index.html", root), "utf8");
  assert.match(html, /Open DocIntel/);
  assert.match(html, /view=playground/);
  assert.match(html, /view=api/);
  assert.match(html, /Connect your existing key/);
  assert.match(html, /billing metadata/);
  assert.doesNotMatch(html, /Email me a sandbox key|Check your email|50 documents a month|<form/);
});

test("exported product is standalone, accurate about retention, and routes licensing to Contact Us", () => {
  const html = readFileSync(new URL("out/products/docintel/index.html", root), "utf8");
  assert.match(html, /view=playground/);
  assert.match(html, /optional destination, not a requirement/);
  assert.match(html, /RAM-only session/);
  assert.match(html, /Contact Us/);
  assert.doesNotMatch(html, /DocIntel keeps no data|documents never leave your network|\$10 free credit|\$100\/month/);
});

test("self-hosted and Enterprise are sales-assisted, not public checkout", () => {
  assert.deepEqual(
    Array.from(exports.GRAPH_TIERS, (t) => t.id),
    ["developer", "builder", "production", "growth", "enterprise"],
  );
  for (const plan of ["builder", "production", "growth", "micro", "mini", "starter", "pro", "docintel-builder", "docintel-production", "docintel-growth"]) {
    assert.equal(exports.checkoutPlan(plan), null);
  }
  const graphEnterprise = exports.GRAPH_TIERS.find((tier) => tier.id === "enterprise");
  assert.equal(graphEnterprise.name, "Enterprise / BYOC (Custom)");
  assert.equal(graphEnterprise.cta, "Talk to us");
  const docintelEnterprise = exports.DOCINTEL_TIERS.find((tier) => tier.id === "enterprise");
  assert.equal(docintelEnterprise.name, "Enterprise / BYOC (Self-Hosted)");
  assert.equal(docintelEnterprise.price, "Custom");
  assert.equal(docintelEnterprise.cta, "Talk to us");
  assert.match(docintelEnterprise.ctaHref, /^mailto:/);
  assert.match(docintelEnterprise.tagline, /optional destination/);
  const pricingHtml = readFileSync(new URL("out/pricing/index.html", root), "utf8");
  assert.match(pricingHtml, /Talk to us/);
  assert.match(pricingHtml, /Paid activation pending/);
  assert.doesNotMatch(pricingHtml, /plan=docintel-(builder|production|growth)|plan=(builder|production|growth)&/);
  const hgHtml = readFileSync(new URL("out/products/hyper-graph/index.html", root), "utf8");
  assert.match(hgHtml, /Contact Us/);
  assert.match(hgHtml, /Free Playground/);
  assert.match(pricingHtml, /Builder/);
  assert.match(pricingHtml, /250K nodes/);
});

test("pricing.ts matches canonical SSOT catalog.json when sibling repo is present", () => {
  const catalogPath = new URL("../purple8-command-center/src/command_center/catalog.json", root);
  let catalog;
  try {
    catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
  const graphProduct = catalog.products.find((p) => p.id === "graph");
  assert.deepEqual(
    Array.from(exports.GRAPH_TIERS, (t) => t.id),
    graphProduct.tiers.map((t) => t.id),
  );
  for (const tier of exports.GRAPH_TIERS) {
    const ssot = graphProduct.tiers.find((t) => t.id === tier.id);
    assert.equal(tier.priceMonthly, ssot.price_monthly, `graph/${tier.id} priceMonthly`);
    assert.equal(tier.priceAnnual, ssot.price_annual, `graph/${tier.id} priceAnnual`);
    assert.equal(tier.nodes, ssot.entitlements.nodes, `graph/${tier.id} node ceiling`);
    assert.equal(tier.edges, ssot.entitlements.edges, `graph/${tier.id} edge ceiling`);
    assert.equal("projects" in ssot.entitlements, false, `graph/${tier.id} has no project cap`);
  }
  const diProduct = catalog.products.find((p) => p.id === "docintel");
  const enterprise = diProduct.tiers.find((t) => t.id === "enterprise");
  assert.equal(enterprise.self_serve, false);
  assert.equal(enterprise.price_monthly, null);
  assert.equal(enterprise.cta, "Talk to us");
  for (const legacy of ["solo", "self_hosted"]) {
    assert.equal(diProduct.tiers.find((t) => t.id === legacy).legacy, true);
  }
});

test("self-hosted fulfillment never advertises an automatic Cloud upgrade", () => {
  const source = readFileSync(new URL("src/app/checkout/success/page.tsx", root), "utf8");
  assert.match(source, /This license is for your own infrastructure/);
  assert.match(source, /this key does not upgrade a Cloud tenant/);
  assert.doesNotMatch(source, /Use on Purple8 Cloud immediately|tenant quota upgrades automatically/);
});

test("Graph pricing and quickstart show capacity tiers without tenant-count caps", () => {
  const quickstart = readFileSync(new URL("src/app/quickstart/page.tsx", root), "utf8");
  assert.match(quickstart, /50K nodes, 200K edges, no tenant-count cap/);
  assert.equal(
    exports.graphLicenseLimits(exports.GRAPH_TIERS.find((tier) => tier.id === "builder")),
    "250,000 nodes · 1,000,000 edges",
  );
  assert.doesNotMatch(
    exports.GRAPH_TIERS.map((tier) => exports.graphLicenseLimits(tier)).join("\n"),
    /project|tenant/i,
  );
  const pricingCards = readFileSync(
    new URL("src/components/revamp/PricingCards.tsx", root),
    "utf8",
  );
  assert.match(pricingCards, /Default RS256 license limits: \{graphLicenseLimits\(t\)\}/);
});

test("NVIDIA Inception badge and legal attribution render on homepage without pre-certification Red Hat badge", () => {
  const homeHtml = readFileSync(new URL("out/index.html", root), "utf8");
  assert.match(homeHtml, /Self-Hosted &amp; Enterprise: Talk to us/);
  assert.doesNotMatch(homeHtml, /Purple8 Cloud \(from \$39\/mo\)|Cloud &amp; Self-Hosted Plans \(From \$39/);
  assert.match(homeHtml, /NVIDIA Inception Program Member/);
  assert.match(homeHtml, /member of the NVIDIA Inception program/);
  assert.doesNotMatch(homeHtml, /Red Hat Technology Partner/);
  assert.match(
    homeHtml,
    /© 2025 NVIDIA, the NVIDIA logo, and NVIDIA Inception are trademarks and\/or registered trademarks of NVIDIA Corporation/,
  );
});
