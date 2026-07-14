import { redirect } from "next/navigation";

/**
 * The public beta / waitlist program is retired. The Developer edition is now
 * generally available and fully self-serve, so every legacy `/beta` link
 * (old invite emails, external references) resolves to the canonical free
 * Developer registration flow. There is exactly one free path: /register.
 */
export default function BetaPage() {
  redirect("/register");
}
