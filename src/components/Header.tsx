"use client";

import React, { useState } from "react";
import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AddServiceButton } from "./AddServiceButton";
import { MobileMenu } from "./MobileMenu";
import { useRouter, useSearchParams } from "next/navigation";

interface HeaderProps {
  isAdmin?: boolean;
  userEmail?: string | null;
  title?: string;
}

export function Header({ isAdmin, userEmail, title }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) {
      params.set("q", query);
      router.push(`/?${params.toString()}`);
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-white/80 px-4 md:px-8 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <MobileMenu userEmail={userEmail} />
        {title ? (
          <h2 className="text-sm font-bold text-secondary uppercase tracking-widest hidden md:block">
            {title}
          </h2>
        ) : (
          <form onSubmit={handleSearch} className="relative hidden w-64 md:block lg:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
            <input
              type="text"
              placeholder="Search AI services..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 w-full rounded-md border border-border bg-surface pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-accent/20 transition-all"
            />
          </form>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="sm" className="relative p-2 md:px-3">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
        </Button>
        <div className="hidden h-8 w-[1px] bg-border md:block" />
        <AddServiceButton isAdmin={isAdmin} />
      </div>
    </header>
  );
}
