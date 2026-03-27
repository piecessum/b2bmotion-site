"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[720px]">
        <div
          className={`flex items-center gap-1 px-1.5 rounded-2xl transition-all duration-500 ${
            scrolled
              ? "bg-[#0F0F14]/80 border border-white/[0.06] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl"
          }`}
        >
          {/* Logo */}
          <a
            href="/"
            className="flex items-center px-4 h-11 font-heading font-semibold text-[#F5F5F5] text-sm tracking-tight whitespace-nowrap"
          >
            <span className="gradient-text font-bold">B2B</span>
            <span className="ml-1.5">Движение</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center ml-auto">
            {[
              { label: "Платформа", href: "/platform" },
              { label: "Клиенты", href: "/clients" },
              { label: "Отзывы", href: "/#reviews" },
              { label: "Цены", href: "/#pricing" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="animated-underline flex items-center px-3.5 h-11 text-sm text-[#71717A] hover:text-[#E4E4E7] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="/contacts"
            className="hidden md:flex items-center ml-2 px-5 h-9 my-1.5 text-sm font-medium rounded-xl transition-all duration-300 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white hover:shadow-[0_0_24px_rgba(59,130,246,0.4)] hover:brightness-110"
          >
            Запросить демо
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 ml-auto text-[#A1A1AA]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl bg-[#0F0F14]/95 border border-white/[0.06] backdrop-blur-2xl">
            <div className="flex flex-col gap-1">
              {[
                { label: "Платформа", href: "/platform" },
                { label: "Клиенты", href: "/clients" },
                { label: "Отзывы", href: "/#reviews" },
                { label: "Цены", href: "/#pricing" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 text-sm text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-white/[0.04] rounded-xl transition-all duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/contacts"
                className="mt-2 px-4 py-3 text-sm font-medium text-center rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white"
                onClick={() => setMobileOpen(false)}
              >
                Запросить демо
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
