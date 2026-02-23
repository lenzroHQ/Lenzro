import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import React from 'react'

const Blackboard = () => {
  return (
    <div className="relative rounded-md border bg-black h-full w-full">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          )}
        />
    </div>
  );
}

export default Blackboard