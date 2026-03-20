"use client";

import React, { useState } from "react";
import { createAdminAccount } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { ShieldCheck } from "lucide-react";

export default function SetupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSetup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const result = await createAdminAccount(email, password);
      if (result.confirmed) {
        setMessage("✅ 관리자 계정이 즉시 생성되었습니다! 지금 바로 로그인이 가능합니다.");
      } else {
        setMessage("⚠️ 계정 생성이 완료되었으나 이메일 인증이 필요할 수 있습니다. [Supabase Dashboard]에서 이메일 인증을 끄거나 확인해 주세요.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(`❌ 에러: ${err.message}`);
      } else {
        setMessage(`❌ 에러: 알 수 없는 오류`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-white p-8 shadow-sm">
        <div className="text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-accent" />
          <h1 className="mt-4 text-2xl font-bold text-foreground">RUDOLPH Admin</h1>
          <p className="mt-2 text-sm text-secondary">
            시스템 최초 사용을 위한 관리자 계정을 생성합니다.
          </p>
        </div>

        <form onSubmit={handleSetup} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Admin Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="••••••••"
              />
            </div>
          </div>

          {message && (
            <p className={`text-sm text-center ${message.includes("성공") ? "text-success" : "text-danger"}`}>
              {message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "계정 생성 중..." : "관리자 계정 생성하기"}
          </Button>
          
          <p className="text-xs text-center text-secondary">
            * 계정 생성 후 이 페이지(`/setup`)는 반드시 보안을 위해 삭제해 주세요.
          </p>
        </form>
      </div>
    </div>
  );
}
