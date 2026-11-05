import { cn } from "@/lib/utils";
import { teamById } from "@/lib/league";

const tones = ["bg-primary text-foreground", "bg-ink text-ink-foreground", "bg-secondary text-foreground"];

export function TeamBadge({
  teamId,
  size = "md",
  className,
}: {
  teamId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const team = teamById(teamId);
  const idx = team.short.charCodeAt(0) % tones.length;
  const sizes = {
    sm: "size-8 text-[0.6rem]",
    md: "size-11 text-xs",
    lg: "size-16 text-sm",
  };
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border-2 border-card font-display font-extrabold tracking-wide shadow-sm",
        tones[idx],
        sizes[size],
        className,
      )}
    >
      {team.short}
    </span>
  );
}
