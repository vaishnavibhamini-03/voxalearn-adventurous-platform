import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageBackground } from "@/components/GameBackground";
import { FormInput } from "@/components/FormInput";
import { PixelButton } from "@/components/PixelButton";
import { VoxaMascot } from "@/components/VoxaMascot";
import { FormAlert } from "@/components/FormAlert";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — VoxaLearn" },
      { name: "description", content: "Sign in to continue your VoxaLearn adventure." },
      { property: "og:title", content: "Login — VoxaLearn" },
      { property: "og:description", content: "Sign in to continue your VoxaLearn adventure." },
    ],
  }),
  component: LoginPage,
});

type Errors = Partial<Record<"identifier" | "password", string>>;

function LoginPage() {
  const [values, setValues] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { signIn, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      void navigate({ to: "/dashboard", replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setFormError(null);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    const next: Errors = {};
    if (values.identifier.trim().length < 3) next.identifier = "Enter your email or username.";
    if (values.password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    setFormError(null);
    const result = await signIn(values.identifier, values.password);
    setLoading(false);
    if (!result.ok) {
      setFormError(result.message ?? "Unable to sign in. Please check your credentials and try again.");
      return;
    }
    void navigate({ to: "/dashboard", replace: true });
  }

  return (
    <section className="relative isolate flex min-h-[calc(100dvh-4.5rem)] items-center overflow-hidden py-14">
      <PageBackground />
      <div className="relative z-10 mx-auto w-full max-w-md px-4">
        <div className="mb-6 flex flex-col items-center text-center">
          <VoxaMascot size={96} message="" bubbleSide="top" />
          <h1 className="title-gradient mt-3 font-pixel text-lg sm:text-2xl">Welcome Back</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Sign in to continue your learning adventure.
          </p>
        </div>

        {formError ? <FormAlert tone="error" className="mb-5">{formError}</FormAlert> : null}

        <form onSubmit={onSubmit} noValidate className="pixel-frame grid gap-5 bg-card/90 p-6 sm:p-8">
          <FormInput
            label="Email or Username"
            name="identifier"
            autoComplete="username"
            value={values.identifier}
            onChange={set("identifier")}
            error={errors.identifier}
            placeholder="you@example.com"
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={set("password")}
            error={errors.password}
            placeholder="••••••••"
          />
          <PixelButton type="submit" variant="gold" size="lg" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </PixelButton>

          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <Link
              to="/forgot-password"
              className="inline-flex min-h-11 items-center text-muted-foreground transition-colors hover:text-accent"
            >
              Forgot password?
            </Link>
            <Link
              to="/register"
              className="inline-flex min-h-11 items-center font-medium text-accent hover:underline"
            >
              Register
            </Link>
          </div>
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
