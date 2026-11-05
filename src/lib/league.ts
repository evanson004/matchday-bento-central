// Sample league content. Replace with the real league's data when available.

export const LEAGUE = {
  name: "Riverside Community League",
  short: "RCL",
  season: "2026/27",
  tagline: "Local football, played with heart.",
};

export type Team = {
  id: string;
  name: string;
  short: string;
  founded: number;
  ground: string;
  coach: string;
  captain: string;
  about: string;
};

export const teams: Team[] = [
  { id: "riv", name: "Riverside FC", short: "RIV", founded: 1984, ground: "Riverside Community Stadium", coach: "Daniel Otieno", captain: "Brian Mwangi", about: "Defending champions known for quick passing and a loud home crowd." },
  { id: "hil", name: "Hillcrest United", short: "HIL", founded: 1991, ground: "Hillcrest Park", coach: "Grace Wanjiru", captain: "Kevin Ochieng", about: "A hard-working side with the league's best defensive record last season." },
  { id: "lak", name: "Lakeview Athletic", short: "LAK", founded: 1978, ground: "Lakeview Grounds", coach: "Samuel Kiptoo", captain: "Ian Kamau", about: "The oldest club in the league, famous for its youth academy." },
  { id: "kil", name: "Kilima Stars", short: "KIL", founded: 2003, ground: "Kilima Arena", coach: "Faith Njeri", captain: "Moses Kibet", about: "Young, fearless and always entertaining to watch." },
  { id: "eas", name: "Eastgate City", short: "EAS", founded: 1996, ground: "Eastgate Field", coach: "Peter Mutua", captain: "Collins Wafula", about: "Built around a strong midfield and a tight-knit squad." },
  { id: "par", name: "Parkside Rovers", short: "PAR", founded: 1988, ground: "Parkside Oval", coach: "Joyce Akinyi", captain: "Dennis Owino", about: "A community club run almost entirely by volunteers." },
  { id: "wes", name: "Westfield Wanderers", short: "WES", founded: 2010, ground: "Westfield Common", coach: "Michael Korir", captain: "Allan Musyoka", about: "Newest members of the league, growing every season." },
  { id: "nor", name: "Northbridge Town", short: "NOR", founded: 1999, ground: "Northbridge Meadow", coach: "Esther Chebet", captain: "Victor Langat", about: "Rebuilding with a squad of local talent." },
];

export const teamById = (id: string) => teams.find((t) => t.id === id)!;

export type Standing = {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  form: ("W" | "D" | "L")[];
};

const raw: Omit<Standing, "played">[] = [
  { teamId: "riv", won: 7, drawn: 2, lost: 1, gf: 22, ga: 9, form: ["W", "W", "D", "W", "W"] },
  { teamId: "hil", won: 6, drawn: 3, lost: 1, gf: 19, ga: 10, form: ["W", "D", "W", "W", "D"] },
  { teamId: "lak", won: 6, drawn: 1, lost: 3, gf: 17, ga: 12, form: ["L", "W", "W", "L", "W"] },
  { teamId: "kil", won: 4, drawn: 3, lost: 3, gf: 14, ga: 13, form: ["D", "W", "L", "D", "W"] },
  { teamId: "eas", won: 3, drawn: 2, lost: 5, gf: 11, ga: 15, form: ["L", "L", "W", "D", "L"] },
  { teamId: "par", won: 2, drawn: 4, lost: 4, gf: 10, ga: 14, form: ["D", "D", "L", "W", "D"] },
  { teamId: "wes", won: 2, drawn: 1, lost: 7, gf: 9, ga: 19, form: ["L", "W", "L", "L", "L"] },
  { teamId: "nor", won: 0, drawn: 4, lost: 6, gf: 7, ga: 17, form: ["D", "L", "D", "L", "L"] },
];

export const points = (s: Pick<Standing, "won" | "drawn">) => s.won * 3 + s.drawn;

export const standings: Standing[] = raw
  .map((s) => ({ ...s, played: s.won + s.drawn + s.lost }))
  .sort(
    (a, b) =>
      points(b) - points(a) || b.gf - b.ga - (a.gf - a.ga) || b.gf - a.gf,
  );

export type Fixture = {
  id: string;
  matchweek: number;
  date: string; // ISO
  home: string;
  away: string;
  venue: string;
  score?: [number, number];
};

