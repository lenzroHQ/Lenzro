"use client";
import { useState } from "react";
import { Linkedin, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
const BUDGET_OPTIONS = [
  "10,000ksh - 30,000ksh",
  "35k - 40k",
  "50k",
  "More than $50k",
];

// TODO: swap in real photos, roles, emails & LinkedIn URLs.
const TEAM = [
  {
    name: "Yussuf Hassan",
    role: "Founder",
    email: "yussuf@lenzro.com",
    linkedin: null,
    prompt: "Have a project to discuss?",
  },
  {
    name: "Abdiaziz Mohamed",
    role: "Co-Founder",
    email: "abdiaziz@lenzro.com",
    linkedin: null,
    prompt: "Have a project to discuss?",
  },
];

const initials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("");

const INITIAL_FORM = { name: "", email: "", message: "", budget: "" };

const fieldClasses =
  "w-full border-b border-neutral-700 bg-transparent pb-3 text-base font-medium uppercase text-white placeholder:text-white focus:border-white focus:outline-none transition-colors";

const Contact = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      toast.success("Message sent — we'll get back to you within 1–2 business days.");
      setForm(INITIAL_FORM);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full rounded-3xl bg-neutral-950 px-4 py-16 text-white sm:px-8 md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
          Contact Us
        </p>
        <h2 className="mt-4 text-4xl display-lg leading-[1.05] font-medium md:text-5xl lg:text-6xl">
          Have a project in mind? <br /> Let&apos;s chat
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 md:col-span-2"
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="c-name"
                  className="text-xs font-semibold uppercase tracking-wide text-neutral-500"
                >
                  Your Name
                </label>
                <input
                  id="c-name"
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Enter your name *"
                  className={fieldClasses}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="c-email"
                  className="text-xs font-semibold uppercase tracking-wide text-neutral-500"
                >
                  Your Email
                </label>
                <input
                  id="c-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  placeholder="Enter your email *"
                  className={fieldClasses}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="c-message"
                className="text-xs font-semibold uppercase tracking-wide text-neutral-500"
              >
                Message
              </label>
              <textarea
                id="c-message"
                rows={2}
                value={form.message}
                onChange={update("message")}
                placeholder="Tell us about your project"
                className={`${fieldClasses} resize-none`}
              />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Your budget for this project?
              </p>
              <div className="flex flex-wrap gap-3">
                {BUDGET_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, budget: option }))
                    }
                    className={`rounded-lg border px-4 py-3 text-xs font-semibold uppercase tracking-wide transition-colors ${
                      form.budget === option
                        ? "border-white bg-white text-black"
                        : "border-neutral-700 text-neutral-300 hover:border-neutral-500"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-14 rounded-xl bg-white px-8 text-base font-semibold text-black hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Submit"}
                <ArrowRight className="size-4" />
              </Button>
              <p className="text-xs text-neutral-500">
                I personally review every inquiry and reply within 1–2
                business days.
              </p>
            </div>
          </form>

          <div className="flex flex-col divide-y divide-neutral-800">
            {TEAM.map((person) => (
              <div
                key={person.name}
                className="flex flex-col gap-4 py-8 first:pt-0 last:pb-0"
              >
                <p className="text-xl font-medium">{person.prompt}</p>
                <div className="flex items-center gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-sm font-semibold">
                    {initials(person.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium">{person.name}</p>
                    <p className="text-sm text-neutral-500">{person.role}</p>
                    <a
                      href={`mailto:${person.email}`}
                      className="block truncate text-sm text-neutral-300 underline underline-offset-2 hover:text-white"
                    >
                      {person.email}
                    </a>
                  </div>
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto flex size-7 shrink-0 items-center justify-center rounded-md bg-neutral-800 text-white"
                    >
                      <Linkedin className="size-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
