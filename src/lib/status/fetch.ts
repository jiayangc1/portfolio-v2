import { site } from "@/lib/site";
import type {
  DiscordPresenceStatus,
  StatusActivity,
  StatusCoding,
  StatusMusic,
  StatusPayload,
} from "@/lib/status/types";

const HACKATIME_IDLE_MINUTES = 15;
const HACKATIME_LAST_PROJECT_PLACEHOLDER = "<<LAST_PROJECT>>";

function sanitizeHackatimeProject(project: string | null): string | null {
  if (!project || project === HACKATIME_LAST_PROJECT_PLACEHOLDER) {
    return null;
  }

  return project;
}
const LASTFM_RECENT_ACTIVITY_MINUTES = 5;

type LanyardActivity = {
  type: number;
  name: string;
  state?: string | null;
  details?: string | null;
};

type LanyardSpotify = {
  song: string;
  artist: string;
  track_id: string;
};

type LanyardData = {
  discord_status: DiscordPresenceStatus;
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify: LanyardSpotify | null;
};

type LanyardResponse = {
  success: boolean;
  data?: LanyardData;
};

type LastFmTrack = {
  artist: { "#text": string };
  name: string;
  url: string;
  "@attr"?: { nowplaying?: string };
  date?: { uts: string };
};

type LastFmResponse = {
  recenttracks?: {
    track?: LastFmTrack | LastFmTrack[];
  };
};

const activityLabels: Record<number, string> = {
  0: "Playing",
  1: "Streaming",
  2: "Listening to",
  3: "Watching",
  5: "Competing in",
};

function getDiscordActivity(
  activities: LanyardActivity[],
): StatusActivity | null {
  const activity = activities.find((item) => item.type !== 4);
  if (!activity) {
    return null;
  }

  const label = activityLabels[activity.type] ?? "Using";
  const detail = activity.details ?? activity.state ?? activity.name;

  if (!detail) {
    return null;
  }

  return { label, detail };
}

async function fetchDiscord(userId: string): Promise<StatusPayload["discord"]> {
  try {
    const response = await fetch(
      `https://api.lanyard.rest/v1/users/${userId}`,
      {
        next: { revalidate: 30 },
      },
    );

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as LanyardResponse;
    if (!json.success || !json.data) {
      return null;
    }

    const { discord_status, activities, listening_to_spotify, spotify } =
      json.data;

    if (listening_to_spotify && spotify) {
      return {
        status: discord_status,
        activity: {
          label: "Listening to",
          detail: `${spotify.artist} — ${spotify.song}`,
        },
      };
    }

    return {
      status: discord_status,
      activity: getDiscordActivity(activities),
    };
  } catch {
    return null;
  }
}

