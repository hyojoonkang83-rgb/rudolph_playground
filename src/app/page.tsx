"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { ServiceCard } from "@/components/ServiceCard";
import { supabase } from "@/lib/supabase";
import { Calendar, Image as ImageIcon, FileText, Code, MessageSquare, Sparkles, Loader2 } from "lucide-react";

// Helper to map category to icon
const getIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'schedule': return <Calendar className="h-6 w-6" />;
    case 'image': return <ImageIcon className="h-6 w-6" />;
    case 'document': return <FileText className="h-6 w-6" />;
    case 'development': return <Code className="h-6 w-6" />;
    case 'analytics': return <MessageSquare className="h-6 w-6" />;
    default: return <Sparkles className="h-6 w-6" />;
  }
};

export default function DashboardPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setServices(data);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

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
              사내에서 운영 중인 {services.length}개의 AI 자동화 서비스를 한눈에 확인하세요.
            </p>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : services.length > 0 ? (
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
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-white p-12 text-center">
              <p className="text-lg font-medium text-foreground">등록된 서비스가 없습니다.</p>
              <p className="mt-1 text-sm text-secondary">관리자 권한으로 첫 번째 서비스를 등록해 보세요.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
