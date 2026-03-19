import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { ServiceCard } from "@/components/ServiceCard";
import { createClient } from "@/lib/supabase/server";
import { 
  Calendar, 
  Image as ImageIcon, 
  FileText, 
  Code, 
  MessageSquare, 
  Sparkles, 
  AlertCircle 
} from "lucide-react";

// Helper to map category to icon (Server Component compatible)
const getIcon = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'schedule': return <Calendar className="h-6 w-6" />;
    case 'image': return <ImageIcon className="h-6 w-6" />;
    case 'document': return <FileText className="h-6 w-6" />;
    case 'development': return <Code className="h-6 w-6" />;
    case 'analytics': return <MessageSquare className="h-6 w-6" />;
    default: return <Sparkles className="h-6 w-6" />;
  }
};

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="flex min-h-screen bg-surface">
        <Sidebar />
        <main className="flex-1 lg:pl-[260px]">
          <Header />
          <div className="flex h-[calc(100-64px)] items-center justify-center p-8">
            <div className="flex flex-col items-center text-center">
              <AlertCircle className="h-12 w-12 text-danger mb-4" />
              <h3 className="text-xl font-bold text-foreground">데이터를 불러오지 못했습니다</h3>
              <p className="mt-2 text-secondary">잠시 후 다시 시도해 주세요. 에러: {error.message}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <main className="flex-1 lg:pl-[260px]">
        <Header />
        
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              AOH 서비스 아카이브
            </h2>
            <p className="mt-2 text-secondary">
              사내에서 운영 중인 {services?.length || 0}개의 AI 자동화 서비스를 한눈에 확인하세요.
            </p>
          </div>

          {!services || services.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-white p-12 text-center">
              <p className="text-lg font-medium text-foreground">등록된 서비스가 없습니다.</p>
              <p className="mt-1 text-sm text-secondary">관리자 권한으로 첫 번째 서비스를 등록해 보세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  title={service.title}
                  description={service.description}
                  category={service.category}
                  url={service.url}
                  icon={getIcon(service.category)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
