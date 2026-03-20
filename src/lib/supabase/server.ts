import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[SUPABASE] Missing environment variables. Returning limited client.");
    // Return a dummy client or one that will fail catchably
    return createServerClient(
      "https://dummy.supabase.co",
      "dummy-key",
      { cookies: { getAll: () => [], setAll: () => {} } }
    );
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // Forced Login: Remove maxAge to make it a session-only cookie
              const { maxAge, ...sessionOptions } = options;
              cookieStore.set(name, value, sessionOptions);
            });
          } catch {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    }
  );
}
