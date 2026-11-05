import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { images, type ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Riverside Community League" },
      { name: "description", content: "Photos from matchdays, fans and youth football across the Riverside Community League." },
      { property: "og:title", content: "Gallery — Riverside Community League" },
      { property: "og:description", content: "Photos from matchdays, fans and youth football across the Riverside Community League." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

type Photo = { img: ImageKey; caption: string; tag: "Matchday" | "Fans" | "Youth"; span: string };

const photos: Photo[] = [
  { img: "hero", caption: "Riverside on the attack against Hillcrest", tag: "Matchday", span: "md:col-span-4 md:row-span-2" },
  { img: "celebration", caption: "Celebrating a late winner", tag: "Matchday", span: "md:col-span-2" },
  { img: "fans", caption: "A sunny afternoon in the stands", tag: "Fans", span: "md:col-span-2" },
  { img: "youth", caption: "Saturday morning youth session", tag: "Youth", span: "md:col-span-3" },
  { img: "fans", caption: "Scarves up for the home side", tag: "Fans", span: "md:col-span-3" },
];

const tags = ["All", "Matchday", "Fans", "Youth"] as const;

function GalleryPage() {
  const [tag, setTag] = useState<(typeof tags)[number]>("All");
  const [active, setActive] = useState<Photo | null>(null);
  const list = photos.filter((p) => tag === "All" || p.tag === tag);

  return (
    <>
      <PageHeader eyebrow="Moments" title="Gallery" intro="The goals, the fans and the future of our league. Tap any photo to view it larger." />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={cn(
                "rounded-full border border-border bg-card px-4 py-2 font-display text-sm font-bold transition-colors hover:border-primary",
                tag === t && "border-transparent bg-primary",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6 grid auto-rows-[220px] gap-4 md:grid-cols-6">
          {list.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(p)}
              className={cn("tile tile-interactive group p-0", tag === "All" ? p.span : "md:col-span-3")}
            >
              <img
                src={images[p.img]}
                alt={p.caption}
                loading="lazy"
                width={1200}
                height={912}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 right-3 rounded-2xl bg-card/95 px-4 py-2 text-left text-sm font-semibold text-foreground">
                {p.caption}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-4xl overflow-hidden rounded-[1.75rem] p-0">
          {active && (
            <>
              <img src={images[active.img]} alt={active.caption} className="w-full object-cover" />
              <div className="px-6 pb-6">
                <p className="eyebrow text-sky-deep">{active.tag}</p>
                <DialogTitle className="mt-1 font-display text-xl font-extrabold">{active.caption}</DialogTitle>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
