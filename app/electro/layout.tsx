import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "B2B-платформа для электротехники",
  description:
    "Оптовая торговля электротехническим оборудованием в стандарте ETIM: каталог с характеристиками, заказы и интеграция с 1С.",
  path: "/electro",
  ogImage: "/for-bg/bg-electro-dark.png",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
