"use client";

import { useState } from "react";

// Лёгкий демонстрационный прототип для новости «Зависимость цены от адреса
// и даты доставки». Пользователь переключает адрес и дату — итоговая сумма,
// стоимость доставки и метка на карте пересчитываются на лету. Числа условные:
// задача — показать принцип, а не воспроизвести боевой расчёт логистики.

const GOODS = 36990.45; // Итого по товарам (фикс.)
const DISCOUNT = 12415.6; // Сумма персональной скидки (фикс.)
const WEIGHT = 700; // кг

type Address = {
  id: string;
  short: string;
  base: number; // базовая стоимость доставки по удалённости
  pin: { x: number; y: number }; // позиция метки на карте
};

const ADDRESSES: Address[] = [
  { id: "mosk", short: "Московский пр-т, 122", base: 250, pin: { x: 118, y: 168 } },
  { id: "yan", short: "ул. 9 Января, 45", base: 330, pin: { x: 78, y: 250 } },
  { id: "rev", short: "пр-т Революции, 75", base: 420, pin: { x: 150, y: 138 } },
];

// Загруженность маршрутов по дню недели (0 = Пн … 6 = Вс).
// Июль 2025: 1-е число — вторник, поэтому индекс дня недели = day % 7.
const LOAD_BY_WEEKDAY = [120, 90, 60, 140, 100, -40, -60];

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

// Сетка календаря на июль 2025 (5 недель, дни соседних месяцев приглушены).
const LEADING = [30]; // хвост июня
const MONTH_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const TRAILING = [1, 2, 3]; // начало августа

