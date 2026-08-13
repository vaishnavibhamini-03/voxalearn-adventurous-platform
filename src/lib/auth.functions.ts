import { createServerFn } from "@tanstack/react-start";

export const checkUsernameAvailable = createServerFn({ method: "POST" })
  .inputValidator((input: { username: string }) => ({ username: String(input.username ?? "").trim() }))
  .handler(async ({ data }) => {
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(data.username)) return { available: false };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .ilike("username", data.username)
      .limit(1);
    if (error) return { available: true };
    return { available: (rows?.length ?? 0) === 0 };
  });

/**
 * Resolves an email-or-username identifier to an email server-side and signs in.
 * The email is never returned to the browser; only session tokens on success.
 */
export const signInWithIdentifier = createServerFn({ method: "POST" })
  .inputValidator((input: { identifier: string; password: string }) => ({
    identifier: String(input.identifier ?? "").trim(),
    password: String(input.password ?? ""),
  }))
  .handler(async ({ data }) => {
    if (data.identifier.length < 3 || data.password.length < 6) {
      return { ok: false as const };
    }

    let email = data.identifier;
    if (!email.includes("@")) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: rows } = await supabaseAdmin
        .from("profiles")
        .select("email")
        .ilike("username", data.identifier)
        .limit(1);
      const found = rows?.[0]?.email;
      if (!found) return { ok: false as const };
      email = found;
    }

    const { createPublicSupabaseClient } = await import("@/lib/supabase-public.server");
    const client = createPublicSupabaseClient();
    const { data: result, error } = await client.auth.signInWithPassword({
      email,
      password: data.password,
    });
    if (error || !result.session) return { ok: false as const };

    return {
      ok: true as const,
      access_token: result.session.access_token,
      refresh_token: result.session.refresh_token,
    };
  });
