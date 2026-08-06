import { memo } from "react";
import { cn } from "@/lib/utils";

export function SocialIcon({ icon, label, href, className = "" }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors group",
        className,
      )}
    >
      <span className="size-6 rounded-lg bg-muted border border-border flex items-center justify-center group-hover:bg-muted/80 transition-colors">
        {icon}
      </span>
      {label}
    </a>
  );
}

export default memo(SocialIcon);
