import { memo } from "react";
import { X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { RocketIcon, SocialIcon } from "@/components/shared";

const FOOTER_GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Changelog", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "X (Twitter)",
    href: "#",
    icon: <FontAwesomeIcon icon={faXTwitter} className="size-3.5" />,
  },
  {
    label: "Instagram",
    href: "#",
    icon: <FontAwesomeIcon icon={faInstagram} className="size-3.5" />,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: <FontAwesomeIcon icon={faLinkedinIn} className="size-3.5" />,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/80 px-6 pt-16 pb-10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 sm:col-span-1">
            <a
              href="/"
              className="group flex items-center gap-2 mb-4 hover:opacity-70 transition-opacity no-underline"
            >
              <RocketIcon className="h-7 w-7" />
              <span className="font-semibold text-base tracking-tight text-foreground">
                AtomicTask
              </span>
            </a>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-44">
              Build habits that stick – with AI-powered insights and
              accountability.
            </p>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60 mb-4">
                {group.title}
              </p>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60 mb-4">
              Socials
            </p>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map((item) => (
                <li key={item.label}>
                  <SocialIcon {...item} />
                </li>
              ))}
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

export default memo(Footer);
