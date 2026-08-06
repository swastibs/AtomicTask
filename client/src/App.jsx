import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Zap, Shield, Users, Moon, Sun } from "lucide-react";

function App() {
  // ---------- Dark Mode State ----------
  const [isDark, setIsDark] = useState(false);

  // On mount, read saved preference or system preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else if (saved === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      }
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-xl dark:text-white">
              AtomicTask
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="dark:text-slate-200">
              Log In
            </Button>
            <Button size="sm">Sign Up</Button>
            {/* Dark Mode Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="dark:text-slate-200"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Build habits that stick.
        </h1>
        <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          AtomicTask helps you track daily habits, manage tasks, and achieve
          your goals – with AI-powered insights.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg" className="text-base">
            Get Started Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-base dark:border-slate-600 dark:text-slate-200"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader>
              <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
              <CardTitle className="dark:text-white">
                Smart Prioritization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                AI decides what matters most so you never waste time on the
                wrong task.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader>
              <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mb-2" />
              <CardTitle className="dark:text-white">Daily Streaks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Stay consistent with habit streaks and gamified rewards that
                keep you motivated.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader>
              <Users className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
              <CardTitle className="dark:text-white">
                Accountability Partners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Invite friends to keep you on track – because habits are easier
                with support.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} AtomicTask. Built with ❤️.
        </div>
      </footer>
    </div>
  );
}

export default App;
