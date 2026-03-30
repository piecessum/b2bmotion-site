import { getAllPosts } from "@/lib/content"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight, Calendar, Building2, MapPin, Users, Package } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Кейсы — B2B Движение",
  description: "Реальные кейсы автоматизации B2B-продаж в различных отраслях.",
}

export default function CasesPage() {
  const allPosts = getAllPosts("blog")
  const caseStudies = allPosts.filter((post) =>
    post.tags?.includes("кейс") || post.slug.startsWith("keis-")
  )

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <section className="pt-36 pb-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[#60A5FA] bg-[#3B82F6]/[0.06] border border-[#3B82F6]/[0.1] rounded-full">
              Кейсы
            </span>
            <h1 className="font-heading font-bold text-[clamp(32px,5vw,48px)] tracking-[-0.02em] text-heading">
              Истории <span className="gradient-text">успеха</span>
            </h1>
            <p className="mt-4 text-lg text-subtle max-w-xl">
              Реальные примеры автоматизации B2B-продаж в различных отраслях.
            </p>
          </div>

          {/* Cases grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((caseStudy) => (
              <Link
                key={caseStudy.slug}
                href={`/cases/${caseStudy.slug}`}
                className="group relative rounded-2xl glass-card overflow-hidden hover:border-[rgba(59,130,246,0.15)] hover:shadow-[0_0_0_1px_rgba(59,130,246,0.1),0_8px_40px_-12px_rgba(59,130,246,0.15)] transition-all duration-500"
              >
                {/* Image area */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#3B82F6]/10 via-[#8B5CF6]/5 to-[#06B6D4]/10">
                  {caseStudy.image ? (
                    <>
                      <img
                        src={caseStudy.image}
                        alt={caseStudy.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {caseStudy.logo ? (
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
                          <Image
                            src={caseStudy.logo}
                            alt={caseStudy.title}
                            width={80}
                            height={80}
                            className="h-10 w-auto object-contain opacity-70 dark:invert"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
                          <span className="text-3xl font-heading font-bold text-white/70">
                            {caseStudy.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] text-dim uppercase tracking-[0.15em]">
                      {caseStudy.tags?.[1] || "Кейс"}
                    </span>
                  </div>

                  <h2 className="font-heading font-semibold text-lg text-heading mb-3 group-hover:text-[#3B82F6] dark:group-hover:text-white transition-colors leading-snug">
                    {caseStudy.title.replace("Кейс: ", "")}
                  </h2>

                  <p className="text-subtle leading-relaxed mb-4 text-sm line-clamp-2">
                    {caseStudy.description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] group-hover:gap-3 transition-all duration-300">
                    Читать кейс
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {caseStudies.length === 0 && (
            <p className="text-center text-dim py-20">
              Пока нет кейсов. Скоро здесь появятся истории успеха.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
