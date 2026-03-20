"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceCard } from "./ServiceCard";
import { Sparkles } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
}

interface ServiceGridProps {
  services: Service[];
  isAdmin: boolean;
  getIcon: (category: string) => React.ReactNode;
}

export function ServiceGrid({ services, isAdmin, getIcon }: ServiceGridProps) {
  if (!services || services.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-white p-12 text-center"
      >
        <div className="mb-4 rounded-full bg-surface p-4">
          <Sparkles className="h-8 w-8 text-accent/40" />
        </div>
        <p className="text-lg font-medium text-foreground">검색 결과가 없습니다.</p>
        <p className="mt-1 text-sm text-secondary">다른 키워드나 카테고리를 선택해 보세요.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      layout
      className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              delay: index * 0.05 
            }}
          >
            <ServiceCard 
              id={service.id}
              title={service.title}
              description={service.description}
              category={service.category}
              url={service.url}
              icon={getIcon(service.category)}
              isAdmin={isAdmin}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
