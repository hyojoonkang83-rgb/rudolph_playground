"use client";

import Image from "next/image";

import React, { useState } from "react";
import { Menu, X, LayoutGrid, FileText, Image as ImageIcon, Calendar, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const menuItems = [
  { icon: LayoutGrid, label: "All Services", category: null },
  { icon: ImageIcon, label: "Image Tools", category: "image" },
  { icon: FileText, label: "Documents", category: "document" },
  { icon: Calendar, label: "Schedules", category: "schedule" },
];

interface MobileMenuProps {
  userEmail?: string | null;
}

export function MobileMenu({ userEmail }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleSettings = () => {
    alert("설정 기능은 현재 준비 중입니다.");
  };

  return (
    <div className="lg:hidden">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setIsOpen(true)}
        className="p-2"
      >
        <Menu className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <Image src="/logo.png" alt="Rudolph Logo" width={32} height={32} className="object-contain" />
                <h2 className="text-xl font-bold tracking-tighter">RUDOLPH</h2>
                <div className="flex-1" />
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="p-1">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = item.category === currentCategory;
                  return (
                    <Link
                      key={item.label}
                      href={item.category ? `/?category=${item.category}` : "/"}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-xl px-4 py-3 text-base font-medium transition-all active:scale-95",
                        isActive 
                          ? "bg-black text-white shadow-lg shadow-black/10" 
                          : "text-secondary hover:bg-surface hover:text-foreground"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", isActive ? "text-accent" : "text-secondary")} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="absolute bottom-8 left-6 right-6 space-y-4">
                {userEmail && (
                  <div className="px-4 py-3 bg-surface rounded-xl border border-border/50">
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-0.5">Logged in as</p>
                    <p className="text-sm font-medium text-foreground truncate">
                      {userEmail}
                    </p>
                  </div>
                )}
                <div className="flex gap-2">
                  <button 
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-secondary hover:bg-surface hover:text-foreground transition-colors"
                    onClick={() => { setIsOpen(false); handleSettings(); }}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <button 
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-danger hover:bg-danger/5 transition-colors"
                    onClick={() => { setIsOpen(false); handleLogout(); }}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
