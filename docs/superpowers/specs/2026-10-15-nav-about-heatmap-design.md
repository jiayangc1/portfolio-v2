# Nav + About page + GitHub heatmap — Design

Date: 2026-10-15
Status: Approved in chat, pending spec review

## Context

The portfolio (Next 16, App Router) is currently a single landing page with no
navigation. The goal is a multi-page portfolio: About, Projects, Blog, Uses.
That work is split into separate specs, in this order:

1. **Nav + About + GitHub heatmap** (this spec)
2. Projects (index + detail pages from `projects-data.ts`)
3. Uses
4. Blog (MDX, RSS, sitemap, OG images)

The existing visual language stays: `PageShell` hairline grid, `ContentBox`
sections with mono side labels, dark theme, Geist Sans/Mono.

## Goals

- Visitors can move between pages via a persistent top nav and a ⌘K menu.
- An `/about` page with bio, "Now", GitHub stats + contribution heatmap, and a
  timeline.
- Heatmap data comes from a third-party JSON API (no GitHub token).

## Non-goals

- Projects, Uses, Blog pages (later specs).
- Light theme.
- Private contribution data.

## 1. Navigation

### Config

Add to `src/lib/site.ts`:

```ts
nav: [
  { label: "about", href: "/about" },
] as const,
```

Each later spec appends its page here when the page ships. Only routes that
exist are listed, so there are never dead links.

### `SiteNav` (`src/components/layout/site-nav.tsx`)

- Rendered inside the existing top spacer `ContentBox position="first"`
  (replacing the empty box on the landing page; same box on every page).
- Left: `jiayang chen` (mono, lowercase) linking to `/`.
- Right: mono links from `site.nav`; the active route (via `usePathname`) is
  `text-foreground`, others `text-foreground/50` with hover to full.
- Far right: a `⌘K` button (desktop shows `⌘K` kbd hint; mobile shows a
  search/command icon) that opens the command menu.
- Mobile: the link row is a single line with `overflow-x-auto`, no wrapping.

### `CommandMenu` (`src/components/layout/command-menu.tsx`)

- Uses the existing shadcn `command.tsx` (cmdk) in a `CommandDialog`.
- Global shortcut: ⌘K / Ctrl+K toggles it.
- Groups: **Pages** (Home + `site.nav`) → `router.push`; **Connect**
  (`site.social`) → open in new tab.
- Client component; `SiteNav` owns the open state.

### Shared shell

Add a `SitePage` wrapper (in `shell.tsx`) = `PageShell` + top `ContentBox`
containing `SiteNav`. `LandingPage` and `/about` both use it. The landing page
content is otherwise unchanged.

## 2. About page (`/about`)

Route: `src/app/about/page.tsx` (server component), metadata via
`createMetadata({ title: "About · Jiayang Chen", description: ... })`.

Sections, each a `ContentBox` with a side `label`:

| Label    | Content                                                    |
|----------|------------------------------------------------------------|
| About    | Page heading + bio paragraphs rendered with `Prose`        |
| Now      | Short list: building / learning / listening                |
| GitHub   | Stats row + heatmap (see §3)                               |
| Timeline | Vertical list of entries, newest first                     |

The last section is `position="last"`, followed by the existing `Signature`.

### Content data (`src/data/about.ts`)

```ts
export const about = {
  bio: string[],                       // paragraphs
  now: { label: string; value: string }[],
  timeline: { date: string; title: string; description?: string; href?: string }[],
};
```

Seeded with placeholder text clearly marked for the owner to replace.
Components live in `src/components/about/` (`bio.tsx`, `now.tsx`,
`timeline.tsx`, `github-activity.tsx`, `contribution-heatmap.tsx`).

## 3. GitHub heatmap

### Data (`src/lib/github-contributions.ts`)

- Fetch `https://github-contributions-api.jogruber.de/v4/jiayangc1?y=last`
  with `next: { revalidate: 86400 }`. Username derived from `site.social`'s
  GitHub href.
- Response shape (verified 2026-10-15):
  `{ total: { lastYear: number }, contributions: { date: "YYYY-MM-DD", count: number, level: 0-4 }[] }`
- Returns `{ total, days, currentStreak, longestStreak } | null`. `null` on
  network error, non-2xx, or unexpected shape (validated minimally).
- Streaks computed from `days` sorted by date. Current streak counts back from
  today; if today has 0 contributions, it counts back from yesterday (so the
  streak doesn't read 0 early in the day).

### Rendering

- `GithubActivity` (server, async) calls the fetcher and renders:
  - Stats row: **Contributions (last year)**, **Current streak**, **Longest
    streak** — mono numbers, muted labels.
  - `ContributionHeatmap` with the days.
- `ContributionHeatmap`: CSS grid, 7 rows (Sun–Sat) × N week columns, days
  padded so the first column starts on Sunday. Cell color = `level` mapped to
  5 foreground opacities (`foreground/5`, `/20`, `/40`, `/65`, `/90`). Month
  labels above, a small Less→More legend below.
- Tooltip on hover: "12 contributions on Mar 4, 2026" (singular for 1, "No
  contributions" for 0). Implemented as one shared, absolutely positioned
  tooltip in a client component that tracks the hovered cell via event
  delegation on the grid (not 365 Radix tooltip instances). Styled to match
  the shadcn tooltip.
- Narrow screens: the grid scrolls horizontally inside its box
  (`overflow-x-auto`), scrolled to the most recent week on mount.
- Accessibility: grid has `role="img"` and an `aria-label` summarizing the
  total; cells are not individually tab-stoppable.

### Error handling

If the fetcher returns `null`, the GitHub section shows: "Couldn't load
contributions right now." plus a link to the GitHub profile. The rest of the
page renders normally. Wrapped in `Suspense` with a skeleton grid so the page
shell isn't blocked by the fetch.

## 4. SEO / discoverability

- `sitemap.ts`: pages list becomes `["/", ...site.nav.map(n => n.href)]`.
- `public/llms.txt`: add an About link.
- About page uses `createMetadata`; canonical via existing helpers.

## Testing

Per the owner's instructions, no tests are written or run. Verification is
`next build` and `biome check` passing.

## Open items for the owner

- Replace placeholder bio, "Now", and timeline content in `src/data/about.ts`.
