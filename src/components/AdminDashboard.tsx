"use client";

import { useState } from "react";
import { ServiceManagementTable } from "./ServiceManagementTable";
import { UserManagementTable } from "./UserManagementTable";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";
import { Users, Database } from "lucide-react";
import { Service, Profile } from "@/types";

interface AdminDashboardProps {
  services: Service[];
  profiles: Profile[];
  userEmail: string | null;
}

export function AdminDashboard({ services, profiles, userEmail }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"services" | "users">("services");

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar userEmail={userEmail} isAdmin={true} />
      
      <main className="flex-1 lg:pl-[260px]">
        <Header isAdmin={true} userEmail={userEmail} title="Admin Panel" />
        
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
              <p className="text-secondary">스튜디오의 서비스와 사용자 권한을 통합 관리합니다.</p>
            </div>
          </div>

          <div className="flex gap-4 mb-6 border-b border-border">
            <button
              onClick={() => setActiveTab("services")}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all",
                activeTab === "services" 
                  ? "border-accent text-accent" 
                  : "border-transparent text-secondary hover:text-foreground"
              )}
            >
              <Database className="h-4 w-4" />
              Service Management
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all",
                activeTab === "users" 
                  ? "border-accent text-accent" 
                  : "border-transparent text-secondary hover:text-foreground"
              )}
            >
              <Users className="h-4 w-4" />
              User Management
            </button>
          </div>

          <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            {activeTab === "services" ? (
              <ServiceManagementTable services={services} />
            ) : (
              <UserManagementTable profiles={profiles} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
