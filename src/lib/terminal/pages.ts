import { techStack } from "@/components/landing/tech/tech-stack";
import { about } from "@/data/about";
import { formatPostDate, getPost, posts } from "@/data/posts";
import {
  featuredProjects,
  getProject,
  otherProjects,
  type Project,
} from "@/data/projects";
import {
  type ContributionDay,
  getContributions,
  githubProfileUrl,
} from "@/lib/github-contributions";
import { site } from "@/lib/site";
import {
  c,
  displayUrl,
  link,
  list,
  MARGIN,
  padEnd,
  section,
  WIDTH,
  wrap,
} from "@/lib/terminal/ansi";

const host = displayUrl(site.url);

// Three-row block letters (figlet "future"), just the ones the name needs.
const glyphs: Record<string, [string, string, string]> = {
  a: ["┏━┓", "┣━┫", "╹ ╹"],
  c: ["┏━╸", "┃  ", "┗━╸"],
  e: ["┏━╸", "┣╸ ", "┗━╸"],
  g: ["┏━╸", "┃╺┓", "┗━┛"],
  h: ["╻ ╻", "┣━┫", "╹ ╹"],
  i: ["╻", "┃", "╹"],
  j: ["  ╻", "  ┃", "┗━┛"],
  n: ["┏┓╻", "┃┗┫", "╹ ╹"],
  y: ["╻ ╻", "┗┳┛", " ╹ "],
};

const bigText = (word: string) =>
  [0, 1, 2].map((row) =>
    [...word.toLowerCase()].map((letter) => glyphs[letter][row]).join(""),
  );

const banner = () => {
  const first = bigText(site.name.first);
  const last = bigText(site.name.last);
  const cursor = ["", "", c.blink("▁")];
  return [
    "",
    ...first.map(
      (row, i) => `${MARGIN}${c.title(row)}  ${c.dim(last[i])}${cursor[i]}`,
    ),
    "",
    `${MARGIN}${c.text(site.title)} ${c.faint("·")} ${c.muted(site.location.label)}`,
  ];
};

const featured = () => {
  const bar = c.lime("▌");
  const text =
    "OAuth you can see. Inspect every OAuth 2.0 and OIDC request.".split(" ");
  const half = Math.ceil(text.length / 2);
  return [
    "",
    `${MARGIN}${bar} ${c.title("Authometry")}${c.lime("_")}  ${c.text(text.slice(0, half).join(" "))}`,
    `${MARGIN}${bar}              ${c.text(text.slice(half).join(" "))}`,
    `${MARGIN}${bar}              ${c.lime(link("https://authometry.jiayangchen.com"))} ${c.lime("↗")}`,
  ];
};

const projectEntry = (project: Project, { hint = false } = {}) => {
  const year = project.year ?? "";
  const heading = `${c.lime("▸")} ${c.title(project.name)}`;
  return [
    MARGIN + padEnd(heading, WIDTH - year.length) + c.dim(year),
    ...wrap(project.description, { indent: "  " }),
    `${MARGIN}  ${c.muted(link(project.href))}`,
    ...(hint
      ? [`${MARGIN}  ${c.faint(`$ curl ${host}/projects/${project.slug}`)}`]
      : []),
    "",
  ];
};

const commands = (entries: [string, string][]) => {
  const width = Math.max(...entries.map(([path]) => path.length));
  return entries.map(
    ([path, label]) =>
      `${MARGIN}${c.lime("$")} ${c.text(`curl ${host}`)}${c.title(path.padEnd(width))}  ${c.dim(label)}`,
  );
};

const footer = (entries: [string, string][]) => [
  ...section("more"),
  ...commands(entries),
  "",
  `${MARGIN}${c.dim("or open")} ${c.muted(link(site.url))} ${c.dim("in a browser.")}`,
  "",
];

const socials = () => {
  const width = Math.max(...site.social.map((social) => social.label.length));
  return site.social.map(
    (social) =>
      `${MARGIN}${c.muted(social.label.toLowerCase().padEnd(width))}   ${c.text(link(social.href))}`,
  );
};

const home = () => [
  ...banner(),
  ...featured(),
  ...section("bio"),
  ...wrap(
    `I'm ${site.name.full}, a ${site.title} based in ${site.location.label}.`,
  ),
  "",
  ...wrap(
    "I build web apps like Authometry, an inspectable OAuth platform; 55GMS, a browser games and web proxy platform; and Home Economy, a finance app for families.",
  ),
  ...section("stack"),
  ...list(techStack.map((tech) => tech.name)),
  ...section("projects"),
  ...featuredProjects.flatMap((project) => projectEntry(project)),
  ...section("links"),
  ...socials(),
  ...footer([
    ["/about", "bio, timeline, github activity"],
    ["/projects", "everything I've built"],
    ["/blog", "posts"],
    ["/help", "all commands"],
  ]),
];

