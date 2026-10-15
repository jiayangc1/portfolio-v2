import { cn } from "@/lib/utils";

export const TechIcon = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex aspect-square w-full items-center justify-center bg-background",
        className,
      )}
    >
      {children}
    </div>
  );
};
