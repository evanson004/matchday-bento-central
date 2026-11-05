import { cn } from "@/lib/utils";

const tone = { W: "bg-win", D: "bg-draw", L: "bg-loss" } as const;

export function FormDots({ form }: { form: ("W" | "D" | "L")[] }) {
  return (
    <div className="flex gap-1">
      {form.map((r, i) => (
        <span
          key={i}
          title={r === "W" ? "Win" : r === "D" ? "Draw" : "Loss"}
          className={cn(
            "flex size-6 items-center justify-center rounded-full font-display text-[0.65rem] font-extrabold text-ink-foreground",
            tone[r],
          )}
        >
          {r}
        </span>
      ))}
    </div>
  );
}
