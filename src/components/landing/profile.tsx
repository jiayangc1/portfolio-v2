import { site } from "@/lib/site";

export const Profile = () => {
  return (
    <div className="flex min-w-0 flex-row items-center gap-3 sm:gap-4">
      {/** biome-ignore lint/performance/noImgElement: img */}
      <img
        alt={`${site.name.full}, ${site.title}`}
        className="h-16 w-14 shrink-0 rounded-xl object-cover sm:h-22 sm:w-18 sm:rounded-2xl"
        src={site.assets.figure}
        width={site.assets.figureSize}
        height={site.assets.figureSize}
        fetchPriority="high"
      />
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="flex flex-row flex-wrap items-baseline gap-x-2 gap-y-0 tracking-tight">
          <span className="font-extrabold font-mono text-3xl sm:text-4xl">
            {site.name.first}
          </span>
          <span className="font-medium font-mono text-3xl text-muted-foreground sm:text-4xl">
            {site.name.last}
          </span>
        </h1>
        <p className="font-medium text-muted-foreground/80">{site.title}</p>
      </div>
    </div>
  );
};
