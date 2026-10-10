-- Run this in the Supabase SQL editor before deploying the secured contact form.
-- The server route writes with SUPABASE_SERVICE_ROLE_KEY. Public clients get no table access.

alter table public.contact_messages enable row level security;

revoke all on table public.contact_messages from anon;
revoke all on table public.contact_messages from authenticated;

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
