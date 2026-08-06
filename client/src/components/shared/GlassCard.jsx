import { memo } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ className = "", children, ...props }) {
  return (
    <div
      className={cn(
        "glass-surface overflow-hidden rounded-[2rem] border border-border/70 bg-card/85 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] backdrop-blur-xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default memo(GlassCard);
