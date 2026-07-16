"use client";

import { useCallback, useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus, RefreshCw, Activity } from "lucide-react";
import type { Rates, CurrencyRate } from "@/lib/rates";
import type { PulseEntry } from "@/lib/b2b-news";

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
  return value.toLocaleString("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// «Актуально на момент …» — дата и время последнего обновления по Москве.
function formatUpdatedAt(d: Date): string {
  return d.toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Курсы с возможностью ручного обновления. Стартуют с серверного значения,
// по запросу тянут свежие данные через /api/rates (мимо ISR-кеша). Метку
// времени ставим после монтирования, чтобы SSR и первый клиентский рендер
// совпали (иначе ошибка гидрации).
function useRefreshableRates(initial: Rates | null) {
  const [rates, setRates] = useState(initial);
  const [refreshing, setRefreshing] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    setUpdatedAt(new Date());
  }, []);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/rates", { cache: "no-store" });
      if (res.ok) {
        setRates((await res.json()) as Rates);
        setUpdatedAt(new Date());
      }
    } catch {
      /* сеть недоступна — оставляем прежние данные */
    } finally {
      setRefreshing(false);
    }
  }, []);

  return { rates, refreshing, updatedAt, refresh };
}

function RefreshButton({
  refreshing,
  onClick,
}: {
  refreshing: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={refreshing}
      aria-label="Обновить курс"
      className="text-dim transition-colors hover:text-[#8B5CF6] disabled:opacity-50"
    >
      <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
    </button>
  );
}

// Динамика курса: направление и цвет стрелки.
function trend(rate: CurrencyRate) {
  const delta = rate.value - rate.previous;
  const up = delta > 0.0001;
  const down = delta < -0.0001;
  return {
    delta,
    Icon: up ? TrendingUp : down ? TrendingDown : Minus,
    color: up ? "text-emerald-500" : down ? "text-rose-500" : "text-dim",
  };
}

function RateRow({
  code,
  label,
  rate,
  unit = "₽",
}: {
  code: string;
  label: string;
  rate: CurrencyRate;
  unit?: string;
}) {
  const { delta, Icon, color } = trend(rate);

  return (
    <div className="flex items-center justify-between gap-2 py-1">
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8B5CF6]/10 text-[10px] font-semibold text-[#8B5CF6]">
          {code}
        </span>
        <span className="truncate text-sm text-subtle">{label}</span>
      </div>
      {/* Значение и дельта не переносим и не сжимаем — иначе строка курса
          распирает узкую колонку сайдбара. При нехватке места усечётся подпись. */}
      <div className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
        <span className="font-heading text-sm font-semibold text-heading tabular-nums">
          {formatMoney(rate.value)} {unit}
        </span>
        <span className={`flex items-center gap-0.5 text-xs ${color}`}>
          <Icon className="h-3 w-3 shrink-0" />
          {Math.abs(delta) >= 0.0001 ? formatMoney(Math.abs(delta)) : "0,00"}
        </span>
      </div>
    </div>
  );
}

// Компактная плитка курса для мобильного виджета: подпись сверху, значение и
// стрелка динамики снизу — помещается по 4 валюты / 2 металла в ряд.
function RateChip({
  label,
  rate,
  unit,
}: {
  label: string;
  rate: CurrencyRate;
  unit?: string;
}) {
  const { Icon, color } = trend(rate);

  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] text-dim">{label}</span>
      <span className="flex items-center gap-1 text-sm tabular-nums">
        <span className="font-semibold text-heading">{formatMoney(rate.value)}</span>
        {unit && <span className="text-[11px] text-dim">{unit}</span>}
        <Icon className={`h-3 w-3 ${color}`} />
      </span>
    </div>
  );
}

