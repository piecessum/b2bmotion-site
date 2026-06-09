import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Платформа для оптовых продаж",
  description:
    "B2B-платформа: каталог товаров с описаниями и документами, остатки по складам, заказы, цены и аналитика с интеграцией 1С.",
  path: "/platform",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
