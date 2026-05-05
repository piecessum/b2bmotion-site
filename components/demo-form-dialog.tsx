"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DEMO_FORM_EVENT } from "@/lib/demo-form";

type Wholesale = "yes" | "no" | "";
type Storage = "1c" | "excel" | "other" | "";

type Step1Data = {
  scope: string;
  wholesale: Wholesale;
  catalogSize: string;
  catalogStorage: Storage;
};

type Step2Data = {
  name: string;
  phone: string;
  email: string;
};

const STEP1_INIT: Step1Data = {
  scope: "",
  wholesale: "",
  catalogSize: "",
  catalogStorage: "",
};

const STEP2_INIT: Step2Data = { name: "", phone: "", email: "" };

const TOTAL_FIELDS = 7;

const wholesaleOptions: { value: Exclude<Wholesale, "">; label: string }[] = [
  { value: "yes", label: "Да" },
  { value: "no", label: "Нет" },
];

const storageOptions: { value: Exclude<Storage, "">; label: string }[] = [
  { value: "1c", label: "1С или аналогичная программа" },
  { value: "excel", label: "Excel" },
  { value: "other", label: "Другое" },
];

export function DemoFormDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [s1, setS1] = useState<Step1Data>(STEP1_INIT);
  const [s2, setS2] = useState<Step2Data>(STEP2_INIT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const firstInvalidRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setStep(1);
      setSubmitted(false);
      setSubmitError(null);
      setErrors({});
    };
    window.addEventListener(DEMO_FORM_EVENT, onOpen);
    return () => window.removeEventListener(DEMO_FORM_EVENT, onOpen);
  }, []);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setTimeout(() => {
        setS1(STEP1_INIT);
        setS2(STEP2_INIT);
        setErrors({});
        setStep(1);
        setSubmitted(false);
        setSubmitError(null);
      }, 250);
    }
  };

  const validateStep1 = () => {
    const next: Record<string, string> = {};
    if (!s1.scope.trim()) next.scope = "Заполните, пожалуйста, это поле";
    if (!s1.wholesale) next.wholesale = "Выберите один из вариантов";
    if (!s1.catalogSize.trim())
      next.catalogSize = "Заполните, пожалуйста, это поле";
    if (!s1.catalogStorage)
      next.catalogStorage = "Выберите один из вариантов";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateStep2 = () => {
    const next: Record<string, string> = {};
    if (!s2.name.trim()) next.name = "Укажите, пожалуйста, ваше имя";
    if (!s2.phone.trim()) next.phone = "Укажите, пожалуйста, телефон";
    else if (!/^[\d+\s()\-]{7,}$/.test(s2.phone.trim()))
      next.phone = "Похоже, телефон указан некорректно";
    if (!s2.email.trim()) next.email = "Укажите, пожалуйста, эл. почту";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s2.email.trim()))
      next.email = "Похоже, эл. почта указана некорректно";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (validateStep1()) {
      setStep(2);
      setErrors({});
    }
  };

  const goBack = () => {
    setErrors({});
    setStep(1);
  };

  const submit = async () => {
    if (!validateStep2()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: s1.scope.trim(),
          wholesale: s1.wholesale,
          catalogSize: s1.catalogSize.trim(),
          catalogStorage: s1.catalogStorage,
          name: s2.name.trim(),
          phone: s2.phone.trim(),
          email: s2.email.trim(),
          page:
            typeof window !== "undefined" ? window.location.pathname : "",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("submit_failed");
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Не удалось отправить заявку. Проверьте подключение и попробуйте ещё раз",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const filled =
    [s1.scope, s1.wholesale, s1.catalogSize, s1.catalogStorage].filter(
      (v) => String(v).trim() !== "",
    ).length +
    [s2.name, s2.phone, s2.email].filter((v) => v.trim() !== "").length;
  const progress = Math.round((filled / TOTAL_FIELDS) * 100);

  const inputBase =
    "w-full px-4 py-3 rounded-xl bg-surface border text-body placeholder:text-dimmer focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/40 transition-all duration-200";
  const inputOk = "border-border-default focus:border-[#3B82F6]";
  const inputErr =
    "border-[#EF4444]/70 focus:border-[#EF4444] focus:ring-[#EF4444]/30";

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 z-50 w-[95vw] max-w-xl max-h-[92vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-glass-border bg-page p-6 md:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.45)] focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <Dialog.Close
            aria-label="Закрыть"
            className="absolute top-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-lg text-dim hover:text-body hover:bg-overlay-4 transition-colors"
          >
            <X className="w-4 h-4" />
          </Dialog.Close>

          {submitted ? (
            <div className="relative py-6 text-center">
              <Confetti />
              <div className="relative inline-flex items-center justify-center w-32 h-32 mb-5">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3B82F6]/15 via-[#8B5CF6]/15 to-[#06B6D4]/15 blur-xl" />
                <Image
                  src="/ok.svg"
                  alt="Заявка отправлена"
                  width={120}
                  height={101}
                  className="relative w-28 h-auto drop-shadow-[0_8px_24px_rgba(59,130,246,0.25)]"
                  priority
                />
              </div>
              <Dialog.Title className="font-heading font-bold text-2xl text-heading mb-2">
                Спасибо! Заявка отправлена
              </Dialog.Title>
              <p className="text-subtle text-base mb-6">
                Свяжемся с вами в ближайшее время и подготовим демо под ваш
                бизнес.
              </p>
              <button
                onClick={() => handleOpenChange(false)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white font-medium hover:brightness-110 transition-all"
              >
                Закрыть
              </button>
            </div>
          ) : (
            <>
              <Dialog.Title className="font-heading font-bold text-[clamp(20px,3vw,26px)] tracking-[-0.01em] text-heading pr-10">
                Ответьте на несколько вопросов — подготовим демо под вас
              </Dialog.Title>

              <div className="mt-5 mb-6">
                <div className="flex items-center justify-between text-xs text-dim mb-2">
                  <span>Шаг {step} из 2</span>
                  <span>Заполнено {filled} из {TOTAL_FIELDS}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-overlay-6 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {step === 1 ? (
                <div className="space-y-5">
                  <Field
                    label="Сфера деятельности вашего бизнеса"
                    error={errors.scope}
                  >
                    <input
                      type="text"
                      value={s1.scope}
                      onChange={(e) =>
                        setS1((p) => ({ ...p, scope: e.target.value }))
                      }
                      placeholder="Например, оптовая торговля электротехникой"
                      className={`${inputBase} ${errors.scope ? inputErr : inputOk}`}
                    />
                  </Field>

                  <Field
                    label="Занимаетесь ли вы оптовыми продажами?"
                    error={errors.wholesale}
                  >
                    <RadioRow
                      name="wholesale"
                      value={s1.wholesale}
                      options={wholesaleOptions}
                      hasError={Boolean(errors.wholesale)}
                      onChange={(v) =>
                        setS1((p) => ({ ...p, wholesale: v as Wholesale }))
                      }
                    />
                  </Field>

                  <Field
                    label="Примерное количество товаров в каталоге"
                    error={errors.catalogSize}
                  >
                    <input
                      type="text"
                      inputMode="numeric"
                      value={s1.catalogSize}
                      onChange={(e) =>
                        setS1((p) => ({ ...p, catalogSize: e.target.value }))
                      }
                      placeholder="Например, 5 000"
                      className={`${inputBase} ${errors.catalogSize ? inputErr : inputOk}`}
                    />
                  </Field>

                  <Field
                    label="Где хранится ваш каталог?"
                    error={errors.catalogStorage}
                  >
                    <RadioColumn
                      name="catalogStorage"
                      value={s1.catalogStorage}
                      options={storageOptions}
                      hasError={Boolean(errors.catalogStorage)}
                      onChange={(v) =>
                        setS1((p) => ({ ...p, catalogStorage: v as Storage }))
                      }
                    />
                  </Field>
                </div>
              ) : (
                <div className="space-y-5">
                  <Field label="Ваше имя" error={errors.name}>
                    <input
                      type="text"
                      autoComplete="name"
                      value={s2.name}
                      onChange={(e) =>
                        setS2((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Как к вам обращаться"
                      className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
                    />
                  </Field>

                  <Field label="Телефон" error={errors.phone}>
                    <input
                      type="tel"
                      autoComplete="tel"
                      value={s2.phone}
                      onChange={(e) =>
                        setS2((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="+7 (___) ___-__-__"
                      className={`${inputBase} ${errors.phone ? inputErr : inputOk}`}
                    />
                  </Field>

                  <Field label="Эл. почта" error={errors.email}>
                    <input
                      type="email"
                      autoComplete="email"
                      value={s2.email}
                      onChange={(e) =>
                        setS2((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="name@company.ru"
                      className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                    />
                  </Field>
                </div>
              )}

              {submitError && (
                <p className="mt-5 text-sm text-[#EF4444]">{submitError}</p>
              )}

              <div className="mt-7 flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
                {step === 2 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border-default text-body font-medium hover:bg-overlay-4 transition-colors disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Назад
                  </button>
                ) : (
                  <span />
                )}

                {step === 1 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white font-semibold hover:brightness-110 transition-all"
                  >
                    Далее
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submit}
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white font-semibold hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Отправляем…
                      </>
                    ) : (
                      <>Отправить</>
                    )}
                  </button>
                )}
              </div>

              <p className="mt-5 text-xs text-dim leading-relaxed">
                Нажимая кнопку «Отправить», вы соглашаетесь с{" "}
                <Link
                  href="/privacy"
                  className="text-[#60A5FA] hover:underline"
                  target="_blank"
                >
                  политикой конфиденциальности
                </Link>
                .
              </p>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-subheading mb-2">
        {label}
      </span>
      {children}
      {error && (
        <span className="block mt-1.5 text-xs text-[#EF4444]">{error}</span>
      )}
    </label>
  );
}

function RadioRow<T extends string>({
  name,
  value,
  options,
  hasError,
  onChange,
}: {
  name: string;
  value: string;
  options: { value: T; label: string }[];
  hasError: boolean;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              active
                ? "bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white border-transparent shadow-[0_0_18px_rgba(59,130,246,0.25)]"
                : `bg-surface text-body hover:bg-overlay-4 ${
                    hasError ? "border-[#EF4444]/60" : "border-border-default"
                  }`
            }`}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={active}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function RadioColumn<T extends string>({
  name,
  value,
  options,
  hasError,
  onChange,
}: {
  name: string;
  value: string;
  options: { value: T; label: string }[];
  hasError: boolean;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all ${
              active
                ? "border-[#3B82F6] bg-[#3B82F6]/8"
                : hasError
                  ? "border-[#EF4444]/60 bg-surface hover:bg-overlay-4"
                  : "border-border-default bg-surface hover:bg-overlay-4"
            }`}
          >
            <span
              className={`relative inline-flex w-4 h-4 rounded-full border-2 shrink-0 ${
                active
                  ? "border-[#3B82F6]"
                  : "border-border-default"
              }`}
            >
              {active && (
                <span className="absolute inset-1 rounded-full bg-[#3B82F6]" />
              )}
            </span>
            <span
              className={`font-medium ${active ? "text-heading" : "text-body"}`}
            >
              {o.label}
            </span>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={active}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
          </button>
        );
      })}
    </div>
  );
}

