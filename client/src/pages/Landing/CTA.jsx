import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { RocketIcon, ShimmerButton } from "@/components/shared";

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-5xl text-center">
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary via-orange-500 to-amber-500 p-10 text-primary-foreground shadow-[0_24px_80px_-24px_rgba(231,111,81,0.5)] sm:p-14 lg:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.3),_transparent_45%)]" />
          <div className="relative">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-primary-foreground/80">
              Ready to begin?
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Make your next win feel inevitable.
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-primary-foreground/85">
              Join creators, founders, and focused individuals who want their
              routines to feel elegant, energized, and sustainable.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/signup">
                <ShimmerButton className="group rounded-full bg-white px-6 py-5 text-sm font-semibold text-primary shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 active:scale-[0.98]">
                  Get started free
                  <RocketIcon className="size-4" />
                </ShimmerButton>
              </Link>
              <Link to="/signup">
                <button className="rounded-full border border-white/30 bg-white/10 px-6 py-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20">
                  View the demo
                  <ArrowRight className="ml-2 size-4" />
                </button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/70">
              No credit card required. Start building momentum in minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