export const fixtures: Fixture[] = [
  // Matchweek 10 — results
  { id: "m10-1", matchweek: 10, date: "2026-10-31T15:00:00+03:00", home: "riv", away: "kil", venue: "Riverside Community Stadium", score: [3, 1] },
  { id: "m10-2", matchweek: 10, date: "2026-10-31T17:30:00+03:00", home: "hil", away: "par", venue: "Hillcrest Park", score: [1, 1] },
  { id: "m10-3", matchweek: 10, date: "2026-11-01T14:00:00+03:00", home: "lak", away: "wes", venue: "Lakeview Grounds", score: [2, 0] },
  { id: "m10-4", matchweek: 10, date: "2026-11-01T16:30:00+03:00", home: "nor", away: "eas", venue: "Northbridge Meadow", score: [0, 2] },
  // Matchweek 11 — upcoming
  { id: "m11-1", matchweek: 11, date: "2026-11-07T15:00:00+03:00", home: "hil", away: "riv", venue: "Hillcrest Park" },
  { id: "m11-2", matchweek: 11, date: "2026-11-07T17:30:00+03:00", home: "kil", away: "lak", venue: "Kilima Arena" },
  { id: "m11-3", matchweek: 11, date: "2026-11-08T14:00:00+03:00", home: "eas", away: "par", venue: "Eastgate Field" },
  { id: "m11-4", matchweek: 11, date: "2026-11-08T16:30:00+03:00", home: "wes", away: "nor", venue: "Westfield Common" },
  // Matchweek 12 — upcoming
  { id: "m12-1", matchweek: 12, date: "2026-11-14T15:00:00+03:00", home: "riv", away: "lak", venue: "Riverside Community Stadium" },
  { id: "m12-2", matchweek: 12, date: "2026-11-14T17:30:00+03:00", home: "par", away: "kil", venue: "Parkside Oval" },
  { id: "m12-3", matchweek: 12, date: "2026-11-15T14:00:00+03:00", home: "nor", away: "hil", venue: "Northbridge Meadow" },
  { id: "m12-4", matchweek: 12, date: "2026-11-15T16:30:00+03:00", home: "eas", away: "wes", venue: "Eastgate Field" },
];

export const results = fixtures.filter((f) => f.score);
export const upcoming = fixtures.filter((f) => !f.score);

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: "Match report" | "Club news" | "Community" | "League";
  date: string;
  image?: "hero" | "celebration" | "youth" | "fans";
};

export const articles: Article[] = [
  {
    slug: "riverside-extend-lead",
    title: "Riverside extend their lead at the top",
    excerpt: "A confident 3–1 win over Kilima Stars keeps the champions two points clear.",
    category: "Match report",
    date: "2026-11-01",
    image: "celebration",
    body: [
      "Riverside FC produced another composed performance at home, beating Kilima Stars 3–1 in front of a packed Riverside Community Stadium.",
      "Captain Brian Mwangi opened the scoring after twelve minutes, and although Kilima levelled before half-time, two second-half goals sealed the points.",
      "The result keeps Riverside two points clear of Hillcrest United ahead of next weekend's big meeting between the top two.",
    ],
  },
  {
    slug: "top-of-the-table-clash",
    title: "Preview: Hillcrest host Riverside in top-of-the-table clash",
    excerpt: "First against second at Hillcrest Park this Saturday — everything you need to know.",
    category: "League",
    date: "2026-11-04",
    image: "hero",
    body: [
      "Saturday's meeting between Hillcrest United and Riverside FC is the biggest game of the season so far.",
      "Hillcrest are unbeaten at home and have conceded just four goals at Hillcrest Park. Riverside have scored in every match this season.",
      "Kick-off is at 3:00pm. Gates open an hour before, and fans are encouraged to arrive early.",
    ],
  },
  {
    slug: "youth-academy-open-day",
    title: "Youth academy open day this month",
    excerpt: "Children aged 6–14 are invited to a free afternoon of football and coaching.",
    category: "Community",
    date: "2026-10-28",
    image: "youth",
    body: [
      "Our clubs are coming together for a free youth open day on Saturday 21 November at Lakeview Grounds.",
      "Qualified coaches will run fun sessions for boys and girls aged 6 to 14. No experience is needed — just bring boots or trainers and a water bottle.",
      "Parents can register at the gate on the day.",
    ],
  },
  {
    slug: "fans-of-the-month",
    title: "Parkside supporters named fans of the month",
    excerpt: "Their colourful away-day support at Hillcrest earned them October's award.",
    category: "Club news",
    date: "2026-10-30",
    image: "fans",
    body: [
      "The Parkside Rovers travelling support has been named the league's fans of the month for October.",
      "Over two hundred supporters made the trip to Hillcrest Park, and their singing could be heard throughout the 1–1 draw.",
    ],
  },
  {
    slug: "lakeview-new-signing",
    title: "Lakeview Athletic welcome new striker",
    excerpt: "Former academy player Ian Kamau returns to captain his boyhood club.",
    category: "Club news",
    date: "2026-10-22",
    body: [
      "Lakeview Athletic have confirmed the return of Ian Kamau, who came through the club's academy before moving away for three seasons.",
      "Kamau has already scored twice since returning and has been handed the captain's armband.",
    ],
  },
  {
    slug: "volunteers-needed",
    title: "Matchday volunteers needed for the second half of the season",
    excerpt: "Help with stewarding, refreshments and first aid at your local ground.",
    category: "Community",
    date: "2026-10-18",
    body: [
      "Every match in the league relies on volunteers. We're looking for people to help with stewarding, refreshments, ticketing and first aid.",
      "No experience is necessary and full training is provided. Sign up through the Community page.",
    ],
  },
];

export const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions = {}) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "Africa/Nairobi",
    ...opts,
  });

export const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Nairobi",
  });
