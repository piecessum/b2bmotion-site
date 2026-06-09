import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "MDM-система: личный кабинет производителя",
  description:
    "Облачный личный кабинет MDM для производителей: управление карточками товаров, характеристиками, фото, документами и остатками.",
  path: "/mdm",
  ogImage: "/for-bg/bg-mdm-dark.png",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
