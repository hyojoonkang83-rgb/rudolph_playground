"use client";

import React from "react";
import { LayoutGrid, FileText, Image, Calendar, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const menuItems = [
  { icon: LayoutGrid, label: "All Services", category: null },
  { icon: Image, label: "Image Tools", category: "image" },
  { icon: FileText, label: "Documents", category: "document" },
  { icon: Calendar, label: "Schedules", category: "schedule" },
];

export function Sidebar() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <aside className="fixed left-0 top-0 hidden h-full w-[260px] flex-col border-r border-border bg-white lg:flex">
      <div className="flex h-16 items-center border-b border-border px-6 gap-3">
        <img src="/logo.png" alt="Rudolph Logo" className="h-8 w-8 object-contain" />
        <h1 className="text-xl font-bold tracking-tighter">RUDOLPH</h1>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
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
      </nav>

      <div className="border-t border-border p-4 space-y-1">
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-secondary hover:bg-surface hover:text-foreground transition-colors">
          <Settings className="h-4 w-4" />
          Settings
        </button>
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-danger hover:bg-danger/5 transition-colors">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
