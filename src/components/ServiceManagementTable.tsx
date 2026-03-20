"use client";

import { deleteService } from "@/lib/actions";
import { Trash2, ExternalLink, Edit, Search } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

import { Service } from "@/types";

interface ServiceManagementTableProps {
  services: Service[];
}

export function ServiceManagementTable({ services: initialServices }: ServiceManagementTableProps) {
  const [services, setServices] = useState(initialServices);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("정말 이 서비스를 삭제하시겠습니까?")) return;
    try {
      await deleteService(id);
      setServices(services.filter(s => s.id !== id));
    } catch {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="p-1">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-surface rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-secondary uppercase text-[11px] font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Title & Category</th>
              <th className="px-6 py-4">URL</th>
              <th className="px-6 py-4">Added At</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredServices.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-secondary">
                  검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground">{service.title}</div>
                    <div className="text-[12px] text-secondary">{service.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <a 
                      href={service.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent hover:underline"
                    >
                      Visit <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                  <td className="px-6 py-4 text-secondary">
                    {format(new Date(service.created_at), "yyyy-MM-dd")}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => alert("수정 기능은 곧 업데이트될 예정입니다.")}
                      className="p-2 text-secondary hover:text-foreground hover:bg-white rounded-md transition-all border border-transparent hover:border-border"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(service.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all border border-transparent hover:border-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
