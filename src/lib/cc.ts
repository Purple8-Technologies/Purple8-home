/**
 * Command Center base URL — single source of truth for all CC API calls.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_CC_BASE_URL  (set in Vercel env vars — preferred)
 *   2. NEXT_PUBLIC_COMMAND_CENTER_URL  (legacy alias)
 *   3. https://cc.purple8.ai  (hardcoded fallback — custom domain)
 *
 * To switch to the Railway domain without a code push:
 *   Vercel → Purple8-home → Settings → Environment Variables →
 *   NEXT_PUBLIC_CC_BASE_URL = https://<service>.up.railway.app
 *   → Redeploy
 */
export const CC_BASE_URL: string = (
  process.env.NEXT_PUBLIC_CC_BASE_URL ||
  process.env.NEXT_PUBLIC_COMMAND_CENTER_URL ||
  "https://cc.purple8.ai"
).replace(/\/$/, "");
