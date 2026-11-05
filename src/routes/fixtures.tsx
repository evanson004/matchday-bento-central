import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { MatchRow } from "@/components/site/MatchRow";
import { fixtures, teams } from "@/lib/league";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/fixtures")({
  head: () => ({
    meta: [
      { title: "Fixtures & Results — Riverside Community League" },
      { name: "description", content: "Upcoming matches and latest results for every club in the Riverside Community League." },
      { property: "og:title", content: "Fixtures & Results — Riverside Community League" },
      { property: "og:description", content: "Upcoming matches and latest results for every club in the Riverside Community League." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FixturesPage,
});

function FixturesPage() {
  const [view, setView] = useState<"upcoming" | "results">("upcoming");
  const [team, setTeam] = useState("all");

  const grouped = useMemo(() => {
    const list = fixtures
      .filter((f) => (view === "results" ? f.score : !f.score))
      .filter((f) => team === "all" || f.home === team || f.away === team);
    const map = new Map<number, typeof list>();
    for (const f of list) map.set(f.matchweek, [...(map.get(f.matchweek) ?? []), f]);
    const entries = [...map.entries()];
    return view === "results" ? entries.reverse() : entries;
  }, [view, team]);

  return (
    <>
      <PageHeader
        eyebrow="Matchday"
        title="Fixtures & results"
        intro="Every kick-off time and final score, all in one place. All times are local (EAT)."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex rounded-full bg-secondary p-1" role="tablist">
            {(["upcoming", "results"] as const).map((v) => (
              <button
                key={v}
                role="tab"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={cn(
                  "rounded-full px-5 py-2 font-display text-sm font-bold capitalize transition-colors hover:bg-card",
                  view === v && "bg-primary hover:bg-primary",
                )}
              >
                {v}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-3 text-sm font-semibold">
            Team
            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="h-10 rounded-full border border-border bg-card px-4 font-display font-bold outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All teams</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-8 space-y-10">
          {grouped.length === 0 && (
            <div className="tile tile-soft text-center">No matches found for this team.</div>
          )}
          {grouped.map(([mw, list]) => (
            <section key={mw}>
              <h2 className="mb-4 text-xl font-extrabold">Matchweek {mw}</h2>
              <div className="grid gap-3">
                {list.map((m) => (
                  <MatchRow key={m.id} match={m} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
