import { createFileRoute } from "@tanstack/react-router";
import { MapPin, UserRound } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { TeamBadge } from "@/components/site/TeamBadge";
import { FormDots } from "@/components/site/FormDots";
import { points, standings, teams, type Team } from "@/lib/league";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/teams")({
  head: () => ({
    meta: [
      { title: "Teams — Riverside Community League" },
      { name: "description", content: "Meet the eight community clubs of the Riverside Community League: grounds, coaches and captains." },
      { property: "og:title", content: "Teams — Riverside Community League" },
      { property: "og:description", content: "Meet the eight community clubs of the Riverside Community League: grounds, coaches and captains." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeamsPage,
});

function TeamsPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      <PageHeader eyebrow="The clubs" title="Our teams" intro="Eight community clubs, one league. Tap a club to see more." />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teams.map((t, i) => (
            <TeamCard
              key={t.id}
              team={t}
              featured={i === 0}
              open={openId === t.id}
              onToggle={() => setOpenId(openId === t.id ? null : t.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function TeamCard({
  team,
  featured,
  open,
  onToggle,
}: {
  team: Team;
  featured: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  const pos = standings.findIndex((s) => s.teamId === team.id);
  const s = standings[pos]!;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className={cn(
        "tile tile-interactive flex flex-col gap-4 text-left",
        featured ? "tile-sky sm:col-span-2 lg:row-span-2" : "",
      )}
    >
      <div className="flex items-start justify-between">
        <TeamBadge teamId={team.id} size="lg" />
        <span className="rounded-full bg-secondary px-3 py-1 font-display text-xs font-extrabold">
          {pos + 1}
          {["st", "nd", "rd"][pos] ?? "th"} · {points(s)} pts
        </span>
      </div>
      <div>
        <h2 className={cn("font-extrabold", featured ? "text-3xl" : "text-xl")}>{team.name}</h2>
        <p className="text-sm opacity-70">Founded {team.founded}</p>
      </div>
      {(featured || open) && <p className="opacity-80">{team.about}</p>}
      <div className="mt-auto space-y-2 text-sm">
        <p className="flex items-center gap-2">
          <MapPin className="size-4" /> {team.ground}
        </p>
        <p className="flex items-center gap-2">
          <UserRound className="size-4" /> Coach {team.coach}
        </p>
        {(featured || open) && (
          <>
            <p className="flex items-center gap-2">
              <UserRound className="size-4" /> Captain {team.captain}
            </p>
            <div className="pt-2">
              <p className="eyebrow mb-2 opacity-70">Recent form</p>
              <FormDots form={s.form} />
            </div>
          </>
        )}
      </div>
    </button>
  );
}
