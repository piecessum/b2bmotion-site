import {
  wikiFunctionArticles,
  wikiCustomArticles,
  wikiTechArticles,
  type WikiFunctionArticle,
  type WikiCustomArticle,
  type WikiTechArticle,
} from "@/lib/wiki-content";

/* ── Types ── */

export type SectionId = "function" | "custom" | "tech";

export interface WikiArticle {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  section: SectionId;
  sectionTitle: string;
  category: string;
  categoryId: string;
  url: string;
  raw: any[];
}

export interface WikiCategory {
  id: string;
  title: string;
  articles: WikiArticle[];
}

export interface WikiSection {
  id: SectionId;
  title: string;
  shortTitle: string;
  description: string;
  audience: string;
  accent: string;
  categories: WikiCategory[];
  articleCount: number;
}

/* ── Helpers ── */

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getDescription(text: any[], limit = 180): string {
  const firstText = text.find((t: any) => t.ty === "text")?.te || "";
  const plain = stripHtml(firstText);
  return plain.length > limit ? plain.substring(0, limit).trimEnd() + "…" : plain;
}

function getPlainText(text: any[]): string {
  return text
    .filter((t: any) => t.ty === "text")
    .map((t: any) => stripHtml(t.te || ""))
    .join(" ");
}

const TRANSLIT_MAP: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts",
  ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
  я: "ya",
};

function slugifyCategory(title: string): string {
  const lower = title.toLowerCase();
  let result = "";
  for (const ch of lower) {
    if (TRANSLIT_MAP[ch] !== undefined) result += TRANSLIT_MAP[ch];
    else if (/[a-z0-9]/.test(ch)) result += ch;
    else if (/\s|[-_/]/.test(ch)) result += "-";
  }
  return result.replace(/-+/g, "-").replace(/^-|-$/g, "");
}

/* ── Category ordering per section (target tree from product) ── */

const FUNCTION_CATEGORY_ORDER: string[] = [
  "Регистрация и авторизация",
  "Интеллектуальный поиск",
  "Личный кабинет покупателя",
  "Личный кабинет продавца",
  "Каталог и товары",
  "Прайсы, цены, скидки, валюты",
  "Модуль оплаты",
  "Модуль доставки",
  "Модуль документооборота",
  "Модуль коммерческих предложений (КП)",
  "Модуль рассылок",
  "Модуль статистики",
  "Мобильное приложение",
];

const CUSTOM_CATEGORY_ORDER: string[] = [
  "Каталог и товары",
  "Регионы и склады",
  "Оплата и доставка",
  "Пользователи",
  "Компании",
  "Спецификации",
  "Главная страница",
  "Поиск",
  "Настройки",
  "Уведомления",
  "Онлайн-чат",
  "«Помощь» для клиента",
  "Правовые документы",
  "Реклама",
  "Статистика",
  "Мониторинг шлюзовых таблиц (ШТ)",
  "SEO",
];

const TECH_CATEGORY_ORDER: string[] = [
  "Общие сведения B2B-системы",
  "Интеграция с шлюзовыми таблицами (ШТ)",
  "Интеграция с 1С",
  "Интеграция с БД РАЭК",
  "Подключение по API",
  "Экспорт для Яндекс и Google",
];

/* Slugs that should appear first within their category. */
const ARTICLE_PRIORITY: Record<string, number> = {
  "struktura-bd": 0,
};

const SECTIONS_META: Record<
  SectionId,
  {
    title: string;
    shortTitle: string;
    description: string;
    audience: string;
    accent: string;
  }
