"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed top-[4.5rem] left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-[1100px] animate-in slide-in-from-top-2 fade-in duration-300">
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-nav-bg-scrolled border border-glass-border backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
        <span className="text-xs text-subtle leading-snug">
          Мы используем cookie для аналитики и улучшения сайта.{" "}
          <Link href="/privacy" className="text-[#60A5FA] hover:underline">
            Политика конфиденциальности
          </Link>
        </span>
        <button
          onClick={accept}
          className="shrink-0 px-3 py-1 rounded-lg text-xs font-medium bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-colors"
        >
          OK
        </button>
        <button
          onClick={accept}
          className="shrink-0 p-1 rounded-md text-dim hover:text-body hover:bg-white/10 transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
