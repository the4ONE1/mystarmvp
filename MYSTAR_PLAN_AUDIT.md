# Audit: "MyStar — The Master Family Platform" plan

Correction to an earlier pass: this audit initially reviewed `mestar` and
`mystarmvp`, and initially called `mestar` "unrelated." Per the repo owner:
`mestar` (mestar.pro, Vite + Shopify) is the original React build of the
storybook product, and `mystarmvp` — deployed to `mystarstories.app` — is an
intentional from-scratch rebuild of it in Next.js, done specifically to get
better SEO than the Vite SPA could deliver. So `mestar` isn't an unrelated
duplicate; it's the predecessor `mystarmvp` was rebuilt from. It still isn't
one of the three branches this master plan unifies, though — that's
`mystarmvp` (as "Stories"), going forward on its own SEO-motivated stack.

Per the owner: `mystarstories.app` (`mystarmvp`) is the current live,
revenue-generating site today, and is intended to keep running and earning
right up until the full 3-branch platform is built and ready for real
customers — at which point the domain/URL strategy for all three branches
(and the master app itself) gets revisited together. So `mestar.pro` is the
retired predecessor, not a fallback to keep maintaining in parallel, and
nothing in Stage 0–4 should assume a domain cutover is needed before then.

All data in any of these repos/Supabase projects today is the owner's own
test data from development — there are no real customers yet, so the
child-data-compliance point below is a "before real customers exist"
item, not an active exposure.

The actual three branches described in the master plan are the repos whose
names begin with "MyStar":

| Plan's name | Repo | Stack | State (from code, not docs) |
| --- | --- | --- | --- |
| MyStar Stories (Storybook) | `mystarmvp` | Next.js 15, own Supabase project (`ktkebsvoqbxsirgluxeo`), direct Stripe Checkout, AWS S3 uploads | Live-shaped: real checkout/webhook/order routes, no vault or print code in it |
| MyStar Storage (Vault) | `my-star-storage` | TanStack Start + React 19, own Supabase project (`wqnpskxkhdxntbrpllco`) | Furthest along: real schema (`profiles`, `families`, `family_members`, `albums`, `media_files`), RLS enabled, working dashboard queries against real tables |
| MyStarSolutions (Print) | `mystarsolutions` | TanStack Start + React 19, **no Supabase wired in** | UI scaffold only: real routes (cart/checkout/design/library/orders/plans/storage/investors/welcome-gift) but backed entirely by `mock-products.ts` and a `mockAdapter`; `subscription.ts`'s `readPlan()/savePlan()` are explicitly placeholder, and `print-providers.ts` has a stubbed (unimplemented) Printful adapter |

There's also a fourth repo, `MyStarPhotoStorage`, which is an empty stub (one
commit, a 20-byte README, no code) — almost certainly an abandoned first
attempt at the vault repo, superseded by `my-star-storage`. Worth archiving
or deleting so nobody (human or agent) mistakes it for the real one, which is
exactly the mistake this audit made on its first pass.

## Opinion

The vision is good and the customer-facing story is genuinely strong: one
free vault as the hook, two paid branches as the upsell, storage as the
reward for using both. What's genuinely encouraging, now that I've looked at
the actual code: the plan isn't just a slide deck — the 3-branch entitlement
model (`subscription.ts` in `mystarsolutions`) and a real per-user vault
schema (`my-star-storage`) already exist as working prototypes, and two of
the three branches already share the exact stack (TanStack Start + React 19)
the plan proposes for the master app. That's a much better starting position
than "three unrelated apps to be duct-taped together."

The real risk isn't the vision, it's the gap between "three branches, same
brand" and what Stage 0–4 actually requires: two of the three repos each run
their *own* Supabase project already, Storage's current RLS model can't
actually do family-sharing yet (see below), Print has no backend at all, and
Stories is the only one on a different frontend framework entirely. None of
that is fatal, but the plan's "10 minutes to connect a database" framing
undersells it substantially.

## Strong points

- **The entitlement model is already real code, not just a diagram.**
  `mystarsolutions/src/lib/subscription.ts` already encodes the exact
  3-branch/level structure from the plan (storage unlocks only when both
  other branches are active), data-driven so only `readPlan()`/`savePlan()`
  need to change to hit a real API. This is a strong foundation to build
  Stage 3 on rather than a green field.
- **Two of three branches already share the target stack.** `my-star-storage`
  and `mystarsolutions` are both TanStack Start + React 19 + shadcn/ui
  already — the plan's stack choice is consolidation, not a new, fourth
  stack, for two-thirds of the family.
- **The vault schema is further along than the plan lets on, in a good way.**
  `my-star-storage` has real tables (`profiles`, `families`, `family_members`,
  `albums`, `media_files`) with RLS already enabled and a working dashboard
  querying live Supabase data — a genuinely usable root for the tree.
