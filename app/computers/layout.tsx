import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "B2B-платформа для компьютерной техники и электроники",
  description:
    "Оптовые продажи компьютерной техники и комплектующих: поиск аналогов, сертификаты, техподдержка и интеграция с 1С.",
  path: "/computers",
  ogImage: "/for-bg/bg-computers-dark.png",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
