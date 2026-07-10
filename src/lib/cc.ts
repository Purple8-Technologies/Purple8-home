/**
 * Command Center base URL — single source of truth for all CC API calls.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_CC_BASE_URL  (set in Vercel env vars — preferred)
 *   2. NEXT_PUBLIC_COMMAND_CENTER_URL  (legacy alias)
 *   3. https://purple8-command-center.fly.dev  (hardcoded fallback — live fly.io app)
 *
 * When the custom domain (cc.purple8.ai) is registered and pointed at the
 * fly.io app, switch without a code push:
 *   Vercel → Purple8-home → Settings → Environment Variables →
 *   NEXT_PUBLIC_CC_BASE_URL = https://cc.purple8.ai
 *   → Redeploy
 */
export const CC_BASE_URL: string = (
  process.env.NEXT_PUBLIC_CC_BASE_URL ||
  process.env.NEXT_PUBLIC_COMMAND_CENTER_URL ||
  "https://purple8-command-center.fly.dev"
).replace(/\/$/, "");