- **The print-provider abstraction is designed correctly even as a mock.**
  `print-providers.ts`'s adapter interface (mock/Printful/etc. behind one
  contract) means swapping in a real fulfillment vendor later is additive,
  not a rewrite.
- **Design-token discipline** — shared navy/gold/cream oklch values, no
  hardcoded colors — is already visible in the `mystarsolutions` asset/style
  setup, not just described in the plan.
- **Correct high-level security instinct**: the plan calls for RLS scoped by
  family with roles in a separate table — the right target architecture,
  even though the current `my-star-storage` migrations don't fully implement
  it yet (see downfalls).

## Downfalls and recommended fixes

- **Stage 0 undersells the real migration work.** Two Supabase projects
  already exist and already hold real schema/data: Stories on
  `ktkebsvoqbxsirgluxeo`, Storage on `wqnpskxkhdxntbrpllco`. "Create one new
  project, connect it, I build the schema" doesn't address what happens to
  data/users already in the other two.
  **Fix:** before Stage 0, decide per-branch whether its existing Supabase
  project becomes the shared one, gets migrated into a new one, or is kept
  and federated with cross-project reads. Whichever you pick, write down the
  cutover steps for existing rows (profiles, albums, orders) before doing it.

- **Current vault RLS is scoped by individual owner, not by family, despite
  a `families`/`family_members` schema already existing.** Every policy in
  `my-star-storage`'s migration (`own_profile_all`, `own_family_all`,
  `own_member_all`, `own_album_all`, `own_media_all`) checks
  `auth.uid() = owner_id`. That means today, a second family member cannot
  see another member's albums/photos at all — there's no family-scoped
  policy yet, only single-owner scoping.
  **Fix:** this needs an actual RLS redesign (policies that check membership
  in the row's `family_id` via `family_members`, not just row ownership)
  before "family sharing" from the plan can work — treat it as real schema
  work in Stage 2, not something that falls out of "connect the database."

- **Print (MyStarSolutions) is far earlier-stage than the plan's feature
  table implies.** "Products, design studio, cart, checkout, orders, plans,
  storage, investors, welcome-gift" reads like a shipped feature list; in
  the code it's UI routes over `mock-products.ts` and a `mockAdapter` with
  an explicitly unimplemented Printful integration and no Supabase
  connection at all.
  **Fix:** scope Stage 4's Print work as "wire real data behind an existing,
  well-designed mock," not "connect an existing feature" — budget for actual
  Printful/print-vendor integration and backend wiring, not just UI polish.

- **Stories is the one branch on a different frontend stack**, and the plan
  doesn't say how it joins a TanStack Start master shell — full rewrite,
  iframe/embed, reverse-proxied subdomain, or module federation are very
  different amounts of work and the plan is silent on which.
  **Fix:** make an explicit architectural call for Stories specifically
  (rewrite vs. embed vs. proxy) before Stage 4, since it's the one branch
  that can't just be "folded in" the way Storage and Solutions can.

- **Duplicate/abandoned storage repo (`MyStarPhotoStorage`) creates exactly
  the ambiguity this audit's first pass fell into.**
  **Fix:** archive or delete `MyStarPhotoStorage` (or add a one-line README
  pointing to `my-star-storage`) so it's unambiguous which repo is canonical
  going forward.

- **No estimates, no acceptance criteria.** "Build 1 delivers Stages 1–4"
  has no time/cost per stage, and an investor-pitch page is embedded inside
  what's otherwise a technical architecture doc.
  **Fix:** break each stage into demo-able milestones with a rough effort
  estimate and a pass/fail acceptance test; keep the investor page as a
  Stage 1 content deliverable, not part of the architecture.

- **Children's-data compliance is a slogan, not a plan.** "Privacy-first, no
  ads to kids" is stated as a value, but merging photo albums (of children)
  from Stories and Storage into one shared database raises real
  COPPA/GDPR-K/retention obligations with no concrete mechanism described.
  **Fix:** add a real compliance pass before Stage 2 ships — parental
  consent flow, explicit data retention/deletion SLAs, moderation for
  uploaded photos — likely with legal review given this stores minors'
  images across what are currently two separately-secured databases.

- **Vague grace-period mechanics for a destructive action.** "Read-only with
  a clear grace period," "repeated warning emails" — neither the period
  length nor the warning cadence is specified, and this gates whether a
  family's photos in `my-star-storage` become inaccessible.
  **Fix:** specify an exact grace-period length and warning-email schedule,
  and guarantee photos are only ever access-locked automatically, never
  hard-deleted, until an explicit user-confirmed deletion step.
