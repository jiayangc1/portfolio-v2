import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/layout/json-ld";
import { Providers } from "@/components/layout/providers";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  themeColor: "#242428",
  colorScheme: "dark",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark",
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
