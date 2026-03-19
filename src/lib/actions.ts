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

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true, user: data.user };
}
