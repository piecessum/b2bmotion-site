import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { BackButton } from "@/components/back-button"

export const metadata = {
  title: "В2В Движение — оптимальное решение для оптового бизнеса",
  description: "Как выстроить эффективную систему оптового бизнеса и увеличить его управляемость. Практические подходы к организации B2B-взаимодействия.",
}

export default function VideoPage() {
  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <section className="pt-36 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center gap-4 mb-10">
            <BackButton
              storageKey="home_back_url"
              fallback="/"
              className="inline-flex items-center gap-2 text-sm text-dim hover:text-body transition-colors"
            >
              На главную
            </BackButton>
            <span className="w-1 h-1 rounded-full bg-dimmest" />
            <BackButton
              storageKey="blog_back_url"
              fallback="/blog"
              className="inline-flex items-center gap-2 text-sm text-dim hover:text-body transition-colors"
            >
              Блог
            </BackButton>
          </div>

          {/* Header */}
          <h1 className="font-heading font-bold text-[clamp(28px,4vw,42px)] tracking-[-0.02em] text-heading leading-tight mb-10">
            В2В Движение — <span className="gradient-text">оптимальное решение для оптового бизнеса</span>
          </h1>

          {/* Video */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden glass-card mb-10">
            <iframe
              src="https://rutube.ru/play/embed/7b8a4e8636b37b9eb990e1150e7fbf5a?autoplay=1"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: "none" }}
            />
          </div>

          {/* Description */}
          <div className="space-y-5 mb-16">
            <p className="text-body leading-relaxed">
              Как выстроить эффективную систему оптового бизнеса и увеличить его управляемость?
            </p>
            <p className="text-body leading-relaxed">
              В этом видео раскрываются практические подходы к организации B2B-взаимодействия, которые помогают компаниям оптимизировать ключевые процессы — от закупок до реализации.
            </p>

            <div>
              <h2 className="font-heading font-semibold text-lg text-heading mb-3">
                Вы узнаете:
              </h2>
              <ul className="space-y-2 text-body">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-2 shrink-0" />
                  как повысить прозрачность товарных и финансовых потоков
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-2 shrink-0" />
                  каким образом сократить издержки и ускорить сделки
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] mt-2 shrink-0" />
                  как выстроить устойчивые отношения с партнёрами
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-2 shrink-0" />
                  какие решения позволяют масштабировать оптовый бизнес без потери контроля
                </li>
              </ul>
            </div>

            <p className="text-body leading-relaxed">
              Видео будет особенно полезно руководителям и специалистам, заинтересованным в повышении эффективности, росте оборота и систематизации бизнес-процессов.
            </p>
            <p className="text-body leading-relaxed">
              Решения, о которых идёт речь, уже применяются на практике и дают измеримый результат.
            </p>
            <p className="text-subheading leading-relaxed font-medium">
              Посмотрите, как можно трансформировать текущую модель работы и вывести бизнес на новый уровень.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 pb-28">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 via-[#8B5CF6]/8 to-[#06B6D4]/10" />
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 blur-[100px]" />

            <div className="relative z-10 text-center py-16 px-8">
              <h2 className="font-heading font-bold text-[clamp(24px,4vw,36px)] tracking-[-0.02em] text-heading mb-4">
                Готовы <span className="gradient-text-animated">ускорить</span> продажи?
              </h2>
              <p className="text-subtle mb-8 max-w-md mx-auto">
                Оставьте заявку — покажем платформу и обсудим ваш проект
              </p>
              <a
                href="mailto:hello@b2b-dvizhenie.ru"
                className="shimmer-btn inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white text-base font-semibold rounded-2xl hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] transition-all duration-300 hover:brightness-110"
              >
                Запросить демо
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
