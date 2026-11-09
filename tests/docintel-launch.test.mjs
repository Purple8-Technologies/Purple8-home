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
      assert.equal(exports.checkoutPlan(tier.id), tier.id);
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
});

test("exported pricing advertises the hosted included-page contract", () => {
  const html = readFileSync(new URL("out/pricing/index.html", root), "utf8");
  assert.match(html, /\$100\/month includes 10,000 pages/);
  assert.match(html, /\$0\.01 per additional page/);
  assert.match(html, /Included pages reset each billing month/);
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

test("licensing offers separate Hyper Graph and DocIntel ladders wired to Stripe checkout", () => {
  assert.deepEqual(
    Array.from(exports.GRAPH_TIERS, (t) => t.id),
    ["developer", "builder", "production", "growth", "enterprise"],
  );
  for (const plan of ["builder", "production", "growth", "docintel-builder", "docintel-production", "docintel-growth"]) {
    assert.equal(exports.checkoutPlan(plan), plan);
  }
  const hgHtml = readFileSync(new URL("out/products/hyper-graph/index.html", root), "utf8");
  assert.match(hgHtml, /Contact Us/);
  assert.match(hgHtml, /Free Playground/);
  assert.doesNotMatch(hgHtml, /Pro and Enterprise|\$119\/mo/);
});

test("pricing.ts matches canonical SSOT catalog.json when sibling repo is present", () => {
  const catalogPath = new URL("../purple8-command-center/src/command_center/catalog.json", root);
  let catalog;
  try {
    catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
  } catch {
    return; // sibling repo not checked out in CI
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
  }
  const diProduct = catalog.products.find((p) => p.id === "docintel");
  for (const [homeId, ssotId] of [
    ["docintel-builder", "solo"],
    ["docintel-production", "self_hosted"],
    ["docintel-growth", "enterprise"],
  ]) {
    const homeTier = exports.DOCINTEL_TIERS.find((t) => t.id === homeId);
    const ssotTier = diProduct.tiers.find((t) => t.id === ssotId);
    assert.equal(homeTier.price, `$${ssotTier.price_monthly}`, `docintel/${homeId} monthly`);
    assert.equal(homeTier.priceAnnual, `$${ssotTier.price_annual}`, `docintel/${homeId} annual`);
  }
});

test("NVIDIA Inception badge and legal attribution render on homepage without pre-certification Red Hat badge", () => {
  const homeHtml = readFileSync(new URL("out/index.html", root), "utf8");
  assert.match(homeHtml, /NVIDIA Inception Program Member/);
  assert.match(homeHtml, /member of the NVIDIA Inception program/);
  assert.doesNotMatch(homeHtml, /Red Hat Technology Partner/);
  assert.match(
    homeHtml,
    /© 2025 NVIDIA, the NVIDIA logo, and NVIDIA Inception are trademarks and\/or registered trademarks of NVIDIA Corporation/,
  );
});
