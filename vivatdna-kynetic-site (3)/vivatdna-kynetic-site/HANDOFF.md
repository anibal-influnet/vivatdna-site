# Handoff: VivatDNA × Kynetic site

Paste this whole file into a new chat along with the `vivatdna-kynetic-site.zip`
(or just this unzipped folder). Everything a fresh chat needs to pick up
exactly where this one left off is here.

## What this is

A static, customer-facing landing site for VivatDNA (a DNA testing kit) and
Kynetic (an AI daily-longevity-coaching layer on top of it). Plain HTML/CSS/JS,
no build step, deploys straight to GitHub Pages, live at vivatdna.com. Not
framed as an investor pitch anywhere in the copy, on purpose (see "Content
decisions" below) — but see "Current open items" for a wrinkle on that.

```
vivatdna-kynetic-site/
├── index.html               ← all page content lives here
├── privacy.html               ← draft privacy policy, needs legal review
├── terms.html                  ← draft terms of service, needs legal review
├── README.md                    ← GitHub Pages + domain + Supabase setup steps
├── HANDOFF.md                    ← this file
├── supabase/
│   └── waitlist_migration.sql    ← waitlist table schema + RLS policy
└── assets/
    ├── css/styles.css        ← all styling, design tokens at the top
    ├── js/main.js             ← typewriter console, scroll reveals, form handling (Supabase insert)
    ├── img/                   ← logo, favicon, report screenshots, og-share.jpg
    └── reports/               ← downloadable sample PDFs (Health + Clinical Overview)
```

## Previously the one open task: Clinical Overview report (now done)

**Done.** The 67-page Clinical Overview PDF was added
(`assets/reports/VivatDNA-Sample-Clinical-Overview.pdf`), with two new
gallery screenshots (`report-clinical-01.jpg` risk overview,
`report-clinical-02.jpg` pharmacogenomic guidance table), both cropped to
remove the report's running header, which shows a real name
("Anibal Jiménez") inconsistent with the "VivatDNA Test User" on the cover
page — kept out of anything public-facing since real consent for that name
was never confirmed. Same reasoning applied later to the report-gallery
caption (see content decision 10 below).

## Current open items (as of the last round of edits)

1. **Legal review of `privacy.html` and `terms.html`.** Both are new,
   clearly marked as internal drafts (`legal-page__draft-note` banner at the
   top of each), with `<span data-fill>` placeholders for anything that
   needs a real, verified answer: legal entity name, actual lab partner name,
   jurisdiction, retention periods, subscription/billing terms once Kynetic
   pricing exists. Do not remove the draft banners or fill in placeholders
   with guessed values — those need the founder + counsel, not an assistant.
2. **Possible investor-facing use, worth confirming.** Content decision 1
   below (still accurate for the site's own copy) says this is explicitly
   *not* pitch-framed. But recent feedback referenced a specific reviewer,
   a "use-of-funds" line, and a dollar figure for "clinical & regulatory" —
   language that belongs to a pitch deck, not this site. If a new chat is
   asked to align site copy with deck copy (or vice versa), flag the
   discrepancy with decision 1 rather than silently picking one.

## Design system reference (so new work matches)

All tokens are CSS custom properties at the top of `assets/css/styles.css`:
- **Colors**: `--cream` (#F3F0E7 background), `--navy-900/800/700` (brand
  navy, from the logo), `--gold-300/500/700` (brand gold, from the logo),
  `--kynetic-400/500/900` (a distinct indigo/blue used *only* in the Kynetic
  section, to visually separate "the data" from "the AI layer")
- **Type**: Fraunces (display/headlines), Inter (body), IBM Plex Mono
  (labels, stats, eyebrows, code-like details) — loaded from Google Fonts
- **Signature element**: the typewriter "console" in the Kynetic section
  (`#typewriter` in JS) cycles real example daily-instructions from the
  product's own materials, styled like a terminal
- Any new section should reuse `.eyebrow`, `.status-pill`, `.btn` variants,
  `.stat-card` / `.hero__stat` patterns already defined rather than inventing
  new ones

## Content decisions made in this project (context for future edits)

These were deliberate calls made across the last few rounds of work. Worth
knowing before changing copy:

1. **This is a customer-facing site, not an investor pitch**, by explicit
   instruction. No fundraising language, no "raising $X," no valuation talk,
   no capital roadmap. The "What's Next" section is a real *product* roadmap
   (kit shipping → Kynetic beta → lab uploads → clinic/practice accounts),
   not a funding-round roadmap. If asked to make it more investor-compelling,
   the approach has been: let real product depth and honesty do that work
   (real report screenshots, real science citations, a real live demo link)
   rather than pitch language.
2. **No pricing is shown**, per explicit request. Was previously $199 kit /
   $29 mo, removed from hero stats and the product section. If reintroducing,
   the natural spots are `.hero__stats` and near the `.product-head` in the
   Vivat section.
3. **No mention of OmicsEdge or SelfDecode** (the actual lab/data partners)
   anywhere in the public copy, per explicit request. Currently phrased as
   "accredited clinical-grade lab infrastructure, the same standard used in
   institutional pharmacogenomics programs" instead.
4. **No em dashes anywhere in the copy** (a specific style note from the
   founder) — the site uses commas, periods, colons, or a middle dot `·`
   (matching the brand's own "VIVAT DNA · KYNETIC" formatting) instead.
   Please keep this convention in any new copy.
5. **No fabricated testimonials.** There's a testimonial slot near the
   waitlist section, styled to look intentional, that honestly says
   real feedback will go there once it exists. Don't fill it with invented
   quotes attributed to fictitious people even if asked casually to "add a
   testimonial" — flag this the way this chat did, and suggest the honest
   placeholder pattern instead, unless a real quote is provided.
6. **Redundancy pass already done once.** The same stats (26 conditions,
   50+ medications, 38 hereditary conditions) used to appear in 3 places;
   now they appear once, in the `.stat-strip` in the "Why Genetics-First"
   section. A "kit includes" 3-card block that duplicated the report gallery
   was removed entirely. Watch for this pattern (same fact restated in a new
   section) when adding content.
7. **The Kynetic "how it works" list is intentionally not styled as a
   completion checklist** (no green checkmarks). It used to have ✓ marks
   implying features were "done," which contradicted the roadmap section
   saying wearable/lab integration is still upcoming. Now it's a plain
   numbered 1-2-3-4 list describing what the product does, with no
   done/not-done claim. Keep this consistency if editing either section.
8. **A generalized "concierge medicine" mention** sits in roadmap step 4
   ("Practice & clinic accounts... clinicians, concierge medicine, and
   longevity practices"). This is a deliberate, non-attributed nod to a
   specific B2B2C channel discussed with the founder, kept generic
   intentionally — do not name any specific company or person here.
9. **Logo sizing**: was too small originally (26px in nav), increased to
   42px. Footer version of the logo has a light rounded "chip" background
   behind it since the logo PNG itself has a baked-in cream background (not
   transparent) and looks like a stray white box on the dark footer
   otherwise.
10. **"Shown with permission from the test subscriber" was removed.** The
    report-gallery caption used to claim explicit consent from a real test
    subscriber. That couldn't be verified (see the name discrepancy noted
    above), and a reviewer correctly flagged it as a misrepresentation risk.
    Now reads "Representative sample output from a test profile." Don't
    reintroduce a real-person consent claim without the founder confirming
    it's actually true.
11. **Roadmap step 1 must match the hero state.** It used to say "Available
    now" / "Order your kit" while the hero pill says "Launching Soon" and
    every CTA on the page is a waitlist signup — a direct contradiction a
    careful reader (or a skeptical prospective customer) would catch
    immediately. Now says "Launching soon" / "Join the waitlist now." If
    the kit becomes actually orderable, update the hero pill, this roadmap
    step, and check for any other "waitlist"-framed copy all together, not
    just one spot.
12. **`assets/img/og-share.jpg`** is the link-preview image (WhatsApp,
    Discord, iMessage, etc.), referenced via absolute URL in `og:image` /
    `twitter:image` in `index.html`'s `<head>`. It's a separate, generated
    1200×630 branded card (logo + tagline), deliberately built with
    everything horizontally centered so it survives platforms that
    center-crop to a square for compact embeds (confirmed this with Discord
    in practice — the first, left-aligned version got cropped out entirely).
    Don't reuse a tall report screenshot for this again; besides the crop
    problem, the original one also had a real name baked into it.
13. **`privacy.html` / `terms.html` added**, linked from the footer and
    from the waitlist form's consent line. Both are explicitly marked as
    internal drafts needing legal review before publishing for real — see
    "Current open items" above. They reuse a new `.legal-page` CSS block
    (prose styling + a `[data-fill]` highlighted-placeholder pattern) rather
    than any per-page custom styling.

## Deployment (already covered in README.md, summarized here)

The user hosts this themselves on GitHub Pages (no AI tool has or should
have their GitHub credentials). Steps: create a public repo → drag-and-drop
this folder's contents via GitHub's web uploader (preserving the `assets/`
folder structure) → Settings → Pages → deploy from `main` branch, root →
add custom domain → point DNS (A records for apex domain, CNAME for `www`)
at GitHub Pages. Full detail in `README.md`.

The waitlist form (`#waitlist-form`) posts to a Supabase table via the REST
API directly from `assets/js/main.js` (no SDK, plain `fetch()`). This is
**already fully configured and live**: a dedicated Supabase project
(`vivatdna-kynetic-site`, ref `ojhxijyazqxmtkiebmse`) was created, the
`waitlist` table + RLS policy applied, and the real `SUPABASE_URL` /
`SUPABASE_ANON_KEY` are already in `main.js` — nothing left to activate.
The table schema and RLS policy (public can insert, nobody but the owner
can read) live in `supabase/waitlist_migration.sql` for reference. Full
detail, including a note on why `Prefer: return=minimal` must not be
removed, is in README.md section 5.

## Suggested first message in the new chat

> "Continuing work on the VivatDNA/Kynetic site. Here's the handoff doc and
> the current site files. [Describe what you need — e.g. legal review pass
> incorporated, deck/site copy alignment, or something new.]"
