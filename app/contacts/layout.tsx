import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Контакты",
  description:
    "Свяжитесь с командой B2B Движение: Воронеж, ул. 60 Армии, д. 26, info@b2bmotion.ru. Расскажите о вашем проекте.",
  path: "/contacts",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