async function fetchLastFm(
  username: string,
  apiKey: string,
): Promise<StatusMusic | null> {
  try {
    const params = new URLSearchParams({
      method: "user.getrecenttracks",
      user: username,
      api_key: apiKey,
      limit: "1",
      format: "json",
    });

    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?${params.toString()}`,
      { next: { revalidate: 30 } },
    );

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as LastFmResponse;
    const track = json.recenttracks?.track;
    const latest = Array.isArray(track) ? track[0] : track;

    if (!latest) {
      return null;
    }

    const isNowPlaying = latest["@attr"]?.nowplaying === "true";

    if (!isNowPlaying) {
      const playedAtSeconds = Number.parseInt(latest.date?.uts ?? "", 10);
      const minutesSincePlayed = (Date.now() - playedAtSeconds * 1000) / 60_000;

      if (
        !Number.isFinite(minutesSincePlayed) ||
        minutesSincePlayed > LASTFM_RECENT_ACTIVITY_MINUTES
      ) {
        return null;
      }
    }

    return {
      artist: latest.artist["#text"],
      track: latest.name,
      url: latest.url,
      source: "lastfm",
      isNowPlaying,
    };
  } catch {
    return null;
  }
}

type HackatimeHeartbeat = {
  time: number;
  language: string | null;
  project: string | null;
};

type HackatimeMostRecentResponse = {
  has_heartbeat?: boolean;
  heartbeat?: HackatimeHeartbeat | null;
};

type HackatimeStatusBarResponse = {
  data?: {
    grand_total?: {
      text?: string;
      total_seconds?: number;
    };
  };
};

function getHackatimeAuthHeader(apiKey: string) {
  return `Basic ${Buffer.from(apiKey).toString("base64")}`;
}

function getHackatimeNativeApiUrl(apiUrl: string) {
  return apiUrl.replace("/api/hackatime/v1", "/api/v1").replace(/\/$/, "");
}

async function fetchHackatime(
  apiKey: string,
  apiUrl: string,
): Promise<StatusCoding | null> {
  try {
    const auth = getHackatimeAuthHeader(apiKey);
    const headers = { Authorization: auth };
    const wakatimeBaseUrl = apiUrl.replace(/\/$/, "");
    const nativeBaseUrl = getHackatimeNativeApiUrl(apiUrl);

    const [mostRecentResponse, statusBarResponse] = await Promise.all([
      fetch(`${nativeBaseUrl}/my/heartbeats/most_recent`, {
        headers,
        next: { revalidate: 30 },
      }),
      fetch(`${wakatimeBaseUrl}/users/current/statusbar/today`, {
        headers,
        next: { revalidate: 30 },
      }),
    ]);

    let language: string | null = null;
    let project: string | null = null;
    let active = false;

    if (mostRecentResponse.ok) {
      const json =
        (await mostRecentResponse.json()) as HackatimeMostRecentResponse;
      const latest = json.heartbeat;

      if (json.has_heartbeat && latest) {
        const minutesSinceHeartbeat =
          (Date.now() - latest.time * 1000) / 60_000;

        if (minutesSinceHeartbeat <= HACKATIME_IDLE_MINUTES) {
          active = true;
          language = latest.language;
          project = sanitizeHackatimeProject(latest.project);
        }
      }
    }

    let todayTotal: string | null = null;

    if (statusBarResponse.ok) {
      const json =
        (await statusBarResponse.json()) as HackatimeStatusBarResponse;
      const totalSeconds = json.data?.grand_total?.total_seconds ?? 0;

      if (totalSeconds > 0) {
        todayTotal = json.data?.grand_total?.text ?? null;
      }
    }

    if (!active && !todayTotal) {
      return null;
    }

    return {
      active,
      language,
      project,
      todayTotal,
    };
  } catch {
    return null;
  }
}

function getDiscordMusic(
  discord: StatusPayload["discord"],
): StatusMusic | null {
  if (!discord?.activity || discord.activity.label !== "Listening to") {
    return null;
  }

  const [artist, track] = discord.activity.detail?.split(" — ") ?? [];
  if (!artist || !track) {
    return null;
  }

  return {
    artist,
    track,
    source: "spotify",
    isNowPlaying: true,
  };
}

export async function getStatusPayload(): Promise<StatusPayload> {
  const {
    timezone,
    timezoneLabel,
    lastfmUsername,
    discordUserId,
    hackatimeApiUrl,
  } = site.status;

  const lastfmApiKey = process.env.LASTFM_API_KEY?.trim();
  const hackatimeApiKey = (
    process.env.HACKATIME_API_KEY ?? process.env.WAKATIME_API_KEY
  )?.trim();

  const [discord, lastfmMusic, coding] = await Promise.all([
    discordUserId ? fetchDiscord(discordUserId) : Promise.resolve(null),
    lastfmUsername && lastfmApiKey
      ? fetchLastFm(lastfmUsername, lastfmApiKey)
      : Promise.resolve(null),
    hackatimeApiKey
      ? fetchHackatime(hackatimeApiKey, hackatimeApiUrl)
      : Promise.resolve(null),
  ]);

  const music = lastfmMusic ?? getDiscordMusic(discord);

  return {
    discord: discord
      ? {
          status: discord.status,
          activity:
            music && discord.activity?.label === "Listening to"
              ? null
              : coding?.active
                ? null
                : discord.activity,
        }
      : null,
    music,
    coding,
    timezone,
    timezoneLabel,
  };
}