const heatmapShades = [
  c.faint,
  (text: string) => `\x1b[38;5;241m${text}\x1b[0m`,
  c.muted,
  (text: string) => `\x1b[38;5;250m${text}\x1b[0m`,
  (text: string) => `\x1b[38;5;255m${text}\x1b[0m`,
];

const heatmap = (days: ContributionDay[]) => {
  // One column per week, Sunday on top, like GitHub. Fit the newest weeks.
  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = Array(
    new Date(`${days[0].date}T00:00:00Z`).getUTCDay(),
  ).fill(null);
  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);
  const visible = weeks.slice(-(WIDTH - 4));

  let months = "";
  let lastMonth = -1;
  visible.forEach((column, index) => {
    const first = column.find(Boolean);
    if (!first) return;
    const date = new Date(`${first.date}T00:00:00Z`);
    if (date.getUTCMonth() === lastMonth) return;
    lastMonth = date.getUTCMonth();
    const label = date.toLocaleDateString("en-US", {
      month: "short",
      timeZone: "UTC",
    });
    const fits = index >= (months ? months.length + 1 : 0);
    if (fits && index + label.length <= visible.length) {
      months = months.padEnd(index) + label;
    }
  });

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];
  return [
    `${MARGIN}    ${c.dim(months)}`,
    ...dayLabels.map(
      (label, row) =>
        MARGIN +
        c.dim(label.padEnd(4)) +
        visible
          .map((column) => {
            const day = column[row];
            return day ? heatmapShades[day.level]("■") : " ";
          })
          .join(""),
    ),
    `${MARGIN}${" ".repeat(WIDTH - 18)}${c.dim("less")} ${heatmapShades.map((shade) => shade("■")).join("")} ${c.dim("more")}`,
  ];
};

const aboutPage = async () => {
  const contributions = await getContributions();
  const labelWidth = Math.max(...about.now.map((item) => item.label.length));
  const plural = (count: number) => `${count} day${count === 1 ? "" : "s"}`;

  return [
    ...banner(),
    ...section("about"),
    ...about.bio.flatMap((paragraph, i) => [
      ...(i ? [""] : []),
      ...wrap(paragraph),
    ]),
    ...section("now"),
    ...about.now.flatMap((item) =>
      wrap(item.value, { indent: " ".repeat(labelWidth + 3) }).map((line, i) =>
        i === 0
          ? `${MARGIN}${c.muted(item.label.toLowerCase().padEnd(labelWidth))}   ${line.trimStart()}`
          : line,
      ),
    ),
    ...section("github"),
    ...(contributions
      ? [
          `${MARGIN}${c.title(contributions.total.toLocaleString("en-US"))} ${c.dim("contributions in the last year")}`,
          `${MARGIN}${c.title(plural(contributions.currentStreak))} ${c.dim("current streak")}   ${c.title(plural(contributions.longestStreak))} ${c.dim("longest streak")}`,
          "",
          ...heatmap(contributions.days),
        ]
      : [
          `${MARGIN}${c.dim("Couldn't load contributions right now:")} ${c.muted(link(githubProfileUrl))}`,
        ]),
    ...section("timeline"),
    ...about.timeline.flatMap((entry) => [
      `${MARGIN}${c.dim(entry.date.padEnd(10))}${c.lime("●")} ${c.title(entry.title)}`,
      ...(entry.description
        ? wrap(entry.description, { indent: " ".repeat(12), paint: c.muted })
        : []),
      ...(entry.href
        ? [`${MARGIN}${" ".repeat(12)}${c.dim(link(entry.href))}`]
        : []),
      "",
    ]),
    ...section("links"),
    ...socials(),
    ...footer([
      ["", "home"],
      ["/projects", "everything I've built"],
      ["/blog", "posts"],
    ]),
  ];
};

const projectsPage = () => [
  ...banner(),
  ...section("featured"),
  ...featuredProjects.flatMap((project) =>
    projectEntry(project, { hint: true }),
  ),
  ...section("more"),
  ...otherProjects.flatMap((project) => projectEntry(project, { hint: true })),
  ...footer([
    ["", "home"],
    ["/about", "bio, timeline, github activity"],
    ["/blog", "posts"],
  ]),
];

