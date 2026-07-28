# North Star

This is the living record of what we're building, why, and the decisions that
got us here. Read this first, every session. Update it every time a real
decision gets made — not after the fact, in the moment.

## The end goal (draft — needs your correction)

A personalized children's storybook business (MESTAR / MyStarStories) that:
- Generates life-changing income for the team
- Is a genuinely good product — a real, positive experience for the parents
  and kids who buy it, not just a funnel

**Four people's real lives depend on this working.** That's the standard
every decision gets measured against, not "did the ticket get closed."

**Gaps only you can fill in** (I don't know these — tell me and I'll lock
them in here):
- Who are the 4 people, and what's each of them counting on this for?
- What does "life-changing income" mean in an actual number, and by when?
- What's the customer promise in your words — why does a parent buy this
  instead of a thousand other options?
- What's the current stage — pre-launch, soft-launched, live with real
  customers today?
- What's the marketing/growth plan, if one exists yet?

## Current state of the two codebases

- **mestar** (`the4ONE1/mestar`) — React/Vite, full-featured, the original
  build. Real AI story generation, audiobook narration, PDF assembly, all
  via Supabase Edge Functions on project `gqgloucjqvhbbjyxfgqw`. **This
  Supabase account cannot access that project at all** — confirmed via a
  permission error, not a guess. Whoever set it up used a different login.
- **mystarmvp** (`the4ONE1/mystarmvp`) — Next.js rebuild, simpler UI
  (no AI-generated preview screen yet). This is the active target.

## Decisions made, and why (chronological)

1. **Migrated env vars from mestar into mystarmvp** — the original ask.
   Found mystarmvp's checkout was an independent, disconnected
   reimplementation (own Stripe calls, own S3 bucket, own thin Supabase
   project) — a duplicate system, not a port of mestar's real backend.

2. **Chose to reuse mestar's real backend instead of standing up fresh
   Stripe/AWS accounts for mystarmvp** — your call, to stop duplicating a
   working system. First attempt pointed mystarmvp at mestar's actual
   project (`gqgloucjqvhbbjyxfgqw`).

3. **Discovered this Supabase account can't reach `gqgloucjqvhbbjyxfgqw`
   at all** — this is very likely the root of "the webhook was set up in a
   different account" that you'd suspected from the start.

4. **Switched target to `ktkebsvoqbxsirgluxeo`** — the Supabase project
   this account *can* actually manage. Found it already had a partially
   built, independent checkout/generation pipeline (not in git — deployed
   directly to Supabase by a prior session) — but broken:
   - `stripe-webhook` and `create-storybook` queried a table
     (`storybook_orders`) that doesn't exist in this project — every
     webhook would have silently failed to find the order.
   - No function existed to actually create a checkout session or the
     pending order.
   - No storage buckets existed for photo uploads or generated PDFs.
   - Two functions had live API keys hardcoded directly in the source as
     fallback values (a Stripe webhook signing secret, a Resend API key).

5. **Fixed all of the above directly in Supabase** (deployed via MCP
   tools — not part of this repo's git history since Edge Functions live
   in Supabase, not here): new `create-pending-order` / `create-checkout` /
   `get-order-status` functions, fixed the table-name bug, removed the
   hardcoded secrets, created the missing storage buckets.

6. **Confirmed the Stripe account is shared** — `acct_1T45wEEFjF8b7r2p`
   ("mE-STAR") is the same account both mestar and this project's checkout
   use, with the same Price catalog (lookup keys like
   `personalized_storybook_onetime`). One Stripe account, at least two
   Supabase backends have pointed at it over time.

7. **Found 4 pre-existing live Stripe webhooks pointing elsewhere** —
   `mestar.pro/API/webhooks/stripe` (newest) and a third Supabase project,
   `kdnbefbznmwsmphxyrei`, registered 3 separate times. None point at
   `ktkebsvoqbxsirgluxeo`. Left untouched (didn't want to break something
   live without knowing its blast radius) — **needs an audit.**

## Open items — next actions

- [ ] Register a new Stripe webhook → `ktkebsvoqbxsirgluxeo`'s
      `stripe-webhook` function, for `checkout.session.completed`.
- [ ] Set 4 secrets in Supabase (`ktkebsvoqbxsirgluxeo`): `STRIPE_SECRET_KEY`,
      `STRIPE_WEBHOOK_SECRET`, `GEMINI_API_KEY`, `RESEND_API_KEY`.
- [ ] Rotate the exposed Resend key and whichever Stripe webhook secret
      matches the one that was hardcoded — both must be treated as
      compromised.
- [ ] Run one real end-to-end checkout test, then check Edge Function logs
      to confirm the pipeline actually completes (payment → story
      generation → PDF → email).
- [ ] Audit the 3 other live Stripe webhooks (`mestar.pro`,
      `kdnbefbznmwsmphxyrei` ×3) — figure out what's still real, what's
      dead, and consolidate or delete.
- [ ] Decide on Phase 2 scope: AI-generated story preview *before* payment
      (mestar has this; mystarmvp doesn't yet).
- [ ] Decide on Phase 3 scope: audiobook generation + email fulfillment
      wired fully into mystarmvp's UI.

## Known product gaps (mystarmvp vs. mestar)

- No preview-before-payment screen.
- No photo-likeness matching in image generation (photo is stored, not yet
  fed into the AI prompt).
- "Dedication" and "gender" collected in the UI but not passed to
  generation — no matching field in this project's schema yet.
- "Additional Character" add-on not offered — needs a name/photo field
  the form doesn't collect.
