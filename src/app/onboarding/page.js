"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify, storeWorkspace, getStoredUser } from "@/lib/workspace";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const slug = workspaceName.trim() ? slugify(workspaceName) : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!slug) return;
    setLoading(true);
    setError("");

    try {
      storeWorkspace(slug);
      router.replace(`/app/${slug}`);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const storedUser = getStoredUser();
  const firstName = storedUser?.displayName?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-foreground mx-auto mb-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome, {firstName}!
          </h1>
          <p className="text-muted-foreground text-sm">
            Let&apos;s create your workspace. You can always rename it later.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="workspace-name"
              className="text-sm font-medium text-foreground"
            >
              Workspace name
            </label>
            <input
              id="workspace-name"
              type="text"
              autoFocus
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="e.g. Acme Corp, My Projects…"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 transition"
              maxLength={48}
            />
            {slug && (
              <p className="text-xs text-muted-foreground">
                Your URL will be{" "}
                <span className="font-mono text-foreground">/app/{slug}</span>
              </p>
            )}
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" disabled={!slug || loading} className="w-full">
            {loading ? (
              <Loader2 size={16} className="animate-spin mr-2" />
            ) : (
              <ArrowRight size={16} className="mr-2" />
            )}
            {loading ? "Setting up…" : "Create workspace"}
          </Button>
        </form>
      </div>
    </div>
  );
}
