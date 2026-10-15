import { cn } from "@/lib/utils";

type StatusSkeletonProps = {
  className?: string;
};

export const StatusSkeleton = ({ className }: StatusSkeletonProps) => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading status"
      className={cn(
        "flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-x-3 md:gap-y-1",
        className,
      )}
    >
      <span className="h-3.5 w-16 animate-pulse rounded-sm bg-foreground/7 [animation-delay:0ms]" />
      <span className="h-3.5 w-28 animate-pulse rounded-sm bg-foreground/7 [animation-delay:150ms]" />
      <span className="h-3.5 w-36 animate-pulse rounded-sm bg-foreground/7 [animation-delay:300ms] md:w-44" />
    </div>
  );
};
