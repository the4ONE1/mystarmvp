# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

MESTAR — a conversion-optimized Next.js marketing/checkout site for personalized children's
storybooks (upload a child's photo, pick a theme, checkout via Stripe, get a PDF storybook). This
is a **separate, independently-deployed codebase from the `mestar` repo** (which is the Vite/React +
Supabase-edge-functions app for the same product) — don't assume changes need to mirror both, but
be aware both exist and confirm which one a request is actually about.

Stack: Next.js 15 (App Router, plain JavaScript — not TypeScript), Tailwind CSS + shadcn/ui
("new-york" style), Stripe Checkout (hosted, redirect-based — not embedded), Supabase (used only as
an order-record datastore via the service-role key, no Supabase Auth), AWS S3 for photo uploads
(presigned URLs).

The project was originally scaffolded from an Emergent.sh `nextjs-mongo-template` base image (see
`.emergent/emergent.yml`) and has since been migrated off MongoDB onto Supabase — `README.md` still
documents the old MongoDB setup in places and is out of date; trust the code and the
`SUPABASE_MIGRATION_COMPLETE.md` / `supabase_schema.sql` files over the README's setup instructions.

## Commands

```sh
yarn dev              # next dev on 0.0.0.0:3000, capped at 512MB (NODE_OPTIONS max-old-space-size)
yarn dev:no-reload      # next dev without the memory cap
yarn build             # next build
yarn start              # next start (serve production build)
```

Package manager is Yarn (pinned via `packageManager` in `package.json`) — don't switch to npm/pnpm
lockfiles. There is no lint/test/typecheck script wired up in `package.json`; `tests/` and
`test_result.md` are artifacts of the Emergent.sh testing-agent workflow, not an active test suite.

## Architecture

### Routing & pages (`app/`, Next.js App Router, `.js`/`.jsx` — no TypeScript)
- `app/page.js` — landing page, composed from `components/landing/*` (Hero, HowItWorks,
  ThemeShowcase, Testimonials).
- `app/create/page.js` — personalization flow (`components/PersonalizationForm.jsx` +
  `components/PhotoUpload.jsx`, the latter uploading directly to S3 via presigned URLs).
- `app/checkout/{page.js,success,cancel}` and `app/order-confirmation/page.js` — Stripe Checkout
  redirect flow and post-payment status pages.
- `app/{about,faq,contact,privacy,terms,refund-policy}/page.js` — static legal/marketing pages.
- `middleware.js` — redirects `www.` → apex domain in production only.
- Path alias `@/*` maps to the repo root (see `jsconfig.json`), e.g. `@/lib/stripe`,
  `@/components/ui/button`.

### Checkout & order flow
- `app/api/create-checkout-session/route.js` — builds a Stripe Checkout session from
  `STRIPE_PRICE_MAIN_STORY` plus an add-on price-ID map (`STRIPE_PRICE_AUDIOBOOK`,
  `STRIPE_PRICE_COLORING_BOOK`, `STRIPE_PRICE_ADDITIONAL_CHARACTER`), then best-effort writes a
  `pending` order row to Supabase (failure to write doesn't block checkout — the webhook is the
  source of truth).
- `app/api/webhooks/stripe/route.js` — verifies the Stripe signature and, on
  `checkout.session.completed`, upserts the order in Supabase to `status: 'paid'`. If
  `STRIPE_WEBHOOK_SECRET` is a placeholder, signature verification is skipped and the handler
  no-ops (`mock: true`) — expected in local/dev, not in production.
- `app/api/order-status/route.js` — polled by `order-confirmation` to read order status by
  `session_id`.
- `app/api/upload/presign/route.js` — issues S3 presigned `PutObject` URLs for direct
  browser→S3 photo upload.
- **`app/api/[[...path]]/route.js` is legacy**: an older catch-all handler that duplicates
  checkout/upload logic from before the routes above existed as dedicated files. Next.js resolves
  the more specific routes first, so this file is effectively dead for those paths — don't add new
  logic here; extend the dedicated route files instead.
- Every route degrades **gracefully** rather than erroring when a dependency isn't configured
  (missing Stripe/S3/Supabase env vars return a 200 with a `mock`/`graceful_mode` flag instead of a
  502/500). Preserve that pattern in new endpoints — it's intentional so the marketing site never
  hard-fails in an unconfigured preview environment.
- `lib/supabase.js` — thin Supabase client + `getOrder`/`createOrder`/`updateOrder` helpers, built
  with the **service-role key** (server-only, never expose to the client). `isSupabaseConfigured()`
  gates all DB calls.
- `supabase_schema.sql` — canonical schema for the `orders` table (status enum: `pending`, `paid`,
  `fulfilled`, `cancelled`; RLS enabled, service-role-only policy). Apply this manually via the
  Supabase SQL editor — there's no migration runner in this repo.
- `lib/stripe.js` vs. the `stripe` instances created inline in each route file are **not the same
  config** (different API versions, `lib/stripe.js` is only used by the legacy catch-all route) —
  when touching Stripe API-version-sensitive behavior, check which one the route you're editing
  actually imports.

### UI
- `components/ui/*` — shadcn/ui primitives (`components.json`: style `new-york`, `rsc: true`,
  `tsx: false` — this project generates shadcn components as `.jsx`, unlike the sibling `mestar`
  repo which uses `.tsx`/`default` style). Add app components in `components/` alongside the
  existing `landing/` subfolder convention for page-section components.
- `components/{GoogleAnalytics,GoogleTagManager,MetaPixel}.jsx` — third-party tracking snippets
  loaded from `app/layout.js`; see `TRACKING_SETUP_GUIDE.md` for the env vars they read.
- Fonts: `Baloo_2` (display, `--font-display`) and `Nunito` (body, `--font-body`), loaded via
  `next/font/google` in `app/layout.js`.

### Environment variables
Server-only: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_MAIN_STORY`,
`STRIPE_PRICE_AUDIOBOOK`, `STRIPE_PRICE_COLORING_BOOK`, `STRIPE_PRICE_ADDITIONAL_CHARACTER`,
`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`,
`AWS_REGION`, `AWS_S3_BUCKET`. Client-exposed: `NEXT_PUBLIC_BASE_URL`,
`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`. `.env*` files are gitignored — always use placeholder-style
examples in docs, never commit real keys (see "Note" below).

## Root-level docs
The repo root has many one-off Markdown runbooks from prior work (`SETUP_GUIDE.md`,
`STRIPE_LIVE_INTEGRATION.md`, `PRODUCTION_DEPLOYMENT_GUIDE.md`, `DOMAIN_CONFIGURATION_GUIDE.md`,
`CUSTOM_DOMAIN_SETUP.md`, `DNS_QUICK_REFERENCE.md`, `AWS_S3_SETUP.md`, `CHECKOUT_BUG_FIX.md`,
`DEPLOYMENT_STATUS.md`, `QUICK_START_STRIPE.md`, `SUPABASE_MIGRATION_COMPLETE.md`). These are
historical/point-in-time notes, not living documentation — treat them as background context, not
as a spec to keep updated, and don't assume they reflect the current deployed state.

**Note:** `SUPABASE_MIGRATION_COMPLETE.md` currently has a live-looking Supabase
`SUPABASE_SERVICE_ROLE_KEY` value committed in plaintext. Flag this for rotation/removal — do not
copy that value into new code or docs.
