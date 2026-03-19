import React from "react";
import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AddServiceButton } from "./AddServiceButton";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-white/80 px-8 backdrop-blur-md">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search automation services..."
            className="h-10 w-full rounded-md border border-border bg-surface pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-accent/20 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
        </Button>
        <div className="h-8 w-[1px] bg-border" />
        <AddServiceButton />
      </div>
    </header>
  );
}
