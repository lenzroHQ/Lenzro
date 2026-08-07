"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TIMELINE_OPTIONS = [
  "ASAP",
  "Within 1 month",
  "Within 2-3 months",
  "Not sure yet",
];

const BUDGET_OPTIONS = ["Under $1k", "$1k - $5k", "$5k - $10k", "$10k+"];

// Modern, soft light-grey input background with smooth focus state
const fieldClasses =
  "w-full h-12 rounded-sm border-0 bg-[#f2f2f2] px-4 py-3 text-base text-neutral-800 placeholder:text-neutral-400 shadow-none focus-visible:bg-[#ededed] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 transition-all";

const INITIAL_FORM = {
  name: "",
  email: "",
  website: "",
  budget: "",
  timeline: "",
  goal: "",
  reason: "",
};

export function ContactDialog({ trigger }) {
  const [open, setOpen] = useState(false);
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
      setOpen(false);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="h-11 rounded-md  bg-green-500 px-6 text-lg font-medium  display-2xl transition-all">
            Start A Project
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        className="max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto scrollbar-pill  rounded-3xl border-none bg-white p-8 sm:p-10 text-neutral-900 shadow-2xl"
      >
        {/* Floating circular close button */}
        <DialogClose className="absolute right-6 top-6 flex size-10 items-center justify-center rounded-full bg-[#f2f2f2] text-neutral-800 transition-colors hover:bg-neutral-200">
          <X className="size-5" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div>
          {/* Header section */}
          <DialogHeader className="text-left">
            <DialogTitle className="text-3xl sm:text-4xl font-black tracking-tight uppercase display-2xl leading-none  text-black">
              Work With US
            </DialogTitle>
            <DialogDescription className="mt-3 text-base font-normal text-neutral-600 leading-snug">
              A few quick questions so we can understand your project. we only
              work with a small number of clients at a time.
            </DialogDescription>
          </DialogHeader>

          {/* Form container */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-name" className="text-sm font-medium text-neutral-800">
                  Name <span className="text-orange-600">*</span>
                </Label>
                <Input
                  id="contact-name"
                  className={fieldClasses}
                  placeholder="Your name"
                  value={form.name}
                  onChange={update("name")}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-email" className="text-sm font-medium text-neutral-800">
                  Email Address <span className="text-orange-600">*</span>
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  className={fieldClasses}
                  placeholder="hello@bogdan.kolomiyets"
                  value={form.email}
                  onChange={update("email")}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-website" className="text-sm font-medium text-neutral-800">
                  Current Website{" "}
                  <span className="font-normal text-neutral-400">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="contact-website"
                  className={fieldClasses}
                  placeholder="https://yoursite.com"
                  value={form.website}
                  onChange={update("website")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-budget" className="text-sm font-medium text-neutral-800">
                  Budget <span className="text-orange-600">*</span>
                </Label>
                <Select
                  value={form.budget}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, budget: value }))
                  }
                  required
                >
                  <SelectTrigger
                    id="contact-budget"
                    className={`${fieldClasses} cursor-pointer`}
                  >
                    <SelectValue placeholder="Select your budget" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGET_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Radio Timeline choices */}
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium text-neutral-800">
                Timeline <span className="text-orange-600">*</span>
              </Label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {TIMELINE_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <input
                      type="radio"
                      name="timeline"
                      value={option}
                      checked={form.timeline === option}
                      onChange={update("timeline")}
                      className="size-5 accent-black cursor-pointer"
                      required
                    />
                    <span className="text-base text-neutral-800 font-medium">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Goal Textarea */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="contact-goal" className="text-sm font-medium text-neutral-800">
                What are you looking to achieve? <span className="text-orange-600">*</span>
              </Label>
              <textarea
                id="contact-goal"
                rows={3}
                className={`${fieldClasses} h-auto min-h-32 resize-y`}
                placeholder="e.g. attract higher-value clients, reposition your brand, improve your website..."
                value={form.goal}
                onChange={update("goal")}
                required
              />
            </div>

            {/* Reason Textarea */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="contact-reason" className="text-sm font-medium text-neutral-800">
                What made you reach out? <span className="text-orange-600">*</span>
              </Label>
              <textarea
                id="contact-reason"
                rows={3}
                className={`${fieldClasses} h-auto min-h-32 resize-y`}
                placeholder="What made you think I'd be the right person for your project?"
                value={form.reason}
                onChange={update("reason")}
                required
              />
            </div>

            {/* Submit Action */}
            <div className="mt-2 border-t border-neutral-100 pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-14 w-full rounded-xl bg-black text-base font-semibold text-white hover:bg-neutral-800 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Start My Project"}
              </Button>
              <p className="mt-4 text-center text-xs leading-relaxed text-neutral-500">
                I personally review every inquiry and reply within 1–2
                business days. If it feels like a good fit, I&apos;ll send
                over a link to schedule a quick call.
              </p>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}