import {
  wikiFunctionArticles,
  type WikiFunctionArticle,
} from "@/lib/wiki-function-data";
import {
  wikiCustomArticles,
  type WikiCustomArticle,
} from "@/lib/wiki-custom-data";
import {
  wikiTechArticles,
  type WikiTechArticle,
} from "@/lib/wiki-tech-data";

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
  groupId: string;
  groupTitle: string;
  url: string;
  raw: any[];
}

export interface WikiCategory {
  id: string;
  title: string;
  articles: WikiArticle[];
}

export interface WikiGroup {
  id: string;
  title: string;
  description?: string;
  categories: WikiCategory[];
  articleCount: number;
}

export interface WikiSection {
  id: SectionId;
  title: string;
  shortTitle: string;
  description: string;
  accent: string;
  groups: WikiGroup[];
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

function slugifyGroup(title: string): string {
  const lower = title.toLowerCase();
  let result = "";
  for (const ch of lower) {
    if (TRANSLIT_MAP[ch] !== undefined) result += TRANSLIT_MAP[ch];
    else if (/[a-z0-9]/.test(ch)) result += ch;
    else if (/\s|[-_/]/.test(ch)) result += "-";
    // drop everything else (punctuation, quotes, etc.)
  }
  return result.replace(/-+/g, "-").replace(/^-|-$/g, "");
}

/* ── Group definitions per section ──
 * Categories that are not listed here fall into "other" group.
 * "Без категории" is a special bucket.
 */

interface GroupDef {
  id: string;
  title: string;
  description?: string;
  categories: string[];
}

const FUNCTION_GROUPS: GroupDef[] = [
  {
    id: "start",
    title: "Старт работы",
    description: "Регистрация, личные кабинеты покупателя и продавца",
    categories: [
      "Регистрация и авторизация",
      "Личный кабинет покупателя",
      "Личный кабинет продавца в B2B-системе",
    ],
  },
  {
    id: "catalog",
    title: "Товары и поиск",
    description: "Каталог, поиск, цены и скидки",
    categories: [
      "Каталог и товары",
      "Интеллектуальный поиск",
      "Прайсы, цены, скидки, валюты",
    ],
  },
  {
    id: "modules",
    title: "Модули",
    description: "Документооборот, оплата, доставка, КП, рассылки, статистика",
    categories: [
      "Модуль документооборота",
      "Модуль оплаты",
      "Модуль доставки",
      "Модуль коммерческих предложений",
      "Модуль рассылок",
      "Модуль статистики",
    ],
  },
  {
    id: "platforms",
    title: "Платформы",
    description: "Мобильное приложение",
    categories: ["Мобильное приложение"],
  },
];

const CUSTOM_GROUPS: GroupDef[] = [
  {
    id: "storefront",
    title: "Витрина и контент",
    description: "Главная страница, каталог, поиск, спецификации, SEO, реклама",
    categories: [
      "Главная страница",
      "Каталог и товары",
      "Поиск",
      "Спецификации",
      "SEO",
      "Реклама",
    ],
  },
  {
    id: "clients",
    title: "Клиенты и компании",
    description: "Управление пользователями и компаниями",
    categories: ["Компании", "Пользователи"],
  },
  {
    id: "commerce",
    title: "Коммерция",
    description: "Оплата, доставка, регионы, склады, уведомления, статистика",
    categories: [
      "Оплата и доставка",
      "Регионы и склады",
      "Уведомления",
      "Статистика",
    ],
  },
  {
    id: "support",
    title: "Поддержка",
    description: "Онлайн-чат и блок «Помощь»",
    categories: ["Онлайн-чат", "Блок «Помощь»"],
  },
  {
    id: "documents",
    title: "Документы",
    description: "Правовые и бухгалтерские документы",
    categories: ["Правовые документы", "Юридические/бухгалтерские документы"],
  },
  {
    id: "system",
    title: "Системные",
    description: "Настройки и мониторинг",
    categories: ["Настройки", "Мониторинг ШТ"],
  },
];

const TECH_GROUPS: GroupDef[] = [
  {
    id: "intro",
    title: "Введение",
    description: "Общие сведения о B2B Enterprise",
    categories: ["Общие сведения"],
  },
  {
    id: "integrations",
    title: "Интеграции",
    description: "Подключение к внешним системам",
    categories: ["1C", "API", "РАЭК"],
  },
  {
    id: "data",
    title: "Структура данных",
    description: "Шлюзовые таблицы и БД",
    categories: ["Шлюзовые таблицы"],
  },
];

const SECTIONS_META: Record<
  SectionId,
  { title: string; shortTitle: string; description: string; accent: string }
> = {
  function: {
    title: "Функционал системы",
    shortTitle: "Функционал",
    description:
      "Базовый функционал платформы: что доступно покупателю и продавцу из коробки.",
    accent: "#3B82F6",
  },
  custom: {
    title: "Кастомизация под клиента",
    shortTitle: "Кастомизация",
    description:
      "Настройки и доработки, которые подключаются на стороне конкретного клиента.",
    accent: "#8B5CF6",
  },
  tech: {
    title: "Технические настройки",
    shortTitle: "Техника",
    description:
      "Интеграции, API, шлюзовые таблицы и другие технические аспекты внедрения.",
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
      const baseUrl =
        section === "function"
          ? `/wiki/function/${a.slug}`
          : section === "custom"
            ? `/wiki/custom/${a.slug}`
            : `/wiki/tech/${a.slug}`;
      // Some articles in CSV have a category like "A;B" — take the first.
      const rawCategory = (a.category || "").split(";")[0].trim();
      return {
        id: a.id,
        title: a.title,
        description: getDescription(a.text),
        image: a.image,
        slug: a.slug,
        section,
        sectionTitle: SECTIONS_META[section].title,
        category: rawCategory || "Без категории",
        groupId: "",
        groupTitle: "",
        url: baseUrl,
        raw: a.text,
      };
    });
}

