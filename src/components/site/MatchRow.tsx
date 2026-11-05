import { MapPin } from "lucide-react";
import { formatDate, formatTime, teamById, type Fixture } from "@/lib/league";
import { TeamBadge } from "./TeamBadge";

export function MatchRow({ match }: { match: Fixture }) {
  const home = teamById(match.home);
  const away = teamById(match.away);
  const played = !!match.score;

  return (
    <div className="tile tile-interactive grid gap-4 p-5 md:grid-cols-[140px_1fr_200px] md:items-center">
      <div className="text-sm">
        <p className="font-display font-extrabold">
          {formatDate(match.date, { weekday: "short" })}
        </p>
        <p className="text-muted-foreground">
          {played ? "Full time" : formatTime(match.date)}
        </p>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="flex items-center justify-end gap-3 text-right">
          <span className="font-display font-bold">{home.name}</span>
          <TeamBadge teamId={home.id} size="sm" />
        </div>
        <div className="min-w-20 rounded-full bg-secondary px-4 py-1.5 text-center font-display text-lg font-black">
          {played ? `${match.score![0]} – ${match.score![1]}` : "vs"}
        </div>
        <div className="flex items-center gap-3">
          <TeamBadge teamId={away.id} size="sm" />
          <span className="font-display font-bold">{away.name}</span>
        </div>
      </div>

      <p className="flex items-center gap-1.5 text-sm text-muted-foreground md:justify-end">
        <MapPin className="size-4" />
        {match.venue}
      </p>
    </div>
  );
}
