import { ContentBox } from "@/components/layout/shell";

export const PageHeader = ({
  title,
  description,
  label,
  children,
}: {
  title: string;
  description?: string;
  label?: string;
  children?: React.ReactNode;
}) => {
  return (
    <ContentBox
      className="flex flex-col gap-3 px-6 py-6 sm:px-10 sm:py-8"
      label={label ?? title}
    >
      {children}
      <h1 className="font-extrabold font-mono text-3xl tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description ? <p className="text-foreground/70">{description}</p> : null}
    </ContentBox>
  );
};
