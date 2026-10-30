"use server";

import { z } from "zod";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { sendMail } from "@/lib/email";

export type AuditState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<string, "required" | "email" | "phone" | "needs" | "url">>;
  values?: Record<string, string | string[]>;
};

const TYPES = ["restaurant", "hotel", "producer", "shop", "other"] as const;
const NEEDS = ["video", "website", "social", "ai", "unsure"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "required").max(120),
  business: z.string().trim().min(2, "required").max(160),
  type: z.enum(TYPES, { message: "required" }),
  whatsapp: z
    .string()
    .trim()
    .min(1, "required")
    .regex(/^\+?[0-9\s().-]{8,20}$/, "phone"),
  email: z.union([z.literal(""), z.string().trim().email("email").max(160)]),
  needs: z.array(z.enum(NEEDS)).min(1, "needs"),
  link: z.union([z.literal(""), z.string().trim().max(300).regex(/^(https?:\/\/|www\.|@)\S+$/i, "url")]),
  message: z.string().trim().max(1500).optional().default(""),
});

export async function submitAudit(_prev: AuditState, formData: FormData): Promise<AuditState> {
  // Spam protection: hidden honeypot field and a minimum fill time. Bots get a silent "success".
  if (formData.get("website")) return { status: "success" };
  const started = Number(formData.get("t") || 0);

  const localeRaw = String(formData.get("locale") || routing.defaultLocale);
  const locale = (routing.locales as readonly string[]).includes(localeRaw) ? localeRaw : routing.defaultLocale;

  const raw = {
    name: String(formData.get("name") || ""),
    business: String(formData.get("business") || ""),
    type: String(formData.get("type") || ""),
    whatsapp: String(formData.get("whatsapp") || ""),
    email: String(formData.get("email") || ""),
    needs: formData.getAll("needs").map(String),
    link: String(formData.get("link") || ""),
    message: String(formData.get("message") || ""),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: AuditState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (errors[key]) continue;
      const msg = issue.message;
      errors[key] = (["required", "email", "phone", "needs", "url"].includes(msg) ? msg : "required") as never;
    }
    return { status: "error", errors, values: raw };
  }

  if (started && Date.now() - started < 2500) return { status: "success" };

  const d = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL || "hello@syncstudio.ma";
  const body = [
    `Name: ${d.name}`,
    `Business: ${d.business} (${d.type})`,
    `WhatsApp: ${d.whatsapp}`,
    `Email: ${d.email || "-"}`,
    `Needs: ${d.needs.join(", ")}`,
    `Link: ${d.link || "-"}`,
    `Language: ${locale}`,
    "",
    d.message || "(no message)",
  ].join("\n");

  try {
    await sendMail({ to, subject: `Free audit request: ${d.business}`, text: body, replyTo: d.email || undefined });
    if (d.email) {
      const t = await getTranslations({ locale, namespace: "form.autoReply" });
      await sendMail({ to: d.email, subject: t("subject"), text: t("body", { name: d.name, business: d.business }) }).catch((e) =>
        console.error("auto-reply failed", e),
      );
    }
    return { status: "success" };
  } catch (e) {
    console.error("audit submit failed", e);
    return { status: "error", values: raw };
  }
}
