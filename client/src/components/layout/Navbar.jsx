import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, ArrowRight, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const NAV_LINKS = ["Features", "Product", "Pricing"];

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [updatesOpen, setUpdatesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 100,
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!updatesOpen) return;
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUpdatesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [updatesOpen]);

  const handleToggleUpdates = useCallback(() => {
    setUpdatesOpen((prev) => !prev);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ease-out pt-4">
      <nav
        className={`flex w-full items-center justify-between gap-3 rounded-full border bg-white/70 dark:bg-gray-950/70 backdrop-blur-lg shadow-lg border-border px-5 transition-all duration-300 ease-out ${
          isScrolled ? "max-w-4xl py-2" : "max-w-5xl py-2.5"
        }`}
      >
        {/* Logo */}
        <a href="/" className="group flex items-center gap-2 shrink-0">
          <Rocket className="size-8 text-primary transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:rotate-6" />
          <span className="font-semibold text-base tracking-tight text-foreground transition-opacity duration-200 group-hover:opacity-70">
            AtomicTask
          </span>
        </a>

        {/* Center nav links – now bolder, bigger, and fully visible */}
        <div className="hidden sm:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((label) => (
            <Button
              key={label}
              type="button"
              variant="ghost"
              className="relative h-auto rounded-none bg-transparent p-0 text-sm font-medium text-foreground/90 hover:bg-transparent hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {label}
            </Button>
          ))}
          <div className="relative" ref={dropdownRef}>
            <Button
              type="button"
              variant="ghost"
              onClick={handleToggleUpdates}
              aria-expanded={updatesOpen}
              className="h-auto rounded-none bg-transparent p-0 text-sm font-medium text-foreground/90 hover:bg-transparent hover:text-foreground"
            >
              Updates
              <ChevronDown
                className={`ml-1 size-3 transition-transform duration-200 ease-out ${
                  updatesOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-40 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-lg p-1.5 transition-all duration-150 ease-out origin-top ${
                updatesOpen
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
              }`}
            >
              {["Changelog", "Roadmap"].map((item) => (
                <Button
                  key={item}
                  type="button"
                  variant="ghost"
                  className="h-auto w-full justify-start px-3 py-1.5 text-left text-[13px] text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
            className="relative size-8 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-300 active:scale-90 shrink-0 overflow-hidden"
          >
            <Sun
              className={`absolute size-4 text-amber-400 transition-all duration-300 ease-out ${
                isDark
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0"
              }`}
            />
            <Moon
              className={`absolute size-4 transition-all duration-300 ease-out ${
                isDark
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            />
          </Button>
          <Button
            type="button"
            className="h-auto rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-150 hover:bg-primary/90 active:scale-[0.97]"
          >
            Get started
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/button:translate-x-0.5" />
          </Button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
