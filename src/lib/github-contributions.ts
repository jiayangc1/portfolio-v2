import { site } from "@/lib/site";

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type Contributions = {
  total: number;
  days: ContributionDay[];
  currentStreak: number;
  longestStreak: number;
};

const githubHref = site.social.find((link) => link.label === "GitHub")?.href;
export const githubUsername = githubHref?.split("/").pop() ?? "";
export const githubProfileUrl = githubHref ?? "https://github.com";

const isDay = (value: unknown): value is ContributionDay => {
  const day = value as ContributionDay;
  return (
    typeof day?.date === "string" &&
    typeof day.count === "number" &&
    typeof day.level === "number"
  );
};

const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);

const getStreaks = (days: ContributionDay[]) => {
  let longest = 0;
  let run = 0;
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }

  // Don't break the current streak just because today has no commits yet.
  const today = toIsoDate(new Date());
  let index = days.length - 1;
  while (index >= 0 && days[index].date > today) index--;
  if (index >= 0 && days[index].date === today && days[index].count === 0) {
    index--;
  }

  let current = 0;
  while (index >= 0 && days[index].count > 0) {
    current++;
    index--;
  }

  return { current, longest };
};

export async function getContributions(): Promise<Contributions | null> {
  if (!githubUsername) return null;

  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`,
      { next: { revalidate: 86400 } },
    );
    if (!response.ok) return null;

    const data = await response.json();
    const total = data?.total?.lastYear;
    const days = data?.contributions;
    if (
      typeof total !== "number" ||
      !Array.isArray(days) ||
      !days.every(isDay)
    ) {
      return null;
    }

    const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
    const { current, longest } = getStreaks(sorted);

    return {
      total,
      days: sorted,
      currentStreak: current,
      longestStreak: longest,
    };
  } catch {
    return null;
  }
}
