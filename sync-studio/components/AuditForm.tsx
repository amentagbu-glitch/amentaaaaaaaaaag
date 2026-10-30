"use client";

import { useActionState, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { submitAudit, type AuditState } from "@/app/actions/audit";
import { whatsappLink } from "@/lib/site";
import { IconCheck, IconWhatsApp } from "./icons";

const TYPES = ["restaurant", "hotel", "producer", "shop", "other"] as const;
const NEEDS = ["video", "website", "social", "ai", "unsure"] as const;

export function AuditForm({ idPrefix = "audit" }: { idPrefix?: string }) {
  const [round, setRound] = useState(0);
  return <AuditFormInner key={round} idPrefix={idPrefix} onReset={() => setRound((r) => r + 1)} />;
}

function AuditFormInner({ idPrefix, onReset }: { idPrefix: string; onReset: () => void }) {
  const t = useTranslations("form");
  const w = useTranslations("whatsapp");
  const locale = useLocale();
  const [state, action, pending] = useActionState<AuditState, FormData>(submitAudit, { status: "idle" });
  const [started, setStarted] = useState(0);
  useEffect(() => setStarted(Date.now()), []);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-6" role="status" aria-live="polite">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
          <IconCheck className="h-5 w-5" />
        </span>
        <h3 className="text-2xl font-semibold">{t("successTitle")}</h3>
        <p className="max-w-md text-muted">{t("successText")}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <a href={whatsappLink(w("prefill"))} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <IconWhatsApp className="h-4 w-4 text-wa" /> {w("float")}
          </a>
          <button type="button" className="btn btn-secondary" onClick={onReset}>
            {t("successAgain")}
          </button>
        </div>
      </div>
    );
  }

  const err = state.errors || {};
  const v = state.values || {};
  const id = (name: string) => `${idPrefix}-${name}`;
  const errMsg = (name: string) =>
    err[name] ? (
      <p id={id(`${name}-err`)} className="mt-1.5 text-sm text-[#ff8a9b]">
        {t(`errors.${err[name]}`)}
      </p>
    ) : null;
  const aria = (name: string) => ({
    "aria-invalid": err[name] ? (true as const) : undefined,
    "aria-describedby": err[name] ? id(`${name}-err`) : undefined,
  });
  const needsValue = Array.isArray(v.needs) ? v.needs : [];

  return (
    <form action={action} noValidate className="relative grid gap-5">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="t" value={started} />
      <div className="absolute -start-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("name")} htmlFor={id("name")}>
          <input id={id("name")} name="name" className="field" autoComplete="name" required defaultValue={String(v.name || "")} {...aria("name")} />
          {errMsg("name")}
        </Field>
        <Field label={t("business")} htmlFor={id("business")}>
          <input id={id("business")} name="business" className="field" autoComplete="organization" required defaultValue={String(v.business || "")} {...aria("business")} />
          {errMsg("business")}
        </Field>
        <Field label={t("type")} htmlFor={id("type")}>
          <select id={id("type")} name="type" className="field appearance-none" required defaultValue={String(v.type || "")} {...aria("type")}>
            <option value="" disabled>
              {t("typeSelect")}
            </option>
            {TYPES.map((k) => (
              <option key={k} value={k}>
                {t(`types.${k}`)}
              </option>
            ))}
          </select>
          {errMsg("type")}
        </Field>
        <Field label={t("whatsapp")} htmlFor={id("whatsapp")}>
          <input id={id("whatsapp")} name="whatsapp" type="tel" inputMode="tel" dir="ltr" placeholder="+212 6 00 00 00 00" className="field rtl:text-right" autoComplete="tel" required defaultValue={String(v.whatsapp || "")} {...aria("whatsapp")} />
          {errMsg("whatsapp")}
        </Field>
        <Field label={t("email")} optional={t("optional")} htmlFor={id("email")}>
          <input id={id("email")} name="email" type="email" dir="ltr" className="field rtl:text-right" autoComplete="email" defaultValue={String(v.email || "")} {...aria("email")} />
          {errMsg("email")}
        </Field>
        <Field label={t("link")} optional={t("optional")} htmlFor={id("link")}>
          <input id={id("link")} name="link" type="text" inputMode="url" dir="ltr" placeholder="instagram.com/…" className="field rtl:text-right" defaultValue={String(v.link || "")} {...aria("link")} />
          {errMsg("link")}
        </Field>
      </div>

      <fieldset aria-describedby={err.needs ? id("needs-err") : undefined}>
        <legend className="mb-2.5 text-sm font-medium text-chrome">{t("needs")}</legend>
        <div className="flex flex-wrap gap-2">
          {NEEDS.map((k) => (
            <label key={k} className="group relative cursor-pointer">
              <input type="checkbox" name="needs" value={k} defaultChecked={needsValue.includes(k)} className="peer sr-only" />
              <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line px-3.5 text-sm text-muted transition-colors group-hover:border-chrome/60 peer-checked:border-primary peer-checked:bg-primary/15 peer-checked:text-text peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                {t(`needsOptions.${k}`)}
              </span>
            </label>
          ))}
        </div>
        {errMsg("needs")}
      </fieldset>

      <Field label={t("message")} optional={t("optional")} htmlFor={id("message")}>
        <textarea id={id("message")} name="message" rows={3} className="field resize-y" placeholder={t("messagePlaceholder")} defaultValue={String(v.message || "")} />
      </Field>

      {state.status === "error" && !state.errors && (
        <p role="alert" className="rounded-[10px] border border-[#ff6b81]/40 bg-[#ff6b81]/10 px-3 py-2 text-sm text-[#ffb3be]">
          {t("errorGeneric")}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={pending}>
          {pending ? t("sending") : t("submit")}
        </button>
        <p className="text-sm text-muted">{t("privacy")}</p>
      </div>
    </form>
  );
}

function Field({ label, optional, htmlFor, children }: { label: string; optional?: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-chrome">
        {label}
        {optional && <span className="ms-1.5 font-normal text-muted">({optional})</span>}
      </label>
      {children}
    </div>
  );
}
