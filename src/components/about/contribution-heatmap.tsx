"use client";

import * as React from "react";
import type { ContributionDay } from "@/lib/github-contributions";
import { cn } from "@/lib/utils";

const levelClasses = [
  "bg-foreground/5",
  "bg-foreground/20",
  "bg-foreground/40",
  "bg-foreground/65",
  "bg-foreground/90",
] as const;

const parseDate = (date: string) => new Date(`${date}T00:00:00Z`);

const formatDay = (date: string) =>
  parseDate(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

const describe = ({ count, date }: ContributionDay) => {
  const amount =
    count === 0
      ? "No contributions"
      : `${count} contribution${count === 1 ? "" : "s"}`;
  return `${amount} on ${formatDay(date)}`;
};

type Week = (ContributionDay | null)[];

const toWeeks = (days: ContributionDay[]) => {
  const weeks: Week[] = [];
  if (days.length === 0) return weeks;

  // Pad the first week so every column starts on Sunday.
  let week: Week = Array(parseDate(days[0].date).getUTCDay()).fill(null);
  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    weeks.push([...week, ...Array(7 - week.length).fill(null)]);
  }
  return weeks;
};

const getMonthLabels = (weeks: Week[]) => {
  const labels: { index: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, index) => {
    const first = week.find((day) => day !== null);
    if (!first) return;
    const date = parseDate(first.date);
    const month = date.getUTCMonth();
    if (month !== lastMonth) {
      lastMonth = month;
      // Skip a leading partial month that would collide with the next label.
      if (index === 0 && date.getUTCDate() > 7) return;
      labels.push({
        index,
        label: date.toLocaleDateString("en-US", {
          month: "short",
          timeZone: "UTC",
        }),
      });
    }
  });
  return labels;
};

type Hovered = { text: string; x: number; y: number } | null;

export const ContributionHeatmap = ({
  days,
  total,
}: {
  days: ContributionDay[];
  total: number;
}) => {
  const weeks = React.useMemo(() => toWeeks(days), [days]);
  const months = React.useMemo(() => getMonthLabels(weeks), [weeks]);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = React.useState<Hovered>(null);

  React.useEffect(() => {
    const element = scrollRef.current;
    if (element) element.scrollLeft = element.scrollWidth;
  }, []);

  const onPointerOver = (event: React.PointerEvent<HTMLDivElement>) => {
    const cell = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-day]",
    );
    const container = scrollRef.current;
    if (!cell || !container) return setHovered(null);

    const cellRect = cell.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setHovered({
      text: cell.dataset.day ?? "",
      x: cellRect.left - containerRect.left + cellRect.width / 2,
      y: cellRect.top - containerRect.top,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <div
          ref={scrollRef}
          className="overflow-x-auto pb-1"
          onPointerOver={onPointerOver}
          onPointerLeave={() => setHovered(null)}
          onScroll={() => setHovered(null)}
        >
          <div className="inline-flex flex-col gap-1">
            <div
              aria-hidden
              className="relative h-4 font-mono text-[10px] text-foreground/40"
            >
              {months.map(({ index, label }) => (
                <span
                  key={`${index}-${label}`}
                  className="absolute top-0"
                  style={{ left: `calc(${index} * (0.625rem + 3px))` }}
                >
                  {label}
                </span>
              ))}
            </div>
            <div
              role="img"
              aria-label={`${total.toLocaleString("en-US")} GitHub contributions in the last year`}
              className="grid grid-flow-col grid-rows-7 gap-[3px]"
            >
              {weeks.flatMap((week, weekIndex) =>
                week.map((day, dayIndex) =>
                  day ? (
                    <div
                      key={day.date}
                      data-day={describe(day)}
                      className={cn(
                        "size-2.5 rounded-[2px]",
                        levelClasses[day.level] ?? levelClasses[0],
                      )}
                    />
                  ) : (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: padding cells have no identity
                      key={`pad-${weekIndex}-${dayIndex}`}
                      className="size-2.5"
                    />
                  ),
                ),
              )}
            </div>
          </div>
        </div>
        {hovered ? (
          <div
            role="tooltip"
            className="-translate-x-1/2 -translate-y-full pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-background text-xs"
            style={{ left: hovered.x, top: hovered.y - 6 }}
          >
            {hovered.text}
          </div>
        ) : null}
      </div>
      <div
        aria-hidden
        className="flex items-center justify-end gap-1 font-mono text-[10px] text-foreground/40"
      >
        <span className="mr-1">Less</span>
        {levelClasses.map((className) => (
          <span
            key={className}
            className={cn("size-2.5 rounded-[2px]", className)}
          />
        ))}
        <span className="ml-1">More</span>
      </div>
    </div>
  );
};
