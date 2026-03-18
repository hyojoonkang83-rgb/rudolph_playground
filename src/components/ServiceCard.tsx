import React from "react";
import { ArrowUpRight, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface ServiceCardProps {
  title: string;
  description: string;
  category: string;
  url: string;
  icon?: React.ReactNode;
}

export function ServiceCard({ title, description, category, url, icon }: ServiceCardProps) {
  return (
    <div className="card-hover group relative flex flex-col justify-between rounded-lg border border-border bg-white p-6 shadow-sm overflow-hidden">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface text-accent">
            {icon || <div className="h-6 w-6 rounded-full bg-accent/20" />}
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
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
    </div>
  );
}
