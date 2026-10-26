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
  for (const [pages, total] of [[0, 100], [1, 100.02], [9999, 299.98], [10000, 300], [10001, 300.02], [50000, 1020]]) {
    assert.equal(exports.docIntelCloudBill(pages), total);
  }
  for (const pages of [-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => exports.docIntelCloudBill(pages), /non-negative safe integer/);
  }
  const community = exports.DOCINTEL_TIERS.find((tier) => tier.id === "beta");
  assert.match(community.name, /self-hosted/);
  assert.equal(community.ctaHref, "/quickstart/#add-docintel");
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

test("exported product is standalone, accurate about retention, and offers Cloud billing", () => {
  const html = readFileSync(new URL("out/products/docintel/index.html", root), "utf8");
  assert.match(html, /view=billing/);
  assert.match(html, /view=playground/);
  assert.match(html, /optional destination, not a requirement/);
  assert.match(html, /RAM-only session/);
  assert.match(html, /Enterprise \/ Custom/);
  assert.doesNotMatch(html, /DocIntel keeps no data|documents never leave your network|\$10 free credit/);
});

test("self-hosted pricing offers only Developer Free and Enterprise / Custom", () => {
  assert.deepEqual(
    Array.from(exports.GRAPH_TIERS, (t) => t.id),
    ["developer", "enterprise"],
  );
  const hgHtml = readFileSync(new URL("out/products/hyper-graph/index.html", root), "utf8");
  assert.match(hgHtml, /Enterprise \/ Custom/);
  assert.match(hgHtml, /Developer Free/);
  assert.doesNotMatch(hgHtml, /Pro and Enterprise/);
});

test("NVIDIA Inception badge and legal attribution render on homepage and product pages", () => {
  const homeHtml = readFileSync(new URL("out/index.html", root), "utf8");
  assert.match(homeHtml, /NVIDIA Inception Program Member/);
  assert.match(homeHtml, /member of the NVIDIA Inception program/);
  assert.match(
    homeHtml,
    /© 2025 NVIDIA, the NVIDIA logo, and NVIDIA Inception are trademarks and\/or registered trademarks of NVIDIA Corporation/,
  );
});
