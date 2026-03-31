"use client";

import Link from "next/link";

export function BlogBanner() {
  return (
    <div className="mt-16 relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#3B82F6]/20 via-[#8B5CF6]/15 to-[#06B6D4]/20 border border-white/10 p-8 md:p-10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#3B82F6]/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#8B5CF6]/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-heading mb-3">
          Автоматизируйте свой бизнес
        </h2>
        <p className="text-subtle text-base md:text-lg mb-8 max-w-xl">
          3 месяца и буквально у вас в кармане готовая B2B-платформа
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/contacts"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-medium rounded-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-105 transition-all duration-300"
          >
            Автоматизировать
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>

          <Link
            href="/contacts"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-black/10 text-body font-medium rounded-xl border border-black/20 hover:bg-black/15 hover:border-black/30 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-all duration-300 dark:bg-white/10 dark:text-white dark:border-white/20 dark:hover:bg-white/15 dark:hover:border-white/30 dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <svg
              className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Запросить демо
          </Link>
        </div>
      </div>
    </div>
  );
}
