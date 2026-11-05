import { createFileRoute } from "@tanstack/react-router";
import { CalendarHeart, HandHeart, Sprout, Trophy } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/images";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Riverside Community League" },
      { name: "description", content: "Youth football, volunteering and community events with the Riverside Community League." },
      { property: "og:title", content: "Community — Riverside Community League" },
      { property: "og:description", content: "Youth football, volunteering and community events with the Riverside Community League." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommunityPage,
});

const programmes = [
  { icon: Sprout, title: "Youth academy", text: "Free weekly coaching for boys and girls aged 6–14 at every club." },
  { icon: HandHeart, title: "Volunteer", text: "Help on matchdays with stewarding, refreshments or first aid." },
  { icon: Trophy, title: "Women's football", text: "A growing women's division with open trials every term." },
];

const events = [
  { date: "21 Nov", title: "Youth open day", place: "Lakeview Grounds" },
  { date: "29 Nov", title: "Pitch clean-up morning", place: "Parkside Oval" },
  { date: "12 Dec", title: "End-of-year awards night", place: "Riverside Community Stadium" },
];

function CommunityPage() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      form.reset();
      toast.success("Thanks for getting in touch!", { description: "We'll reply within a few days." });
    }, 500);
  };

  return (
    <>
      <PageHeader eyebrow="Get involved" title="Community" intro="Football brings our neighbourhoods together. Here's how you can join in." />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mt-6 grid auto-rows-[minmax(200px,auto)] gap-4 md:grid-cols-6">
          <div className="tile relative p-0 md:col-span-3 md:row-span-2">
            <img
              src={images.youth}
              alt="Coach talking with children at a youth session"
              loading="lazy"
              width={1200}
              height={912}
              className="h-full min-h-72 w-full object-cover"
            />
          </div>

          {programmes.map((p, i) => (
            <div key={p.title} className={`tile ${i === 0 ? "tile-sky" : "tile-soft"} tile-interactive md:col-span-3 ${i > 0 ? "lg:col-span-3" : ""}`}>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-card">
                <p.icon className="size-6" />
              </span>
              <h2 className="mt-4 text-2xl font-extrabold">{p.title}</h2>
              <p className="mt-1 opacity-80">{p.text}</p>
            </div>
          ))}

          <div className="tile tile-ink md:col-span-3">
            <div className="flex items-center gap-2">
              <CalendarHeart className="size-5" />
              <p className="eyebrow opacity-70">Upcoming events</p>
            </div>
            <ul className="mt-4 space-y-3">
              {events.map((ev) => (
                <li key={ev.title} className="flex items-center gap-4">
                  <span className="w-16 shrink-0 rounded-2xl bg-primary px-2 py-2 text-center font-display text-sm font-black text-foreground">
                    {ev.date}
                  </span>
                  <span>
                    <span className="block font-display font-bold">{ev.title}</span>
                    <span className="text-sm opacity-70">{ev.place}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={onSubmit} className="tile md:col-span-6">
            <h2 className="text-2xl font-extrabold">Join in or ask a question</h2>
            <p className="mt-1 text-muted-foreground">Tell us how you'd like to be involved and we'll be in touch.</p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Field label="Your name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <label className="grid gap-1.5 text-sm font-semibold">
                I'm interested in
                <select name="interest" className="h-11 rounded-2xl border border-border bg-card px-4 outline-none focus:ring-2 focus:ring-ring">
                  <option>Youth academy</option>
                  <option>Volunteering</option>
                  <option>Women's football</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-semibold md:col-span-3">
                Message
                <textarea
                  name="message"
                  rows={4}
                  className="rounded-2xl border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
            </div>
            <Button type="submit" size="lg" className="mt-5" disabled={sending}>
              {sending ? "Sending…" : "Send message"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="h-11 rounded-2xl border border-border bg-card px-4 outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
