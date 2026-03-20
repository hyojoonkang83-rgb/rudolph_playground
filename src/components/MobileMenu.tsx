"use client";

import React, { useState } from "react";
import { Menu, X, LayoutGrid, FileText, Image, Calendar, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { icon: LayoutGrid, label: "All Services", active: true },
  { icon: Image, label: "Image Tools", active: false },
  { icon: FileText, label: "Documents", active: false },
  { icon: Calendar, label: "Schedules", active: false },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
                <img src="/logo.png" alt="Rudolph Logo" className="h-8 w-8 object-contain" />
                <h2 className="text-xl font-bold tracking-tighter">RUDOLPH</h2>
                <div className="flex-1" />
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="p-1">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-xl px-4 py-3 text-base font-medium transition-all active:scale-95",
                      item.active 
                        ? "bg-black text-white shadow-lg shadow-black/10" 
                        : "text-secondary hover:bg-surface hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="absolute bottom-8 left-6 right-6">
                <button 
                  className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-base font-medium text-danger hover:bg-danger/5 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
