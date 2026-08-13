import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { FormInput, FormTextarea } from "@/components/FormInput";
import { PixelButton } from "@/components/PixelButton";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — VoxaLearn" },
      {
        name: "description",
        content: "Send a message to the VoxaLearn team about the platform, courses or accessibility.",
      },
      { property: "og:title", content: "Contact Us — VoxaLearn" },
      { property: "og:description", content: "Get in touch with the VoxaLearn team." },
    ],
  }),
  component: ContactPage,
});

type Errors = Partial<Record<"fullName" | "email" | "subject" | "message", string>>;

function ContactPage() {
  const [values, setValues] = useState({ fullName: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  function validate(): Errors {
    const next: Errors = {};
    if (values.fullName.trim().length < 2) next.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (values.subject.trim().length < 3) next.subject = "Please add a short subject.";
    if (values.message.trim().length < 10) next.message = "Your message should be at least 10 characters.";
    return next;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
      setValues({ fullName: "", email: "", subject: "", message: "" });
    }, 700);
  }

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Questions about VoxaLearn, the course catalog or accessibility? Send us a message and we'll get back to you."
      />

      <section className="mx-auto w-full max-w-2xl px-4 py-14 sm:py-20">
        {sent ? (
          <div
            role="status"
            className="pixel-frame pixel-glow mb-8 flex items-start gap-3 bg-card/90 p-5"
          >
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
            <div className="min-w-0">
              <h2 className="font-pixel text-[11px] text-card-foreground">Message sent</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Thanks for reaching out — your message is on its way to the VoxaLearn team.
              </p>
            </div>
          </div>
        ) : null}

        <form onSubmit={onSubmit} noValidate className="pixel-frame grid gap-5 bg-card/85 p-6 sm:p-8">
          <FormInput
            label="Full Name"
            name="fullName"
            autoComplete="name"
            value={values.fullName}
            onChange={set("fullName")}
            error={errors.fullName}
            placeholder="Your name"
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            error={errors.email}
            placeholder="you@example.com"
          />
          <FormInput
            label="Subject"
            name="subject"
            value={values.subject}
            onChange={set("subject")}
            error={errors.subject}
            placeholder="What is this about?"
          />
          <FormTextarea
            label="Message"
            name="message"
            value={values.message}
            onChange={set("message")}
            error={errors.message}
            placeholder="Tell us more..."
          />
          <PixelButton type="submit" variant="gold" size="lg" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </PixelButton>
        </form>
      </section>
    </>
  );
}