function rub(n: number): string {
  return (
    n.toLocaleString("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " ₽"
  );
}

// Надбавка/скидка за день в виде «+140 ₽» / «−60 ₽» / «0 ₽».
function fmtDelta(n: number): string {
  if (n > 0) return `+${n} ₽`;
  if (n < 0) return `−${-n} ₽`;
  return "0 ₽";
}

function loadFor(day: number): { surcharge: number; label: string } {
  const surcharge = LOAD_BY_WEEKDAY[day % 7];
  const label =
    surcharge >= 100
      ? "маршрут загружен"
      : surcharge <= 0
        ? "свободный день"
        : "средняя загрузка";
  return { surcharge, label };
}

export function DeliveryPriceDemo() {
  const [addressId, setAddressId] = useState("yan");
  const [pickup, setPickup] = useState(false);
  const [day, setDay] = useState(18);
  const [cash, setCash] = useState(false); // false = безналичные
  const [bonuses, setBonuses] = useState(false);

  const address = ADDRESSES.find((a) => a.id === addressId) ?? ADDRESSES[1];
  const { surcharge, label } = loadFor(day);
  const surchargeText = fmtDelta(surcharge);

  const delivery = Math.max(120, address.base + surcharge);
  const pickupDiscount = Math.round(GOODS * 0.02 * 100) / 100;
  const total = pickup ? GOODS - pickupDiscount : GOODS + delivery;

  return (
    <div
      className="not-prose my-8 overflow-hidden rounded-2xl border shadow-lg lg:-mx-20 xl:-mx-44"
      style={{ background: "#F4F5F8", borderColor: "#E6E8EE", color: "#1F2430" }}
    >
      {/* Шапка прототипа */}
      <div
        className="flex items-center gap-3 border-b px-5 py-2"
        style={{ background: "#FFFFFF", borderColor: "#E6E8EE" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/LogoMobile.svg" alt="Движение" className="h-9 w-auto" />
        <span className="text-xs" style={{ color: "#8A90A2" }}>
          Демонстрационный прототип
        </span>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1fr_300px]">
        {/* Левая колонка: заказ + доставка */}
        <div className="flex flex-col gap-4">
          {/* Карточка заказа */}
          <div
            className="rounded-xl border p-4"
            style={{ background: "#FFFFFF", borderColor: "#E6E8EE" }}
          >
            <div className="flex items-start justify-between">
              <div className="text-sm font-semibold">Продавец: ОптСейл Про</div>
              <div className="text-xs" style={{ color: "#8A90A2" }}>
                Заказ №1
              </div>
            </div>
            <p className="mt-2 text-xs leading-relaxed" style={{ color: "#16A34A" }}>
              <span className="font-semibold">Доступна персональная скидка!</span>{" "}
              <span style={{ color: "#5A6072" }}>
                Для товаров бренда Savecome согласовали скидку 8%
              </span>
            </p>
            <div className="mt-3 text-sm font-medium" style={{ color: "#4E48A5" }}>
              8 позиций
            </div>
            <div className="text-xs" style={{ color: "#8A90A2" }}>
              Итого: {rub(GOODS)}
            </div>
          </div>

          {/* Доставка: табы + адреса + календарь + карта */}
          <div
            className="rounded-xl border p-4"
            style={{ background: "#FFFFFF", borderColor: "#E6E8EE" }}
          >
            {/* Табы способа доставки */}
            <div
              className="mb-4 grid grid-cols-2 rounded-lg p-1 text-sm font-medium"
              style={{ background: "#EEF0F5" }}
            >
              {[
                { k: false, t: "Доставка" },
                { k: true, t: "Самовывоз" },
              ].map(({ k, t }) => (
                <button
                  key={t}
                  onClick={() => setPickup(k)}
                  className="rounded-md py-1.5 transition-colors"
                  style={
                    pickup === k
                      ? { background: "#FFFFFF", color: "#1F2430", boxShadow: "0 1px 2px rgba(0,0,0,.08)" }
                      : { background: "transparent", color: "#8A90A2" }
                  }
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Список адресов */}
              <div>
                <div className="flex flex-col gap-2">
                  {ADDRESSES.map((a) => {
                    const active = !pickup && a.id === addressId;
                    return (
                      <button
                        key={a.id}
                        disabled={pickup}
                        onClick={() => setAddressId(a.id)}
                        className="flex items-center gap-2.5 text-left text-sm transition-opacity disabled:opacity-40"
                      >
                        <span
                          className="grid h-4 w-4 shrink-0 place-items-center rounded-full border-2"
                          style={{ borderColor: active ? "#4E48A5" : "#C3C8D4" }}
                        >
                          {active && (
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ background: "#4E48A5" }}
                            />
                          )}
                        </span>
                        <span>Воронеж — {a.short}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Календарь */}
                <div
                  className="mt-4 rounded-lg border p-3"
                  style={{ borderColor: "#E6E8EE" }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold">Дата доставки</span>
                    <span className="text-[11px]" style={{ color: "#8A90A2" }}>
                      Июль 2025
                    </span>
                  </div>
                  <div
                    className="grid grid-cols-7 gap-1 text-center text-[11px]"
                    style={{ color: "#8A90A2" }}
                  >
                    {WEEKDAYS.map((w) => (
                      <span key={w}>{w}</span>
                    ))}
                    {LEADING.map((d) => (
                      <span key={`l${d}`} style={{ color: "#C3C8D4" }} className="py-1">
                        {d}
                      </span>
                    ))}
                    {MONTH_DAYS.map((d) => {
                      const active = d === day;
                      const s = LOAD_BY_WEEKDAY[d % 7];
                      const deltaColor = active
                        ? "rgba(255,255,255,.85)"
                        : s > 0
                          ? "#C2410C"
                          : s < 0
                            ? "#16A34A"
                            : "#8A90A2";
                      return (
                        <button
                          key={d}
                          onClick={() => setDay(d)}
                          className="flex flex-col items-center rounded-md py-1 leading-none transition-colors"
                          style={
                            active
                              ? { background: "#4E48A5", color: "#FFFFFF", fontWeight: 600 }
                              : { color: "#1F2430" }
                          }
                        >
                          <span className="text-sm">{d}</span>
                          <span
                            className="mt-0.5 text-[9px] font-medium"
                            style={{ color: deltaColor }}
                          >
                            {fmtDelta(s)}
                          </span>
                        </button>
                      );
                    })}
                    {TRAILING.map((d) => (
                      <span key={`t${d}`} style={{ color: "#C3C8D4" }} className="py-1">
                        {d}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-[11px]" style={{ color: "#8A90A2" }}>
                    {pickup ? "самовывоз — дата на ваш выбор" : `${surchargeText} — ${label}`}
                  </p>
                </div>
              </div>

              {/* Карта — заполняет всю высоту очерченного блока */}
              <div
                className="relative h-full overflow-hidden rounded-lg border"
                style={{ borderColor: "#E6E8EE", minHeight: 260 }}
              >
                <svg
                  viewBox="0 0 220 360"
                  preserveAspectRatio="xMidYMid slice"
                  className="absolute inset-0 h-full w-full"
                >
                  <rect width="220" height="360" fill="#EDEFF2" />
                  {/* река — правая треть */}
                  <path
                    d="M150 -10 C 138 60, 176 115, 158 175 C 144 225, 178 260, 168 370 L230 370 L230 -10 Z"
                    fill="#AFD4E8"
                  />
                  {/* парк */}
                  <circle cx="48" cy="150" r="34" fill="#DCE7DA" />
                  {/* дороги */}
                  <path d="M0 205 L220 172" stroke="#F2C94C" strokeWidth="3" fill="none" />
                  <path d="M72 -10 L124 370" stroke="#D7DBE3" strokeWidth="5" fill="none" />
                  <path d="M0 280 L220 305" stroke="#D7DBE3" strokeWidth="3" fill="none" />
                  <text x="44" y="242" fontSize="13" fontWeight="700" fill="#6B7280">
                    Воронеж
                  </text>

                  {/* метка адреса — плавно переезжает */}
                  {!pickup && (
                    <g
                      style={{
                        transform: `translate(${address.pin.x}px, ${address.pin.y}px)`,
                        transition: "transform .45s cubic-bezier(.4,0,.2,1)",
                      }}
                    >
                      <ellipse cx="0" cy="2" rx="7" ry="3" fill="rgba(0,0,0,.18)" />
                      <path
                        d="M0 -22 C -9 -22, -12 -12, 0 0 C 12 -12, 9 -22, 0 -22 Z"
                        fill="#4E48A5"
                      />
                      <circle cx="0" cy="-15" r="3.5" fill="#FFFFFF" />
                    </g>
                  )}
                </svg>

                <div
                  className="absolute inset-x-2 bottom-2 rounded-md px-2.5 py-1.5 text-[11px] font-medium shadow-sm"
                  style={{ background: "rgba(255,255,255,.92)", color: "#1F2430" }}
                >
                  {pickup ? "Самовывоз со склада" : `Воронеж, ${address.short}`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Правая колонка: оплата */}
        <div
          className="flex h-fit flex-col rounded-xl border p-4"
          style={{ background: "#FFFFFF", borderColor: "#E6E8EE" }}
        >
          <div className="mb-4">
            <span className="text-base font-semibold">Оплата</span>
          </div>

          <div
            className="mb-4 grid grid-cols-2 rounded-lg p-1 text-xs font-medium"
            style={{ background: "#EEF0F5" }}
          >
            {[
              { k: false, t: "Безналичные" },
              { k: true, t: "Наличные" },
            ].map(({ k, t }) => (
              <button
                key={t}
                onClick={() => setCash(k)}
                className="rounded-md py-1.5 text-center transition-colors"
                style={
                  cash === k
                    ? { background: "#FFFFFF", color: "#1F2430", boxShadow: "0 1px 2px rgba(0,0,0,.08)" }
                    : { background: "transparent", color: "#8A90A2" }
                }
              >
                {t}
              </button>
            ))}
          </div>

          <Row label="Сумма заказа с НДС">
            <span
              className="text-base font-bold tabular-nums transition-colors"
              style={{ color: "#16A34A" }}
            >
              {rub(total)}
            </span>
          </Row>
          <Row label="Сумма скидки">
            <span className="font-semibold tabular-nums">{rub(DISCOUNT)}</span>
          </Row>
          <Row label="Общий вес заказа">
            <span className="font-semibold tabular-nums">{WEIGHT},00 кг</span>
          </Row>
          {pickup ? (
            <Row label="Скидка за самовывоз">
              <span className="font-semibold tabular-nums" style={{ color: "#16A34A" }}>
                −{rub(pickupDiscount)}
              </span>
            </Row>
          ) : (
            <Row label="Доставка">
              <span className="font-semibold tabular-nums" style={{ color: "#5A6072" }}>
                {rub(delivery)}
              </span>
            </Row>
          )}

          <div className="my-3 flex items-center justify-between">
            <span className="text-sm" style={{ color: "#5A6072" }}>
              Использовать бонусы
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={bonuses}
              aria-label="Использовать бонусы"
              onClick={() => setBonuses((b) => !b)}
              className="grid h-5 w-9 items-center rounded-full px-0.5 transition-colors"
              style={{ background: bonuses ? "#4E48A5" : "#D7DBE3" }}
            >
              <span
                className="h-4 w-4 rounded-full bg-white shadow-sm transition-transform"
                style={{ transform: bonuses ? "translateX(16px)" : "translateX(0)" }}
              />
            </button>
          </div>

          <div
            className="mb-3 rounded-lg border px-3 py-2 text-xs"
            style={{ borderColor: "#E6E8EE", color: "#8A90A2" }}
          >
            Введите промокод
          </div>

          <button
            className="rounded-lg py-2.5 text-sm font-semibold text-white transition-transform active:scale-[.99]"
            style={{ background: "#4E48A5" }}
          >
            Оформить заказ
          </button>
          <p className="mt-3 text-[11px] leading-relaxed" style={{ color: "#8A90A2" }}>
            Нажимая кнопку «Оформить заказ», вы принимаете{" "}
            <span style={{ color: "#4E48A5" }}>условия оферты</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b py-2.5 text-sm" style={{ borderColor: "#F0F1F5" }}>
      <span style={{ color: "#5A6072" }}>{label}</span>
      {children}
    </div>
  );
}
