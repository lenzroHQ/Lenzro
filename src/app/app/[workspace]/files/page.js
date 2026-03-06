import { FolderOpen, HardDrive } from "lucide-react";

/** /app/[workspace]/files */
export default function FilesPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
        <HardDrive size={16} className="text-zinc-400" />
        <span className="text-sm font-medium text-zinc-200">Files</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-zinc-600">
          <FolderOpen size={40} strokeWidth={1.2} />
          <p className="text-sm">No files uploaded yet</p>
        </div>
      </div>
    </div>
  );
}
