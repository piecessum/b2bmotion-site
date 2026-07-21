"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Пишет в sessionStorage адрес предыдущей страницы (`nav_prev`), чтобы кнопки
 * «Назад» могли вернуть пользователя туда, откуда он реально пришёл, — а не на
 * жёстко зашитый fallback. Работает для любого входа на статью/кейс: из блога,
 * с лендинга /support, с карточек на главной и т.д.
 */
export function NavTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const current = window.location.pathname + window.location.search;
    const prevCurrent = sessionStorage.getItem("nav_current");
    if (prevCurrent && prevCurrent !== current) {
      sessionStorage.setItem("nav_prev", prevCurrent);
    }
    sessionStorage.setItem("nav_current", current);
  }, [pathname]);

  return null;
}