const CONFETTI_COLORS = [
  "#3B82F6",
  "#7C3AED",
  "#06B6D4",
  "#8B5CF6",
  "#60A5FA",
  "#A78BFA",
];

function Confetti() {
  const pieces = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => {
      const angle = (Math.random() - 0.5) * Math.PI * 0.9;
      const distance = 140 + Math.random() * 160;
      const x = Math.sin(angle) * distance;
      const y = 80 + Math.cos(angle) * distance;
      const rot = (Math.random() - 0.5) * 720;
      const duration = 1500 + Math.random() * 900;
      const delay = Math.random() * 180;
      const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      const w = 6 + Math.random() * 4;
      const h = 8 + Math.random() * 6;
      return {
        key: i,
        style: {
          backgroundColor: color,
          width: `${w}px`,
          height: `${h}px`,
          marginLeft: `${(Math.random() - 0.5) * 30}px`,
          ["--confetti-x" as string]: `${x}px`,
          ["--confetti-y" as string]: `${y}px`,
          ["--confetti-rot" as string]: `${rot}deg`,
          ["--confetti-dur" as string]: `${duration}ms`,
          ["--confetti-delay" as string]: `${delay}ms`,
        } as React.CSSProperties,
      };
    });
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-2 h-0 overflow-visible"
    >
      {pieces.map((p) => (
        <span key={p.key} className="confetti-piece" style={p.style} />
      ))}
    </div>
  );
}
