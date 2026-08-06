import { memo } from "react";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export const SectionReveal = memo(function SectionReveal({
  children,
  className,
  as: Component = "section",
  ...props
}) {
  const [sectionRef, isVisible] = useIntersectionObserver();

  return (
    <Component
      ref={sectionRef}
      className={cn("relative isolate overflow-hidden", className)}
      {...props}
    >
      <div
        className={cn(
          "section-reveal relative mx-auto max-w-7xl transition-all duration-300 ease-out",
          isVisible
            ? "is-visible translate-y-0 opacity-100"
            : "translate-y-4 opacity-0",
        )}
      >
        {children}
      </div>
    </Component>
  );
});

export default SectionReveal;
