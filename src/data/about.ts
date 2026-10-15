export type TimelineEntry = {
  date: string;
  title: string;
  description?: string;
  href?: string;
};

export const about = {
  bio: [
    "I'm a full stack developer in Houston, Texas, and a student at Bellaire High School. Right now I'm also a Solutions Engineer at a stealth AI startup.",
    "I've been shipping things on GitHub since 2021, starting with Discord bots and then 55GMS, a games, apps, and web proxy platform that's picked up hundreds of titles and around 600 forks. A lot of my smaller projects, like Lofi Radio and What Beats Paper, started as builds for Hack Club's High Seas.",
    "These days most of my time goes into agentic engineering and auth. Authometry is an OAuth 2.0 and OpenID Connect platform where every request is inspectable, with support for AI agent identities and an MCP server so agents can manage it too.",
  ],
  now: [
    {
      label: "Building",
      value: "Authometry, an inspectable OAuth 2.0 and OIDC platform",
    },
    { label: "Working", value: "Solutions Engineer at a stealth AI startup" },
    {
      label: "Learning",
      value: "Agentic engineering: MCP, agent identity, delegated auth",
    },
    { label: "Listening", value: "Troy Stone: Indian Paintbrushes" },
  ],
  // Newest first.
  timeline: [
    {
      date: "Aug 2026",
      title: "Solutions Engineer at a stealth AI startup",
      description: "Full-time, on-site in Houston.",
    },
    {
      date: "Jul 2026",
      title: "Launched Authometry",
      description:
        "OAuth you can see: an inspectable OAuth 2.0 and OpenID Connect platform, with a Homebrew CLI for config as code.",
      href: "https://authometry.jiayangchen.com",
    },
    {
      date: "Dec 2025",
      title: "Built Imposter",
      description:
        "The Imposter party game on the web, with no ads and a clean UI.",
      href: "https://imposter.jiayangchen.com",
    },
    {
      date: "Nov 2024",
      title: "Shipped a batch of projects for Hack Club High Seas",
      description:
        "Lofi Radio, What Beats Paper, Free GPT, Quick QR, Mini URL, and more.",
      href: "https://lofi.jiayangchen.com",
    },
    {
      date: "Feb 2024",
      title: "Open-sourced 55GMS",
      description:
        "Unblocked games, apps, and a web proxy. Now at around 150 stars and 600 forks.",
      href: "https://github.com/55gms/55GMS",
    },
    {
      date: "Dec 2022",
      title: "First version of 55GMS",
      description: "Started as a small site for unblocked apps and games.",
    },
    {
      date: "Aug 2021",
      title: "Joined GitHub",
      description: "First repos were Discord bots in Python and JavaScript.",
      href: "https://github.com/jiayangc1",
    },
  ] satisfies TimelineEntry[],
};
