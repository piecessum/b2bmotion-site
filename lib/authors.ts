import { getAllPosts, type Post } from "./content";

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  postCount: number;
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
    photo: "/logo.svg",
  },
};

// Собирает данные об авторе из его статей (берёт authorCard, если он есть)
function buildAuthor(name: string, posts: Post[]): Author {
  const cardPost = posts.find((p) => p.authorCard?.name === name);
  const card = cardPost?.authorCard;
  const fallback = authorFallbacks[name];

  return {
    slug: authorSlug(name),
    name,
    role: card?.role || fallback?.role || "Автор",
    bio: card?.bio || fallback?.bio || "",
    photo: card?.photo || fallback?.photo,
    postCount: posts.length,
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

// Автор по slug + его статьи (отсортированы по дате, новые сверху)
export function getAuthorBySlug(
  collection: "blog" | "news",
  slug: string,
): { author: Author; posts: Post[] } | null {
  const posts = getAllPosts(collection).filter((p) => {
    const name = displayAuthor(p);
    return name && authorSlug(name) === slug;
  });

  if (posts.length === 0) return null;

  const name = displayAuthor(posts[0])!;
  return { author: buildAuthor(name, posts), posts };
}
