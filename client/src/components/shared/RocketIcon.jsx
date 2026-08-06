import { memo } from "react";
import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export function RocketIcon({ className = "", ...props }) {
  return (
    <Rocket
      className={cn(
        "size-8 text-primary transition-transform duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:rotate-6",
        className,
      )}
      {...props}
    />
  );
}

export default memo(RocketIcon);
