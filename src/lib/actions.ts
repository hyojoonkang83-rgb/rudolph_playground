"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addService(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const url = formData.get("url") as string;
  const category = formData.get("category") as string;

  const { error } = await supabase.from("services").insert([
    {
      title,
      description,
      url,
      category,
      thumbnail_image: "https://api.placeholder.com/150",
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function deleteService(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

/**
 * ADMIN SETUP ACTION
 * This should be removed after the first run or secured.
 * For this playground, we'll allow it for the user to set up their account.
 */

export async function createAdminAccount(email: string, password: string) {
  const supabase = await createClient();

  console.log(`[AUTH] Attempting signup for: ${email}`);
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error(`[AUTH] Signup error: ${error.message}`);
    throw new Error(error.message);
  }

  // If session is null, it usually means email confirmation is required.
  const isConfirmed = !!data.session;
  
  console.log(`[AUTH] Signup success! Confirmed: ${isConfirmed}`);

  return { 
    success: true, 
    confirmed: isConfirmed,
    message: isConfirmed 
      ? "계정이 즉시 활성화되었습니다." 
      : "계정 생성이 요청되었습니다. 이메일 인증이 필요할 수 있습니다. (Supabase 설정 확인 필요)"
  };
}

export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getUserRole() {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return profile?.role || "user";
}
