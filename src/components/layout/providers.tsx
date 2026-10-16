import { GTProvider } from "gt-next";
import { ThemeProvider } from "next-themes";
import { HoverSound } from "@/components/layout/hover-sound";
import { SensoryUIProvider } from "@/components/ui/sensory-ui/config/provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SensoryUIProvider>
      <HoverSound />
      <GTProvider>
        <ThemeProvider forcedTheme="dark">{children}</ThemeProvider>
      </GTProvider>
    </SensoryUIProvider>
  );
};
