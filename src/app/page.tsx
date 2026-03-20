import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { ServiceCard } from "@/components/ServiceCard";
import { createClient } from "@/lib/supabase/server";
import { 
  Sparkles, 
  AlertCircle 
} from "lucide-react";
import { getUserRole } from "@/lib/actions";
import { ServiceGrid } from "@/components/ServiceGrid";

// DashboardPage Component

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isEnvMissing = !supabaseUrl || !supabaseAnonKey;

  const role = await getUserRole();
  const isAdmin = role === "admin";

  const supabase = await createClient();
  
  let dbQuery = supabase.from("services").select("*");
  
  if (category) {
    dbQuery = dbQuery.eq('category', category);
  }
  
  if (q) {
    dbQuery = dbQuery.or(`title.ilike.%${q}%,description.ilike.%${q}%`);
  }

  const { data: services, error } = isEnvMissing 
    ? { data: null, error: { message: "Environment variables missing", code: "ENV_MISSING" } as any }
    : await dbQuery.order("created_at", { ascending: false });

  if (error || isEnvMissing) {
    const isTableMissing = error?.message?.includes("public.services") || 
                           error?.code === "PGRST116" || 
                           error?.message?.includes("schema cache") || 
                           isEnvMissing;

    return (
      <div className="flex min-h-screen bg-surface">
        <Sidebar aria-hidden="true" />
        <main className="flex-1 lg:pl-[260px]">
          <Header isAdmin={isAdmin} />
          <div className="p-8 max-w-4xl mx-auto">
            {isTableMissing ? (
              <div className="rounded-xl border border-border bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3 text-accent mb-4">
                  <Sparkles className="h-8 w-8 text-accent" />
                  <h2 className="text-2xl font-bold text-foreground">RUDOLPH 서비스 초기 안정화</h2>
                </div>
                
                {isEnvMissing ? (
                  <div className="p-4 bg-danger/5 border border-danger/20 rounded-lg mb-6">
                    <p className="text-danger font-medium flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      환경 변수(Environment Variables) 설정이 누락되었습니다.
                    </p>
                    <p className="text-sm text-secondary mt-1 ml-6">
                      Vercel 프로젝트 설정에서 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 확인해 주세요.
                    </p>
                  </div>
                ) : (
                  <p className="text-secondary mb-6">
                    데이터베이스 테이블이 아직 생성되지 않았습니다. 프로젝트를 안정화하기 위해 아래 SQL 스크립트를 딱 한 번만 실행해 주세요.
                  </p>
                )}

                <div className="space-y-6">
                  <div className="bg-surface rounded-lg p-4 border border-border overflow-hidden">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-secondary uppercase">Supabase SQL Script</span>
                      <span className="text-[10px] text-accent font-medium">Drag to copy SQL</span>
                    </div>
                    <pre className="text-[10px] md:text-xs text-foreground overflow-x-auto max-h-64 whitespace-pre-wrap leading-relaxed font-mono">
{`-- 1. 서비스 및 프로필 테이블 생성
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  url text not null,
  category text not null,
  thumbnail_image text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  role text not null default 'user' check (role in ('admin', 'user')),
  created_at timestamptz default now()
);

-- 2. 보안 정책(RLS) 및 트리거 자동화
alter table public.services enable row level security;
alter table public.profiles enable row level security;

create policy "public_view" on public.services for select using (true);
create policy "admin_manage" on public.services for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, role)
  values (new.id, case when not exists (select 1 from public.profiles) then 'admin' else 'user' end);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_signup after insert on auth.users for each row execute procedure public.handle_new_user();

-- 3. 기존 사용자 권한 전환 (첫 번째 사용자를 관리자로 지정)
insert into public.profiles (id, role)
select id, 'admin' from auth.users order by created_at asc limit 1
on conflict (id) do nothing;`}
                    </pre>
                  </div>

                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/10 text-xs text-secondary leading-relaxed">
                    <p className="font-bold text-accent mb-1">💡 중요 확인 사항:</p>
                    현재 연결된 Supabase 프로젝트 URL: <code className="bg-white px-1 py-0.5 rounded border border-border">{process.env.NEXT_PUBLIC_SUPABASE_URL}</code><br/>
                    위 URL과 사용 중인 Supabase 대시보드의 URL이 일치하는지 꼭 확인해 주세요! 다른 프로젝트에 실행하면 반영되지 않습니다.
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
                      <span className="font-bold text-accent block mb-1">STEP 1</span>
                      위 SQL 코드를 복사합니다.
                    </div>
                    <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
                      <span className="font-bold text-accent block mb-1">STEP 2</span>
                      Supabase SQL Editor에 붙여넣습니다.
                    </div>
                    <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
                      <span className="font-bold text-accent block mb-1">STEP 3</span>
                      [Run] 버튼을 누르고 이 페이지를 새로고침하세요!
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-[calc(100vh-160px)] items-center justify-center">
                <div className="flex flex-col items-center text-center max-w-md">
                  <AlertCircle className="h-12 w-12 text-danger mb-4" />
                  <h3 className="text-xl font-bold text-foreground">데이터를 불러오지 못했습니다</h3>
                  <p className="mt-2 text-secondary">{error?.message || "알 수 없는 에러가 발생했습니다."}</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  const userEmail = user?.email || null;

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar userEmail={userEmail} isAdmin={isAdmin} />
      <main className="flex-1 lg:pl-[260px]">
        <Header isAdmin={isAdmin} userEmail={userEmail} />
        
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              RUDOLPH 서비스 아카이브
            </h2>
            <p className="mt-2 text-secondary">
              사내에서 운영 중인 {services?.length || 0}개의 AI 자동화 서비스를 한눈에 확인하세요.
            </p>
          </div>

          <ServiceGrid 
            services={services || []} 
            isAdmin={isAdmin} 
          />
        </div>
      </main>
    </div>
  );
}
