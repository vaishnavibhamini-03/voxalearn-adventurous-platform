import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageBackground } from "@/components/GameBackground";
import { PixelButton } from "@/components/PixelButton";
import { FormInput } from "@/components/FormInput";
import { FormAlert } from "@/components/FormAlert";
import { VoxaMascot } from "@/components/VoxaMascot";
import { useAuth, PENDING_IDENTIFIER_KEY } from "@/lib/auth";

export const Route = createFileRoute("/verify-email")({
  head: () => ({
    meta: [
      { title: "Verify Your Email — VoxaLearn" },
      {
        name: "description",
        content: "Confirm your email address to unlock your VoxaLearn student dashboard.",
      },
      { property: "og:title", content: "Verify Your Email — VoxaLearn" },
      {
        property: "og:description",
        content: "Confirm your email address to unlock your VoxaLearn student dashboard.",
      },
    ],
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const { resendVerification, isAuthenticated, emailVerified, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [tone, setTone] = useState<"error" | "success">("success");

  useEffect(() => {
    const stored = window.sessionStorage.getItem(PENDING_IDENTIFIER_KEY);
    if (stored) setIdentifier(stored);
  }, []);

  // A verified account never sees this screen again.
  useEffect(() => {
    if (!authLoading && isAuthenticated && emailVerified) {
      window.sessionStorage.removeItem(PENDING_IDENTIFIER_KEY);
      void navigate({ to: "/dashboard", replace: true });
    }
  }, [authLoading, isAuthenticated, emailVerified, navigate]);

  async function onResend() {
    if (sending) return;
    if (identifier.trim().length < 3) {
      setTone("error");
      setMessage("Please enter the email or username you registered with.");
      return;
    }
    setSending(true);
    setMessage(null);
    const result = await resendVerification(identifier.trim());
    setSending(false);
    setTone(result.ok ? "success" : "error");
    setMessage(result.message ?? null);
  }

  async function backToLogin() {
    if (isAuthenticated) await signOut();
    void navigate({ to: "/login", replace: true });
  }

  return (
    <section className="relative isolate flex min-h-[calc(100dvh-4.5rem)] items-center overflow-hidden py-14">
      <PageBackground />
      <div className="relative z-10 mx-auto w-full max-w-md px-4">
        <div className="mb-6 flex flex-col items-center text-center">
          <VoxaMascot size={96} message="" bubbleSide="top" />
          <h1 className="title-gradient mt-3 font-pixel text-lg sm:text-2xl">Verify Your Email</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            We've sent a verification link to your email address. Please verify your email to continue
            to VoxaLearn.
          </p>
        </div>

        {message ? (
          <FormAlert tone={tone} className="mb-5">
            {message}
          </FormAlert>
        ) : null}

        <div className="pixel-frame grid gap-5 bg-card/90 p-6 sm:p-8">
          <FormInput
            label="Email or Username"
            name="identifier"
            autoComplete="username"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              setMessage(null);
            }}
            placeholder="you@example.com"
          />
          <PixelButton type="button" variant="gold" size="lg" disabled={sending} onClick={onResend}>
            {sending ? "Sending..." : "Resend Verification Email"}
          </PixelButton>

          <button
            type="button"
            onClick={backToLogin}
            className="inline-flex min-h-11 items-center justify-center text-sm font-medium text-accent hover:underline"
          >
            Back to Login
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center font-pixel text-[10px] text-muted-foreground uppercase transition-colors hover:text-accent"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
