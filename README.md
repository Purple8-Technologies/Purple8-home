This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## DocIntel Cloud checkout rehearsal

DocIntel Cloud subscriptions use `docintel-graduated`: a monthly access item plus
graduated metered pages. New purchases require the signed-in DocIntel workspace,
with one subscription covering all projects in the account. Legacy Cloud
checkout links direct customers to that workspace without creating a session.
Stripe is the pricing source of truth; the display and
estimator in `src/lib/pricing.ts` must match its configured prices. The prepaid
usage-only option has no activation CTA until its balance gate is implemented.

The checkout success page uses the fulfilled product returned by Command
Center, not a query parameter, to distinguish Cloud API access from self-hosted
licences. It requires `product_tier` and active access for DocIntel Cloud, shows
`api_base_url` and the API documentation. It opens the unified DocIntel workspace
on that exact fulfilled endpoint, passing the key in a fragment (never a query
parameter). Missing endpoint configuration is shown explicitly.

## Unified DocIntel workspace

The DocIntel product page links to the existing service-hosted `/try` UI, now
organized into Playground, Connections, API keys & access, and Usage & billing.
The free-key request remains at `/try/docintel/`; it returns to the same workspace.
Hyper Graph's start paths are unchanged. `NEXT_PUBLIC_DOCINTEL_WORKSPACE_URL`
can select the rehearsal endpoint at build time; it defaults to the existing
DocIntel Fly `/try` URL. Do not point a rehearsal at production processing.

Workspace links carry the selected day/night theme in a non-secret query
parameter. Both sites consume that choice before paint and retain the shared
`p8-theme` preference on their respective origins. No iframe, cross-origin
processing call or relaxed CORS policy is needed.

Deploy the matching DocIntel workspace assets and website together before
exposing Cloud activation. Checkout still requires the Command Center Cloud
endpoint and graduated Stripe prices. Customer sign-in and project/key
provisioning are handled by DocIntel and Command Center. Prepaid payments and
account usage/invoice management remain unavailable.
Set DocIntel's `SERVER__WORKSPACE_WEBSITE_URL` to this website's origin and
enable `SERVER__WORKSPACE_CHECKOUT_ENABLED` only when checkout is ready.
For other plans, the bootstrap sends the selected theme to Command Center and accepts only
HTTPS Stripe-hosted checkout URLs, preserving their complete fragments.

For browser tests, mock the Command Center response with synthetic keys. Do not
put real keys in screenshots, fixtures, or logs. Local preview origins must be
explicitly allowed by the test billing service's CORS configuration; do not
weaken live CORS for a preview. Browser-supplied Stripe return URLs remain
restricted to the approved website hosts. Subscription cancellation uses the
server-configured Cloud workspace; success uses the configured website.
A local preview does not change those deployment settings.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
