import { Card, CardContent } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Star } from "lucide-react";

export function Testimonials() {
  const [sectionRef, isVisible] = useIntersectionObserver();
  const testimonials = [
    {
      quote:
        "AtomicTask gave my schedule a pulse. I finally feel in control instead of chasing everything.",
      author: "Sarah Chen",
      role: "Product manager",
      rating: 5,
    },
    {
      quote:
        "The AI prioritization feels like having a thoughtful friend in your corner every morning.",
      author: "Marcus Reed",
      role: "Founder",
      rating: 5,
    },
    {
      quote:
        "I’m sticking to habits for the first time because the experience is so motivating and calm.",
      author: "Priya Sharma",
      role: "Fitness coach",
      rating: 5,
    },
    {
      quote:
        "The accountability circles made me more consistent than I’ve been in years.",
      author: "David Kim",
      role: "Software engineer",
      rating: 4,
    },
  ];

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
      />
    ));

  const renderColumn = (items, direction) => (
    <div className="flex min-h-0 flex-col gap-4">
      <div
        className={`flex flex-col gap-4 ${direction === "up" ? "animate-marquee-up" : "animate-marquee-down"}`}
      >
        {items.concat(items).map((testimonial, index) => (
          <Card
            key={`${testimonial.author}-${index}`}
            className="hover-lift hover-glow border-border/70 bg-card/80 shadow-sm transition-all duration-300"
          >
            <CardContent className="pt-6">
              <div className="mb-3 flex gap-0.5">
                {renderStars(testimonial.rating)}
              </div>
              <p className="mb-4 text-sm leading-7 text-foreground/85">
                “{testimonial.quote}”
              </p>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-32"
    >
      <div
        className={`section-reveal relative mx-auto max-w-7xl transition-all duration-300 ease-out ${isVisible ? "is-visible translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
      >
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
            Testimonials
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by people who want{" "}
            <span className="text-primary">a calmer edge</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            The experience feels thoughtful enough for serious work and playful
            enough for everyday energy.
          </p>
        </div>

        <div className="mask-fade-edges mx-auto grid max-h-[34rem] max-w-6xl gap-4 overflow-hidden md:grid-cols-3">
          {renderColumn(testimonials.slice(0, 2), "up")}
          {renderColumn(testimonials.slice(2), "down")}
          {renderColumn(testimonials.slice(1, 3), "up")}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
