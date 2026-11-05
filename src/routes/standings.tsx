import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { TeamBadge } from "@/components/site/TeamBadge";
import { FormDots } from "@/components/site/FormDots";
import { points, standings, teamById } from "@/lib/league";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/standings")({
  head: () => ({
    meta: [
      { title: "League Table — Riverside Community League" },
      { name: "description", content: "Current standings, points, goal difference and form for every Riverside Community League club." },
      { property: "og:title", content: "League Table — Riverside Community League" },
      { property: "og:description", content: "Current standings, points, goal difference and form for every Riverside Community League club." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StandingsPage,
});

function StandingsPage() {
  const leader = standings[0]!;
  const bestAttack = [...standings].sort((a, b) => b.gf - a.gf)[0]!;
  const bestDefence = [...standings].sort((a, b) => a.ga - b.ga)[0]!;

  return (
    <>
      <PageHeader eyebrow="Season 2026/27" title="League table" intro="Three points for a win, one for a draw. Ties are split by goal difference, then goals scored." />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Stat label="Leaders" value={teamById(leader.teamId).name} sub={`${points(leader)} points`} tone="tile-ink" />
          <Stat label="Best attack" value={teamById(bestAttack.teamId).name} sub={`${bestAttack.gf} goals scored`} tone="tile-soft" />
          <Stat label="Best defence" value={teamById(bestDefence.teamId).name} sub={`${bestDefence.ga} goals conceded`} tone="tile-soft" />
        </div>

        <div className="tile mt-4 overflow-x-auto p-0">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-secondary">
              <tr className="text-left">
                {["#", "Team", "P", "W", "D", "L", "GF", "GA", "GD", "Pts", "Form"].map((h) => (
                  <th
                    key={h}
                    className={cn(
                      "px-4 py-3 font-display font-extrabold",
                      !["#", "Team", "Form"].includes(h) && "text-center",
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {standings.map((s, i) => {
                const gd = s.gf - s.ga;
                return (
                  <tr key={s.teamId} className="border-t border-border transition-colors hover:bg-secondary/60">
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "flex size-7 items-center justify-center rounded-full font-display font-extrabold",
                          i === 0 && "bg-primary",
                        )}
                      >
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-3 font-display font-bold">
                        <TeamBadge teamId={s.teamId} size="sm" />
                        {teamById(s.teamId).name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">{s.played}</td>
                    <td className="px-4 py-3 text-center">{s.won}</td>
                    <td className="px-4 py-3 text-center">{s.drawn}</td>
                    <td className="px-4 py-3 text-center">{s.lost}</td>
                    <td className="px-4 py-3 text-center">{s.gf}</td>
                    <td className="px-4 py-3 text-center">{s.ga}</td>
                    <td className="px-4 py-3 text-center">{gd > 0 ? `+${gd}` : gd}</td>
                    <td className="px-4 py-3 text-center font-display text-base font-black">{points(s)}</td>
                    <td className="px-4 py-3">
                      <FormDots form={s.form} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value, sub, tone }: { label: string; value: string; sub: string; tone: string }) {
  return (
    <div className={`tile ${tone}`}>
      <p className="eyebrow opacity-70">{label}</p>
      <p className="mt-2 font-display text-2xl font-extrabold">{value}</p>
      <p className="opacity-70">{sub}</p>
    </div>
  );
}
