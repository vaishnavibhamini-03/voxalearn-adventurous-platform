import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { checkUsernameAvailable, createProfile, signInWithIdentifier } from "@/lib/auth.functions";

export type AuthResult = {
  ok: boolean;
  message?: string;
};

type RegisterInput = {
  fullName: string;
  email: string;
  username: string;
  password: string;
};

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (identifier: string, password: string) => Promise<AuthResult>;
  register: (input: RegisterInput) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<AuthResult>;
  updatePassword: (password: string) => Promise<AuthResult>;
};

const BAD_CREDENTIALS = "Email/username or password is incorrect. Please try again.";
const SERVICE = "Unable to sign in right now. Please try again later.";
const GENERIC_REGISTER = "Unable to create your account. Please check your details and try again.";
const GENERIC_RESET = "Unable to process the request. Please try again.";
const OFFLINE = "Unable to connect right now. Please check your connection and try again.";

const AuthContext = createContext<AuthContextValue | null>(null);

function isOffline() {
  return typeof navigator !== "undefined" && navigator.onLine === false;
}


export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setLoading(false);
    });

    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const user = session?.user ?? null;
    const verified = Boolean(user?.email_confirmed_at ?? user?.confirmed_at);

    return {
      user,
      session,
      loading,
      isAuthenticated: Boolean(user),
      emailVerified: verified,

      async signIn(identifier, password) {
        if (isOffline()) return { ok: false, message: OFFLINE };
        try {
          const result = await signInWithIdentifier({ data: { identifier, password } });
          if (!result.ok) {
            if (result.reason === "unverified") {
              return { ok: false, message: UNVERIFIED, needsVerification: true };
            }
            if (result.reason === "service") return { ok: false, message: SERVICE };
            return { ok: false, message: BAD_CREDENTIALS };
          }
          const { error } = await supabase.auth.setSession({
            access_token: result.access_token,
            refresh_token: result.refresh_token,
          });
          if (error) return { ok: false, message: SERVICE };
          return { ok: true };
        } catch {
          return { ok: false, message: SERVICE };
        }
      },

      async register({ fullName, email, username, password }) {
        if (isOffline()) return { ok: false, message: OFFLINE };
        try {
          const availability = await checkUsernameAvailable({ data: { username } });
          if (!availability.available) {
            return { ok: false, message: "This username is already in use. Please choose another one." };
          }

          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/dashboard`,
              data: { full_name: fullName, username },
            },
          });

          if (error) {
            const raw = error.message.toLowerCase();
            if (raw.includes("already") || raw.includes("registered") || raw.includes("exists")) {
              return { ok: false, message: "This email is already associated with an account." };
            }
            if (raw.includes("password")) {
              return {
                ok: false,
                message: "Please choose a stronger password and try again.",
              };
            }
            return { ok: false, message: GENERIC_REGISTER };
          }

          const newUser = data.user;
          if (!newUser) return { ok: false, message: GENERIC_REGISTER };

          const profile = await createProfile({
            data: {
              userId: newUser.id,
              fullName: fullName.trim(),
              username: username.trim(),
              email: email.trim().toLowerCase(),
            },
          });

          if (!profile.ok) {
            if (profile.reason === "username") {
              return { ok: false, message: "This username is already in use. Please choose another one." };
            }
            return { ok: false, message: GENERIC_REGISTER };
          }

          if (!data.session) {
            return {
              ok: true,
              needsVerification: true,
              message: "Your account has been created. Please verify your email address to continue.",
            };
          }

          return { ok: true };
        } catch {
          return { ok: false, message: GENERIC_REGISTER };
        }
      },

      async signOut() {
        try {
          await supabase.auth.signOut();
        } catch {
          /* session is cleared locally regardless */
        }
        setSession(null);
      },

      async resendVerification(identifier) {
        if (isOffline()) return { ok: false, message: OFFLINE };
        try {
          const result = await resendVerificationEmail({
            data: { identifier, redirectTo: `${window.location.origin}/dashboard` },
          });
          if (!result.ok) {
            if (result.reason === "rate") {
              return {
                ok: false,
                message: "Please wait a moment before requesting another verification email.",
              };
            }
            return { ok: false, message: "Unable to send the verification email. Please try again." };
          }
          if (result.status === "already_verified") {
            return { ok: true, message: "Your email is already verified. Please log in to continue." };
          }
          return { ok: true, message: "Verification email sent. Please check your inbox." };
        } catch {
          return { ok: false, message: "Unable to send the verification email. Please try again." };
        }
      },

      async requestPasswordReset(email) {
        if (isOffline()) return { ok: false, message: OFFLINE };
        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
            redirectTo: `${window.location.origin}/reset-password`,
          });
          if (error && !error.message.toLowerCase().includes("rate")) {
            // Never reveal whether the address exists — only surface real failures.
            return { ok: true };
          }
          if (error) return { ok: false, message: GENERIC_RESET };
          return { ok: true };
        } catch {
          return { ok: false, message: GENERIC_RESET };
        }
      },

      async updatePassword(password) {
        if (isOffline()) return { ok: false, message: OFFLINE };
        try {
          const { error } = await supabase.auth.updateUser({ password });
          if (error) {
            return {
              ok: false,
              message: "Unable to update your password. Please request a new reset link and try again.",
            };
          }
          return { ok: true };
        } catch {
          return {
            ok: false,
            message: "Unable to update your password. Please request a new reset link and try again.",
          };
        }
      },
    };
  }, [session, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
