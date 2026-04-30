/**
 * Источник данных для базы знаний — папка content/wiki/{section}/{slug}.md.
 *
 * Чтобы статьи попадали в клиентский бандл (нужен поиск, sidebar и т.п.),
 * MD-файлы компилируются в lib/wiki-articles.generated.ts на этапе сборки —
 * см. scripts/build-wiki-data.js (хуки predev/prebuild в package.json).
 *
 * Этот модуль — тонкий реэкспорт сгенерированных данных, безопасный для клиента.
 */

export {
  wikiFunctionArticles,
  wikiCustomArticles,
  wikiTechArticles,
} from "@/lib/wiki-articles.generated";

export type {
  WikiSourceArticle,
  WikiFunctionArticle,
  WikiCustomArticle,
  WikiTechArticle,
} from "@/lib/wiki-articles.generated";
