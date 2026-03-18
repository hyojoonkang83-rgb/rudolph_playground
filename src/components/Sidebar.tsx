import React from "react";
import { LayoutGrid, FileText, Image, Calendar, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutGrid, label: "All Services", active: true },
  { icon: Image, label: "Image Tools", active: false },
  { icon: FileText, label: "Documents", active: false },
  { icon: Calendar, label: "Schedules", active: false },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-full w-[260px] flex-col border-r border-border bg-white lg:flex">
      <div className="flex h-16 items-center border-b border-border px-6">
        <h1 className="text-xl font-bold tracking-tighter">AOH HUB</h1>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              item.active 
                ? "bg-black text-white" 
                : "text-secondary hover:bg-surface hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
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