> = {
  function: {
    title: "Функционал системы",
    shortTitle: "Функционал",
    description:
      "Обзор возможностей платформы — что доступно покупателю и продавцу из коробки. Скрины и общее описание без детальных настроек.",
    audience: "Для ЛПР при выборе системы",
    accent: "#3B82F6",
  },
  custom: {
    title: "Кастомизация под клиента",
    shortTitle: "Кастомизация",
    description:
      "Подробные инструкции по настройке системы под конкретного клиента: каталог, цены, оплата, документы, пользователи.",
    audience: "Для администраторов системы",
    accent: "#8B5CF6",
  },
  tech: {
    title: "Технические сведения",
    shortTitle: "Технические сведения",
    description:
      "Интеграции, API, структура БД и шлюзовые таблицы — всё, что нужно для поддержки и развития системы на стороне заказчика.",
    audience: "Для технических специалистов заказчика",
    accent: "#10B981",
  },
};

/* ── Tree builder ── */

function articlesToWikiArticles<
  T extends WikiFunctionArticle | WikiCustomArticle | WikiTechArticle,
>(articles: T[], section: SectionId): WikiArticle[] {
  return articles
    .filter((a) => a.text && a.text.length > 0)
    .map((a) => {
      const baseUrl = `/wiki/${section}/${a.slug}`;
      const rawCategory = (a.category || "").split(";")[0].trim() || "Без категории";
      return {
        id: a.id,
        title: a.title,
        description: getDescription(a.text),
        image: a.image,
        slug: a.slug,
        section,
        sectionTitle: SECTIONS_META[section].title,
        category: rawCategory,
        categoryId: slugifyCategory(rawCategory) || "bez-kategorii",
        url: baseUrl,
        raw: a.text,
      };
    });
}

function buildSection(
  id: SectionId,
  articles: WikiArticle[],
  order: string[],
): WikiSection {
  const meta = SECTIONS_META[id];

  const byTitle = new Map<string, WikiArticle[]>();
  for (const a of articles) {
    const list = byTitle.get(a.category) ?? [];
    list.push(a);
    byTitle.set(a.category, list);
  }

  const orderedTitles: string[] = [];
  for (const t of order) {
    if (byTitle.has(t)) orderedTitles.push(t);
  }
  // append unknown categories (not listed in order) at the end
  for (const t of byTitle.keys()) {
    if (!orderedTitles.includes(t)) orderedTitles.push(t);
  }

  const categories: WikiCategory[] = orderedTitles.map((title) => {
    const list = (byTitle.get(title) ?? []).slice().sort((a, b) => {
      const pa = ARTICLE_PRIORITY[a.slug] ?? 100;
      const pb = ARTICLE_PRIORITY[b.slug] ?? 100;
      return pa - pb;
    });
    return {
      id: slugifyCategory(title) || "bez-kategorii",
      title,
      articles: list,
    };
  }).filter((c) => c.articles.length > 0);

  const articleCount = categories.reduce((n, c) => n + c.articles.length, 0);

  return {
    id,
    title: meta.title,
    shortTitle: meta.shortTitle,
    description: meta.description,
    audience: meta.audience,
    accent: meta.accent,
    categories,
    articleCount,
  };
}

const FUNCTION_ARTICLES = articlesToWikiArticles(
  wikiFunctionArticles,
  "function",
);
const CUSTOM_ARTICLES = articlesToWikiArticles(wikiCustomArticles, "custom");
const TECH_ARTICLES = articlesToWikiArticles(wikiTechArticles, "tech");

export const wikiSections: WikiSection[] = [
  buildSection("function", FUNCTION_ARTICLES, FUNCTION_CATEGORY_ORDER),
  buildSection("custom", CUSTOM_ARTICLES, CUSTOM_CATEGORY_ORDER),
  buildSection("tech", TECH_ARTICLES, TECH_CATEGORY_ORDER),
];

export const allWikiArticles: WikiArticle[] = wikiSections.flatMap((s) =>
  s.categories.flatMap((c) => c.articles),
);

/* ── Lookups ── */

export function getSection(id: SectionId): WikiSection | undefined {
  return wikiSections.find((s) => s.id === id);
}

