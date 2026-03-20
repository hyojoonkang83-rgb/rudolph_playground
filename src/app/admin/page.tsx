import { createClient } from "@/lib/supabase/server";
import { getUserRole } from "@/lib/actions";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/AdminDashboard";

export default async function AdminPage() {
  const supabase = await createClient();
  
  // 1. 권한 확인
  const role = await getUserRole();
  if (role !== "admin") {
    redirect("/");
  }

  // 2. 데이터 페칭
  const { data: { user } } = await supabase.auth.getUser();
  
  // 서비스 목록 가져오기
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });

  // 사용자 프로필 목록 가져오기
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <AdminDashboard 
      services={services || []} 
      profiles={profiles || []} 
      userEmail={user?.email || null} 
    />
  );
}
