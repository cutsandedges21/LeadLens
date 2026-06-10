-- Supabase schema for LeadLens
-- Safe to run multiple times (idempotent). Run in: Supabase Dashboard → SQL Editor.

create extension if not exists pgcrypto;

-- ============================================================
-- analyses: one row per audit (website / instagram / youtube)
-- ============================================================
create table if not exists public.analyses (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users (id) on delete set null,
  url         text not null,
  platform    text not null,
  report      jsonb not null,
  email       text,                 -- set when a lead is captured
  created_at  timestamptz not null default timezone('utc', now())
);

-- The dashboard filters audits by the signed-in user.
create index if not exists idx_analyses_user_id on public.analyses (user_id);
create index if not exists idx_analyses_created_at on public.analyses (created_at desc);

-- ============================================================
-- leads: email captured against an analysis
-- ============================================================
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  email        text not null,
  analysis_id  uuid references public.analyses (id) on delete set null,
  created_at   timestamptz not null default timezone('utc', now())
);

-- ============================================================
-- marketing_emails: opt-ins
-- ============================================================
create table if not exists public.marketing_emails (
  id           uuid primary key default gen_random_uuid(),
  email        text unique not null,
  opted_in_at  timestamptz not null default timezone('utc', now())
);

-- ============================================================
-- Row Level Security
-- MVP policies are permissive (the anonymous audit + email-gate flow runs
-- before sign-in). Tighten these before production.
-- ============================================================
alter table public.analyses        enable row level security;
alter table public.leads           enable row level security;
alter table public.marketing_emails enable row level security;

drop policy if exists "analyses_insert_public" on public.analyses;
create policy "analyses_insert_public" on public.analyses
  for insert with check (true);

drop policy if exists "analyses_select_public" on public.analyses;
create policy "analyses_select_public" on public.analyses
  for select using (true);

drop policy if exists "analyses_update_public" on public.analyses;
create policy "analyses_update_public" on public.analyses
  for update using (true);

drop policy if exists "leads_insert_public" on public.leads;
create policy "leads_insert_public" on public.leads
  for insert with check (true);

drop policy if exists "marketing_emails_insert_public" on public.marketing_emails;
create policy "marketing_emails_insert_public" on public.marketing_emails
  for insert with check (true);
