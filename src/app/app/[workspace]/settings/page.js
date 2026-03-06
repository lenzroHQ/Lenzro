"use client";

import { useParams } from "next/navigation";
import { Settings } from "lucide-react";
import { getStoredUser } from "@/lib/workspace";

/** /app/[workspace]/settings */
export default function SettingsPage() {
  const { workspace } = useParams();
  const user = getStoredUser();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
        <Settings size={16} className="text-zinc-400" />
        <span className="text-sm font-medium text-zinc-200">Settings</span>
      </div>

      <div className="max-w-2xl mx-auto w-full px-6 py-10 space-y-8">
        {/* Workspace info */}
        <section className="space-y-4">
          <h2 className="text-base font-semibold text-zinc-100">Workspace</h2>
          <div className="rounded-lg border border-zinc-800 divide-y divide-zinc-800">
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm text-zinc-300">Workspace name</p>
                <p className="text-xs text-zinc-500 mt-0.5">{workspace}</p>
              </div>
              <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Edit
              </button>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm text-zinc-300">Workspace URL</p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  lenzro.com/app/{workspace}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Account info */}
        <section className="space-y-4">
          <h2 className="text-base font-semibold text-zinc-100">Account</h2>
          <div className="rounded-lg border border-zinc-800 divide-y divide-zinc-800">
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm text-zinc-300">Display name</p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {user?.displayName ?? "—"}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm text-zinc-300">Email</p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {user?.email ?? "—"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Danger zone */}
        <section className="space-y-4">
          <h2 className="text-base font-semibold text-red-400">Danger Zone</h2>
          <div className="rounded-lg border border-red-900/50 px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-300">Delete workspace</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                This action cannot be undone.
              </p>
            </div>
            <button className="text-xs text-red-400 hover:text-red-300 border border-red-900/50 px-3 py-1.5 rounded transition-colors">
              Delete
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
