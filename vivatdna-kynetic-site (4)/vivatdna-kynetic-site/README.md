# VivatDNA × Kynetic — investor preview site

A static, one-page site built to show an investor that VivatDNA is real and
launching, and that Kynetic is actively being built. No backend required —
it's plain HTML/CSS/JS, so it hosts for free on GitHub Pages and points at
your existing domain.

```
site/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   ├── img/               (logo, favicon, report screenshots)
│   └── reports/            (downloadable sample PDFs)
└── README.md               (this file)
```

---

## 1. Put this on GitHub (5 minutes)

You don't need to give any AI tool access to your GitHub account — nobody
should ask for that. Do this yourself, it's quick:

**Easiest path — upload through the browser, no git required:**
1. Go to [github.com/new](https://github.com/new), name the repo (e.g.
   `vivatdna-site`), keep it **Public** (GitHub Pages needs Public unless
   you're on a paid plan), click **Create repository**.
2. On the new repo page, click **uploading an existing file**.
3. Drag in *everything inside this `site/` folder* — keep the folder
   structure intact (`assets/css/styles.css` must stay at that path, etc.).
   GitHub's uploader preserves folder structure when you drag a whole
   folder in Chrome/Edge; if it flattens it, use the git method below instead.
4. Commit directly to the `main` branch.

**Or, if you're comfortable with a terminal:**
```bash
cd site
git init
git add .
git commit -m "Initial investor preview site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vivatdna-site.git
git push -u origin main
```

## 2. Turn on GitHub Pages
1. In the repo, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Save.
4. Wait ~1 minute. GitHub gives you a URL like
   `https://YOUR_USERNAME.github.io/vivatdna-site/` — open it to confirm the
   site is live before moving to your domain.

## 3. Point your domain at it
Still in **Settings → Pages**:
1. Under **Custom domain**, type your domain (e.g. `vivatdna.com` or
   `www.vivatdna.com`) and save. GitHub will create a `CNAME` file in your
   repo automatically — leave it there.
2. Go to your domain's DNS settings (wherever you bought the domain — GoDaddy,
   Namecheap, Google Domains, etc.) and add:
   - If using the **apex domain** (`vivatdna.com`, no `www`): add four **A
     records** pointing `@` to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - If using a **subdomain** (`www.vivatdna.com`): add a **CNAME record**
     for `www` pointing to `YOUR_USERNAME.github.io`.
   - Most people set up both: apex redirects to `www`, or vice versa.
3. Back in GitHub **Settings → Pages**, check **Enforce HTTPS** once the
   domain verifies (can take up to a few hours, sometimes up to 24h for DNS
   to propagate).

That's it — your domain now shows this page.

---

## 4. Add the second (Clinical Overview) sample report

The site currently ships with the real Health Overview report you already
have. The 67-page Clinical Overview is referenced but marked "coming soon"
since it was too large for this chat. Two ways to add it:

**A. You have the PDF file already:**
1. Name it `VivatDNA-Sample-Clinical-Overview.pdf`.
2. Drop it into `assets/reports/` in the repo (via GitHub's web upload —
   same "uploading an existing file" flow as above, into that subfolder).
3. Open `index.html`, find this line (in the VivatDNA section):
   ```html
   <span class="btn btn-outline-dark btn-disabled" ...>↓ Full Clinical Overview (PDF) — coming soon</span>
   ```
   Replace it with:
   ```html
   <a class="btn btn-outline-dark" href="assets/reports/VivatDNA-Sample-Clinical-Overview.pdf" target="_blank" rel="noopener">↓ Download full sample: Clinical Overview (PDF)</a>
   ```
4. Optional: replace the dashed placeholder preview card (search for
   `report-card--placeholder` in `index.html`) with a real screenshot the
   same way the other three report cards work — export a representative
   page of the PDF as a `.jpg` (any PDF-to-image tool or a screenshot works),
   drop it in `assets/img/`, and swap the placeholder markup for a normal
   `<img>` card like its neighbors.

**B. You want help preparing it:** open a new chat with Claude, upload the
Clinical Overview PDF, and ask to "extract a couple of representative pages
as web-optimized JPGs and prepare a downloadable PDF copy for the VivatDNA
site's `assets/reports/` and `assets/img/` folders" — then drop the output
files into the repo using the same upload flow as step 1.

---

