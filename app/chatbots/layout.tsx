import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "AI-чат-боты для B2B-продаж",
  description:
    "Чат-боты для оптовых продаж: ответы о ценах, наличии и сроках, подбор товаров и оформление заказа прямо в Telegram.",
  path: "/chatbots",
  ogImage: "/for-bg/bg-aichat-dark.png",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
