import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, LogOut, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { RocketIcon, ThemeToggle } from "@/components/shared";

const NAV_LINKS = ["Features", "Product", "Pricing"];

export function Navbar() {
  const { user, logout } = useAuth();
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

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const navButtons = useMemo(
    () =>
      NAV_LINKS.map((label) => (
        <Button
          key={label}
          type="button"
          variant="ghost"
          className="relative h-auto rounded-none bg-transparent p-0 text-sm font-medium text-foreground/90 hover:bg-transparent hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:after:scale-x-100"
        >
          {label}
        </Button>
      )),
    [],
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ease-out pt-4">
      <nav
        className={`flex w-full items-center justify-between gap-3 rounded-full border bg-white/70 dark:bg-gray-950/70 backdrop-blur-lg shadow-lg border-border px-5 transition-all duration-300 ease-out ${
          isScrolled ? "max-w-4xl py-2" : "max-w-5xl py-2.5"
        }`}
      >
        <Link to="/" className="group flex items-center gap-2 shrink-0">
          <RocketIcon className="size-8" />
          <span className="font-semibold text-base tracking-tight text-foreground transition-opacity duration-200 group-hover:opacity-70">
            AtomicTask
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {navButtons}
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
              {['Changelog', 'Roadmap'].map((item) => (
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

        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle className="relative size-8 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-300 active:scale-90 shrink-0 overflow-hidden" />

          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 text-sm text-foreground/80">
                <User className="size-4 text-primary" />
                <span className="font-medium">{user.name || user.email}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <LogOut className="size-4 sm:mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <Link to="/signup">
              <Button
                type="button"
                size="default"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-150 active:scale-[0.97]"
              >
                Get Started
                <ArrowRight className="ml-2 size-3.5" />
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default memo(Navbar);
