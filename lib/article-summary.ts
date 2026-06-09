// Бесплатный серверный «пересказ» внешней новости — без LLM и без затрат.
// Качаем оригинал статьи по sourceUrl, вытаскиваем основной текст из <p>,
// строим экстрактивный конспект (выбор ключевых предложений по частоте слов).
// Результат кешируется через ISR на странице новости. Если статью не достать
// (пейволл, бот-защита, мало текста) — возвращаем null, и страница откатывается
// на анонс из RSS. То есть хуже текущего поведения не станет нигде.

import { stripTags } from "./b2b-news";

// Стоп-слова: служебная лексика, не несущая смысла для скоринга предложений.
const STOPWORDS = new Set([
  "и", "в", "во", "не", "что", "он", "на", "я", "с", "со", "как", "а", "то",
  "все", "она", "так", "его", "но", "да", "ты", "к", "у", "же", "вы", "за",
  "бы", "по", "только", "ее", "её", "мне", "было", "вот", "от", "меня", "еще",
  "нет", "о", "из", "ему", "теперь", "когда", "даже", "ну", "вдруг", "ли",
  "если", "уже", "или", "ни", "быть", "был", "него", "до", "вас", "нибудь",
  "опять", "уж", "вам", "ведь", "там", "потом", "себя", "ничего", "ей", "может",
  "они", "тут", "где", "есть", "надо", "ней", "для", "мы", "тебя", "их", "чем",
  "была", "сам", "чтоб", "без", "будто", "чего", "раз", "тоже", "себе", "под",
  "будет", "ж", "тогда", "кто", "этот", "того", "потому", "этого", "какой",
  "совсем", "ним", "здесь", "этом", "один", "почти", "мой", "тем", "чтобы",
  "нее", "сейчас", "были", "куда", "зачем", "всех", "никогда", "можно", "при",
  "наконец", "два", "об", "другой", "хоть", "после", "над", "больше", "тот",
  "через", "эти", "нас", "про", "всего", "них", "какая", "много", "разве",
  "три", "эту", "моя", "впрочем", "хорошо", "свою", "этой", "перед", "иногда",
  "лучше", "чуть", "том", "нельзя", "такой", "им", "более", "всегда", "конечно",
  "всю", "между", "это", "млн", "млрд", "руб", "года", "году", "год",
  "the", "of", "to", "and", "a", "in", "is", "it", "for", "on", "with", "as",
  "by", "at", "from", "that", "this", "an", "be", "or", "are", "was", "has",
]);

const BOILERPLATE_PATTERNS = [
  /\bскопировать ссылку\b/i,
  /\bподелиться\b/i,
  /\bчитайте нас в\b/i,
  /\bподписывайтесь\b/i,
  /\bитогов(ая|ую|ой|ую)? рассылк[ауеи]\b/i,
  /\bрассылка самых важных новостей\b/i,
  /\btelegram\b/i,
  /\bтелеграм\b/i,
  /\bдзен\b/i,
  /\bкомментарии\b/i,
  /\bавторизуйтесь\b/i,
  /\bcookie\b/i,
  /\bреклама\b/i,
];

const LEADING_NOISE_PATTERNS = [
  /^(?:скопировать ссылку\s*)+/i,
  /^(?:читайте нас в\s+[A-ZА-ЯЁ0-9_-]+\s*)+/i,
  /^(?:поделиться\s*)+/i,
];

// Достаём читаемый текст статьи: режем шум, по возможности сужаемся до <article>,
// собираем содержательные абзацы из <p>.
function extractArticleText(html: string): string {
  let h = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");

  // Если есть семантический <article> — тело новости обычно внутри него.
  const article = h.match(/<article[\s\S]*?<\/article>/i);
  if (article) h = article[0];

  const paras = h.match(/<p[\s\S]*?<\/p>/gi) || [];
  return paras
    .map((p) => stripTags(p))
    // Короткие <p> — это подписи к фото, меню, копирайт, кнопки. Отсекаем.
    .filter((t) => t.length >= 60 && !isBoilerplate(t))
    .join("\n");
}

function cleanSentence(sentence: string): string {
  let out = sentence.replace(/\s+/g, " ").trim();
  for (const pattern of LEADING_NOISE_PATTERNS) {
    out = out.replace(pattern, "").trim();
  }
  return out;
}

