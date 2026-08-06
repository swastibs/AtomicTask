import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SectionReveal } from "@/components/shared";
import { CheckCircle, TrendingUp, Target, UserPlus } from "lucide-react";

const STEPS = [
  {
    icon: UserPlus,
    title: "Create your account",
    description:
      "Set up your space in minutes and decide how you want to move this week.",
    step: "01",
  },
  {
    icon: Target,
    title: "Set your goals",
    description:
      "Define your priorities and let the system shape a clear path around them.",
    step: "02",
  },
  {
    icon: CheckCircle,
    title: "Take action daily",
    description:
      "Track progress, keep streaks alive, and let tiny wins build momentum.",
    step: "03",
  },
  {
    icon: TrendingUp,
    title: "Grow and improve",
    description:
      "Use real feedback to refine your routine and stay inspired.",
    step: "04",
  },
];

export function HowItWorks() {
  return (
    <SectionReveal
      as="section"
      id="how-it-works"
      className="relative isolate overflow-hidden border-t border-border bg-muted/30 px-4 py-20 sm:px-6 lg:px-8 lg:py-32 dark:bg-muted/10"
    >
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
          How it works
        </p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Start with one habit and let it <span className="text-primary">snowball</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          The experience is simple, but designed to make progress feel effortless.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.step}
              className="group hover-lift hover-glow rounded-[1.4rem] border border-border/70 bg-card/70 p-6 transition-all duration-300"
            >
              <div className="mb-4 text-4xl font-black text-primary/15">{step.step}</div>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="leading-7 text-sm text-muted-foreground">{step.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link to="/signup">
          <Button className="rounded-full bg-primary px-6 py-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]">
            Start your journey now
          </Button>
        </Link>
      </div>
    </SectionReveal>
  );
}

export default HowItWorks;
