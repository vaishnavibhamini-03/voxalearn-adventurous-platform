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
      return { ok: false as const, reason: "credentials" as const };
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
      if (!found) return { ok: false as const, reason: "credentials" as const };
      email = found;
    }

    const { createPublicSupabaseClient } = await import("@/lib/supabase-public.server");
    const client = createPublicSupabaseClient();
    const { data: result, error } = await client.auth.signInWithPassword({
      email,
      password: data.password,
    });

    if (error) {
      const raw = `${error.code ?? ""} ${error.message ?? ""}`.toLowerCase();
      if (raw.includes("not confirmed") || raw.includes("email_not_confirmed")) {
        return { ok: false as const, reason: "unverified" as const };
      }
      if (raw.includes("invalid login") || raw.includes("invalid_credentials")) {
        return { ok: false as const, reason: "credentials" as const };
      }
      return { ok: false as const, reason: "service" as const };
    }
    if (!result.session) return { ok: false as const, reason: "service" as const };

    return {
      ok: true as const,
      access_token: result.session.access_token,
      refresh_token: result.session.refresh_token,
    };
  });

/**
 * Resends the one-time signup verification email. Only ever sends when the
 * account still needs verification; never reveals whether an account exists.
 */
export const resendVerificationEmail = createServerFn({ method: "POST" })
  .inputValidator((input: { identifier: string; redirectTo: string }) => ({
    identifier: String(input.identifier ?? "").trim(),
    redirectTo: String(input.redirectTo ?? ""),
  }))
  .handler(async ({ data }) => {
    if (data.identifier.length < 3) return { ok: false as const, reason: "invalid" as const };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const query = supabaseAdmin.from("profiles").select("id, email").limit(1);
    const { data: rows } = data.identifier.includes("@")
      ? await query.ilike("email", data.identifier)
      : await query.ilike("username", data.identifier);

    const profile = rows?.[0];
    // Unknown account: respond as if sent so we never disclose registration state.
    if (!profile) return { ok: true as const, status: "sent" as const };

    const { data: userRes } = await supabaseAdmin.auth.admin.getUserById(profile.id);
    if (userRes?.user?.email_confirmed_at) {
      return { ok: true as const, status: "already_verified" as const };
    }

    const { createPublicSupabaseClient } = await import("@/lib/supabase-public.server");
    const client = createPublicSupabaseClient();
    const { error } = await client.auth.resend({
      type: "signup",
      email: profile.email,
      options: data.redirectTo ? { emailRedirectTo: data.redirectTo } : undefined,
    });
    if (error) {
      const raw = `${error.message ?? ""}`.toLowerCase();
      if (raw.includes("rate") || raw.includes("seconds")) {
        return { ok: false as const, reason: "rate" as const };
      }
      return { ok: false as const, reason: "failed" as const };
    }
    return { ok: true as const, status: "sent" as const };
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
