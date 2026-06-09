import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "B2B-платформа для FMCG-дистрибуции",
  description:
    "Оптовые продажи продуктов питания, напитков и бытовой химии: каталог, заказы и интеграция с 1С для дистрибьюторов FMCG.",
  path: "/fmcg",
  ogImage: "/for-bg/bg-fmcg-dark.png",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
