import { useTranslations } from "next-intl";
import { whatsappLink } from "@/lib/site";
import { IconWhatsApp } from "./icons";

export function WhatsAppFloat() {
  const t = useTranslations("whatsapp");
  return (
    <a
      href={whatsappLink(t("prefill"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("float")}
      title={t("float")}
      className="fixed bottom-5 end-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-wa text-[#06140b] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] ring-1 ring-black/10 transition-transform hover:scale-105"
    >
      <IconWhatsApp className="h-7 w-7" />
    </a>
  );
}