## 5. Activate the waitlist form (Supabase)
**Already done for you.** A dedicated Supabase project was created
(`vivatdna-kynetic-site`, project ref `ojhxijyazqxmtkiebmse`, in the same
organization as your other Supabase projects), the `waitlist` table and its
Row Level Security policy are live, and `assets/js/main.js` already has the
real `SUPABASE_URL` and `SUPABASE_ANON_KEY` filled in. Nothing left to
configure — the steps below are for reference if you ever need to recreate
this in a different project, or if you want to understand what's running.

The form posts straight to a Supabase table via its REST API — no SDK, no
backend, just `fetch()`. Signups land in a table you own and can query,
export, or dedupe by email at any time.

**A. Create the table.**
1. In your Supabase project, open the **SQL Editor**.
2. Paste and run everything in [`supabase/waitlist_migration.sql`](supabase/waitlist_migration.sql)
   (also reproduced below). This creates a `waitlist` table and locks it
   down with Row Level Security so the public key can only *insert* new
   signups, never read the list back:
   ```sql
   create table if not exists public.waitlist (
     id uuid primary key default gen_random_uuid(),
     created_at timestamptz not null default now(),
     name text not null,
     email text not null unique,
     interest text not null check (interest in ('Kit', 'Kynetic', 'Clinician'))
   );

   alter table public.waitlist enable row level security;

   create policy "Public can insert waitlist signups"
     on public.waitlist
     for insert
     to anon
     with check (true);
   ```

**B. Connect the site to it.**
1. In Supabase, go to **Settings → API**. Copy the **Project URL** and the
   **anon / public** key (not the `service_role` key — that one must never
   appear in client-side code).
2. Open `assets/js/main.js`, find these two lines near the top of the form
   section:
   ```js
   const SUPABASE_URL = 'https://YOUR_PROJECT_REF.supabase.co';
   const SUPABASE_ANON_KEY = 'YOUR_ANON_PUBLIC_KEY';
   ```
   Replace both placeholders with your real values.
3. Until you do this, the button shows a friendly reminder instead of
   silently failing — so nothing looks broken to a visitor in the meantime.

**C. Read your signups.**
Supabase dashboard → **Table Editor → waitlist**. Sort, filter by
`interest`, or export to CSV whenever you want. If you'd also like an email
notification the moment someone signs up (rather than checking the
dashboard), that's a small **Database Webhook** pointed at a Resend/SendGrid
Edge Function — ask a new chat to set that up once the base table is live,
it's a 10-minute addition, not a prerequisite.

**Important — don't remove the `Prefer: return=minimal` header.** The
`waitlist` table intentionally has no SELECT policy for the public `anon`
role (so a visitor can add themselves but can never read the list back).
Postgres RLS treats `INSERT ... RETURNING` as needing read-visibility on the
inserted row, so if the client ever requests the row back (PostgREST's
default behavior, or an explicit `RETURNING`), the insert fails with a
row-level security error even though the INSERT policy itself is fine. The
`main.js` fetch call already sends `Prefer: 'return=minimal'` to avoid this
— keep it as-is unless you also add a SELECT policy for anon.

**Why not Formspree (what this replaces):** Formspree only emails you a
notification, there's no table to query or export, and the free tier caps
at 50 submissions/month. Supabase's free tier is far more generous and,
since you already have a Supabase account, this keeps everyone's data
in one place instead of a second inbox to check.


## 6. A couple of things to personalize before sharing with an investor
- Footer email `hello@vivatdna.com` — update to your real inbox.
- `kynetic-demo.vercel.app` link in the Kynetic section — confirm it's still
  live before sharing.
- The report screenshots and PDF are from a real test profile ("Anibal
  Jiménez") included in your source materials — swap for a de-identified
  or synthetic sample if you'd rather not show a named individual's data.

## 7. Where the design choices came from
- **Copy** is pulled directly from your executive summary and business plan
  (pricing, stats, roadmap figures, the Kynetic "what it sounds like"
  example) — nothing was invented.
- **Palette**: cream/navy/gold lift straight from your logo; a distinct
  indigo accent marks the Kynetic section only, to visually separate "the
  data" (VivatDNA, warm/gold) from "the intelligence layer" (Kynetic,
  cooler/technical).
- **The typing console** in the Kynetic section cycles the exact example
  instructions from your materials — it's the one deliberate signature
  moment on the page, chosen because it demonstrates the product's actual
  value prop instead of just describing it.
