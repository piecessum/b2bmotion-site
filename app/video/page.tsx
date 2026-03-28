import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Обзор платформы — B2B Движение",
  description: "Видео-обзор B2B-платформы для оптовых продаж. Узнайте, как работает портал изнутри.",
}

export default function VideoPage() {
  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <section className="pt-36 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-dim hover:text-body transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>

          {/* Header */}
          <h1 className="font-heading font-bold text-[clamp(28px,4vw,42px)] tracking-[-0.02em] text-heading leading-tight mb-4">
            Обзор платформы <span className="gradient-text">B2B Движение</span>
          </h1>
          <p className="text-lg text-subtle mb-10 max-w-2xl">
            Посмотрите, как устроен B2B-портал изнутри: каталог, заказы, аналитика, интеграция с 1С и мобильное приложение.
          </p>

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
          <div className="space-y-4 mb-16">
            <h2 className="font-heading font-semibold text-xl text-heading">
              Что в видео
            </h2>
            <ul className="space-y-2 text-body">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-2 shrink-0" />
                Интерфейс каталога с умным поиском по 1.7М+ товаров
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-2 shrink-0" />
                Процесс оформления заказа и интеграция с 1С в реальном времени
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] mt-2 shrink-0" />
                Аналитика продаж, ценообразование и мобильное приложение
              </li>
            </ul>
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
