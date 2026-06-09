import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "B2B-платформа для стройматериалов",
  description:
    "Оптовая торговля строительными материалами: удобный каталог, быстрые заказы и интеграция с 1С для дистрибьюторов и производителей.",
  path: "/building",
  ogImage: "/for-bg/bg-building-dark.png",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
