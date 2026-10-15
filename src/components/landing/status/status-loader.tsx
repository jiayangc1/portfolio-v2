import { Status } from "@/components/landing/status/status";
import { getStatusPayload } from "@/lib/status/fetch";
import { cn } from "@/lib/utils";

type StatusLoaderProps = {
  className?: string;
};

export async function StatusLoader({ className }: StatusLoaderProps) {
  const initialStatus = await getStatusPayload();

  return <Status initialStatus={initialStatus} className={cn(className)} />;
}
