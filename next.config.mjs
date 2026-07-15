/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Деплой на Coolify (self-hosted): приложение запускается как Node-сервер
    // (`next start`), поэтому встроенный оптимизатор работает — ресайз под
    // размер экрана + отдача в AVIF/WebP вместо тяжёлых PNG.
    formats: ["image/avif", "image/webp"],
    // Трансформации считаются на нашем сервере и кэшируются в .next/cache/images.
    // Ассеты маркетингового сайта меняются редко — держим кэш 31 день, чтобы
    // sharp не пережимал одно и то же. Кэш стоит вынести на persistent volume,
    // иначе он обнуляется при каждом деплое.
    minimumCacheTTL: 2678400,
  },
  // Старые самостоятельные роуты дублировали контент платформы (одинаковые
  // секции при разных URL — вредит SEO). Контент живёт только в /platform,
  // а старые адреса 301-редиректим на соответствующий view.
  async redirects() {
    return [
      {
        source: "/tech-stack",
        destination: "/platform?view=tech",
        permanent: true,
      },
      {
        source: "/integrations",
        destination: "/platform?view=integrations",
        permanent: true,
      },
    ];
  },
}

export default nextConfig
