import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Camera, HeartHandshake, MapPin, Newspaper, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeamBadge } from "@/components/site/TeamBadge";
import {
  LEAGUE,
  articles,
  formatDate,
  formatTime,
  points,
  results,
  standings,
  teamById,
  teams,
  upcoming,
} from "@/lib/league";
import { images } from "@/lib/images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Riverside Community League — Home" },
      { name: "description", content: "Latest results, next fixtures, league table and news from the Riverside Community League." },
      { property: "og:title", content: "Riverside Community League — Home" },
      { property: "og:description", content: "Latest results, next fixtures, league table and news from the Riverside Community League." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const next = upcoming[0]!;
  const last = results[results.length - 1]!;
  const topNews = articles[0]!;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 md:pt-12">
      <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
        {/* Hero */}
        <section className="tile fade-up relative col-span-1 min-h-[420px] p-0 md:col-span-6 lg:col-span-8 lg:row-span-2">
          <img
            src={images.hero}
            alt="Riverside FC players in light blue in action on the pitch"
            width={1600}
            height={1008}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-4 bottom-4 rounded-3xl bg-card/95 p-6 backdrop-blur md:inset-x-6 md:bottom-6 md:max-w-lg md:p-8">
            <p className="eyebrow text-sky-deep">Season {LEAGUE.season}</p>
            <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{LEAGUE.name}</h1>
            <p className="mt-3 text-muted-foreground">
              {LEAGUE.tagline} Follow every fixture, result and story from our eight community clubs.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild>
                <Link to="/fixtures">
                  See fixtures <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/standings">League table</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Next match */}
        <Link
          to="/fixtures"
          className="tile tile-sky tile-interactive fade-up col-span-1 flex flex-col justify-between md:col-span-3 lg:col-span-4"
        >
          <div className="flex items-center justify-between">
            <p className="eyebrow">Next match · MW{next.matchweek}</p>
            <CalendarDays className="size-5" />
          </div>
          <div className="my-5 flex items-center justify-between gap-2">
            <div className="flex flex-col items-center gap-2 text-center">
              <TeamBadge teamId={next.home} size="lg" />
              <span className="font-display text-sm font-bold">{teamById(next.home).name}</span>
            </div>
            <span className="font-display text-2xl font-black">vs</span>
            <div className="flex flex-col items-center gap-2 text-center">
              <TeamBadge teamId={next.away} size="lg" />
              <span className="font-display text-sm font-bold">{teamById(next.away).name}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="font-display font-extrabold">
              {formatDate(next.date, { weekday: "long" })} · {formatTime(next.date)}
            </span>
            <span className="flex items-center gap-1 opacity-75">
              <MapPin className="size-4" /> {next.venue}
            </span>
          </div>
        </Link>

        {/* Last result */}
        <Link
          to="/fixtures"
          className="tile tile-ink tile-interactive fade-up col-span-1 flex flex-col justify-between md:col-span-3 lg:col-span-4"
        >
          <p className="eyebrow opacity-70">Latest result</p>
          <div className="my-4 space-y-2 font-display">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>{teamById(last.home).name}</span>
              <span className="text-3xl font-black">{last.score![0]}</span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold">
              <span>{teamById(last.away).name}</span>
              <span className="text-3xl font-black">{last.score![1]}</span>
            </div>
          </div>
          <p className="text-sm opacity-70">Full time · {formatDate(last.date, { weekday: "short" })}</p>
        </Link>

        {/* Mini table */}
        <section className="tile fade-up col-span-1 md:col-span-6 lg:col-span-5 lg:row-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold">League table</h2>
            <Link to="/standings" className="eyebrow flex items-center gap-1 hover:underline">
              Full table <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="py-2 font-semibold">#</th>
                <th className="py-2 font-semibold">Team</th>
                <th className="py-2 text-center font-semibold">P</th>
                <th className="py-2 text-center font-semibold">GD</th>
                <th className="py-2 text-right font-semibold">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((s, i) => {
                const t = teamById(s.teamId);
                const gd = s.gf - s.ga;
                return (
                  <tr key={s.teamId} className="border-t border-border">
                    <td className="py-2.5 font-display font-extrabold">{i + 1}</td>
                    <td className="py-2.5">
                      <span className="flex items-center gap-2 font-semibold">
                        <TeamBadge teamId={t.id} size="sm" />
                        {t.name}
                      </span>
                    </td>
                    <td className="py-2.5 text-center">{s.played}</td>
                    <td className="py-2.5 text-center">{gd > 0 ? `+${gd}` : gd}</td>
                    <td className="py-2.5 text-right font-display font-black">{points(s)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Top story */}
        <Link
          to="/news/$slug"
          params={{ slug: topNews.slug }}
          className="tile tile-interactive fade-up group col-span-1 flex flex-col gap-4 p-0 md:col-span-6 lg:col-span-7"
        >
          <div className="grid h-full gap-0 sm:grid-cols-2">
            <img
              src={images.celebration}
              alt="Riverside players celebrating a goal"
              loading="lazy"
              width={1200}
              height={912}
              className="h-56 w-full object-cover sm:h-full"
            />
            <div className="flex flex-col justify-between p-6">
              <div>
                <p className="eyebrow text-sky-deep">{topNews.category}</p>
                <h3 className="mt-2 text-2xl font-extrabold">{topNews.title}</h3>
                <p className="mt-2 text-muted-foreground">{topNews.excerpt}</p>
              </div>
              <span className="mt-4 flex items-center gap-1 font-display text-sm font-bold">
                Read story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>

        {/* Quick links */}
        <QuickTile to="/news" icon={<Newspaper />} title="News" text={`${articles.length} recent stories`} tone="tile-soft" span="lg:col-span-4" />
        <QuickTile to="/teams" icon={<Shield />} title="Teams" text={`${teams.length} community clubs`} tone="tile-sky" span="lg:col-span-3" />
        <QuickTile to="/gallery" icon={<Camera />} title="Gallery" text="Matchday moments" tone="tile-soft" span="lg:col-span-4" />

        {/* Community */}
        <Link
          to="/community"
          className="tile tile-interactive fade-up relative col-span-1 min-h-[220px] p-0 md:col-span-6 lg:col-span-8"
        >
          <div className="grid h-full md:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col justify-center gap-3 p-8 md:p-10">
              <HeartHandshake className="size-7" />
              <h2 className="text-3xl font-extrabold">More than a game</h2>
              <p className="max-w-lg text-muted-foreground">
                Youth coaching, volunteering and matchday events — find out how you can be part of the league.
              </p>
              <span className="mt-2 flex items-center gap-1 font-display font-bold">
                Get involved <ArrowRight className="size-4" />
              </span>
            </div>
            <img
              src={images.youth}
              alt="Coach with children at a youth football session"
              loading="lazy"
              width={1200}
              height={912}
              className="h-60 w-full object-cover md:h-full"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

function QuickTile({
  to,
  icon,
  title,
  text,
  tone,
  span,
}: {
  to: "/news" | "/teams" | "/gallery";
  icon: React.ReactNode;
  title: string;
  text: string;
  tone: string;
  span: string;
}) {
  return (
    <Link
      to={to}
      className={`tile ${tone} tile-interactive fade-up group col-span-1 flex flex-col justify-between md:col-span-2 ${span} [&_svg]:size-6`}
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-card">{icon}</span>
      <div>
        <h3 className="text-2xl font-extrabold">{title}</h3>
        <p className="flex items-center justify-between opacity-75">
          {text}
          <ArrowRight className="size-4! transition-transform group-hover:translate-x-1" />
        </p>
      </div>
    </Link>
  );
}
