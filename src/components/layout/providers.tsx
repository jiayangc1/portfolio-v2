import { GTProvider } from "gt-next";
import { ThemeProvider } from "next-themes";
import { SensoryUIProvider } from "@/components/ui/sensory-ui/config/provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SensoryUIProvider>
      <GTProvider>
        <ThemeProvider forcedTheme="dark">{children}</ThemeProvider>
      </GTProvider>
    </SensoryUIProvider>
  );
};
