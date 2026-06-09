/**
 * Единая точка конфигурации SEO/домена.
 *
 * Домен и флаг индексации берутся из переменных окружения, поэтому переезд
 * на боевой домен — это смена env-переменных в Vercel, без правок кода:
 *   NEXT_PUBLIC_SITE_URL=https://b2bmotion.ru
 *   NEXT_PUBLIC_ALLOW_INDEXING=true
 *
 * Пока сайт живёт на тестовом b2bmotion-site.vercel.app, индексация выключена
 * (robots Disallow + meta noindex), чтобы поисковики не проиндексировали
 * тестовую копию и не создали дублей контента для будущего домена.
 */

/** Боевой/текущий адрес сайта без завершающего слэша. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://b2bmotion-site.vercel.app"
).replace(/\/$/, "");

/**
 * Разрешена ли индексация поисковиками. По умолчанию false — на тестовом
 * домене сайт закрыт. Включается выставлением NEXT_PUBLIC_ALLOW_INDEXING=true
 * после переезда на боевой домен.
 */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const SITE_NAME = "B2B Движение";

export const DEFAULT_TITLE = "B2B Движение — Автоматизация оптовых продаж";

export const DEFAULT_DESCRIPTION =
  "B2B-платформа с интеграцией 1С для дистрибьюторов и производителей. Каталог, заказы, цены, аналитика — запуск за 3 месяца.";

/** OG-изображение по умолчанию (1680×720). */
export const DEFAULT_OG_IMAGE = "/for-bg/bg-techsteck-dark.png";

/** Абсолютный URL для произвольного пути сайта. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

import type { Metadata } from "next";

/**
 * Готовит Metadata страницы: title (с суффиксом бренда через template root-layout),
 * описание, canonical и Open Graph/Twitter. Используется в layout.tsx разделов,
 * чтобы не дублировать однотипный SEO-код.
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const { title, description, path } = opts;
  const ogImage = opts.ogImage ?? DEFAULT_OG_IMAGE;
  const url = absoluteUrl(path);
  const fullTitle = `${title} — ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      siteName: SITE_NAME,
      url,
      title: fullTitle,
      description,
      images: [{ url: ogImage, width: 1680, height: 720, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
