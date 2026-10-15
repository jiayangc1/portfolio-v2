// TODO(Jiayang): replace the placeholder copy below with your own.

export type TimelineEntry = {
  date: string;
  title: string;
  description?: string;
  href?: string;
};

export const about = {
  bio: [
    "I'm a full stack developer based in Houston, Texas. I've worked across frontends and backends, with a few IT infrastructure projects as well.",
    "Placeholder: how you got into building things, and what keeps you at it.",
    "Placeholder: what you care about when you build — e.g. fast, inspectable, no-nonsense software.",
  ],
  now: [
    { label: "Building", value: "Placeholder: what you're shipping right now" },
    {
      label: "Learning",
      value: "Placeholder: something new you're picking up",
    },
    { label: "Listening", value: "Placeholder: an album or artist on repeat" },
  ],
  // Newest first.
  timeline: [
    {
      date: "2026",
      title: "Placeholder: Launched Authometry",
      description: "An inspectable OAuth 2.0 and OpenID Connect platform.",
      href: "https://authometry.jiayangchen.com",
    },
    {
      date: "2025",
      title: "Placeholder: Launched Lofi Radio",
      description: "Lofi music 24/7, synced across browsers.",
      href: "https://lofi.jiayangchen.com",
    },
    {
      date: "20XX",
      title: "Placeholder: Started 55GMS",
      description: "Browser games, apps, and web proxy platform.",
      href: "https://55gms.com",
    },
  ] satisfies TimelineEntry[],
};
