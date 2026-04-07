"use client";

import { useEffect } from "react";

export function ScrollSaver({
  storageKey,
  urlKey,
}: {
  storageKey: string;
  urlKey?: string;
}) {
  useEffect(() => {
    if (urlKey) {
      sessionStorage.setItem(urlKey, window.location.pathname);
    }

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          sessionStorage.setItem(storageKey, String(window.scrollY));
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [storageKey, urlKey]);

  return null;
}
