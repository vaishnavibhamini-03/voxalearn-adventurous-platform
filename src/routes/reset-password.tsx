import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageBackground } from "@/components/GameBackground";
import { FormInput } from "@/components/FormInput";
import { PixelButton } from "@/components/PixelButton";
import { FormAlert } from "@/components/FormAlert";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — VoxaLearn" },
      { name: "description", content: "Choose a new password for your VoxaLearn account." },
      { property: "og:title", content: "Reset Password — VoxaLearn" },
      { property: "og:description", content: "Choose a new password for your VoxaLearn account." },
    ],
  }),
  component: ResetPasswordPage,
});

type Errors = Partial<Record<"password" | "confirmPassword", string>>;

function ResetPasswordPage() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setFormError(null);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    const next: Errors = {};
    if (values.password.length < 8) next.password = "Use at least 8 characters.";
    else if (!/[A-Za-z]/.test(values.password) || !/\d/.test(values.password))
      next.password = "Include at least one letter and one number.";
    if (values.confirmPassword !== values.password) next.confirmPassword = "Passwords do not match.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    setFormError(null);
    const result = await updatePassword(values.password);
    setLoading(false);
    if (!result.ok) {
      setFormError(result.message ?? "Unable to process the request. Please try again.");
      return;
    }
    setDone(true);
    window.setTimeout(() => void navigate({ to: "/login", replace: true }), 1600);
  }

  return (
    <section className="relative isolate flex min-h-[calc(100dvh-4.5rem)] items-center overflow-hidden py-14">
      <PageBackground />
      <div className="relative z-10 mx-auto w-full max-w-md px-4">
        <div className="mb-6 text-center">
          <h1 className="title-gradient font-pixel text-lg sm:text-2xl">Reset Password</h1>
          <p className="mt-3 text-sm text-muted-foreground">Choose a new password for your account.</p>
        </div>

        {formError ? <FormAlert tone="error" className="mb-5">{formError}</FormAlert> : null}
        {done ? (
          <FormAlert tone="success" className="mb-5">
            Your password has been updated successfully. Taking you to login...
          </FormAlert>
        ) : null}

        <form onSubmit={onSubmit} noValidate className="pixel-frame grid gap-5 bg-card/90 p-6 sm:p-8">
          <FormInput
            label="New Password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={set("password")}
            error={errors.password}
            placeholder="••••••••"
          />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={set("confirmPassword")}
            error={errors.confirmPassword}
            placeholder="••••••••"
          />
          <PixelButton type="submit" variant="gold" size="lg" disabled={loading || done}>
            {loading ? "Updating..." : "Update Password"}
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
