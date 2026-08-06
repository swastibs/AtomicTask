import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/auth";
import { useAuth } from "../hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard, DriftBlobs, ShimmerButton } from "@/components/shared";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      setServerError("");
      const result = await login(data.email, data.password);

      if (result.success) {
        navigate("/dashboard");
      } else {
        setServerError(result.error);
      }
    },
    [login, navigate],
  );

  return (
    <div className="relative isolate min-h-[80vh] overflow-hidden px-4 py-12">
      <DriftBlobs className="absolute inset-0 -z-10 opacity-80" />
      <div className="pointer-events-none absolute left-6 top-10 h-14 w-14 rounded-full bg-primary/20 blur-2xl animate-[drift-1_24s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute right-10 top-24 h-16 w-16 rounded-2xl bg-primary/10 opacity-80 blur-2xl animate-[drift-2_28s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute left-1/2 top-6 h-0 w-0 -translate-x-1/2 text-foreground/5 opacity-90 shape-triangle animate-[drift-3_26s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute right-14 bottom-12 h-12 w-12 rounded-full border border-primary/20 bg-foreground/5 blur-xl animate-[drift-1_30s_ease-in-out_infinite]" />

      <div className="container mx-auto flex min-h-[75vh] max-w-md items-center justify-center">
        <GlassCard className="relative w-full overflow-hidden border-border/60 bg-card/80 backdrop-blur-xl shadow-[0_40px_120px_-70px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2),transparent_45%)]" />
          <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12">
            <CardHeader className="space-y-2 text-center">
              <div className="mx-auto inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                Premium access
              </div>
              <CardTitle className="text-3xl font-black tracking-tight text-foreground">
                Welcome back
              </CardTitle>
              <p className="max-w-xl mx-auto text-sm leading-7 text-muted-foreground">
                Sign in to continue your momentum and keep your day moving with clarity.
              </p>
            </CardHeader>
            <CardContent className="mt-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-[1.25rem] border border-border bg-background/85 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full rounded-[1.25rem] border border-border bg-background/85 px-4 py-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                </div>

                {serverError && (
                  <div className="rounded-3xl bg-destructive/10 p-3 text-sm text-destructive">
                    {serverError}
                  </div>
                )}

                <ShimmerButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Log In"
                  )}
                </ShimmerButton>

                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/signup" className="font-semibold text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </form>
            </CardContent>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export default Login;
