import { memo } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_BLOBS = [
  {
    position: "left-[8%] top-[-10%]",
    size: "h-[320px] w-[320px]",
    color: "bg-primary/15",
    animation: "animate-[drift-1_18s_ease-in-out_infinite]",
  },
  {
    position: "bottom-[-14%] right-[6%]",
    size: "h-[360px] w-[360px]",
    color: "bg-primary/10",
    animation: "animate-[drift-2_24s_ease-in-out_infinite]",
  },
  {
    position: "right-[20%] top-[8%]",
    size: "h-[280px] w-[280px]",
    color: "bg-foreground/[0.05]",
    animation: "animate-[drift-3_28s_ease-in-out_infinite]",
  },
];

export function DriftBlobs({ blobs = DEFAULT_BLOBS, className, ...props }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      {...props}
    >
      {blobs.map((blob, index) => (
        <div
          key={`${index}-${blob.position}`}
          className={cn(
            "drift-blob absolute rounded-full blur-[110px]",
            blob.position,
            blob.size,
            blob.color,
            blob.animation,
          )}
        />
      ))}
    </div>
  );
}

export default memo(DriftBlobs);