export function getCategory(
  sectionId: SectionId,
  categoryId: string,
): { section: WikiSection; category: WikiCategory } | null {
  const section = getSection(sectionId);
  if (!section) return null;
  const category = section.categories.find((c) => c.id === categoryId);
  if (!category) return null;
  return { section, category };
}

export function getArticleBySlug(
  sectionId: SectionId,
  slug: string,
): WikiArticle | undefined {
  return allWikiArticles.find(
    (a) => a.section === sectionId && a.slug === slug,
  );
}

export function findArticleAnywhere(slug: string): WikiArticle | undefined {
  return allWikiArticles.find((a) => a.slug === slug);
}

/* ── Search ── */

export interface WikiSearchResult {
  article: WikiArticle;
  score: number;
}

export function searchWiki(query: string, limit = 50): WikiSearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  const results: WikiSearchResult[] = [];

  for (const article of allWikiArticles) {
    const title = article.title.toLowerCase();
    const desc = article.description.toLowerCase();
    const cat = article.category.toLowerCase();
    const body = getPlainText(article.raw).toLowerCase();

    let score = 0;
    let matchedAll = true;

    for (const token of tokens) {
      if (title.includes(token)) score += 10;
      else if (cat.includes(token)) score += 6;
      else if (desc.includes(token)) score += 4;
      else if (body.includes(token)) score += 1;
      else {
        matchedAll = false;
        break;
      }
    }

    if (matchedAll && score > 0) {
      if (title.includes(q)) score += 20;
      results.push({ article, score });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

/* ── "С чего начать" — onboarding sequence ── */

export interface OnboardingStep {
  step: number;
  title: string;
  hint: string;
  slug: string;
  section: SectionId;
}

const ONBOARDING_RAW: Array<Omit<OnboardingStep, "step"> & { step?: number }> = [
  {
    title: "Регистрация и авторизация",
    hint: "Как клиент попадает в систему: регистрация, вход, восстановление пароля.",
    slug: "registratsiya-i-avtorizatsiya",
    section: "function",
  },
  {
    title: "Личный кабинет покупателя",
    hint: "Что доступно клиенту в личном кабинете после входа.",
    slug: "lichnyy-kabinet-pokupatelya",
    section: "function",
  },
  {
    title: "Каталог и товары",
    hint: "Структура каталога, карточки товаров, единицы измерения, кратность.",
    slug: "katalog-i-tovary",
    section: "function",
  },
  {
    title: "Интеллектуальный поиск",
    hint: "Как работает поиск: подсказки, ранжирование, частые проблемы.",
    slug: "intellektualnyy-poisk",
    section: "function",
  },
  {
    title: "Цены и скидки",
    hint: "Как формируются персональные цены и применяются скидки.",
    slug: "tseny-i-skidki",
    section: "function",
  },
  {
    title: "Оплата в B2B-системе",
    hint: "Способы оплаты, счета, эквайринг, QR-коды.",
    slug: "oplata-v-b2b-sisteme",
    section: "function",
  },
  {
    title: "Доставка",
    hint: "Способы доставки, самовывоз, расчёт стоимости.",
    slug: "dostavka",
    section: "function",
  },
  {
    title: "Документооборот в B2B-системе",
    hint: "Счета, накладные, акты сверки, электронные документы.",
    slug: "dokumentooborot-v-b2b-sisteme",
    section: "function",
  },
];

export const onboardingSteps: OnboardingStep[] = ONBOARDING_RAW.map(
  (s, i) => ({ ...s, step: i + 1 }),
).filter((s) => !!getArticleBySlug(s.section, s.slug));

/* ── URL helpers ── */

export function sectionUrl(id: SectionId): string {
  return `/wiki/${id}`;
}

export function categoryUrl(sectionId: SectionId, categoryId: string): string {
  return `/wiki/${sectionId}/category/${categoryId}`;
}

export function articleUrl(article: WikiArticle): string {
  return article.url;
}
