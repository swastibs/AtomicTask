import { useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Rocket, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard, DriftBlobs, RocketIcon, ShimmerButton } from "@/components/shared";
import { Spinner } from "../components/shared/Spinner";

const STAT_CARDS = [
  {
    title: "Today",
    value: "8 tasks",
    details: "Focused rituals ready",
    icon: Rocket,
    accent: "text-primary",
  },
  {
    title: "Momentum",
    value: "94%",
    details: "Weekly goal progress",
    icon: Zap,
    accent: "text-amber-500",
  },
  {
    title: "Streak",
    value: "17 days",
    details: "Consistency unlocked",
    icon: Sparkles,
    accent: "text-cyan-500",
  },
];

export function Dashboard() {
  const { user, logout, loading } = useAuth();

  const welcomeText = useMemo(
    () => `Welcome back, ${user?.name || "there"}!`,
    [user?.name],
  );

  if (loading) {
    return <Spinner size="lg" className="min-h-[70vh]" />;
  }

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
        <p className="text-muted-foreground">Please log in to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="relative isolate min-h-[80vh] overflow-hidden px-4 py-12 mt-12">
      <DriftBlobs className="absolute inset-0 -z-10 opacity-70" />
      <div className="pointer-events-none absolute left-8 top-16 h-24 w-24 rounded-full bg-primary/10 blur-3xl opacity-30 animate-[drift-2_34s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute right-8 bottom-20 h-28 w-28 rounded-full bg-foreground/5 blur-3xl opacity-40 animate-[drift-3_32s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute right-1/4 top-10 rounded-full border border-primary/20 bg-primary/10 p-4 opacity-20 shadow-xl animate-[drift-1_30s_ease-in-out_infinite]">
        <Sparkles className="size-6 text-primary" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl space-y-8">
        <GlassCard className="overflow-hidden border-border/60 bg-card/80 backdrop-blur-xl shadow-[0_40px_120px_-70px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  Dashboard
                </p>
                <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                  {welcomeText}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                  Your progress, actions, and focus are all in one energized space.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ShimmerButton className="rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground">
                  Create a habit
                  <ArrowRight className="size-4" />
                </ShimmerButton>
                <Button
                  onClick={logout}
                  className="rounded-full border border-border bg-background/80 px-6 py-4 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-6 lg:grid-cols-3">
          {STAT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <GlassCard
                key={card.title}
                className="group overflow-hidden border-border/60 bg-card/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-foreground transition-all duration-300 group-hover:bg-primary/15">
                  <Icon className={`${card.accent} size-5`} />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {card.title}
                </p>
                <p className="mt-3 text-3xl font-black text-foreground">{card.value}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.details}</p>
              </GlassCard>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <GlassCard className="overflow-hidden border-border/60 bg-card/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  Momentum progress
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Keep your energy aligned through the week.
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                On track
              </span>
            </div>
            <div className="rounded-full bg-card/70 p-1">
              <div className="h-3 rounded-full bg-primary/80 transition-all duration-300" style={{ width: "78%" }} />
            </div>
            <div className="mt-6 space-y-4">
              {[
                "Completed your planning ritual",
                "Closed 3 focus blocks",
                "Queued tomorrow's top priority",
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-border/70 bg-background/70 px-4 py-4 text-sm text-foreground/80">
                  {item}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="overflow-hidden border-border/60 bg-card/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  Activity feed
                </p>
                <p className="mt-2 text-sm text-muted-foreground">Recent actions and calm progress updates.</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Live
              </span>
            </div>
            <div className="space-y-4">
              {[
                "Daily focus list refreshed",
                "AI recommended your next deep work session",
                "Your accountability circle checked in",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 rounded-3xl border border-border/70 bg-background/70 p-4">
                  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <BarChart3 className="size-4" />
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-right">
              <Link to="/dashboard" className="text-sm font-semibold text-primary hover:underline">
                View full history
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
