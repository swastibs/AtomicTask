import { memo } from "react";
import { cn } from "@/lib/utils";

export function StaggeredText({ lines = [], className = "" }) {
  return (
    <div className={cn("space-y-6", className)}>
      {lines.map((line, index) => (
        <div
          key={`staggered-text-${index}`}
          className={cn(
            "hero-line overflow-hidden",
            `hero-d${index}`,
            line.className,
          )}
        >
          {line.content}
        </div>
      ))}
    </div>
  );
}

export default memo(StaggeredText);
