import { Inbox, Mail } from "lucide-react";

/** /app/[workspace]/inbox */
export default function InboxPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
        <Inbox size={16} className="text-zinc-400" />
        <span className="text-sm font-medium text-zinc-200">Inbox</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-zinc-600">
          <Mail size={40} strokeWidth={1.2} />
          <p className="text-sm">No messages yet</p>
        </div>
      </div>
    </div>
  );
}
