import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { articles, formatDate, type Article } from "@/lib/league";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News — Riverside Community League" },
      { name: "description", content: "Match reports, club news and community stories from the Riverside Community League." },
      { property: "og:title", content: "News — Riverside Community League" },
      { property: "og:description", content: "Match reports, club news and community stories from the Riverside Community League." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsPage,
});

const categories = ["All", "Match report", "Club news", "Community", "League"] as const;

function NewsPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const list = articles.filter((a) => cat === "All" || a.category === cat);

  return (
    <>
      <PageHeader eyebrow="Latest" title="News" intro="Match reports, club updates and stories from around the league." />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-full border border-border bg-card px-4 py-2 font-display text-sm font-bold transition-colors hover:border-primary",
                cat === c && "border-transparent bg-primary",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-6 grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-6">
          {list.map((a, i) => (
            <ArticleTile key={a.slug} article={a} big={i === 0} />
          ))}
          {list.length === 0 && <div className="tile tile-soft md:col-span-6">No stories in this category yet.</div>}
        </div>
      </div>
    </>
  );
}

function ArticleTile({ article, big }: { article: Article; big: boolean }) {
  const img = article.image ? images[article.image] : null;
  return (
    <Link
      to="/news/$slug"
      params={{ slug: article.slug }}
      className={cn(
        "tile tile-interactive group flex flex-col p-0",
        big ? "md:col-span-4 md:row-span-2" : "md:col-span-2",
        !img && "tile-soft",
      )}
    >
      {img && (
        <img
          src={img}
          alt=""
          loading="lazy"
          width={1200}
          height={912}
          className={cn("w-full object-cover", big ? "h-72 md:h-96" : "h-44")}
        />
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-sky-deep">
          {article.category} · {formatDate(article.date)}
        </p>
        <h2 className={cn("mt-2 font-extrabold", big ? "text-3xl" : "text-lg")}>{article.title}</h2>
        <p className="mt-2 text-muted-foreground">{article.excerpt}</p>
        <span className="mt-auto flex items-center gap-1 pt-4 font-display text-sm font-bold">
          Read more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
