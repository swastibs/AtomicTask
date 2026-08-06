import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionReveal } from "@/components/shared";
import { Check, Sparkles, Users, Zap } from "lucide-react";

const TIERS = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Everything you need to start your first streak with clarity.",
    features: ["Unlimited tasks", "5 habits max", "Basic badges", "7-day analytics"],
    buttonText: "Get started",
    buttonVariant: "outline",
    icon: Users,
    popular: false,
  },
  {
    name: "Pro",
    price: "₹249",
    period: "per month",
    description: "For focused creators and serious habit builders.",
    features: [
      "Unlimited tasks & habits",
      "AI Assistant",
      "10 accountability circles",
      "Full analytics & insights",
      "Calendar & Slack integrations",
      "Priority support",
    ],
    buttonText: "Start Pro trial",
    buttonVariant: "default",
    icon: Zap,
    popular: true,
  },
  {
    name: "Team",
    price: "₹999",
    period: "per month",
    description: "For teams that want momentum, alignment, and healthy rituals.",
    features: [
      "Everything in Pro",
      "Team dashboard",
      "Unlimited accountability circles",
      "Admin controls",
      "Custom integrations",
      "Dedicated support",
    ],
    buttonText: "Contact sales",
    buttonVariant: "outline",
    icon: Sparkles,
    popular: false,
  },
];

export function Pricing() {
  return (
    <SectionReveal
      as="section"
      id="pricing"
      className="relative isolate overflow-hidden border-t border-border bg-muted/30 px-4 py-20 sm:px-6 lg:px-8 lg:py-32 dark:bg-muted/10"
    >
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">Pricing</p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Pick the pace that fits your <span className="text-primary">next chapter</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Start free, level up when your routine gets serious.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
        {TIERS.map((tier) => {
          const Icon = tier.icon;
          return (
            <Card
              key={tier.name}
              className={`group hover-lift hover-glow relative border-border/70 bg-card/80 transition-all duration-300 ${
                tier.popular ? "ring-2 ring-primary shadow-xl" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute left-1/2 top-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-primary-foreground">
                  Most popular
                </div>
              )}
              <CardHeader>
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20">
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <CardTitle className="text-xl text-foreground">{tier.name}</CardTitle>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">/{tier.period}</span>
                </div>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{tier.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-2.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className="w-full">
                  <Button variant={tier.buttonVariant} className="w-full rounded-full">
                    {tier.buttonText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SectionReveal>
  );
}

export default Pricing;
