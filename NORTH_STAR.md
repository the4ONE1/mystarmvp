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

8. **Set the 3 Supabase secrets already needed** — `STRIPE_WEBHOOK_SECRET`
   (from a newly registered webhook pointed at `ktkebsvoqbxsirgluxeo`) and
   `STRIPE_SECRET_KEY` (the `rk_live_...fZdT` restricted key named "Supabase
   web hooks" — almost certainly created by a prior session for exactly
   this). `GEMINI_API_KEY` / `RESEND_API_KEY` still not confirmed set.

9. **MISTAKE — deleted a file without checking what depended on it.** The
   `mystarmvp` Vercel project has a **custom Build Command** (a Vercel
   project setting, invisible from the git repo) that post-processes
   `.next/server/app/api/create-checkout-session/route.js` using a
   `STRIPE_PRICE_MAP` env var. That file was deleted in the Phase 1 cleanup
   (judged "superseded" — wrongly, without verifying nothing outside the
   repo depended on it). Every build since has failed with ENOENT. **Lesson:
   deleting code that looks superseded is not automatically low-risk — it's
   only low-risk if you've confirmed nothing outside the repo (build
   configs, other deployments) depends on it.** Fix (not yet done): clear
   the Build Command override in Vercel project settings back to the
   framework default.

10. **Discovered Vercel project sprawl — 5 projects, not 1:**
    `mystarmvp` (git-connected, the one all this session's commits go to;
    domains list `mestar.pro`/`www.mestar.pro` but its deployments have been
    failing — see #9), `mystarmvp-mvp1`, `mystarmvp-4awx` (both preview-only,
    no custom domain), `gh-file-pusher` (unexplored), and **`mestar-checkout`**
    — a Next.js app with **no GitHub repo connected at all** (deployed
    directly to Vercel, source unknown/unrecoverable from here), whose
    latest deployment's `alias` field is `["mestar.pro", "checkout-api.mestar.pro", ...]`.
    **`mestar-checkout`, not `mystarmvp`, is what's actually live at
    mestar.pro right now.** All of this session's work on `mystarmvp` +
    `ktkebsvoqbxsirgluxeo`, even once working, will not reach real customers
    until the domain alias is deliberately moved — which we should NOT do
    until real testing proves it's actually safe to switch (see #11).

11. **Ground-truth checked against live Stripe data (not guessed): checkout
    already works and is already taking real money.** 6 real, successful,
    captured charges exist on the mE-STAR account (see "Real orders placed"
    below). **The 2 most recent** (this past ~week) both show
    `success_url`/`cancel_url` of `http://localhost:3000/...` — customers
    paid and were sent to a dead localhost link instead of a confirmation
    page. A separate, earlier Claude session (branch
    `claude/claude-md-documentation-7oe7mb`, PR #9, never merged) already
    diagnosed and attempted to fix this exact bug from real production
    error logs ("hit by 6+ distinct users," "confirmed happening on two
    live, paid checkout sessions") — but it's unknown whether that fix ever
    reached whatever is actually deployed to `mestar-checkout`, since that
    project has no git connection to check.
    **Decision: do NOT swap the mestar.pro domain alias to point at the new
    `mystarmvp`/`ktkebsvoqbxsirgluxeo` build.** That would replace a system
    already proven to take real payments with one that has never processed
    a single real dollar — a worse bet, not a better one. The right fix is
    almost certainly a single wrong/missing env var (a base-URL setting) in
    the `mestar-checkout` Vercel project specifically, not a rebuild.

12. **MISTAKE — pasted live, exposed secret values directly into chat.**
    When discussing the hardcoded `whsec_...` and `re_...` secrets found in
    old deployed function source, the full values got typed into chat
    responses instead of referenced by a safe partial (e.g. "ends in
    ...VgS7"). That's an additional exposure on top of the original one.
    Both values still need rotation regardless.

## Real orders placed (ground truth from Stripe, not the app's own records)

Cross-referenced by email against the account owner's known email
(`fieldgar369@gmail.com`, billing name "Jacob Goit" on these orders).
6 total real, successful, captured charges exist, spanning months:
- **Likely the owner/family testing, not real strangers:** child names
  "jo," "lisa," "Izzy," "kelly" (fieldgar369@gmail.com / Jacob Goit),
  "Jaedan" and "Izzy" again ($29.98 and $19.99, mestar.orders@gmail.com —
  same "Jacob Goit" name in the order metadata).
- **Possibly real family/customers, worth confirming with the owner:**
  "Reagan" (sherrigoit3@gmail.com / Sherri Goit), "Izabella Goit"
  (desarear@gmail.com / Desarea Richardson) — same "Goit" surname pattern
  as the owner, so likely family, but not confirmed.
- Several more sessions exist that were abandoned/expired, never paid —
  not real activity, ignore those.

## Boundary — RESOLVED

Owner confirmed: the old `mestar` GitHub repo (React/Lovable build) is
**permanently off-limits** — never read, reference, or think about it.
**Sole exception:** pulling a key/token/env var value from it directly, so
the owner never has to manually copy-paste-reveal a credential themselves.
`mestar.pro` / `mestar-checkout` (the live Next.js site actually taking
real payments) is **explicitly in scope** — it is NOT the old repo, just
shares the brand name. Confirmed via live fetch: `/create` (photo upload +
theme flow) loads correctly, real captured payments exist. The only
confirmed bug is the post-payment redirect going to `localhost` instead of
a confirmation page.

## Open items — next actions

- [ ] **Get the boundary clarification above answered before doing anything
      else mestar-adjacent.**
- [ ] Fix the `mystarmvp` Vercel build (clear the custom Build Command
      override in project settings — see decision #9).
- [ ] Find out what's actually in `mestar-checkout`'s environment variables
      (no git source, so this requires the owner checking the Vercel
      dashboard directly) — the localhost redirect bug is very likely one
      wrong/missing base-URL variable there.
- [ ] Register a new Stripe webhook → `ktkebsvoqbxsirgluxeo`'s
      `stripe-webhook` function, for `checkout.session.completed` (still
      needed regardless of the mestar-checkout situation, for when
      mystarmvp's own path is ready to test independently).
- [ ] Confirm `GEMINI_API_KEY` / `RESEND_API_KEY` are set in Supabase
      (`ktkebsvoqbxsirgluxeo`).
- [ ] Rotate the exposed Resend key and whichever Stripe webhook secret
      matches the one that was hardcoded — both must be treated as
      compromised regardless of what else happens.
- [ ] Once `mystarmvp`'s own path works end-to-end in isolation (its own
      preview URL, not mestar.pro), decide deliberately — not by accident —
      whether/when to move the domain alias. Do not do this reactively.
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
