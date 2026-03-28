"use client"

import { useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const o = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible") }), { threshold: 0.1 })
    ref.current?.querySelectorAll(".reveal").forEach((el) => o.observe(el))
    return () => o.disconnect()
  }, [ref])
}

const contacts = [
  { icon: Phone, label: "Телефон", value: "+7 (499) 350-34-36", href: "tel:+74993503436" },
  { icon: Mail, label: "Email", value: "info@b2bmotion.ru", href: "mailto:info@b2bmotion.ru" },
  { icon: MapPin, label: "Адрес", value: "Воронеж, ул. 60 Армии, д. 26", href: null },
  { icon: Clock, label: "Режим работы", value: "Пн-Пт, 9:00 — 18:00", href: null },
]

export default function ContactsPage() {
  const r = useRef<HTMLElement>(null); useReveal(r)

  return (
    <main ref={r} className="relative min-h-screen bg-page-alt noise-overlay">
      <Navbar />

      <section className="relative pt-36 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.06] pointer-events-none"><div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full blur-[120px]" /></div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="reveal font-heading font-bold text-[clamp(36px,7vw,56px)] leading-[1.1] tracking-[-0.03em] mb-4">
              <span className="text-heading">Свяжитесь </span><span className="gradient-text">с нами</span>
            </h1>
            <p className="reveal text-lg text-body max-w-xl mx-auto">Покажем платформу в работе, ответим на вопросы и обсудим ваш проект</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3 reveal">
              <div className="p-8 bg-surface-hover rounded-2xl border border-border-default">
                <h2 className="font-heading font-semibold text-xl text-heading mb-6">Оставить заявку</h2>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-subtle mb-2">Имя</label>
                      <input type="text" placeholder="Ваше имя" className="w-full px-4 py-3 bg-page-alt border border-border-default rounded-xl text-sm text-heading placeholder:text-dim focus:outline-none focus:border-[#3B82F6]/50 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs text-subtle mb-2">Компания</label>
                      <input type="text" placeholder="Название компании" className="w-full px-4 py-3 bg-page-alt border border-border-default rounded-xl text-sm text-heading placeholder:text-dim focus:outline-none focus:border-[#3B82F6]/50 transition-colors" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-subtle mb-2">Телефон</label>
                      <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full px-4 py-3 bg-page-alt border border-border-default rounded-xl text-sm text-heading placeholder:text-dim focus:outline-none focus:border-[#3B82F6]/50 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs text-subtle mb-2">Email</label>
                      <input type="email" placeholder="email@company.ru" className="w-full px-4 py-3 bg-page-alt border border-border-default rounded-xl text-sm text-heading placeholder:text-dim focus:outline-none focus:border-[#3B82F6]/50 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-subtle mb-2">Сообщение</label>
                    <textarea rows={4} placeholder="Расскажите о вашем проекте..." className="w-full px-4 py-3 bg-page-alt border border-border-default rounded-xl text-sm text-heading placeholder:text-dim focus:outline-none focus:border-[#3B82F6]/50 transition-colors resize-none" />
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-border-default bg-page-alt accent-[#3B82F6]" />
                    <span className="text-xs text-subtle">Даю согласие на обработку персональных данных в соответствии с <a href="#" className="text-[#3B82F6] hover:underline">политикой конфиденциальности</a></span>
                  </div>
                  <button type="submit" className="w-full py-4 bg-white text-[#09090B] font-semibold rounded-full hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300">
                    Отправить заявку
                  </button>
                </form>
              </div>
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-4">
              {contacts.map((c, i) => (
                <div key={i} className="reveal flex gap-4 p-5 bg-surface-hover rounded-2xl border border-border-default">
                  <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <p className="text-xs text-subtle mb-1">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-sm font-medium text-heading hover:text-[#3B82F6] transition-colors">{c.value}</a>
                    ) : (
                      <p className="text-sm font-medium text-heading">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
              <div className="reveal p-5 bg-surface-hover rounded-2xl border border-border-default">
                <p className="text-xs text-subtle mb-2">Юридическое лицо</p>
                <p className="text-sm text-body leading-relaxed">ООО «ТриДаВинчи»<br />ИНН 3666150357<br />ОКВЭД 62.01</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
