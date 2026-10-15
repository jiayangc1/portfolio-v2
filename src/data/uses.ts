export type UsesItem = {
  name: string;
  description?: string;
  href?: string;
};

export type UsesGroup = {
  title: string;
  items: UsesItem[];
};

// Rendered as a neofetch-style terminal card.
export const machine = {
  user: "jiayang",
  host: "macbook-pro",
  specs: [
    ["OS", "macOS"],
    ["Host", "MacBook Pro"],
    ["Chip", "Apple M5"],
    ["Memory", "24 GB"],
    ["Disk", "1 TB"],
    ["Shell", "zsh"],
    ["Terminal", "iTerm2"],
    ["Agent", "Claude Code"],
  ],
} as const;

export const uses: UsesGroup[] = [
  {
    title: "Tools",
    items: [
      {
        name: "iTerm2",
        description: "Where everything happens.",
        href: "https://iterm2.com",
      },
      {
        name: "Claude Code",
        description: "AI pair programmer in the terminal.",
        href: "https://claude.com/claude-code",
      },
      {
        name: "GitHub CLI",
        description: "PRs, issues, and the API without leaving the shell.",
        href: "https://cli.github.com",
      },
    ],
  },
  {
    title: "Stack",
    items: [
      { name: "React + Vite", description: "Frontends and SPAs." },
      {
        name: "Next.js",
        description: "This site, and Authometry's dashboard.",
      },
      { name: "Node.js + Express", description: "APIs and backends." },
      { name: "PostgreSQL", description: "Default database." },
      { name: "Tailwind CSS", description: "Styling everywhere." },
    ],
  },
  {
    title: "Hosting & Infra",
    items: [
      {
        name: "Coolify",
        description: "Self-hosted deploys, including this site.",
        href: "https://coolify.io",
      },
      {
        name: "Cloudflare",
        description: "DNS, CDN, and edge.",
        href: "https://cloudflare.com",
      },
      {
        name: "BunnyCDN",
        description: "Media storage and delivery.",
        href: "https://bunny.net",
      },
    ],
  },
];
