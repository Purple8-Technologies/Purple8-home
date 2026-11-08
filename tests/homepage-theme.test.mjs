import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("homepage inherits the root theme instead of maintaining stale local theme state", () => {
  const source = readFileSync(
    new URL("../src/components/revamp/BrandHome.tsx", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(source, /useRootTheme|data-p8-theme=\{/);
  assert.match(source, /\.p8-shell\s*\{[^}]*--p8-fg:#18181b;/);
  assert.match(source, /html\[data-p8-theme="night"\] \.p8-shell\s*\{[^}]*--p8-fg:#f4f4f5;/);
  assert.match(source, /<h1 className="[^"]*text-\[var\(--p8-fg\)\]/);
});

test("homepage filled CTA retains white text in both themes", () => {
  const source = readFileSync(
    new URL("../src/components/revamp/BrandHome.tsx", import.meta.url),
    "utf8",
  );
  assert.match(source, /\.p8-shell\s*\{[^}]*--p8-button:#7c3aed;/);
  assert.match(source, /href="\/try\/docintel\/" className="[^"]*bg-\[var\(--p8-button\)\][^"]*text-white/);
  const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");
  assert.ok(css.includes(':not([class*="bg-\\[var\\(--p8-button"])'));
});
