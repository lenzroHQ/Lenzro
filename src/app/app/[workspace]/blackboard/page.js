import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

/** /app/[workspace]/blackboard */
export default function BlackboardPage() {
  return (
    <div className="relative rounded-md border bg-black h-full w-full min-h-[calc(100vh-3.5rem)]">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
        )}
      />
      {/* Blackboard canvas will be mounted here */}
    </div>
  );
}
