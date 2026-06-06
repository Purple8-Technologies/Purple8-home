/**
 * POST /checkout/create-session?plan=starter|pro|enterprise
 *
 * Thin proxy: receives the plan name from the pricing page,
 * calls Command Center which creates the Stripe Checkout Session,
 * and returns the Stripe-hosted URL to redirect to.
 *
 * Command Center owns the Stripe secret key and price IDs.
 * This route never touches Stripe directly.
 *
 * Env vars required:
 *   COMMAND_CENTER_URL          — e.g. https://cc.purple8.ai
 *   COMMAND_CENTER_SERVICE_KEY  — shared secret for machine-to-machine auth
 */
import { NextRequest, NextResponse } from "next/server";

const CC_URL = process.env.COMMAND_CENTER_URL ?? "https://cc.purple8.ai";
const CC_TOKEN = process.env.COMMAND_CENTER_SERVICE_KEY ?? "";

// Map marketing plan name → Command Center plan name
const PLAN_MAP: Record<string, string> = {
  starter:    "starter",
  pro:        "pro",
  enterprise: "enterprise",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const searchPlan = request.nextUrl.searchParams.get("plan") ?? "";
    const plan = PLAN_MAP[body.plan ?? searchPlan];
    const billing: string = body.billing === "annual" ? "annual" : "monthly";

    if (!plan) {
      return NextResponse.json(
        { error: "Invalid plan. Choose: starter, pro, enterprise" },
        { status: 400 }
      );
    }

    if (plan === "enterprise") {
      // Enterprise is a direct sales conversation — no Stripe session
      return NextResponse.json({
        redirect_url: "mailto:sales@purple8.ai?subject=Enterprise%20license%20inquiry",
      });
    }

    const origin = request.headers.get("origin") ?? "https://purple8.ai";

    const resp = await fetch(`${CC_URL}/billing/checkout/create-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(CC_TOKEN ? { Authorization: `Bearer ${CC_TOKEN}` } : {}),
      },
      body: JSON.stringify({
        plan,
        billing,
        success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}&billing=${billing}`,
        cancel_url:  `${origin}/#pricing`,
      }),
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({ detail: "upstream error" }));
      console.error("[checkout] command-center error", resp.status, err);
      return NextResponse.json(
        { error: err.detail ?? "Failed to create checkout session" },
        { status: 502 }
      );
    }

    const data = await resp.json();
    return NextResponse.json({ checkout_url: data.checkout_url ?? data.url });

  } catch (err) {
    console.error("[checkout] unexpected error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
