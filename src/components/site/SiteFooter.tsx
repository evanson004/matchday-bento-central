import { Link } from "@tanstack/react-router";
import { LEAGUE } from "@/lib/league";
import { navItems } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-primary font-display text-sm font-black text-foreground">
              {LEAGUE.short}
            </span>
            <span className="font-display text-lg font-extrabold">{LEAGUE.name}</span>
          </div>
          <p className="mt-4 max-w-sm opacity-75">
            {LEAGUE.tagline} Season {LEAGUE.season}.
          </p>
        </div>
        <div>
          <p className="eyebrow opacity-60">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="opacity-80 transition-opacity hover:opacity-100 hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow opacity-60">Contact</p>
          <ul className="mt-4 space-y-2 opacity-80">
            <li>info@riversideleague.example</li>
            <li>+254 700 000 000</li>
            <li>Riverside Community Stadium</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-sm opacity-60 sm:px-6">
          © 2026 {LEAGUE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
