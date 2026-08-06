import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MarqueeColumn({ items, direction = "up" }) {
  return (
    <div className="flex min-h-0 flex-col gap-4">
      <div
        className={cn(
          "flex flex-col gap-4",
          direction === "up" ? "animate-marquee-up" : "animate-marquee-down",
        )}
      >
        {items.concat(items).map((testimonial, index) => {
          const Icon = testimonial.icon;
          return (
            <Card
              key={`${testimonial.author}-${index}`}
              className="hover-lift hover-glow border-border/70 bg-card/80 shadow-sm transition-all duration-300"
            >
              <CardContent className="pt-6">
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Icon
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < testimonial.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground/30",
                      )}
                    />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-7 text-foreground/85">
                  “{testimonial.quote}”
                </p>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default memo(MarqueeColumn);
