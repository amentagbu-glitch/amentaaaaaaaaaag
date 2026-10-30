import "server-only";

type Mail = { to: string; subject: string; text: string; replyTo?: string };

/** Sends through Resend's HTTP API. Without RESEND_API_KEY it logs instead (handy in development). */
export async function sendMail({ to, subject, text, replyTo }: Mail) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL || "Sync Studio <hello@syncstudio.ma>";
  if (!key) {
    console.info(`[mail:dev] to=${to} subject="${subject}"\n${text}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`);
}
