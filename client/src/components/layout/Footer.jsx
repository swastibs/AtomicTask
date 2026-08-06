import { Rocket } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/80 px-6 pt-16 pb-10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 sm:col-span-1">
            <a
              href="/"
              className="flex items-center gap-2 mb-4 hover:opacity-70 transition-opacity no-underline"
            >
              <Rocket className="h-7 w-7 text-primary" />
              <span className="font-semibold text-base tracking-tight text-foreground">
                AtomicTask
              </span>
            </a>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-44">
              Build habits that stick – with AI-powered insights and
              accountability.
            </p>
          </div>
          {/* ... rest same as before ... */}
          {/* Keep the same columns as previous version */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60 mb-4">
              Product
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#features"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Changelog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Roadmap
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60 mb-4">
              Company
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60 mb-4">
              Legal
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60 mb-4">
              Socials
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="size-6 rounded-lg bg-muted border border-border flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-3.5"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631z" />
                    </svg>
                  </span>
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="size-6 rounded-lg bg-muted border border-border flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-3.5"
                      fill="currentColor"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </span>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="size-6 rounded-lg bg-muted border border-border flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-3.5"
                      fill="currentColor"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </span>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} AtomicTask. All rights reserved.
          </p>
          <p className="text-[11px] text-muted-foreground/60">
            Built for people who actually ship.
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
