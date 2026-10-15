import { createJsonLd } from "@/lib/seo";

export const JsonLd = () => {
  const schemas = createJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
};