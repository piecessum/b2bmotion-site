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
    <section className="py-16">
      <div className="section-divider mb-10" />

      <h2 className="font-heading font-semibold text-2xl text-heading mb-8">
        Другие кейсы
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedCases.map((caseItem) => {
          const companyName = caseItem.title.replace(/^Кейс:\s*/, "").split("—")[0].trim();
          const industry = caseItem.industry || caseItem.tags?.[1] || "Кейс";

          return (
            <Link
              key={caseItem.slug}
              href={`/cases/${caseItem.slug}`}
              className="group flex items-center gap-4 rounded-2xl glass-card p-5 hover:border-[rgba(59,130,246,0.15)] hover:shadow-[0_0_0_1px_rgba(59,130,246,0.1),0_8px_40px_-12px_rgba(59,130,246,0.15)] transition-all duration-500"
            >
              {/* Logo */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 backdrop-blur-md border border-white/10 flex items-center justify-center shrink-0">
                {caseItem.logo ? (
                  <Image
                    src={caseItem.logo}
                    alt={companyName}
                    width={48}
                    height={48}
                    className="h-8 w-auto object-contain dark:invert"
                  />
                ) : (
                  <span className="text-lg font-heading font-bold text-white/70">
                    {companyName.charAt(0)}
                  </span>
                )}
              </div>

              {/* Company name + industry */}
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-sm text-heading group-hover:text-[#3B82F6] dark:group-hover:text-white transition-colors leading-snug truncate">
                  {companyName}
                </h3>
                <span className="text-xs text-dim capitalize">
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
