-- 1. Create the services table
create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  url text not null,
  category text not null,
  thumbnail_image text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Enable Row Level Security (RLS)
alter table public.services enable row level security;

-- 3. Create policies
-- Allow everyone to read services
create policy "Allow public read access"
on public.services for select
using (true);

-- Allow authenticated users to perform all actions
create policy "Allow authenticated users to manage services"
on public.services for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
