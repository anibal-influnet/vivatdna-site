-- VivatDNA x Kynetic waitlist table
-- Run this once in your Supabase project (SQL Editor, or via CLI migration).

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null unique,
  interest text not null check (interest in ('Kit', 'Kynetic', 'Clinician'))
);

-- Row Level Security: the site calls this table with the public "anon" key,
-- which is safe to expose in client-side JS ONLY because these policies
-- restrict it to inserting new rows. There is no SELECT/UPDATE/DELETE policy
-- for anon, so a visitor (or anyone reading the JS source) cannot read back
-- the list of signups, only add themselves to it.
alter table public.waitlist enable row level security;

create policy "Public can insert waitlist signups"
  on public.waitlist
  for insert
  to anon
  with check (true);

-- You (the project owner) can still read everything via the Supabase
-- dashboard Table Editor, or the SQL Editor, since those use your
-- authenticated session, not the anon key.
