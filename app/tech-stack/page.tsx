import type { Metadata } from "next";
import TechStackClient from "./tech-stack-client";

const PAGE_URL = "https://b2bmotion-site.vercel.app/tech-stack";
const OG_IMAGE = "https://b2bmotion-site.vercel.app/for-bg/bg-techsteck-dark.png";

const DESCRIPTION =
  "Технологический стек B2B-платформы B2B Движение: PHP 8.2 (Yii2), React + Remix, MySQL, Redis, Elasticsearch, Nginx. Российский сервер Selectel, реестр ПО РФ, ФЗ-152.";

export const metadata: Metadata = {
  title: "Технологический стек B2B Движение — PHP, React, MySQL, Selectel",
  description: DESCRIPTION,
  keywords: [
    "B2B Движение",
    "технологический стек",
    "PHP 8.2",
    "Yii2",
    "React",
    "Remix",
    "MySQL",
    "Redis",
    "Elasticsearch",
    "Nginx",
    "TypeScript",
    "Tailwind",
    "Selectel",
    "российский сервер",
    "реестр российского ПО",
    "ФЗ-152",
    "B2B-платформа",
    "архитектура",
    "On-Premise",
    "SaaS",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: PAGE_URL,
    siteName: "B2B Движение",
    title: "Технологический стек B2B Движение",
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Технологический стек B2B Движение",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Технологический стек B2B Движение",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const breadcrumbsLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Главная",
      item: "https://b2bmotion-site.vercel.app/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Технологический стек",
      item: PAGE_URL,
    },
  ],
};

const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "B2B Движение",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: DESCRIPTION,
  url: PAGE_URL,
  offers: [
    {
      "@type": "Offer",
      name: "SaaS — аренда на наших серверах",
      price: "150000",
      priceCurrency: "RUB",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "150000",
        priceCurrency: "RUB",
        unitText: "MONTH",
      },
    },
    {
      "@type": "Offer",
      name: "On-Premise — размещение на собственном сервере",
      price: "3200000",
      priceCurrency: "RUB",
    },
  ],
  featureList: [
    "PHP 8.2 (Yii2)",
    "MySQL",
    "Redis",
    "Elasticsearch",
    "Nginx",
    "React + Remix",
    "TypeScript",
    "Tailwind",
    "Selectel (Tier III, Москва)",
    "Реестр российского ПО",
  ],
  publisher: {
    "@type": "Organization",
    name: "ТриДаВинчи",
    url: "https://b2bmotion-site.vercel.app/",
  },
};

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Технологический стек B2B Движение",
  description: DESCRIPTION,
  url: PAGE_URL,
  inLanguage: "ru-RU",
  isPartOf: {
    "@type": "WebSite",
    name: "B2B Движение",
    url: "https://b2bmotion-site.vercel.app/",
  },
  about: [
    { "@type": "Thing", name: "PHP" },
    { "@type": "Thing", name: "Yii2" },
    { "@type": "Thing", name: "MySQL" },
    { "@type": "Thing", name: "Redis" },
    { "@type": "Thing", name: "Elasticsearch" },
    { "@type": "Thing", name: "Nginx" },
    { "@type": "Thing", name: "React" },
    { "@type": "Thing", name: "Remix" },
    { "@type": "Thing", name: "TypeScript" },
    { "@type": "Thing", name: "Tailwind CSS" },
    { "@type": "Thing", name: "Selectel" },
  ],
};

export default function TechStackPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <TechStackClient />
    </>
  );
}
