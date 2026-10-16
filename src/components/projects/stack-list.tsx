import { cn } from "@/lib/utils";

export const StackList = ({
  stack,
  className,
}: {
  stack: string[];
  className?: string;
}) => {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {stack.map((item) => (
        <li
          key={item}
          className="rounded-md border border-foreground/10 bg-foreground/5 px-2 py-0.5 font-mono text-foreground/80 text-xs"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
