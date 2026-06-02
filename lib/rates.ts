// Курсы валют ЦБ РФ через открытый JSON-зеркало cbr-xml-daily.ru.
// Выполняется на сервере с почасовым кешем (ISR).

export interface CurrencyRate {
  value: number;
  previous: number;
}

export interface Rates {
  usd: CurrencyRate;
  eur: CurrencyRate;
  date: string; // ISO дата официального курса
}

const RATES_URL = "https://www.cbr-xml-daily.ru/daily_json.js";
const REVALIDATE_SECONDS = 3600;

export async function fetchRates(): Promise<Rates | null> {
  try {
    const res = await fetch(RATES_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const usd = data?.Valute?.USD;
    const eur = data?.Valute?.EUR;
    if (!usd || !eur) return null;
    return {
      usd: { value: usd.Value, previous: usd.Previous },
      eur: { value: eur.Value, previous: eur.Previous },
      date: data.Date,
    };
  } catch {
    return null;
  }
}
