export type DiscordPresenceStatus = "online" | "idle" | "dnd" | "offline";

export type StatusActivity = {
  label: string;
  detail?: string;
};

export type StatusMusic = {
  artist: string;
  track: string;
  url?: string;
  source: "lastfm" | "spotify";
  isNowPlaying: boolean;
};

export type StatusCoding = {
  active: boolean;
  language: string | null;
  project: string | null;
  todayTotal: string | null;
};

export type StatusPayload = {
  discord: {
    status: DiscordPresenceStatus;
    activity: StatusActivity | null;
  } | null;
  music: StatusMusic | null;
  coding: StatusCoding | null;
  timezone: string;
  timezoneLabel: string;
};