const projectPage = (project: Project) => [
  "",
  `${MARGIN}${c.dim(`${host}/projects/`)}${c.title(project.slug)}`,
  "",
  MARGIN +
    padEnd(
      `${c.lime("▸")} ${c.title(project.name)}`,
      WIDTH - (project.year ?? "").length,
    ) +
    c.dim(project.year ?? ""),
  ...wrap(project.description, { indent: "  ", paint: c.muted }),
  ...(project.overview?.length
    ? [
        ...section("overview"),
        ...project.overview.flatMap((paragraph, i) => [
          ...(i ? [""] : []),
          ...wrap(paragraph),
        ]),
      ]
    : []),
  ...(project.stack?.length
    ? [...section("stack"), ...list(project.stack)]
    : []),
  ...section("links"),
  `${MARGIN}${c.muted("live  ")}  ${c.text(link(project.href))}`,
  ...(project.source
    ? [`${MARGIN}${c.muted("source")}  ${c.text(link(project.source))}`]
    : []),
  ...(project.screenshots?.length
    ? [
        `${MARGIN}${c.muted("shots ")}  ${c.text(link(`${site.url}/projects/${project.slug}`))} ${c.dim(`(${project.screenshots.length})`)}`,
      ]
    : []),
  ...footer([
    ["/projects", "all projects"],
    ["", "home"],
  ]),
];

const blogPage = () => [
  ...banner(),
  ...section("blog"),
  ...posts.flatMap((post) => [
    `${MARGIN}${c.dim(formatPostDate(post.date))}`,
    `${MARGIN}${c.lime("▸")} ${c.title(post.title)}`,
    ...wrap(post.description, { indent: "  ", paint: c.muted }),
    `${MARGIN}  ${c.faint(`$ curl ${host}/blog/${post.slug}`)}`,
    "",
  ]),
  ...footer([
    ["", "home"],
    ["/projects", "everything I've built"],
    [`/blog/rss.xml`, "rss feed"],
  ]),
];

const postPage = (post: (typeof posts)[number]) => [
  "",
  `${MARGIN}${c.dim(formatPostDate(post.date))}`,
  `${MARGIN}${c.title(post.title)}`,
  "",
  ...wrap(post.description, { paint: c.muted }),
  "",
  `${MARGIN}${c.dim("Posts are MDX, so they read best in a browser:")}`,
  `${MARGIN}${c.lime("→")} ${c.text(link(`${site.url}/blog/${post.slug}`))}`,
  ...footer([
    ["/blog", "all posts"],
    ["", "home"],
  ]),
];

const helpPage = () => [
  "",
  `${MARGIN}${c.title(host)} ${c.dim("in your terminal")}`,
  "",
  ...commands([
    ["", "home"],
    ["/about", "bio, now, timeline, github activity"],
    ["/projects", "every project"],
    ["/projects/<slug>", "one project in detail"],
    ["/blog", "posts"],
    ["/help", "this page"],
  ]),
  "",
  `${MARGIN}${c.dim("Add")} ${c.text("?plain")} ${c.dim("to any page to drop the colors.")}`,
  "",
];

const notFound = (path: string) => [
  "",
  `${MARGIN}${c.lime("404")} ${c.dim("·")} ${c.text(`nothing at ${path}`)}`,
  "",
  ...commands([
    ["", "home"],
    ["/help", "all commands"],
  ]),
  "",
];

export type TerminalPage = { lines: string[]; status: number };

export const renderTerminalPage = async (
  segments: string[],
): Promise<TerminalPage> => {
  const [page, slug, ...rest] = segments;
  const ok = (lines: string[]) => ({ lines, status: 200 });

  if (rest.length === 0) {
    if (!page) return ok(home());
    if (!slug && page === "about") return ok(await aboutPage());
    if (!slug && page === "help") return ok(helpPage());
    if (page === "projects") {
      if (!slug) return ok(projectsPage());
      const project = getProject(slug);
      if (project) return ok(projectPage(project));
    }
    if (page === "blog") {
      if (!slug) return ok(blogPage());
      const post = getPost(slug);
      if (post) return ok(postPage(post));
    }
  }

  return { lines: notFound(`/${segments.join("/")}`), status: 404 };
};

/** Joins page lines, collapsing the double blanks where sections meet. */
export const toText = (lines: string[]) =>
  `${lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd()}\n\n`;
