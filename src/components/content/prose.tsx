import { cn } from "@/lib/utils";

export const Prose = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 text-foreground/80 [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_h1]:font-medium [&_h1]:font-mono [&_h1]:text-2xl [&_h1]:text-foreground [&_h1]:tracking-tight [&_h2]:font-medium [&_h2]:font-mono [&_h2]:text-xl [&_h2]:text-foreground [&_h3]:font-medium [&_h3]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-2 [&_p]:leading-relaxed [&_strong]:text-foreground [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const CodeBlock = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <code
      className={cn(
        "block w-full overflow-x-auto rounded-md border border-foreground/7 bg-foreground/5 px-3 py-2 font-mono text-foreground/80 text-sm",
        className,
      )}
    >
      {children}
    </code>
  );
};

export const InlineCode = ({ children }: { children: React.ReactNode }) => {
  return (
    <code className="rounded-md border border-foreground/7 bg-foreground/5 px-1.5 py-0.5 font-mono text-foreground/80 text-sm">
      {children}
    </code>
  );
};