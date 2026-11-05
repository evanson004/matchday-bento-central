import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LEAGUE } from "@/lib/league";
import { cn } from "@/lib/utils";

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/fixtures", label: "Fixtures" },
  { to: "/standings", label: "Standings" },
  { to: "/teams", label: "Teams" },
  { to: "/news", label: "News" },
  { to: "/gallery", label: "Gallery" },
  { to: "/community", label: "Community" },
] as const;

const linkBase =
  "rounded-full px-4 py-2 font-display text-sm font-bold transition-colors hover:bg-card";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex size-10 items-center justify-center rounded-2xl bg-primary font-display text-sm font-black">
            {LEAGUE.short}
          </span>
          <span className="hidden font-display text-lg font-extrabold leading-tight sm:block">
            {LEAGUE.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full bg-secondary p-1 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={linkBase}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-card lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <nav
        aria-label="Mobile"
        className={cn(
          "grid gap-1 border-t border-border bg-background px-4 py-3 lg:hidden",
          open ? "grid" : "hidden",
        )}
      >
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setOpen(false)}
            className={cn(linkBase, "py-3 text-base")}
            activeOptions={{ exact: item.to === "/" }}
            activeProps={{ className: "bg-primary" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
