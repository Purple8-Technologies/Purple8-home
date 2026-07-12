/**
 * Command Center base URL — single source of truth for all CC API calls.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_CC_BASE_URL  (baked at build time — preferred)
 *   2. NEXT_PUBLIC_COMMAND_CENTER_URL  (legacy alias)
 *   3. https://purple8-command-center.fly.dev  (hardcoded fallback — live fly.io app)
 *
 * The custom domain cc.purple8.ai is live (fly.io app, cert active). The
 * deploy workflow (.github/workflows/deploy.yml) already defaults
 * NEXT_PUBLIC_CC_BASE_URL to https://cc.purple8.ai. Because this is a static
 * export, the value is baked at build time — to override, set the
 * NEXT_PUBLIC_CC_BASE_URL GitHub Actions secret and re-run the deploy.
 */
export const CC_BASE_URL: string = (
  process.env.NEXT_PUBLIC_CC_BASE_URL ||
  process.env.NEXT_PUBLIC_COMMAND_CENTER_URL ||
  "https://purple8-command-center.fly.dev"
).replace(/\/$/, "");
