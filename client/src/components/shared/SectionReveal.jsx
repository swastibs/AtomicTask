import { memo } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

export function SectionReveal({
  as: Component = "section",
  id,
  className = "",
  children,
  rootMargin = "0px 0px -120px 0px",
  ...props
}) {
  const [ref, isVisible] = useIntersectionObserver({ rootMargin });

  return (
    <Component
      id={id}
      ref={ref}
      className={cn(
        "section-reveal transition-all duration-300 ease-out",
        isVisible ? "is-visible translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default memo(SectionReveal);