function isBoilerplate(text: string): boolean {
  const normalized = text.toLowerCase();
  return BOILERPLATE_PATTERNS.some((pattern) => pattern.test(normalized));
}

function hasDanglingReference(sentence: string): boolean {
  return (
    /^(?:они|их|это|этот|эта|эти|такой|такие|также|при этом)\b/i.test(sentence) ||
    /\b(?:в их|для их|их|ими|ними|них|этого|этой|этих|таких)\b/i.test(sentence)
  );
}

// Грубое разбиение на предложения. Делим по концу предложения только если
// дальше идёт заглавная буква/кавычка — так не рвём сокращения («т.д.», «г.»).
function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?…])\s+(?=[А-ЯЁA-Z«"„])/)
    .map(cleanSentence)
    .filter((s) => s && !isBoilerplate(s));
}

// Значимые слова предложения (без стоп-слов и коротышей) для скоринга.
function meaningfulWords(sentence: string): string[] {
  return (sentence.toLowerCase().match(/[a-zа-яё0-9]+/gi) || []).filter(
    (w) => w.length >= 3 && !STOPWORDS.has(w),
  );
}

// Экстрактивный конспект: возвращает несколько ключевых предложений статьи
// в исходном порядке. null — если текста слишком мало для осмысленного итога.
export function summarizeText(
  text: string,
  maxSentences = 3,
  maxChars = 700,
): string[] | null {
  const sentences = splitSentences(text).filter((s) => {
    if (s.length < 40 || s.length > 400) return false;
    // Если предложение всё ещё начинается с UI-мусора, оно обычно слиплось с
    // текстом статьи без пунктуации. Не берём его в сводку.
    if (/^(?:скопировать|читать|читайте|подписывайтесь|поделиться)\b/i.test(s)) {
      return false;
    }
    return true;
  });
  if (sentences.length < 3) return null;

  // Частота значимых слов по всему документу.
  const freq = new Map<string, number>();
  for (const s of sentences) {
    for (const w of meaningfulWords(s)) freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  let max = 0;
  for (const v of freq.values()) if (v > max) max = v;
  if (max === 0) return null;

  // Оценка предложения = средняя нормированная частота его слов с лёгким
  // бонусом за раннюю позицию (новость — перевёрнутая пирамида, суть в начале).
  const scored = sentences.map((s, i) => {
    const ws = meaningfulWords(s);
    if (ws.length === 0) return { s, i, score: 0 };
    let sum = 0;
    for (const w of ws) sum += (freq.get(w) ?? 0) / max;
    const positionBoost = 1 + Math.max(0, 5 - i) * 0.04;
    return { s, i, score: (sum / ws.length) * positionBoost };
  });

  const picked = scored
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSentences)
    .sort((a, b) => a.i - b.i) // вернуть в исходном порядке чтения
    .map((p) => {
      if (!hasDanglingReference(p.s)) return p.s;

      const previous = sentences[p.i - 1];
      if (
        previous &&
        previous.length >= 40 &&
        !hasDanglingReference(previous) &&
        previous.length + p.s.length <= 520
      ) {
        return `${previous} ${p.s}`;
      }

      return p.s;
    });

  const out: string[] = [];
  let total = 0;
  for (const s of picked) {
    if (total + s.length > maxChars && out.length > 0) break;
    out.push(s);
    total += s.length;
  }
  return out.length >= 2 ? out : null;
}

// Главная точка входа: по ссылке на оригинал отдаёт ключевые предложения статьи.
// Безопасна к любым сбоям сети/парсинга — при проблемах возвращает null.
export async function getArticleSummary(url: string): Promise<string[] | null> {
  try {
    // Не даём медленному источнику подвешивать рендер страницы новости.
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; b2bmotion-news-bot/1.0)",
      },
      signal: AbortSignal.timeout(5000),
      // Пересказ статьи не меняется — держим в ISR-кеше сутки.
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    if (!(res.headers.get("content-type") || "").includes("html")) return null;

    const text = extractArticleText(await res.text());
    if (text.length < 200) return null;
    return summarizeText(text);
  } catch {
    return null;
  }
}
