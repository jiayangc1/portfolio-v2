type DiscordUser = {
  avatar: string;
  banner?: string;
};

type DiscordUserResult =
  | { data: DiscordUser; error: null }
  | { data: null; error: string };

type LanyardUserResponse = {
  success: boolean;
  data?: {
    discord_user?: {
      avatar: string | null;
    };
  };
};

async function getDiscordUserFromLanyard(
  id: string,
): Promise<DiscordUserResult> {
  const res = await fetch(`https://api.lanyard.rest/v1/users/${id}`, {
    next: {
      revalidate: 60 * 60 * 4,
      tags: ["discord", "discord:users", `discord:user:${id}`, "all"],
    },
  });

  if (!res.ok) {
    return { data: null, error: "Failed to fetch user" };
  }

  const body = (await res.json()) as LanyardUserResponse;
  const avatar = body.data?.discord_user?.avatar;

  if (!body.success || !avatar) {
    return { data: null, error: "Failed to fetch user" };
  }

  return {
    data: { avatar },
    error: null,
  };
}

export async function getDiscordUser(id: string): Promise<DiscordUserResult> {
  if (!process.env.DISCORD_BOT_TOKEN) {
    return getDiscordUserFromLanyard(id);
  }

  const res = await fetch(`https://discord.com/api/users/${id}`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
    next: {
      revalidate: 60 * 60 * 4,
      tags: ["discord", "discord:users", `discord:user:${id}`, "all"],
    },
  });

  if (!res.ok) {
    return getDiscordUserFromLanyard(id);
  }

  const body = await res.json();

  if (res.status === 429) {
    const retryAfter = body.retry_after;
    const time = Number.parseFloat(retryAfter) * 1000;
    await new Promise((resolve) => setTimeout(resolve, time));
    return getDiscordUser(id);
  }

  return {
    data: body,
    error: null,
  };
}