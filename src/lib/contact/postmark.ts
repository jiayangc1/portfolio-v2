const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? "hi@ch3n.cc";
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL ?? "forwarding@ch3n.cc";

type ContactEmailInput = {
  email: string;
  message: string;
};

function formatFromAddress(email: string) {
  return `${email.split("@")[0]} <${CONTACT_FROM}>`;
}

export async function sendContactEmail({ email, message }: ContactEmailInput) {
  const token = process.env.POSTMARK_SERVER_TOKEN;
  if (!token) {
    throw new Error("Postmark is not configured");
  }

  const response = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": token,
    },
    body: JSON.stringify({
      From: formatFromAddress(email),
      To: CONTACT_TO,
      ReplyTo: email,
      Subject: `Contact form: ${email}`,
      TextBody: message,
      MessageStream: "outbound",
    }),
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as {
      Message?: string;
    } | null;
    throw new Error(error?.Message ?? "Failed to send email");
  }

  return response.json();
}
