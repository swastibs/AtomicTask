// src/constants/landingContent.js
import { CalendarDays, BrainCircuit, Sparkles } from "lucide-react";

export const AUTH_BLOBS = [
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

export const HERO_BLOBS = [
  {
    position: "left-[5%] top-[-12%]",
    size: "h-[300px] w-[300px]",
    color: "bg-primary/15",
    animation: "animate-[drift-2_20s_ease-in-out_infinite]",
  },
  {
    position: "bottom-[-10%] right-[4%]",
    size: "h-[340px] w-[340px]",
    color: "bg-primary/10",
    animation: "animate-[drift-1_22s_ease-in-out_infinite]",
  },
  {
    position: "right-[18%] top-[10%]",
    size: "h-[260px] w-[260px]",
    color: "bg-foreground/[0.05]",
    animation: "animate-[drift-3_26s_ease-in-out_infinite]",
  },
];

export const HERO_BADGE_ITEMS = [
  { icon: CalendarDays, label: "Daily planning" },
  { icon: BrainCircuit, label: "AI guidance" },
  { icon: Sparkles, label: "Beautiful focus" },
];
