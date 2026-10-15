import Link from "next/link";
import { Signature } from "@/components/landing/signature";
import { ContentBox, PageShell } from "@/components/layout/shell";

type ErrorPageProps = {
  code: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
};

export const ErrorPage = ({
  code,
  title,
  description,
  actions,
}: ErrorPageProps) => {
  return (
    <PageShell>
      <ContentBox position="first" className="h-12 sm:h-16 md:h-24" />
      <ContentBox
        position="last"
        className="flex flex-col items-center gap-6 px-6 py-16 text-center sm:px-10 sm:py-24"
      >
        <p className="font-extrabold font-mono text-7xl tracking-tight sm:text-8xl md:text-9xl">
          {code}
        </p>
        <div className="flex flex-col gap-2">
          <h1 className="font-medium font-mono text-xl sm:text-2xl">{title}</h1>
          <p className="max-w-sm text-muted-foreground">{description}</p>
        </div>
        {actions ?? (
          <Link
            href="/"
            className="inline-flex h-9 items-center justify-center rounded-md border border-foreground/7 bg-background px-2.5 font-medium text-sm transition-all hover:bg-foreground/5"
          >
            Back home
          </Link>
        )}
      </ContentBox>
      <Signature />
    </PageShell>
  );
};