import { ErrorPage } from "@/components/layout/error-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Page not found",
  description:
    "The page you are looking for does not exist. Return to Jiayang Chen's portfolio.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Page not found"
      description="This route doesn't exist. The page may have moved, or the link could be broken."
    />
  );
}