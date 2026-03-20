"use client";

import Image from "next/image";

import React from "react";
import { LayoutGrid, FileText, Image as ImageIcon, Calendar, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const menuItems = [
  { icon: LayoutGrid, label: "All Services", category: null },
  { icon: ImageIcon, label: "Image Tools", category: "image" },
  { icon: FileText, label: "Documents", category: "document" },
  { icon: Calendar, label: "Schedules", category: "schedule" },
];

interface SidebarProps {
  userEmail?: string | null;
}

interface SidebarProps {
  userEmail?: string | null;
  isAdmin?: boolean;
}

export function Sidebar({ userEmail, isAdmin }: SidebarProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <aside className="fixed left-0 top-0 hidden h-full w-[260px] flex-col border-r border-border bg-white lg:flex">
      <div className="flex h-16 items-center border-b border-border px-6 gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Rudolph Logo" width={32} height={32} className="object-contain" />
          <h1 className="text-xl font-bold tracking-tighter text-foreground">RUDOLPH</h1>
        </Link>
      </div>
      
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = item.category === currentCategory;
          return (
            <Link
              key={item.label}
              href={item.category ? `/?category=${item.category}` : "/"}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-black text-white shadow-md shadow-black/5" 
                  : "text-secondary hover:bg-surface hover:text-foreground hover:translate-x-1"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive ? "text-accent" : "text-secondary")} />
              {item.label}
            </Link>
          );
        })}

        {isAdmin && (
          <div className="mt-8 pt-4 border-t border-border/50">
            <p className="px-3 mb-2 text-[10px] font-bold text-secondary uppercase tracking-widest">Administrator</p>
            <Link
              href="/admin"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-accent hover:bg-accent/5 transition-all"
            >
              <Settings className="h-4 w-4" />
              Admin Dashboard
            </Link>
          </div>
        )}
      </nav>

      <div className="border-t border-border p-4 space-y-4">
        {userEmail && (
          <div className="px-3 py-2 bg-surface/50 rounded-lg border border-border/50">
            <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-1">Logged in as</p>
            <p className="text-xs font-medium text-foreground truncate" title={userEmail}>
              {userEmail}
            </p>
          </div>
        )}
        <div className="space-y-1">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-secondary hover:bg-surface hover:text-foreground transition-colors">
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-danger hover:bg-danger/5 transition-colors">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
