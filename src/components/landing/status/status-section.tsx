import { Suspense } from "react";
import { StatusLoader } from "@/components/landing/status/status-loader";
import { StatusSkeleton } from "@/components/landing/status/status-skeleton";
import { ContentBox } from "@/components/layout/shell";

export const StatusSection = () => {
  return (
    <ContentBox
      className="px-6 py-6 sm:px-10 sm:py-4"
      position="middle"
      label="Status"
    >
      <Suspense fallback={<StatusSkeleton />}>
        <StatusLoader />
      </Suspense>
    </ContentBox>
  );
};
