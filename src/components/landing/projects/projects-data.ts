import {
  BotMessageSquare,
  Gamepad2,
  type LucideIcon,
  Radio,
  Scissors,
  ShieldCheck,
  VenetianMask,
} from "lucide-react";

export type Project = {
  name: string;
  description: string;
  href: string;
  Icon: LucideIcon;
};

export const projects: Project[] = [
  {
    name: "Authometry",
    description:
      "OAuth you can see — an inspectable OAuth 2.0 and OpenID Connect platform.",
    href: "https://authometry.jiayangchen.com",
    Icon: ShieldCheck,
  },
  {
    name: "55GMS",
    description:
      "Browser games, apps, and web proxy platform with hundreds of playable titles.",
    href: "https://55gms.com",
    Icon: Gamepad2,
  },
  {
    name: "Lofi Radio",
    description: "Listen to lofi 24/7, synced across every browser.",
    href: "https://lofi.jiayangchen.com",
    Icon: Radio,
  },
  {
    name: "What Beats Paper?",
    description: "Try to beat an LLM at guessing what beats the other.",
    href: "https://whatbeatspaper.jiayangchen.com",
    Icon: Scissors,
  },
  {
    name: "Imposter",
    description:
      "The Imposter party game on the web, with no ads and a clean UI.",
    href: "https://imposter.jiayangchen.com",
    Icon: VenetianMask,
  },
  {
    name: "Free GPT",
    description: "A quick, free way to deploy your own AI chat.",
    href: "https://ai.jiayangchen.com",
    Icon: BotMessageSquare,
  },
];
