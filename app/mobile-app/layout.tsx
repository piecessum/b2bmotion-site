import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Мобильное приложение B2B-платформы",
  description:
    "Мобильное приложение в комплекте с платформой: каталог, заказы и аналитика оптовых продаж со смартфона.",
  path: "/mobile-app",
  ogImage: "/for-bg/bg-mobile-dark.png",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
