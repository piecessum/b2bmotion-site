"use client";

import Link from "next/link";
import Image from "next/image";

interface Case {
  slug: string;
  title: string;
  description: string;
  logo?: string | null;
  tags?: string[];
  industry?: string;
}

interface RelatedCasesProps {
  cases: Case[];
  currentSlug: string;
}

export function RelatedCases({ cases, currentSlug }: RelatedCasesProps) {
  const relatedCases = cases.filter((c) => c.slug !== currentSlug).slice(0, 6);

  if (relatedCases.length === 0) {
    return null;
  }

  return (
    <section className="py-10">
      <div className="section-divider mb-8" />

      <h2 className="font-heading font-semibold text-lg text-heading mb-5">
        Другие кейсы
      </h2>

      {/* Horizontal scroll on mobile (full-bleed), grid on desktop */}
      <div className="-mx-6 px-6 flex gap-3 overflow-x-auto pb-3 scrollbar-hide sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:pb-0">
        {relatedCases.map((caseItem) => {
          const companyName = caseItem.title.replace(/^Кейс:\s*/, "").split("—")[0].trim();
          const industry = caseItem.industry || caseItem.tags?.[1] || "Кейс";

          return (
            <Link
              key={caseItem.slug}
              href={`/cases/${caseItem.slug}`}
              className="group flex items-center gap-3 shrink-0 w-[220px] sm:w-auto rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] p-3 hover:border-[#3B82F6]/30 dark:hover:border-[rgba(59,130,246,0.15)] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 border border-white/10 flex items-center justify-center shrink-0">
                {caseItem.logo ? (
                  <Image
                    src={caseItem.logo}
                    alt={companyName}
                    width={40}
                    height={40}
                    className="h-6 w-auto object-contain dark:invert"
                  />
                ) : (
                  <span className="text-sm font-heading font-bold text-white/70">
                    {companyName.charAt(0)}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <h3 className="font-heading font-semibold text-sm text-heading group-hover:text-[#3B82F6] dark:group-hover:text-white transition-colors leading-snug truncate">
                  {companyName}
                </h3>
                <span className="text-[11px] text-dim capitalize">
                  {industry}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
