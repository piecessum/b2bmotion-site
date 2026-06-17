/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
