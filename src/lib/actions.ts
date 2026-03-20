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


export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getUserRole() {
  try {
    const user = await getUser();
    if (!user) return null;

    const supabase = await createClient();
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error(`[AUTH] Error fetching role: ${error.message}`);
      return "user";
    }

    return profile?.role || "user";
  } catch (err) {
    console.error(`[AUTH] Unexpected error in getUserRole:`, err);
    return "user";
  }
}

export async function updateUserRole(userId: string, newRole: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ role: newRole })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/");
}
