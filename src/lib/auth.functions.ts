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

/**
 * Creates the profile row for a freshly registered user. Runs server-side because
 * with email confirmation enabled there is no session yet, so RLS-based inserts
 * from the browser would fail.
 */
export const createProfile = createServerFn({ method: "POST" })
  .inputValidator((input: { userId: string; fullName: string; username: string; email: string }) => ({
    userId: String(input.userId ?? ""),
    fullName: String(input.fullName ?? "").trim(),
    username: String(input.username ?? "").trim(),
    email: String(input.email ?? "").trim().toLowerCase(),
  }))
  .handler(async ({ data }) => {
    if (!/^[0-9a-f-]{36}$/i.test(data.userId)) return { ok: false as const, reason: "invalid" as const };
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(data.username)) return { ok: false as const, reason: "invalid" as const };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Only allow creating a profile for a real auth user with a matching email.
    const { data: userRes, error: userErr } = await supabaseAdmin.auth.admin.getUserById(data.userId);
    if (userErr || !userRes?.user || userRes.user.email?.toLowerCase() !== data.email) {
      return { ok: false as const, reason: "invalid" as const };
    }

    const { data: taken } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .ilike("username", data.username)
      .neq("id", data.userId)
      .limit(1);
    if ((taken?.length ?? 0) > 0) return { ok: false as const, reason: "username" as const };

    const { error } = await supabaseAdmin.from("profiles").upsert(
      { id: data.userId, full_name: data.fullName, username: data.username, email: data.email },
      { onConflict: "id" },
    );
    if (error) return { ok: false as const, reason: "failed" as const };
    return { ok: true as const };
  });
