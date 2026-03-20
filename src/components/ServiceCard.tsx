"use client";

import React, { useTransition } from "react";
import { ArrowUpRight, MoreVertical, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { deleteService } from "@/lib/actions";
import { motion } from "framer-motion";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  icon?: React.ReactNode;
  isAdmin?: boolean;
}

export function ServiceCard({ id, title, description, category, url, icon, isAdmin }: ServiceCardProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`'${title}' 서비스를 삭제하시겠습니까?`)) {
      startTransition(async () => {
        try {
          await deleteService(id);
        } catch (error) {
          alert("서비스 삭제 중 오류가 발생했습니다.");
          console.error(error);
        }
      });
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-border bg-white p-6 transition-all duration-300 h-full",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <div>
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface text-accent">
            {icon || <div className="h-6 w-6 rounded-full bg-accent/20" />}
          </div>
          {isAdmin && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-secondary hover:text-danger"
                onClick={handleDelete}
                disabled={isPending}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <span className="text-xs font-medium text-accent uppercase tracking-wider">
            {category}
          </span>
          <h3 className="mt-1 text-xl font-semibold text-foreground tracking-tight">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-semibold text-foreground hover:text-accent transition-colors"
        >
          서비스 실행
          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </motion.div>
  );
}
