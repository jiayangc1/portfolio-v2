import {
  BotMessageSquare,
  Clapperboard,
  Gamepad2,
  type LucideIcon,
  Megaphone,
  PiggyBank,
  QrCode,
  Radio,
  Scissors,
  ShieldCheck,
  VenetianMask,
} from "lucide-react";

// Optional fields (`year`, `overview`, `stack`, `source`, `screenshots`) are
// hidden on the project page when empty.
//
// `featured` projects (aim for ~4) are shown on the landing page and at the
// top of /projects; everything else is listed under "More" on /projects.
//
// Screenshots live in `public/projects/<slug>/` and are referenced by their
// public path, e.g. `/projects/authometry/dashboard.png`.

export type ProjectScreenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  href: string;
  Icon: LucideIcon;
  year?: string;
  overview?: string[];
  stack?: string[];
  source?: string;
  featured?: boolean;
  screenshots?: ProjectScreenshot[];
};

export const projects: Project[] = [
  {
    slug: "authometry",
    featured: true,
    name: "Authometry",
    description:
      "OAuth you can see — an inspectable OAuth 2.0 and OpenID Connect platform.",
    href: "https://authometry.jiayangchen.com",
    Icon: ShieldCheck,
    year: "2026",
    overview: [
      "Authometry is an OAuth 2.0 and OpenID Connect authorization platform built so you can see exactly what happened on every request. Each authorization gets a trace with secrets redacted and an explanation of what went wrong and how to fix it.",
      "It covers the standard flows (Authorization Code with mandatory PKCE, rotating refresh tokens with reuse detection, Client Credentials, Device Authorization) plus the agent side of auth: registered agent identities, DPoP-bound tokens, delegation grants, and token exchange.",
      "Everything can be managed from the dashboard, from Git as configuration as code through a Homebrew-installable CLI, or by an AI client through a built-in, OAuth-scoped MCP server.",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "Express",
      "PostgreSQL",
      "Docker",
      "pnpm workspaces",
      "MCP",
    ],
    source: "https://github.com/jiayangc1/authometry",
    screenshots: [
      {
        src: "/projects/authometry/home.webp",
        alt: "Authometry landing page with an interactive authorization trace",
      },
      {
        src: "/projects/authometry/docs.webp",
        alt: "Authometry documentation index",
      },
    ],
  },
  {
    slug: "55gms",
    featured: true,
    name: "55GMS",
    description:
      "Browser games, apps, and web proxy platform with hundreds of playable titles.",
    href: "https://55gms.com",
    Icon: Gamepad2,
    year: "2022",
    overview: [
      "55GMS is a website for unblocked games, apps, and web proxies, with hundreds of playable titles in the browser.",
      "It started as a small site in late 2022 and went open source under the 55gms org in 2024, where it's picked up around 150 stars and 600 forks. Anyone can self-host it on Render, Koyeb, Codespaces, or a VPS.",
    ],
    stack: ["JavaScript", "Node.js", "HTML", "CSS", "Web proxy"],
    source: "https://github.com/55gms/55GMS",
    screenshots: [
      {
        src: "/projects/55gms/home.webp",
        alt: "55GMS home page with search bar and quick links",
      },
      {
        src: "/projects/55gms/games.webp",
        alt: "55GMS games library grid",
      },
      {
        src: "/projects/55gms/apps.webp",
        alt: "55GMS apps library grid",
      },
    ],
  },
  {
    slug: "home-economy",
    featured: true,
    name: "Home Economy",
    description:
      "A finance app for families: pay each other, track transactions, and verify cash.",
    href: "https://github.com/Home-Economy/home-economy",
    Icon: PiggyBank,
    year: "2024",
    overview: [
      "Home Economy is a web app for running a household economy. Family members get a profile, a list of their transactions, and J-Pay for sending money to each other.",
      "A cash check screen verifies physical cash, and a companion POS system handles purchases.",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    screenshots: [
      {
        src: "/projects/home-economy/home.webp",
        alt: "Home Economy home screen showing the account balance",
        caption: "Shown with demo data",
      },
      {
        src: "/projects/home-economy/transactions.webp",
        alt: "Home Economy transactions table",
        caption: "Shown with demo data",
      },
      {
        src: "/projects/home-economy/jpay.webp",
        alt: "J-Pay screen for sending money to a family member",
      },
      {
        src: "/projects/home-economy/profile.webp",
        alt: "Home Economy profile with card details",
        caption: "Shown with demo data",
      },
    ],
  },
  {
    slug: "lofi-radio",
    featured: true,
    name: "Lofi Radio",
    description: "Listen to lofi 24/7, synced across every browser.",
    href: "https://lofi.jiayangchen.com",
    Icon: Radio,
    year: "2024",
    overview: [
      "A player that broadcasts lofi 24/7. It's synced, so everyone listening hears the same song at the same moment, driven by a playlist on the backend.",
      "Built for Hack Club's High Seas.",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    source: "https://github.com/jiayangc1/lofi-radio",
    screenshots: [
      {
        src: "/projects/lofi-radio/player.webp",
        alt: "Lofi Radio player showing the current track and listener count",
      },
    ],
  },
  {
    slug: "what-beats-paper",
    name: "What Beats Paper?",
    description: "Try to beat an LLM at guessing what beats the other.",
    href: "https://whatbeatspaper.jiayangchen.com",
    Icon: Scissors,
    year: "2024",
    overview: [
      "A take on What Beats Rock: name something that beats paper, then something that beats that, and keep the chain going.",
      "An LLM (Llama 3.2 via Groq) decides whether each answer actually wins. Built for Hack Club's High Seas.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Llama 3.2", "Groq"],
    source: "https://github.com/jiayangc1/whatbeatspaper",
    screenshots: [
      {
        src: "/projects/what-beats-paper/home.webp",
        alt: "What Beats Paper? prompt with an answer box",
      },
    ],
  },
  {
    slug: "imposter",
    name: "Imposter",
    description:
      "The Imposter party game on the web, with no ads and a clean UI.",
    href: "https://imposter.jiayangchen.com",
    Icon: VenetianMask,
    year: "2025",
    overview: [
      "A lightweight, client-side version of the Imposter party game. Pass one device around: it uses a word list and simple screens to run rounds and reveal roles.",
      "No ads, no accounts, just the game.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Radix UI",
      "tsParticles",
    ],
    source: "https://github.com/jiayangc1/Imposter",
    screenshots: [
      {
        src: "/projects/imposter/home.webp",
        alt: "Imposter start screen",
      },
      {
        src: "/projects/imposter/how-to-play.webp",
        alt: "Imposter how-to-play rules",
      },
      {
        src: "/projects/imposter/setup.webp",
        alt: "Imposter game settings for players, imposters, and categories",
      },
    ],
  },
  {
    slug: "free-gpt",
    name: "Free GPT",
    description: "A quick, free way to deploy your own AI chat.",
    href: "https://ai.jiayangchen.com",
    Icon: BotMessageSquare,
    year: "2024",
    overview: [
      "A free, open-source ChatGPT alternative. It sends prompts to open Llama models through Groq's free API and renders the replies in a clean chat UI.",
      "Easy to deploy yourself: swap in your own Groq key and serve the static files.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Llama", "Groq"],
    source: "https://github.com/jiayangc1/free-gpt",
    screenshots: [
      {
        src: "/projects/free-gpt/home.webp",
        alt: "Free GPT chat screen with suggested prompts",
      },
    ],
  },
  {
    slug: "gms-ads",
    name: "GMS Ads",
    description:
      "A self-hosted ad server and dashboard serving ads across every 55GMS domain.",
    href: "https://ads.ch3n.cc",
    Icon: Megaphone,
    year: "2026",
    overview: [
      "GMS Ads is the ad server and ad manager behind 55GMS. One script tag in the shared site template serves correctly sized ads on every 55GMS domain.",
      "Admins sign in with Authometry, upload creatives, run several weighted campaigns at once, and see impressions, clicks, CTR, and per-domain breakdowns. Browsers never talk to the ad server directly: an edge module on the 55GMS server serves from a cached manifest and reports stats back in hourly batches.",
    ],
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Express",
      "PostgreSQL",
      "Docker",
      "Authometry",
    ],
    source: "https://github.com/55gms/gms-ads",
    screenshots: [
      {
        src: "/projects/gms-ads/overview.webp",
        alt: "GMS Ads overview with impressions, clicks, and CTR",
      },
      {
        src: "/projects/gms-ads/campaigns.webp",
        alt: "GMS Ads campaigns table with weights and traffic share",
      },
      {
        src: "/projects/gms-ads/creatives.webp",
        alt: "GMS Ads creatives grouped by ad size",
      },
    ],
  },
  {
    slug: "gms-movies",
    name: "GMS Movies",
    description: "Watch movies, TV shows, and anime for free, without ads.",
    href: "https://movies.ch3n.cc",
    Icon: Clapperboard,
    year: "2024",
    overview: [
      "GMS Movies is a fast, clean way to find and watch movies and TV shows. It pulls trending and top-rated titles from TMDB and lets you search for anything else.",
      "It ships as part of 55GMS as its Media section.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "TMDB API"],
    source: "https://github.com/jiayangc1/gms-movies",
    screenshots: [
      {
        src: "/projects/gms-movies/home.webp",
        alt: "GMS Movies home page with search and trending titles",
      },
      {
        src: "/projects/gms-movies/movies.webp",
        alt: "GMS Movies top movies grid",
      },
      {
        src: "/projects/gms-movies/tv.webp",
        alt: "GMS Movies top TV shows grid",
      },
    ],
  },
  {
    slug: "quick-qr",
    name: "Quick QR",
    description: "A no-BS QR code generator.",
    href: "https://qr.ch3n.cc",
    Icon: QrCode,
    year: "2024",
    overview: [
      "Type a link or any text and get a QR code instantly, with buttons to download it or copy it to the clipboard. No sign-up, no tracking, no watermark.",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    source: "https://github.com/jiayangc1/quick-qr",
    screenshots: [
      {
        src: "/projects/quick-qr/home.webp",
        alt: "Quick QR generating a QR code for a URL",
      },
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const otherProjects = projects.filter((project) => !project.featured);

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
