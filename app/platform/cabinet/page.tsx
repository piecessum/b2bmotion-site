import { Navbar } from "@/components/navbar";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { Gift, Building2, Check, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Личный кабинет покупателя — Функционал B2B Движение",
  description:
    "Персональные предложения, мультикомпании, финансовый контроль и удобные уведомления для покупателей.",
};

const sections = [
  {
    icon: Gift,
    title: "Персональные предложения",
    image: "personal-offers.png",
    features: [
      "Индивидуальные скидки для конкретного клиента",
      "Рекомендованные спецификации от менеджера с предложением лучших условий",
      "Центр уведомлений, чтобы не пропускать выгодные акции",
      "Бонусные программы лояльности",
    ],
  },
  {
    icon: Building2,
    title: "Данные о компании покупателя",
    image: "company-data.png",
    features: [
      "Мультикомпании — возможность работать от лица нескольких компаний и переключаться между ними",
      "Отображение кредитного лимита, дебиторской задолженности и дней просрочки",
      "График платежей",
      "Настройка удобного формата уведомлений: E-mail, СМС или всплывающие уведомления на телефон",
      "Контакты персонального менеджера",
    ],
  },
];

const otherPages = [
  {
    title: "Товары и заказы",
    href: "/platform/products",
    desc: "Каталог, цены, заказы и документооборот",
  },
  {
    title: "Маркетинг и аналитика",
    href: "/platform/marketing",
    desc: "Акции, статистика и увеличение продаж",
  },
];

export default function CabinetPage() {
  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link
            href="/platform"
            className="inline-flex items-center gap-2 text-sm text-dim hover:text-body transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Функционал
          </Link>
          <span className="block mb-4 text-xs font-medium uppercase tracking-[0.15em] text-[#8B5CF6]">
            02 / Функционал
          </span>
          <h1 className="font-heading font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] tracking-[-0.03em] text-heading mb-5">
            Личный кабинет <span className="gradient-text">покупателя</span>
          </h1>
          <p className="text-lg text-body max-w-2xl">
            Персональные условия, управление несколькими компаниями, финансовый
            контроль и удобные уведомления — всё для комфортной работы ваших
            клиентов.
          </p>
        </div>
      </section>

      {/* Sections */}
      {sections.map((section, idx) => {
        const Icon = section.icon;
        const reversed = idx % 2 !== 0;

        return (
          <section key={section.title} className="py-20 px-6 bg-page">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <h2 className="font-heading font-bold text-[clamp(24px,3.5vw,32px)] tracking-[-0.02em] text-heading">
                  {section.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                {/* Image */}
                <div className={`${reversed ? "lg:order-2" : ""}`}>
                  <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#8B5CF6]/[0.04] via-[#3B82F6]/[0.03] to-[#06B6D4]/[0.04] border border-border-default">
                    <Image
                      src={`/${section.image}`}
                      alt={section.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-contain p-4"
                      priority={idx < 2}
                    />
                  </div>
                </div>

                {/* Features */}
                <div className={`space-y-3 ${reversed ? "lg:order-1" : ""}`}>
                  {section.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start p-4 rounded-xl bg-surface border border-border-default"
                    >
                      <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span className="text-sm text-body leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Other pages nav */}
      <section className="py-20 px-6 bg-page">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-heading font-semibold text-lg text-heading mb-6 text-center">
            Другие разделы функционала
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group p-6 rounded-2xl bg-surface border border-border-default hover:border-[#3B82F6]/30 transition-all duration-500 glow-card"
              >
                <h4 className="font-heading font-semibold text-heading mb-2 group-hover:text-[#3B82F6] transition-colors">
                  {page.title}
                </h4>
                <p className="text-sm text-subtle mb-3">{page.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] group-hover:gap-3 transition-all duration-300">
                  Подробнее <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
