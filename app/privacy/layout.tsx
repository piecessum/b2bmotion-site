import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Политика конфиденциальности",
  description:
    "Политика обработки и защиты персональных данных пользователей B2B Движение.",
  path: "/privacy",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
