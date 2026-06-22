"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { Rates } from "@/lib/rates";

const MONTHS = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];
const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

interface Today {
  y: number;
  m: number; // 0-based
  d: number;
}

// Текущая дата по Москве, вычисленная в браузере. Серверное значение
// «запекается» в ISR-кеш страницы и может устареть на час+, поэтому актуальную
// дату считаем на клиенте.
function moscowToday(): Today {
  const msk = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" }),
  );
  return { y: msk.getFullYear(), m: msk.getMonth(), d: msk.getDate() };
}

// Возвращает актуальную дату по Москве. Стартует с серверного значения (чтобы
// первый клиентский рендер совпал с SSR и не было ошибки гидрации), затем
// после монтирования заменяет его на реально текущее — и обновляет при
// возврате на вкладку, чтобы за полночь дата не «зависла».
function useCurrentMoscowDate(initial: Today): Today {
  const [today, setToday] = useState(initial);

  useEffect(() => {
    const sync = () => setToday(moscowToday());
    sync();
    const onVisible = () => {
      if (document.visibilityState === "visible") sync();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  return today;
}

function formatMoney(value: number): string {
  return value.toFixed(2).replace(".", ",");
}

function RateRow({ code, label, rate }: { code: string; label: string; rate: Rates["usd"] }) {
  const delta = rate.value - rate.previous;
  const up = delta > 0.0001;
  const down = delta < -0.0001;
  const Icon = up ? TrendingUp : down ? TrendingDown : Minus;
  const color = up ? "text-emerald-500" : down ? "text-rose-500" : "text-dim";

  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8B5CF6]/10 text-xs font-semibold text-[#8B5CF6]">
          {code}
        </span>
        <span className="text-sm text-subtle">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-heading text-sm font-semibold text-heading tabular-nums">
          {formatMoney(rate.value)} ₽
        </span>
        <span className={`flex items-center gap-0.5 text-xs ${color}`}>
          <Icon className="h-3 w-3" />
          {Math.abs(delta) >= 0.0001 ? formatMoney(Math.abs(delta)) : "0,00"}
        </span>
      </div>
    </div>
  );
}

function MonthCalendar({ today }: { today: Today }) {
  const { y, m, d } = today;
  const firstWeekday = (new Date(y, m, 1).getDay() + 6) % 7; // Пн = 0
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w, i) => (
          <div
            key={w}
            className={`py-1 text-[11px] font-medium uppercase ${
              i >= 5 ? "text-rose-400/70" : "text-dim"
            }`}
          >
            {w}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`b${i}`} />;
          const isToday = day === d;
          const isWeekend = i % 7 >= 5;
          return (
            <div
              key={day}
              className={`flex h-8 items-center justify-center rounded-lg text-sm tabular-nums transition-colors ${
                isToday
                  ? "bg-[#8B5CF6] font-semibold text-white shadow-[0_0_16px_rgba(139,92,246,0.4)]"
                  : isWeekend
                    ? "text-rose-400/80"
                    : "text-body"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function NewsSidebar({
  today: initialToday,
  rates,
}: {
  today: Today;
  rates: Rates | null;
}) {
  const today = useCurrentMoscowDate(initialToday);

  return (
    <div className="space-y-5">
      {/* Сегодня + календарь */}
      <div className="rounded-2xl glass-card p-5">
        <div className="text-xs font-medium uppercase tracking-[0.18em] text-dim">
          Сегодня
        </div>
        <div className="mb-4 mt-1.5 flex items-baseline justify-between">
          <span className="font-heading text-2xl font-bold text-heading">
            {today.d} {MONTHS[today.m]}
          </span>
          <span className="text-sm text-subtle">{today.y}</span>
        </div>
        <MonthCalendar today={today} />
      </div>

      {/* Курсы валют */}
      <div className="rounded-2xl glass-card p-5">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-dim">
            Курс ЦБ РФ
          </span>
        </div>
        {rates ? (
          <div className="divide-y divide-border-subtle">
            <RateRow code="$" label="Доллар США" rate={rates.usd} />
            <RateRow code="€" label="Евро" rate={rates.eur} />
          </div>
        ) : (
          <p className="py-3 text-sm text-dim">Курс временно недоступен.</p>
        )}
      </div>
    </div>
  );
}
