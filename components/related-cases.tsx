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

  console.log(
    "[RelatedCases] total:",
    cases.length,
    "related:",
    relatedCases.length,
    "current:",
    currentSlug,
  );
  console.log(
    "[RelatedCases] cases:",
    relatedCases.map((c) => ({ slug: c.slug, title: c.title, logo: c.logo })),
  );

  if (relatedCases.length === 0) {
    console.log("[RelatedCases] No related cases to show");
    return null;
  }

  return (
    <section className="relative py-16 px-0 overflow-hidden bg-red-100 dark:bg-red-900/20 border-2 border-red-500">
      {/* Divider */}
      <div className="section-divider mb-10" />

      <div className="max-w-6xl mx-auto px-6 mb-8">
        <h2 className="font-heading font-semibold text-2xl text-heading">
          Другие кейсы (тест)
        </h2>
        <p className="text-sm text-dim mt-2">
          Кейсов найдено: {relatedCases.length}
        </p>
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
        {relatedCases.map((caseItem, idx) => (
          <div
            key={caseItem.slug}
            className="flex-shrink-0 w-[280px] sm:w-[320px] rounded-2xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 p-6"
          >
            <p className="text-sm font-bold text-blue-600">Кейс #{idx + 1}</p>
            <p className="text-sm">{caseItem.title}</p>
            <p className="text-xs text-dim mt-1">Slug: {caseItem.slug}</p>
            <p className="text-xs text-dim mt-1">
              Logo: {caseItem.logo || "нет"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
