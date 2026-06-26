// Курсы валют ЦБ РФ через открытый JSON-зеркало cbr-xml-daily.ru, плюс
// учётные цены на драгметаллы с официального XML ЦБ. Выполняется на сервере
// с почасовым кешем (ISR).

export interface CurrencyRate {
  value: number;
  previous: number;
}

export interface Rates {
  usd: CurrencyRate;
  eur: CurrencyRate;
  cny: CurrencyRate;
  kzt: CurrencyRate;
  gold?: CurrencyRate; // ₽ за грамм
  silver?: CurrencyRate; // ₽ за грамм
  date: string; // ISO дата официального курса
}

const RATES_URL = "https://www.cbr-xml-daily.ru/daily_json.js";
const METALS_URL = "https://www.cbr.ru/scripts/xml_metall.asp";
const REVALIDATE_SECONDS = 3600;

// Приводим курс к стоимости одной единицы валюты (ЦБ даёт тенге за 100 и т.п.).
function perUnit(v: { Value: number; Previous: number; Nominal: number }): CurrencyRate {
  const nominal = v.Nominal || 1;
  return { value: v.Value / nominal, previous: v.Previous / nominal };
}

// Из XML драгметаллов берём последнюю котировку как текущую и предыдущую дату
// как «вчерашнюю» — для стрелки динамики. Code: 1 — золото, 2 — серебро.
function parseMetal(xml: string, code: string): CurrencyRate | undefined {
  const re = new RegExp(`<Record[^>]*Code="${code}"><Buy>([\\d.,\\s]+)</Buy>`, "g");
  const values: number[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) {
    const num = parseFloat(m[1].replace(/\s/g, "").replace(",", "."));
    if (!Number.isNaN(num)) values.push(num);
  }
  if (values.length === 0) return undefined;
  const value = values[values.length - 1];
  const previous = values.length > 1 ? values[values.length - 2] : value;
  return { value, previous };
}

// Кеш-политика fetch: обычно почасовой ISR, но при ручном обновлении (кнопка
// в виджете) запрашиваем напрямую, минуя кеш.
type CacheInit = Pick<RequestInit, "cache"> & {
  next?: { revalidate: number };
};
function cacheInit(fresh?: boolean): CacheInit {
  return fresh
    ? { cache: "no-store" }
    : { next: { revalidate: REVALIDATE_SECONDS } };
}

async function fetchMetals(
  fresh?: boolean,
): Promise<{ gold?: CurrencyRate; silver?: CurrencyRate }> {
  try {
    const now = new Date();
    const from = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const fmt = (d: Date) =>
      `${String(d.getDate()).padStart(2, "0")}/${String(
        d.getMonth() + 1,
      ).padStart(2, "0")}/${d.getFullYear()}`;
    const url = `${METALS_URL}?date_req1=${fmt(from)}&date_req2=${fmt(now)}`;
    const res = await fetch(url, cacheInit(fresh));
    if (!res.ok) return {};
    const xml = await res.text();
    return { gold: parseMetal(xml, "1"), silver: parseMetal(xml, "2") };
  } catch {
    return {};
  }
}

export async function fetchRates(opts?: { fresh?: boolean }): Promise<Rates | null> {
  const fresh = opts?.fresh;
  try {
    const [res, metals] = await Promise.all([
      fetch(RATES_URL, cacheInit(fresh)),
      fetchMetals(fresh),
    ]);
    if (!res.ok) return null;
    const data = await res.json();
    const valute = data?.Valute;
    const usd = valute?.USD;
    const eur = valute?.EUR;
    const cny = valute?.CNY;
    const kzt = valute?.KZT;
    if (!usd || !eur || !cny || !kzt) return null;
    return {
      usd: perUnit(usd),
      eur: perUnit(eur),
      cny: perUnit(cny),
      kzt: perUnit(kzt),
      gold: metals.gold,
      silver: metals.silver,
      date: data.Date,
    };
  } catch {
    return null;
  }
}
