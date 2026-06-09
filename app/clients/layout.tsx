import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Клиенты",
  description:
    "Дистрибьюторы и производители, которые автоматизировали оптовые продажи на платформе B2B Движение.",
  path: "/clients",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
