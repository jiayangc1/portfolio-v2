// TODO(Jiayang): entries marked "Placeholder" need your real gear. The rest
// were pulled from this repo and your usual stack — double-check them.

export type UsesItem = {
  name: string;
  description?: string;
  href?: string;
};

export type UsesGroup = {
  title: string;
  items: UsesItem[];
};

export const uses: UsesGroup[] = [
  {
    title: "Hardware",
    items: [
      { name: "Placeholder: computer", description: "Model, chip, memory." },
      { name: "Placeholder: display" },
      { name: "Placeholder: keyboard & mouse" },
    ],
  },
  {
    title: "Editor & Terminal",
    items: [
      { name: "Placeholder: editor", description: "Theme and font." },
      { name: "zsh", description: "Default macOS shell." },
      {
        name: "Claude Code",
        description: "AI pair programmer in the terminal.",
        href: "https://claude.com/claude-code",
      },
    ],
  },
  {
    title: "Stack",
    items: [
      { name: "React + Vite", description: "Frontends and SPAs." },
      { name: "Next.js", description: "This site." },
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
