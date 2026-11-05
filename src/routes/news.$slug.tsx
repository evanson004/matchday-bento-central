import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { articles, formatDate } from "@/lib/league";
import { images } from "@/lib/images";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    const title = a ? `${a.title} — Riverside Community League` : "Story not found — Riverside Community League";
    const description = a?.excerpt ?? "This story could not be found.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(a ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-extrabold">Story not found</h1>
      <Link to="/news" className="mt-4 inline-block font-bold underline">
        Back to news
      </Link>
    </div>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const img = article.image ? images[article.image] : null;
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
      <Link to="/news" className="inline-flex items-center gap-1 font-display text-sm font-bold hover:underline">
        <ArrowLeft className="size-4" /> All news
      </Link>
      <p className="eyebrow mt-6 text-sky-deep">
        {article.category} · {formatDate(article.date, { year: "numeric" })}
      </p>
      <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">{article.title}</h1>
      <p className="mt-4 text-xl text-muted-foreground">{article.excerpt}</p>
      {img && (
        <img
          src={img}
          alt=""
          width={1200}
          height={912}
          className="mt-8 w-full rounded-[1.75rem] object-cover"
        />
      )}
      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        {article.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-extrabold">More stories</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {more.map((a) => (
            <Link key={a.slug} to="/news/$slug" params={{ slug: a.slug }} className="tile tile-soft tile-interactive">
              <p className="eyebrow text-sky-deep">{a.category}</p>
              <h3 className="mt-2 text-lg font-extrabold">{a.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
