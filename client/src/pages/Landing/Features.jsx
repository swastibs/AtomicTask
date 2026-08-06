import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Zap, Shield, Users, Brain, Calendar, TrendingUp } from "lucide-react";

export function Features() {
  const [sectionRef, isVisible] = useIntersectionObserver();
  const features = [
    {
      icon: Zap,
      title: "Smart prioritization",
      description:
        "AI decides what deserves your energy first so your day feels lighter.",
      color: "text-primary",
    },
    {
      icon: Shield,
      title: "Daily streaks",
      description:
        "Stay consistent with streaks, nudges, and little rewards that keep going fun.",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: Users,
      title: "Accountability circles",
      description:
        "Bring friends, creators, or teammates into your routine with effortless support.",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Brain,
      title: "AI insights",
      description:
        "Understand your rhythms and get smart recommendations without the noise.",
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Calendar,
      title: "Intentional scheduling",
      description:
        "Turn your calendar into a calm blueprint for focus, rest, and momentum.",
      color: "text-rose-600 dark:text-rose-400",
    },
    {
      icon: TrendingUp,
      title: "Progress that feels real",
      description:
        "Visual progress keeps each win tangible and helps you celebrate the right things.",
      color: "text-cyan-600 dark:text-cyan-400",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-32"
    >
      <div
        className={`section-reveal relative mx-auto max-w-7xl transition-all duration-300 ease-out ${isVisible ? "is-visible translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
      >
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
            Features
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Beautiful systems for{" "}
            <span className="text-primary">bold routines</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            AtomicTask combines planning, reflection, and momentum into one
            polished experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group hover-lift hover-glow border-border/70 bg-card/70 p-1 transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 bg-background/70">
                    <Icon
                      className={`h-5 w-5 ${feature.color} transition-transform duration-300 group-hover:scale-110`}
                    />
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
