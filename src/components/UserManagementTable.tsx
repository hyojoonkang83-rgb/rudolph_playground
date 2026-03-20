"use client";

import { updateUserRole } from "@/lib/actions";
import { Shield, User, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Profile } from "@/types";

interface UserManagementTableProps {
  profiles: Profile[];
}

export function UserManagementTable({ profiles: initialProfiles }: UserManagementTableProps) {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredProfiles = profiles.filter(profile => 
    profile.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = async (id: string, newRole: string) => {
    setUpdatingId(id);
    try {
      await updateUserRole(id, newRole);
      setProfiles(profiles.map(p => p.id === id ? { ...p, role: newRole } : p));
    } catch {
      alert("권한 변경 중 오류가 발생했습니다.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-1">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
          <input
            type="text"
            placeholder="Search users by email..."
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
              <th className="px-6 py-4">User Email</th>
              <th className="px-6 py-4">Current Role</th>
              <th className="px-6 py-4">Joined At</th>
              <th className="px-6 py-4 text-right">Access Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredProfiles.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-secondary">
                   검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              filteredProfiles.map((profile) => (
                <tr key={profile.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="font-medium text-foreground">{profile.email || "Unknown User"}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-bold uppercase tracking-tight",
                      profile.role === "admin" 
                        ? "bg-black text-white" 
                        : profile.role === "client"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-surface text-secondary border border-border"
                    )}>
                      {profile.role === "admin" && <Shield className="h-3 w-3" />}
                      {profile.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary">
                    {profile.created_at ? format(new Date(profile.created_at), "yyyy-MM-dd") : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2 p-1 bg-surface rounded-lg border border-border">
                      {["user", "admin", "client"].map((role) => (
                        <button
                          key={role}
                          disabled={updatingId === profile.id}
                          onClick={() => handleRoleChange(profile.id, role)}
                          className={cn(
                            "px-3 py-1 text-[11px] font-bold uppercase rounded-md transition-all",
                            profile.role === role 
                              ? "bg-white text-foreground shadow-sm ring-1 ring-border" 
                              : "text-secondary hover:text-foreground"
                          )}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
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
