"use client"

import { useEffect, useRef, useState } from "react"
import { Search, ShoppingCart, User, Home, Package, BarChart3, Settings, Grid3X3, Menu } from "lucide-react"

const categories = [
  { name: "Кабель каналы", count: "136 982" },
  { name: "Лотки металлические", count: "250 045" },
  { name: "Автоматические выключатели", count: "89 341" },
  { name: "Светотехника LED", count: "167 892" },
  { name: "Розетки и выключатели", count: "445 123" },
  { name: "Инструменты", count: "78 456" },
]

function MacBookScreen() {
  return (
    <div className="w-full h-full bg-[#08080C] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-[#0F0F14] border-b border-white/[0.06]">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-[#F5F5F5]">B2B Движение</span>
          <button className="px-3 py-1.5 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] rounded-lg text-xs text-white font-medium">
            Каталог
          </button>
        </div>
        <div className="flex items-center gap-2 flex-1 max-w-[200px] mx-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-lg flex-1">
            <Search className="w-3 h-3 text-[#52525B]" />
            <span className="text-xs text-[#52525B]">Поиск...</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-4 h-4 text-[#52525B]" />
          <User className="w-4 h-4 text-[#52525B]" />
        </div>
      </div>
      <div className="flex h-[calc(100%-48px)]">
        <div className="w-12 bg-[#0F0F14] border-r border-white/[0.06] py-4 flex flex-col items-center gap-4">
          <Home className="w-4 h-4 text-[#52525B]" />
          <Package className="w-4 h-4 text-[#3B82F6]" />
          <BarChart3 className="w-4 h-4 text-[#52525B]" />
          <Settings className="w-4 h-4 text-[#52525B]" />
        </div>
        <div className="flex-1 p-4 overflow-hidden">
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="p-3 bg-white/[0.02] rounded-xl border border-white/[0.06] hover:border-[#3B82F6]/20 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6]/15 to-[#8B5CF6]/15 rounded-lg mb-2 flex items-center justify-center">
                  <Grid3X3 className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <p className="text-[10px] font-medium text-[#E4E4E7] mb-1 truncate">{cat.name}</p>
                <p className="text-[9px] text-[#52525B]">{cat.count} товаров</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function iPadScreen() {
  return (
    <div className="w-full h-full bg-[#08080C] rounded-md overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-[#0F0F14] border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Menu className="w-3 h-3 text-[#52525B]" />
          <span className="text-[10px] font-medium text-[#F5F5F5]">Каталог</span>
        </div>
        <div className="flex items-center gap-2">
          <Search className="w-3 h-3 text-[#52525B]" />
          <ShoppingCart className="w-3 h-3 text-[#52525B]" />
        </div>
      </div>
      <div className="p-3 grid grid-cols-2 gap-2">
        {categories.slice(0, 4).map((cat, i) => (
          <div key={i} className="p-2 bg-white/[0.02] rounded-lg border border-white/[0.06]">
            <div className="w-5 h-5 bg-gradient-to-br from-[#3B82F6]/15 to-[#8B5CF6]/15 rounded mb-1.5 flex items-center justify-center">
              <Grid3X3 className="w-2.5 h-2.5 text-[#3B82F6]" />
            </div>
            <p className="text-[8px] font-medium text-[#E4E4E7] truncate">{cat.name}</p>
            <p className="text-[7px] text-[#52525B]">{cat.count}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function iPhoneScreen() {
  return (
    <div className="w-full h-full bg-[#08080C] rounded-md overflow-hidden flex flex-col">
      <div className="h-5 bg-[#0F0F14] flex items-center justify-center">
        <div className="w-12 h-1.5 bg-white/[0.06] rounded-full" />
      </div>
      <div className="flex-1 p-2 overflow-hidden">
        <div className="flex items-center gap-1.5 mb-2 px-1.5 py-1 bg-white/[0.03] rounded border border-white/[0.06]">
          <Search className="w-2.5 h-2.5 text-[#52525B]" />
          <span className="text-[7px] text-[#52525B]">Поиск</span>
        </div>
        <div className="space-y-1.5">
          {categories.slice(0, 4).map((cat, i) => (
            <div key={i} className="flex items-center gap-1.5 p-1.5 bg-white/[0.02] rounded-lg border border-white/[0.06]">
              <div className="w-4 h-4 bg-gradient-to-br from-[#3B82F6]/15 to-[#8B5CF6]/15 rounded flex items-center justify-center shrink-0">
                <Grid3X3 className="w-2 h-2 text-[#3B82F6]" />
              </div>
              <div className="min-w-0">
                <p className="text-[7px] font-medium text-[#E4E4E7] truncate">{cat.name}</p>
                <p className="text-[6px] text-[#52525B]">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-10 bg-[#0F0F14] border-t border-white/[0.06] flex items-center justify-around px-3">
        <Home className="w-3 h-3 text-[#3B82F6]" />
        <Package className="w-3 h-3 text-[#52525B]" />
        <ShoppingCart className="w-3 h-3 text-[#52525B]" />
        <User className="w-3 h-3 text-[#52525B]" />
      </div>
    </div>
  )
}

export function DeviceShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true)
        })
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      {/* Glow behind devices */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#3B82F6]/8 via-[#8B5CF6]/6 to-[#06B6D4]/8 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center mb-16">
          {/* iPad */}
          <div
            className={`absolute left-0 md:left-[5%] lg:left-[10%] z-10 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-32"
            }`}
          >
            <div className="relative -rotate-6 animate-float-slow">
              <div className="w-[280px] md:w-[350px] h-[200px] md:h-[250px] bg-[#111116] rounded-2xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/[0.06]">
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <iPadScreen />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl pointer-events-none" />
            </div>
          </div>

          {/* MacBook */}
          <div
            className={`relative z-20 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative">
              <div className="w-[400px] md:w-[600px] lg:w-[700px] h-[250px] md:h-[380px] lg:h-[440px] bg-[#111116] rounded-t-xl p-2 border border-white/[0.06] border-b-0 shadow-[0_-8px_60px_rgba(59,130,246,0.08)]">
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <MacBookScreen />
                </div>
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#08080C] rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#1E1E2A] rounded-full" />
                </div>
              </div>
              <div className="w-[420px] md:w-[640px] lg:w-[750px] h-3 md:h-4 bg-gradient-to-b from-[#2A2A30] to-[#1A1A20] rounded-b-lg mx-auto relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#111116] rounded-b" />
              </div>
              <div className="w-[440px] md:w-[680px] lg:w-[800px] h-1.5 bg-[#1A1A20] rounded-b-xl mx-auto" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-xl pointer-events-none" />
            </div>
          </div>

          {/* iPhone */}
          <div
            className={`absolute right-0 md:right-[5%] lg:right-[10%] z-10 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-32"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative rotate-6 animate-float">
              <div className="w-[140px] md:w-[180px] h-[280px] md:h-[360px] bg-[#111116] rounded-[2rem] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/[0.06]">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden">
                  <iPhoneScreen />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-[2rem] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Text below */}
        <div className="text-center">
          <p
            className={`font-heading font-bold text-[clamp(48px,8vw,72px)] tracking-[-0.03em] mb-4 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <span className="gradient-text-animated">3 месяца</span>
          </p>
          <p
            className={`text-xl md:text-2xl text-[#A1A1AA] mb-10 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            и у вас готовый к использованию магазин
          </p>
          <a
            href="#cta"
            className={`inline-flex items-center gap-2 px-8 py-4 border border-white/[0.1] text-[#D4D4D8] text-base font-medium rounded-2xl hover:bg-white/[0.04] hover:border-white/[0.2] transition-all duration-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            Оставить заявку
          </a>
        </div>
      </div>
    </section>
  )
}
