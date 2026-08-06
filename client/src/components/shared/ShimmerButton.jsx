import { memo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ShimmerButton = memo(function ShimmerButton({
  children,
  className,
  ...props
}) {
  return (
    <Button
      className={cn(
        "group relative overflow-hidden rounded-full bg-primary px-6 py-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </Button>
  );
});

export default ShimmerButton;
