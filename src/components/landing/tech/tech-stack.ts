import type { IconType } from "react-icons";
import { BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi";
import { FaCloudflare, FaDocker, FaNodeJs, FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import {
  SiExpress,
  SiJavascript,
  SiLua,
  SiPython,
  SiSwift,
} from "react-icons/si";

export type TechStackItem = {
  name: string;
  Icon: IconType;
  iconClassName?: string;
  mobileOnly?: boolean;
};

export const techStack: TechStackItem[] = [
  { name: "React", Icon: FaReact },
  { name: "NodeJS", Icon: FaNodeJs },
  { name: "Express", Icon: SiExpress },
  { name: "Typescript", Icon: BiLogoTypescript },
  { name: "Javascript", Icon: SiJavascript, iconClassName: "h-5 w-5" },
  { name: "Python", Icon: SiPython },
  { name: "Swift", Icon: SiSwift },
  { name: "PostgreSQL", Icon: BiLogoPostgresql },
  { name: "Tailwind", Icon: RiTailwindCssFill },
  {
    name: "Cloudflare",
    Icon: FaCloudflare,
    iconClassName: "h-8 w-8",
    mobileOnly: true,
  },
  { name: "Docker", Icon: FaDocker, mobileOnly: true },
  { name: "Lua (learning)", Icon: SiLua, mobileOnly: true },
];