function buildSection(
  id: SectionId,
  articles: WikiArticle[],
  groupDefs: GroupDef[],
): WikiSection {
  const meta = SECTIONS_META[id];
  const usedCategories = new Set<string>();

  const groups: WikiGroup[] = groupDefs.map((g) => {
    const categories: WikiCategory[] = g.categories.map((catTitle) => {
      usedCategories.add(catTitle);
      const list = articles
        .filter((a) => a.category === catTitle)
        .map((a) => ({ ...a, groupId: g.id, groupTitle: g.title }));
      return {
        id: slugifyGroup(catTitle),
        title: catTitle,
        articles: list,
      };
    });
    const articleCount = categories.reduce((n, c) => n + c.articles.length, 0);
    return {
      id: g.id,
      title: g.title,
      description: g.description,
      categories,
      articleCount,
    };
  });

  // Anything not assigned goes into "Прочее"
  const orphanCategories = new Set<string>();
  for (const a of articles) {
    if (!usedCategories.has(a.category)) orphanCategories.add(a.category);
  }
  if (orphanCategories.size > 0) {
    const cats: WikiCategory[] = Array.from(orphanCategories)
      .sort()
      .map((catTitle) => {
        const list = articles
          .filter((a) => a.category === catTitle)
          .map((a) => ({ ...a, groupId: "other", groupTitle: "Прочее" }));
        return {
          id: slugifyGroup(catTitle) || "bez-kategorii",
          title: catTitle,
          articles: list,
        };
      });
    const articleCount = cats.reduce((n, c) => n + c.articles.length, 0);
    if (articleCount > 0) {
      groups.push({
        id: "other",
        title: "Прочее",
        description: "Статьи без основной категории",
        categories: cats,
        articleCount,
      });
    }
  }

  // Filter out empty categories/groups for cleaner UI
  const cleanedGroups = groups
    .map((g) => ({
      ...g,
      categories: g.categories.filter((c) => c.articles.length > 0),
    }))
    .filter((g) => g.categories.length > 0);

  const totalCount = cleanedGroups.reduce((n, g) => n + g.articleCount, 0);

  return {
    id,
    title: meta.title,
    shortTitle: meta.shortTitle,
    description: meta.description,
    accent: meta.accent,
    groups: cleanedGroups,
    articleCount: totalCount,
  };
}

const FUNCTION_ARTICLES = articlesToWikiArticles(
  wikiFunctionArticles,
  "function",
);
const CUSTOM_ARTICLES = articlesToWikiArticles(wikiCustomArticles, "custom");
const TECH_ARTICLES = articlesToWikiArticles(wikiTechArticles, "tech");

export const wikiSections: WikiSection[] = [
  buildSection("function", FUNCTION_ARTICLES, FUNCTION_GROUPS),
  buildSection("custom", CUSTOM_ARTICLES, CUSTOM_GROUPS),
  buildSection("tech", TECH_ARTICLES, TECH_GROUPS),
];

export const allWikiArticles: WikiArticle[] = wikiSections.flatMap((s) =>
  s.groups.flatMap((g) => g.categories.flatMap((c) => c.articles)),
);

/* ── Lookups ── */

export function getSection(id: SectionId): WikiSection | undefined {
  return wikiSections.find((s) => s.id === id);
}

export function getCategory(
  sectionId: SectionId,
  categoryId: string,
): { section: WikiSection; group: WikiGroup; category: WikiCategory } | null {
  const section = getSection(sectionId);
  if (!section) return null;
  for (const group of section.groups) {
    const category = group.categories.find((c) => c.id === categoryId);
    if (category) return { section, group, category };
  }
  return null;
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
      // exact phrase boost
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
