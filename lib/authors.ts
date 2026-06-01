import { getAllPosts, type Post } from "./content";

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  postCount: number;
}

// Карточка материала в сетке автора (статья, кейс, отчёт или видео)
export interface AuthorEntry {
  title: string;
  description: string;
  date: string;
  image?: string;
  href: string;
  kind: "Публикация" | "История успеха" | "Отчёт" | "Видео";
}

// Транслитерация кириллицы в URL-безопасный slug
const translitMap: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts",
  ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
  я: "ya",
};

export function authorSlug(name: string): string {
  return name
    .toLowerCase()
    .split("")
    .map((ch) => (ch in translitMap ? translitMap[ch] : ch))
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Отображаемый автор статьи: имя из карточки приоритетнее поля author,
// потому что именно его видит и по нему кликает читатель
function displayAuthor(post: Post): string | undefined {
  return post.authorCard?.name || post.author;
}

// Запасные данные для авторов, у которых нет authorCard в статьях
const authorFallbacks: Record<string, { role: string; bio: string; photo?: string }> = {
  "Команда B2B Движение": {
    role: "Команда проекта",
    bio: "Делимся опытом внедрения B2B-платформ и историями успеха наших клиентов",
    photo: "/icons/B2BMotionSign.png",
  },
};

// Материалы автора, которых нет среди md-статей (видео, отчёты на отдельных
// страницах). Привязываются к автору вручную и показываются в его сетке.
const extraEntries: Record<string, AuthorEntry[]> = {
  "Команда B2B Движение": [
    {
      title: "B2B eCommerce Платформы: Россия vs Мировой рынок",
      description:
        "Комплексный обзор 13 платформ — функциональность, дизайн лендингов, цены и рекомендации по выбору.",
      date: "2026-03-15",
      image: "/images/blog/analitics.png",
      href: "/blog/b2b-platforms-report",
      kind: "Отчёт",
    },
    {
      title: "В2В Движение — оптимальное решение для оптового бизнеса",
      description:
        "Как выстроить эффективную систему оптового бизнеса и увеличить его управляемость. Практические подходы к организации B2B-взаимодействия.",
      date: "2026-02-01",
      image: "/images/blog/for_video.png",
      href: "/video",
      kind: "Видео",
    },
  ],
};

// Собирает данные об авторе из его статей (берёт authorCard, если он есть)
function buildAuthor(name: string, posts: Post[]): Author {
  const cardPost = posts.find((p) => p.authorCard?.name === name);
  const card = cardPost?.authorCard;
  const fallback = authorFallbacks[name];
  const extras = extraEntries[name]?.length || 0;

  return {
    slug: authorSlug(name),
    name,
    role: card?.role || fallback?.role || "Автор",
    bio: card?.bio || fallback?.bio || "",
    photo: card?.photo || fallback?.photo,
    postCount: posts.length + extras,
  };
}

function postToEntry(post: Post): AuthorEntry {
  const isCase = post.tags?.includes("кейс") || post.slug.startsWith("keis-");
  const isReport = post.slug.endsWith("-report");
  return {
    title: post.title,
    description: post.description,
    date: post.date,
    image: post.image,
    href: `/blog/${post.slug}`,
    kind: isCase ? "История успеха" : isReport ? "Отчёт" : "Публикация",
  };
}

// Все авторы коллекции с количеством статей
export function getAllAuthors(collection: "blog" | "news"): Author[] {
  const posts = getAllPosts(collection);
  const byName = new Map<string, Post[]>();

  for (const post of posts) {
    const name = displayAuthor(post);
    if (!name) continue;
    const list = byName.get(name) || [];
    list.push(post);
    byName.set(name, list);
  }

  return Array.from(byName.entries())
    .map(([name, authorPosts]) => buildAuthor(name, authorPosts))
    .sort((a, b) => b.postCount - a.postCount);
}

// Автор по slug + все его материалы (статьи + видео/отчёты),
// отсортированы по дате, новые сверху
export function getAuthorBySlug(
  collection: "blog" | "news",
  slug: string,
): { author: Author; entries: AuthorEntry[] } | null {
  const posts = getAllPosts(collection).filter((p) => {
    const name = displayAuthor(p);
    return name && authorSlug(name) === slug;
  });

  if (posts.length === 0) return null;

  const name = displayAuthor(posts[0])!;
  const entries = [
    ...posts.map(postToEntry),
    ...(extraEntries[name] || []),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { author: buildAuthor(name, posts), entries };
}
