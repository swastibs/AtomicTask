import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "../validations/auth";
import { useAuth } from "../hooks/useAuth";
import {
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  CalendarDays,
  BrainCircuit,
  Zap,
} from "lucide-react";
import DriftBlobs from "@/components/shared/DriftBlobs";
import GlassCard from "@/components/shared/GlassCard";
import RocketIcon from "@/components/shared/RocketIcon";
import ShimmerButton from "@/components/shared/ShimmerButton";
import { AUTH_BLOBS } from "@/constants/landingContent";

const PANEL_HIGHLIGHTS = [
  {
    icon: CalendarDays,
    title: "Daily rituals",
    description: "Plan focus blocks and habits that fit your actual energy.",
  },
  {
    icon: BrainCircuit,
    title: "AI guidance",
    description: "Get nudges based on what's actually moving your progress.",
  },
  {
    icon: Zap,
    title: "Real momentum",
    description: "Streaks and stats that reflect effort, not vanity metrics.",
  },
];

function FieldError({ message }) {
  if (!message) return null;
  return <p className="text-sm text-destructive">{message}</p>;
}

export function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup } = useAuth();

  const [activeTab, setActiveTab] = useState(() =>
    location.pathname === "/signup" ? "signup" : "login",
  );

  useEffect(() => {
    setActiveTab(location.pathname === "/signup" ? "signup" : "login");
  }, [location.pathname]);

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: loginSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupError, setSignupError] = useState("");
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors, isSubmitting: signupSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onLoginSubmit = async (data) => {
    setLoginError("");
    const result = await login(data.email, data.password);
    if (result.success) navigate("/dashboard");
    else setLoginError(result.error);
  };

  const onSignupSubmit = async (data) => {
    setSignupError("");
    const result = await signup(data.name, data.email, data.password);
    if (result.success) navigate("/dashboard");
    else setSignupError(result.error);
  };

  const switchTab = (tab) => navigate(tab === "login" ? "/login" : "/signup");

  return (
    <div className="relative isolate flex min-h-[85vh] items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <DriftBlobs blobs={AUTH_BLOBS} className="opacity-90" />

      <div className="relative z-10 w-full max-w-5xl animate-in fade-in slide-in-from-bottom-2 duration-500">
        <GlassCard className="grid overflow-hidden border border-border/60 bg-card/80 shadow-[0_24px_80px_-30px_rgba(231,111,81,0.35)] backdrop-blur-xl lg:grid-cols-[1fr_1.1fr]">
          {/* Branding panel — desktop only */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary via-orange-500 to-amber-500 p-10 text-primary-foreground lg:flex">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.25),_transparent_50%)]" />
            <div className="relative">
              <Link to="/" className="inline-flex items-center gap-2">
                <RocketIcon className="size-8 text-primary-foreground" />
                <span className="font-heading text-lg font-semibold tracking-tight">
                  AtomicTask
                </span>
              </Link>
              <h2 className="mt-10 text-3xl font-black leading-tight tracking-tight">
                Momentum feels
                <br />
                different when it's
                <br />
                designed for you.
              </h2>
            </div>
            <div className="relative space-y-5">
              {PANEL_HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs leading-5 text-primary-foreground/80">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form panel */}
          <div className="relative">
            <div className="flex border-b border-border/60 bg-muted/30 p-1">
              <button
                onClick={() => switchTab("login")}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-300 ${
                  activeTab === "login"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => switchTab("signup")}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-300 ${
                  activeTab === "signup"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out will-change-transform"
                style={{
                  transform:
                    activeTab === "login"
                      ? "translateX(0)"
                      : "translateX(-100%)",
                }}
              >
                {/* Login */}
                <div className="w-full shrink-0 p-6 sm:p-8">
                  <div className="mb-6 space-y-2 text-center lg:text-left">
                    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary lg:mx-0">
                      <Sparkles className="size-3.5" />
                      Premium access
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                      Welcome back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Enter your credentials to access your account
                    </p>
                  </div>

                  <form
                    onSubmit={handleLoginSubmit(onLoginSubmit)}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label
                        htmlFor="login-email"
                        className="text-sm font-medium text-foreground"
                      >
                        Email
                      </label>
                      <input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        {...loginRegister("email")}
                      />
                      <FieldError message={loginErrors.email?.message} />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="login-password"
                        className="text-sm font-medium text-foreground"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="login-password"
                          type={showLoginPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="w-full rounded-xl border border-border/60 bg-background/70 px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          {...loginRegister("password")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 transition-colors hover:text-foreground"
                        >
                          {showLoginPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                      <FieldError message={loginErrors.password?.message} />
                      <div className="text-right">
                        <Link
                          to="/forgot-password"
                          className="text-xs text-primary hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>

                    {loginError && (
                      <div className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive animate-in fade-in duration-200">
                        {loginError}
                      </div>
                    )}

                    <ShimmerButton
                      type="submit"
                      disabled={loginSubmitting}
                      className="w-full py-3"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {loginSubmitting ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          "Log In"
                        )}
                      </span>
                    </ShimmerButton>

                    <p className="text-center text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => switchTab("signup")}
                        className="font-semibold text-primary transition-colors hover:underline"
                      >
                        Sign up
                      </button>
                    </p>
                  </form>
                </div>

                {/* Signup */}
                <div className="w-full shrink-0 p-6 sm:p-8">
                  <div className="mb-6 space-y-2 text-center lg:text-left">
                    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary lg:mx-0">
                      <Sparkles className="size-3.5" />
                      Build momentum
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                      Create your account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Start building habits that stick
                    </p>
                  </div>

                  <form
                    onSubmit={handleSignupSubmit(onSignupSubmit)}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label
                        htmlFor="signup-name"
                        className="text-sm font-medium text-foreground"
                      >
                        Full Name
                      </label>
                      <input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        {...signupRegister("name")}
                      />
                      <FieldError message={signupErrors.name?.message} />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="signup-email"
                        className="text-sm font-medium text-foreground"
                      >
                        Email
                      </label>
                      <input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        {...signupRegister("email")}
                      />
                      <FieldError message={signupErrors.email?.message} />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="signup-password"
                        className="text-sm font-medium text-foreground"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="signup-password"
                          type={showSignupPassword ? "text" : "password"}
                          placeholder="Min 6 characters"
                          className="w-full rounded-xl border border-border/60 bg-background/70 px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          {...signupRegister("password")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 transition-colors hover:text-foreground"
                        >
                          {showSignupPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                      <FieldError message={signupErrors.password?.message} />
                    </div>

                    {signupError && (
                      <div className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive animate-in fade-in duration-200">
                        {signupError}
                      </div>
                    )}

                    <ShimmerButton
                      type="submit"
                      disabled={signupSubmitting}
                      className="w-full py-3"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {signupSubmitting ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </span>
                    </ShimmerButton>

                    <p className="text-center text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => switchTab("login")}
                        className="font-semibold text-primary transition-colors hover:underline"
                      >
                        Log in
                      </button>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export default Auth;
