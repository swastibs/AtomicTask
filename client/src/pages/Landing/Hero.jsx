import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, BrainCircuit, Sparkles } from "lucide-react";
import { DriftBlobs, GlassCard, RocketIcon, ShimmerButton, StaggeredText } from "@/components/shared";

const HERO_LINES = [
  {
    content: (
      <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 shadow-sm backdrop-blur-sm">
        <span className="flex size-5 items-center justify-center rounded-full border border-primary/20 bg-primary/15">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary/70 animate-ping" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
        </span>
        <span className="text-[12px] font-semibold uppercase tracking-[0.24em] text-primary">
          AI-powered momentum <span className="animate-caret text-primary">|</span>
        </span>
      </div>
    ),
  },
  {
    content: (
      <h1 className="mt-6 font-heading text-5xl font-black leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
        Build a life that feels
        <span className="mt-3 block bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
          effortlessly ahead.
        </span>
      </h1>
    ),
  },
  {
    content: (
      <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground lg:mx-0">
        AtomicTask turns your goals, habits, and energy into one calm system
        that helps you move with clarity and momentum.
      </p>
    ),
  },
  {
    content: (
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
        <Link to="/signup">
          <ShimmerButton className="group rounded-full bg-primary px-6 py-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]">
            Get started free
            <RocketIcon className="size-4" />
          </ShimmerButton>
        </Link>
        <Link to="/signup">
          <button className="rounded-full border border-border bg-card/70 px-6 py-5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted">
            Watch the demo
          </button>
        </Link>
      </div>
    ),
  },
  {
    content: (
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground lg:justify-start">
        <span className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-2 backdrop-blur-sm">
          <CalendarDays className="size-4 text-primary" />
          Daily planning
        </span>
        <span className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-2 backdrop-blur-sm">
          <BrainCircuit className="size-4 text-primary" />
          AI guidance
        </span>
        <span className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-2 backdrop-blur-sm">
          <Sparkles className="size-4 text-primary" />
          Beautiful focus
        </span>
      </div>
    ),
  },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <DriftBlobs />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-14">
        <div className="max-w-2xl text-center lg:text-left">
          <StaggeredText lines={HERO_LINES} className="space-y-6" />
        </div>

        <div className="w-full max-w-xl lg:max-w-none">
          <GlassCard className="relative overflow-hidden p-4 sm:p-6 lg:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(231,111,81,0.15),_transparent_45%)]" />
            <div className="relative rounded-[1.6rem] border border-border/60 bg-card/85 p-3 shadow-inner backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex items-center justify-between rounded-full border border-border/60 bg-background/70 px-3 py-2 text-xs font-medium text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary" />
                  Team momentum board
                </span>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                  Live
                </span>
              </div>
              <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-[1.25rem] border border-border/70 bg-background/80 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Today’s focus</p>
                      <p className="text-xs text-muted-foreground">4 habits ready to win</p>
                    </div>
                    <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      +18%
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      ["Deep work sprint", "2h left"],
                      ["Workout", "12:30"],
                      ["Journal", "Tonight"],
                    ].map(([title, meta]) => (
                      <div
                        key={title}
                        className="flex items-center justify-between rounded-2xl border border-border/60 bg-card/80 px-3 py-3"
                      >
                        <div>
                          <p className="text-sm font-semibold text-foreground">{title}</p>
                          <p className="text-xs text-muted-foreground">{meta}</p>
                        </div>
                        <div className="size-8 rounded-full border border-primary/20 bg-primary/10" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[1.25rem] border border-border/70 bg-background/80 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">Momentum</p>
                    <ArrowRight className="size-4 text-primary" />
                  </div>
                  <div className="animate-float rounded-[1.2rem] border border-primary/15 bg-gradient-to-br from-primary/20 via-orange-500/10 to-transparent p-4">
                    <div className="mb-4 flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold text-foreground">98</p>
                        <p className="text-sm text-muted-foreground">streak score</p>
                      </div>
                      <div className="rounded-full bg-card/80 px-2.5 py-1 text-xs font-semibold text-primary">
                        On fire
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-card/70">
                      <div className="h-2 w-[78%] rounded-full bg-gradient-to-r from-primary to-orange-400" />
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">Your next win is already queued.</p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

export default Hero;
