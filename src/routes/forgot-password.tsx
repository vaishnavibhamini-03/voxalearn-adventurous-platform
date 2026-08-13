import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageBackground } from "@/components/GameBackground";
import { FormInput } from "@/components/FormInput";
import { PixelButton } from "@/components/PixelButton";
import { FormAlert } from "@/components/FormAlert";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot Password — VoxaLearn" },
      { name: "description", content: "Request a password reset link for your VoxaLearn account." },
      { property: "og:title", content: "Forgot Password — VoxaLearn" },
      {
        property: "og:description",
        content: "Request a password reset link for your VoxaLearn account.",
      },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [formError, setFormError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(undefined);
    setFormError(null);
    setLoading(true);
    const result = await requestPasswordReset(email);
    setLoading(false);
    if (!result.ok) {
      setFormError(result.message ?? "Unable to process the request. Please try again.");
      return;
    }
    setSent(true);
  }

  return (
    <section className="relative isolate flex min-h-[calc(100dvh-4.5rem)] items-center overflow-hidden py-14">
      <PageBackground />
      <div className="relative z-10 mx-auto w-full max-w-md px-4">
        <div className="mb-6 text-center">
          <h1 className="title-gradient font-pixel text-lg sm:text-2xl">Forgot Password</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        {formError ? <FormAlert tone="error" className="mb-5">{formError}</FormAlert> : null}
        {sent ? (
          <FormAlert tone="success" className="mb-5">
            If an account exists for this email, a password reset link has been sent.
          </FormAlert>
        ) : null}

        <form onSubmit={onSubmit} noValidate className="pixel-frame grid gap-5 bg-card/90 p-6 sm:p-8">
          <FormInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(undefined);
              setFormError(null);
            }}
            error={error}
            placeholder="you@example.com"
          />
          <PixelButton type="submit" variant="gold" size="lg" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </PixelButton>

          <Link
            to="/login"
            className="inline-flex min-h-11 items-center justify-center text-sm font-medium text-accent hover:underline"
          >
            Back to Login
          </Link>
        </form>

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
