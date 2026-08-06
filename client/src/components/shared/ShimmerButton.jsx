import { forwardRef, memo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ShimmerButton = memo(
  forwardRef(
    ({ className = "", children, variant = "default", size = "default", ...props }, ref) => (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn("group relative overflow-hidden", className)}
        {...props}
      >
        <span className="pointer-events-none absolute inset-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Button>
    ),
  ),
);

export default ShimmerButton;
