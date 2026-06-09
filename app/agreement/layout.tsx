import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Пользовательское соглашение",
  description: "Пользовательское соглашение сайта b2bmotion.ru.",
  path: "/agreement",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
