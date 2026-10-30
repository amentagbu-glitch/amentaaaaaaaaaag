import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="container-x py-32">
      <p className="label-mono">404</p>
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{t("title")}</h1>
      <p className="mt-4 text-muted">{t("text")}</p>
      <Link href="/" className="btn btn-primary mt-8">{t("back")}</Link>
    </section>
  );
}
