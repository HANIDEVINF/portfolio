-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard/project/kzjyetclbsljbjkarlpc/sql/new)
-- Creates the portfolio tables if they don't exist yet and applies strict Row-Level Security (RLS).

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 120),
  email text not null check (char_length(email) <= 254),
  subject text not null default 'Portfolio contact inquiry' check (char_length(subject) <= 180),
  message text not null check (char_length(message) <= 5000),
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  technologies text[] not null default '{}',
  github_url text default '',
  live_url text default '',
  featured boolean not null default false,
  status text not null default 'Live',
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  tags text[] not null default '{}',
  published boolean not null default false,
  read_time integer not null default 5,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  proficiency integer not null default 80,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.contact_messages enable row level security;
alter table public.projects enable row level security;
alter table public.blog_posts enable row level security;
alter table public.skills enable row level security;

-- Allow server-side contact API to insert validated contact messages while preventing public reads/updates/deletes
drop policy if exists "Allow validated contact message inserts" on public.contact_messages;
create policy "Allow validated contact message inserts"
on public.contact_messages
for insert
to anon, authenticated
with check (
  char_length(name) between 1 and 120
  and char_length(email) between 3 and 254
  and char_length(message) between 1 and 5000
);

drop policy if exists "Admins can manage contact messages" on public.contact_messages;
create policy "Admins can manage contact messages"
on public.contact_messages
for all
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.is_admin = true
  )
)
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.is_admin = true
  )
);
