import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 md:pt-14">
      <div className="tile tile-sky fade-up flex flex-col gap-6 p-8 md:flex-row md:items-end md:justify-between md:p-12">
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">{title}</h1>
          {intro && <p className="mt-4 text-lg opacity-80">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
