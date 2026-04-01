"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface Case {
  slug: string;
  title: string;
  description: string;
  logo?: string | null;
  tags?: string[];
}

interface RelatedCasesProps {
  cases: Case[];
  currentSlug: string;
}

export function RelatedCases({ cases, currentSlug }: RelatedCasesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Исключаем текущий кейс и берём максимум 6
  const relatedCases = cases.filter((c) => c.slug !== currentSlug).slice(0, 6);

  if (relatedCases.length === 0) {
    return null;
  }

  return (
    <section className="relative py-16 px-0 overflow-hidden">
      {/* Divider */}
      <div className="section-divider mb-10" />

      <div className="max-w-6xl mx-auto px-6 mb-8">
        <h2 className="font-heading font-semibold text-2xl text-heading">
          Другие кейсы
        </h2>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-6 px-6 snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {relatedCases.map((caseItem) => (
          <Link
            key={caseItem.slug}
            href={`/cases/${caseItem.slug}`}
            className="group flex-shrink-0 w-[280px] sm:w-[320px] rounded-2xl glass-card overflow-hidden hover:border-[rgba(59,130,246,0.15)] hover:shadow-[0_0_0_1px_rgba(59,130,246,0.1),0_8px_40px_-12px_rgba(59,130,246,0.15)] transition-all duration-500 snap-start"
          >
            <div className="p-6">
              {/* Logo and industry */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 backdrop-blur-md border border-white/10 flex items-center justify-center shrink-0">
                  {caseItem.logo ? (
                    <Image
                      src={caseItem.logo}
                      alt={caseItem.title}
                      width={56}
                      height={56}
                      className="h-8 w-auto object-contain opacity-70 dark:invert"
                    />
                  ) : (
                    <span className="text-xl font-heading font-bold text-white/70">
                      {caseItem.title.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-dim uppercase tracking-[0.15em] block mb-1">
                    {caseItem.tags?.[1] || "Кейс"}
                  </span>
                  <h3 className="font-heading font-semibold text-base text-heading group-hover:text-[#3B82F6] dark:group-hover:text-white transition-colors leading-snug line-clamp-2">
                    {caseItem.title.replace("Кейс: ", "")}
                  </h3>
                </div>
              </div>

              <p className="text-subtle leading-relaxed text-sm line-clamp-2">
                {caseItem.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
