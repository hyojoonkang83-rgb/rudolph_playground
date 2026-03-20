"use client";

import Image from "next/image";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const client = createClient();
    
    if (mode === "login") {
      const { error } = await client.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
      else window.location.href = "/";
    } else {
      const { error } = await client.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });
      if (error) setError(error.message);
      else {
        alert("가입 신청이 완료되었습니다! 이메일 인증 메일(또는 스팸함)을 확인하거나, 관리자가 승인하면 로그인이 가능합니다.");
        setMode("login");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-white p-8 shadow-sm">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Image src="/logo.png" alt="Rudolph Logo" width={48} height={48} className="object-contain" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">RUDOLPH</h1>
          <p className="mt-2 text-sm text-secondary">
            {mode === "login" 
              ? "사내 폐쇄형 시스템입니다. 승인된 계정으로 로그인하세요." 
              : "새로운 계정을 생성합니다. 가입 후 관리자 승인이 필요할 수 있습니다."}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="your-email@company.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Password</label>
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

          {error && <p className="text-sm text-danger text-center">{error}</p>}

          <div className="space-y-4">
            <Button type="submit" className="w-full gap-2" disabled={loading}>
              <LogIn className="h-4 w-4" />
              {loading ? "처리 중..." : (mode === "login" ? "로그인" : "계정 생성 (승인 필요)")}
            </Button>
            
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="w-full text-center text-sm text-accent hover:underline decoration-accent/30 underline-offset-4"
            >
              {mode === "login" ? "아직 계정이 없으신가요? 가입하기" : "이미 계정이 있으신가요? 로그인하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
