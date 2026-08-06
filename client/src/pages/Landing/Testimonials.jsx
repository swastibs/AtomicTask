import { SectionReveal, MarqueeColumn } from "@/components/shared";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "AtomicTask gave my schedule a pulse. I finally feel in control instead of chasing everything.",
    author: "Sarah Chen",
    role: "Product manager",
    rating: 5,
    icon: Star,
  },
  {
    quote:
      "The AI prioritization feels like having a thoughtful friend in your corner every morning.",
    author: "Marcus Reed",
    role: "Founder",
    rating: 5,
    icon: Star,
  },
  {
    quote:
      "I’m sticking to habits for the first time because the experience is so motivating and calm.",
    author: "Priya Sharma",
    role: "Fitness coach",
    rating: 5,
    icon: Star,
  },
  {
    quote:
      "The accountability circles made me more consistent than I’ve been in years.",
    author: "David Kim",
    role: "Software engineer",
    rating: 4,
    icon: Star,
  },
];

export function Testimonials() {
  return (
    <SectionReveal className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
          Testimonials
        </p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Loved by people who want <span className="text-primary">a calmer edge</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          The experience feels thoughtful enough for serious work and playful enough for everyday energy.
        </p>
      </div>

      <div className="mask-fade-edges mx-auto grid max-h-[34rem] max-w-6xl gap-4 overflow-hidden md:grid-cols-3">
        <MarqueeColumn items={TESTIMONIALS.slice(0, 2)} direction="up" />
        <MarqueeColumn items={TESTIMONIALS.slice(2)} direction="down" />
        <MarqueeColumn items={TESTIMONIALS.slice(1, 3)} direction="up" />
      </div>
    </SectionReveal>
  );
}

export default Testimonials;
