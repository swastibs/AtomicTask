import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "../validations/auth";
import { useAuth } from "../hooks/useAuth";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import DriftBlobs from "@/components/shared/DriftBlobs";
import GlassCard from "@/components/shared/GlassCard";
import RocketIcon from "@/components/shared/RocketIcon";
import ShimmerButton from "@/components/shared/ShimmerButton";
import { AUTH_BLOBS } from "@/constants/landingContent";

const floatingShapes = [
  {
    id: "orb-1",
    className: "left-4 top-6 h-16 w-16 rounded-full bg-primary/20 blur-[2px]",
  },
  {
    id: "orb-2",
    className:
      "right-6 top-12 h-12 w-12 rotate-12 rounded-[1rem] border border-primary/20 bg-primary/10",
  },
  {
    id: "orb-3",
    className:
      "bottom-10 left-8 h-14 w-14 rounded-full border border-foreground/10 bg-foreground/5",
  },
  {
    id: "orb-4",
    className:
      "bottom-14 right-10 h-10 w-10 rounded-[0.35rem] border border-primary/15 bg-primary/10 rotate-45",
  },
];

export function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup } = useAuth();

  // Determine active tab from URL path
  const [activeTab, setActiveTab] = useState(() => {
    return location.pathname === "/signup" ? "signup" : "login";
  });

  // Update tab when URL changes (e.g., browser back/forward)
  useEffect(() => {
    setActiveTab(location.pathname === "/signup" ? "signup" : "login");
  }, [location.pathname]);

  // Login form
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

  // Signup form
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
    if (result.success) {
      navigate("/dashboard");
    } else {
      setLoginError(result.error);
    }
  };

  const onSignupSubmit = async (data) => {
    setSignupError("");
    const result = await signup(data.name, data.email, data.password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setSignupError(result.error);
    }
  };

  const switchTab = (tab) => {
    navigate(tab === "login" ? "/login" : "/signup");
  };

  return (
    <div className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <DriftBlobs blobs={AUTH_BLOBS} className="opacity-90" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {floatingShapes.map((shape) => (
          <div
            key={shape.id}
            className={`animate-slow-drift absolute ${shape.className}`}
            style={{
              animationDelay: shape.id.includes("2")
                ? "180ms"
                : shape.id.includes("3")
                  ? "320ms"
                  : "0ms",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-2 duration-500">
        <GlassCard
          variant="auth"
          className="relative overflow-hidden border border-border/60 bg-card/80 shadow-[0_24px_80px_-30px_rgba(231,111,81,0.35)] backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(231,111,81,0.16),_transparent_45%)]" />
          <div className="relative">
            {/* Tabs */}
            <div className="flex rounded-t-xl border-b border-border/60 bg-muted/30 p-1">
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

            {/* Panels Container with sliding effect */}
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
                {/* Login Panel */}
                <div className="w-full shrink-0">
                  <CardHeader className="space-y-3 text-center">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:rotate-6">
                      <RocketIcon className="size-8" />
                    </div>
                    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                      <Sparkles className="size-3.5" />
                      Premium access
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                      Welcome back
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Enter your credentials to access your account
                    </p>
                  </CardHeader>
                  <CardContent>
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
                        {loginErrors.email && (
                          <p className="text-sm text-destructive">
                            {loginErrors.email.message}
                          </p>
                        )}
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
                            onClick={() =>
                              setShowLoginPassword(!showLoginPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 transition-colors hover:text-foreground"
                          >
                            {showLoginPassword ? (
                              <EyeOff className="size-4" />
                            ) : (
                              <Eye className="size-4" />
                            )}
                          </button>
                        </div>
                        {loginErrors.password && (
                          <p className="text-sm text-destructive">
                            {loginErrors.password.message}
                          </p>
                        )}
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
                  </CardContent>
                </div>

                {/* Signup Panel */}
                <div className="w-full shrink-0">
                  <CardHeader className="space-y-3 text-center">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:rotate-6">
                      <RocketIcon className="size-8" />
                    </div>
                    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                      <Sparkles className="size-3.5" />
                      Build momentum
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                      Create your account
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Start building habits that stick
                    </p>
                  </CardHeader>
                  <CardContent>
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
                        {signupErrors.name && (
                          <p className="text-sm text-destructive">
                            {signupErrors.name.message}
                          </p>
                        )}
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
                        {signupErrors.email && (
                          <p className="text-sm text-destructive">
                            {signupErrors.email.message}
                          </p>
                        )}
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
                            onClick={() =>
                              setShowSignupPassword(!showSignupPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 transition-colors hover:text-foreground"
                          >
                            {showSignupPassword ? (
                              <EyeOff className="size-4" />
                            ) : (
                              <Eye className="size-4" />
                            )}
                          </button>
                        </div>
                        {signupErrors.password && (
                          <p className="text-sm text-destructive">
                            {signupErrors.password.message}
                          </p>
                        )}
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
                  </CardContent>
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
