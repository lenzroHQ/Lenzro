import { BarChart3 } from "lucide-react";

/** /app/[workspace]/analytics */
export default function AnalyticsPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
        <BarChart3 size={16} className="text-zinc-400" />
        <span className="text-sm font-medium text-zinc-200">Analytics</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-zinc-600">
          <BarChart3 size={40} strokeWidth={1.2} />
          <p className="text-sm">
            Analytics will appear here once you have data
          </p>
        </div>
      </div>
    </div>
  );
}
