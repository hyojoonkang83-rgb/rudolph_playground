-- 1. Create the profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  role text not null default 'user' check (role in ('admin', 'user')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Enable RLS on profiles
alter table public.profiles enable row level security;

-- 3. Create policies for profiles
-- Users can read their own profile
create policy "Users can view own profile"
on public.profiles for select
using (auth.uid() = id);

-- 4. Update services table RLS policies
-- Drop the old policy first
drop policy "Allow authenticated users to manage services" on public.services;

-- New policy: Only admins can manage services
create policy "Admins can manage services"
on public.services for all
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

-- 5. Trigger function for new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- The first user ever created gets the 'admin' role, others get 'user'
  insert into public.profiles (id, role)
  values (
    new.id, 
    case 
      when not exists (select 1 from public.profiles) then 'admin' 
      else 'user' 
    end
  );
  return new;
end;
$$ language plpgsql security definer;

-- 6. Create the trigger on auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 7. [CRITICAL] Migrate existing users (if any)
-- This ensures that if you already have users, the profiles table is populated.
-- The first user found will be assigned 'admin', others 'user'.
insert into public.profiles (id, role)
select 
  id, 
  case 
    when id = (select id from auth.users order by created_at asc limit 1) then 'admin'
    else 'user'
  end
from auth.users
on conflict (id) do nothing;
