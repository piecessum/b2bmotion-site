import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Словарь иностранных слов и профессиональных терминов",
  description:
    "Пояснения иностранных заимствований и профессиональных терминов, которые встречаются на сайтах b2bmotion.ru и 3davinci.ru и в платформе «В2В Движение».",
  path: "/dictionary",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
