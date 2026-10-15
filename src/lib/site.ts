const fullName = "Jiayang Chen";

export const site = {
  name: {
    first: "Jiayang",
    last: "Chen",
    full: fullName,
    alternate: ["Chen Jiayang", "jiayangc1"],
  },
  title: "Full Stack Developer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jiayangchen.com",
  location: {
    label: "Houston, Texas",
    country: "United States",
    countryCode: "US",
    flagUrl: "/flag-us.webp",
  },
  seo: {
    tagline:
      "Full stack developer building web apps like Authometry, 55GMS, and Lofi Radio.",
    description: `${fullName} is a full stack developer based in Houston, Texas, building web apps like Authometry, 55GMS, Lofi Radio, and What Beats Paper.`,
    keywords: [
      fullName,
      "Chen Jiayang",
      "Jiayang",
      "jiayangc1",
      "jiayangchen.com",
      "55GMS",
      "Jiayang Chen portfolio",
      "Jiayang Chen developer",
      "Jiayang Chen Houston",
      "Jiayang Chen software engineer",
      "full stack developer",
      "full stack developer Houston",
      "software engineer Texas",
      "open source developer",
      "React developer",
      "Node.js developer",
      "TypeScript developer",
      "web developer portfolio",
    ],
    locale: "en_US",
    twitterHandle: "@jiayang_c",
    googleVerification: process.env.GOOGLE_SITE_VERIFICATION,
    bingVerification: process.env.BING_SITE_VERIFICATION,
  },
  social: [
    {
      label: "X",
      href: "https://x.com/jiayang_c",
    },
    {
      label: "GitHub",
      href: "https://github.com/jiayangc1",
    },
    {
      label: "Discord",
      href: "https://discord.com/users/735641273477890178",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/cjiayang/",
    },
  ] as const,
  assets: {
    figure: "/avatar.jpg",
    figureSize: 800,
    thumbnail: "/avatar-224.webp",
    thumbnailSize: 224,
    icon: "/avatar.jpg",
  },
} as const;
