import { machine } from "@/data/uses";

const appleLogo = `                    'c.
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
.MMMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
 .XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  .XMMMMMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       .cooc,.    .,coo:.`;

const swatches = [
  "bg-foreground/10",
  "bg-red-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-blue-400",
  "bg-purple-400",
  "bg-cyan-400",
  "bg-foreground/80",
];

export const FetchCard = () => {
  const title = `${machine.user}@${machine.host}`;

  return (
    <figure className="overflow-hidden rounded-lg border border-foreground/10 bg-foreground/[0.03] font-mono text-xs">
      <div className="flex items-center gap-1.5 border-foreground/10 border-b px-3 py-2">
        <span className="size-2.5 rounded-full bg-red-400/70" />
        <span className="size-2.5 rounded-full bg-yellow-400/70" />
        <span className="size-2.5 rounded-full bg-green-400/70" />
        <span className="ml-2 text-foreground/40">{title} — zsh</span>
      </div>
      <div className="flex flex-col gap-4 overflow-x-auto p-4 sm:flex-row sm:items-start sm:gap-6">
        <pre
          aria-hidden
          className="hidden shrink-0 text-[9px] text-foreground/50 leading-[1.15] sm:block"
        >
          {appleLogo}
        </pre>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="text-foreground/40">
            <span className="text-green-400">❯</span> fastfetch
          </p>
          <p className="font-semibold text-foreground">{title}</p>
          <p aria-hidden className="text-foreground/30">
            {"-".repeat(title.length)}
          </p>
          <dl className="flex flex-col gap-0.5">
            {machine.specs.map(([key, value]) => (
              <div key={key} className="flex gap-1">
                <dt className="font-semibold text-foreground">{key}:</dt>
                <dd className="text-foreground/70">{value}</dd>
              </div>
            ))}
          </dl>
          <div aria-hidden className="mt-3 flex">
            {swatches.map((className) => (
              <span key={className} className={`h-3 w-5 ${className}`} />
            ))}
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        {`${machine.host}: ${machine.specs.map(([key, value]) => `${key} ${value}`).join(", ")}`}
      </figcaption>
    </figure>
  );
};