// Пульс маркетплейсов: сколько новостей недели упоминают каждую площадку.
// Одна метрика по категориям (magnitude) — горизонтальные бары в один
// бренд-цвет с прямыми подписями значений.
function MarketPulse({ entries }: { entries: PulseEntry[] }) {
  const total = entries.reduce((sum, e) => sum + e.count, 0);
  if (total === 0) return null;
  const max = Math.max(...entries.map((e) => e.count));

  return (
    <div className="rounded-2xl glass-card p-4">
      <div className="mb-3 flex items-center gap-1.5">
        <Activity className="h-3.5 w-3.5 text-[#8B5CF6]" />
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-dim">
          Пульс маркетплейсов
        </span>
      </div>
      <div className="space-y-2">
        {entries.map((e) => (
          <div key={e.name} className="flex items-center gap-2">
            <span className="w-24 shrink-0 truncate text-xs text-subtle">
              {e.name}
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#8B5CF6]/10">
              <div
                className="h-full rounded-full bg-[#8B5CF6]"
                style={{ width: `${Math.round((e.count / max) * 100)}%` }}
              />
            </div>
            <span className="w-4 shrink-0 text-right text-xs font-semibold text-heading tabular-nums">
              {e.count}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 border-t border-border-subtle pt-2 text-[11px] text-dimmer">
        Упоминаний в новостях за неделю
      </p>
    </div>
  );
}

// Полоска текущей недели (Пн–Вс) с подсветкой сегодняшнего дня — компактная
// замена месячного календаря для мобильной версии.
function WeekCalendar({ today }: { today: Today }) {
  const { y, m, d } = today;
  const weekdayMon0 = (new Date(y, m, d).getDay() + 6) % 7; // Пн = 0
  const days = Array.from({ length: 7 }, (_, i) => new Date(y, m, d - weekdayMon0 + i));

  return (
    <div className="grid grid-cols-7 gap-1 text-center">
      {days.map((dt, i) => {
        const isToday =
          dt.getDate() === d && dt.getMonth() === m && dt.getFullYear() === y;
        const isWeekend = i >= 5;
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <span
              className={`text-[11px] font-medium uppercase ${
                isWeekend ? "text-rose-400/70" : "text-dim"
              }`}
            >
              {WEEKDAYS[i]}
            </span>
            <span
              className={`flex h-9 w-full items-center justify-center rounded-lg text-sm tabular-nums ${
                isToday
                  ? "bg-[#8B5CF6] font-semibold text-white shadow-[0_0_16px_rgba(139,92,246,0.4)]"
                  : isWeekend
                    ? "text-rose-400/80"
                    : "text-body"
              }`}
            >
              {dt.getDate()}
            </span>
          </div>
        );
      })}
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
              className={`flex h-6 items-center justify-center rounded-lg text-sm tabular-nums transition-colors ${
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
  rates: initialRates,
  pulse,
}: {
  today: Today;
  rates: Rates | null;
  pulse: PulseEntry[];
}) {
  const today = useCurrentMoscowDate(initialToday);
  const { rates, refreshing, updatedAt, refresh } =
    useRefreshableRates(initialRates);

  return (
    <div className="space-y-4">
      {/* Мобильный компактный виджет: дата + неделя + курсы (валюты и золото) */}
      <div className="rounded-2xl glass-card p-4 lg:hidden">
        <div className="mb-3">
          <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-dim">
            Сегодня
          </div>
          <div className="font-heading text-lg font-bold text-heading">
            {today.d} {MONTHS[today.m]} {today.y}
          </div>
        </div>
        <WeekCalendar today={today} />

        {rates && (
          <div className="mt-4 space-y-3 border-t border-border-subtle pt-3">
            {/* Курсы валют */}
            <div className="grid grid-cols-3 gap-x-3">
              <RateChip label="$" rate={rates.usd} />
              <RateChip label="€" rate={rates.eur} />
              <RateChip label="¥" rate={rates.cny} />
            </div>
            {/* Золото, ₽/г */}
            {rates.gold && (
              <div className="border-t border-border-subtle pt-3">
                <RateChip label="Золото" rate={rates.gold} unit="₽/г" />
              </div>
            )}
            {updatedAt && (
              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-[11px] text-dimmer">
                  Актуально на момент {formatUpdatedAt(updatedAt)}
                </span>
                <RefreshButton refreshing={refreshing} onClick={refresh} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Пульс маркетплейсов — на мобильных под виджетом даты/курсов */}
      <div className="lg:hidden">
        <MarketPulse entries={pulse} />
      </div>

      {/* Десктоп: полный календарь + курсы */}
      <div className="hidden space-y-3 lg:block">
        {/* Сегодня + календарь */}
        <div className="rounded-2xl glass-card p-3.5">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="font-heading text-xl font-bold text-heading">
              {today.d} {MONTHS[today.m]}
            </span>
            <span className="text-sm text-subtle">{today.y}</span>
          </div>
          <MonthCalendar today={today} />
        </div>

        {/* Курсы валют */}
        <div className="rounded-2xl glass-card p-3.5">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-dim">
              Курс ЦБ РФ
            </span>
            <RefreshButton refreshing={refreshing} onClick={refresh} />
          </div>
          {rates ? (
            <>
              <div className="divide-y divide-border-subtle">
                <RateRow code="$" label="Доллар США" rate={rates.usd} />
                <RateRow code="€" label="Евро" rate={rates.eur} />
                <RateRow code="¥" label="Юань" rate={rates.cny} />
                {rates.gold && (
                  <RateRow code="Au" label="Золото" rate={rates.gold} unit="₽/г" />
                )}
              </div>
              {updatedAt && (
                <p className="mt-3 border-t border-border-subtle pt-2 text-[11px] text-dimmer">
                  Актуально на момент {formatUpdatedAt(updatedAt)}
                </p>
              )}
            </>
          ) : (
            <p className="py-3 text-sm text-dim">Курс временно недоступен.</p>
          )}
        </div>

        {/* Пульс маркетплейсов */}
        <MarketPulse entries={pulse} />
      </div>
    </div>
  );
}
