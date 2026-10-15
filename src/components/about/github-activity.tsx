import { ContributionHeatmap } from "@/components/about/contribution-heatmap";
import { getContributions, githubProfileUrl } from "@/lib/github-contributions";

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5">
    <span className="font-medium font-mono text-foreground text-xl">
      {value}
    </span>
    <span className="text-foreground/50 text-xs">{label}</span>
  </div>
);

const days = (count: number) => `${count} day${count === 1 ? "" : "s"}`;

export const GithubActivity = async () => {
  const contributions = await getContributions();

  if (!contributions) {
    return (
      <p className="text-foreground/60 text-sm">
        Couldn&apos;t load contributions right now.{" "}
        <a
          href={githubProfileUrl}
          target="_blank"
          rel="me noopener noreferrer"
          className="text-foreground underline underline-offset-4"
        >
          See my GitHub profile
        </a>
        .
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <Stat
          label="Contributions (last year)"
          value={contributions.total.toLocaleString("en-US")}
        />
        <Stat
          label="Current streak"
          value={days(contributions.currentStreak)}
        />
        <Stat
          label="Longest streak"
          value={days(contributions.longestStreak)}
        />
      </div>
      <ContributionHeatmap
        days={contributions.days}
        total={contributions.total}
      />
    </div>
  );
};

export const GithubActivitySkeleton = () => (
  <div aria-hidden className="flex flex-col gap-6">
    <div className="flex gap-10">
      {[0, 1, 2].map((key) => (
        <div key={key} className="flex flex-col gap-1.5">
          <div className="h-6 w-16 animate-pulse rounded bg-foreground/10" />
          <div className="h-3 w-24 animate-pulse rounded bg-foreground/5" />
        </div>
      ))}
    </div>
    <div className="h-[calc(1rem+7*0.625rem+6*3px+4px)] w-full animate-pulse rounded-md bg-foreground/5" />
  </div>
);
