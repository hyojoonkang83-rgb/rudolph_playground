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

-- 4. Insert dummy data
insert into public.services (title, description, url, category, thumbnail_image)
values 
('ChatGPT', 'OpenAI의 강력한 대화형 AI 서비스입니다.', 'https://chat.openai.com', 'Chatbot', 'https://api.placeholder.com/150'),
('Midjourney', '텍스트를 이미지로 변환하는 최고의 AI 예술 도구입니다.', 'https://www.midjourney.com', 'Image Generation', 'https://api.placeholder.com/150'),
('Claude', 'Anthropic에서 개발한 정교한 언어 모델입니다.', 'https://claude.ai', 'Chatbot', 'https://api.placeholder.com/150');
