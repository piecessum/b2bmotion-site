"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Logo } from "@/components/logo"

const industries = [
  { label: "Для электрического рынка", href: "/electro" },
  { label: "Для товаров первого спроса (FMCG)", href: "#" },
  { label: "Для рынка стройматериалов", href: "#" },
  { label: "Для продажи компьютерных товаров", href: "#" },
]

const services = [
  { label: "B2B маркетплейс", href: "/marketplace" },
  { label: "MDM система", href: "#" },
  { label: "Чат-боты", href: "#" },
  { label: "Мобильное приложение", href: "#" },
]

const industryPaths = industries.map((i) => i.href).filter((h) => h !== "#")
const servicePaths = services.map((i) => i.href).filter((h) => h !== "#")

function navLinkClass(isActive: boolean) {
  if (isActive) {
    return "flex items-center px-3 h-11 text-sm text-[#E4E4E7] bg-white/[0.06] rounded-lg transition-all duration-300"
  }
  return "animated-underline flex items-center px-3 h-11 text-sm text-[#71717A] hover:text-[#E4E4E7] transition-colors duration-300"
}

function dropdownTriggerClass(isActive: boolean) {
  if (isActive) {
    return "flex items-center gap-1 px-3 h-11 text-sm text-[#E4E4E7] bg-white/[0.06] rounded-lg transition-all duration-300"
  }
  return "animated-underline flex items-center gap-1 px-3 h-11 text-sm text-[#71717A] hover:text-[#E4E4E7] transition-colors duration-300"
}

function Dropdown({
  label,
  items,
  open,
  onToggle,
  isActive,
}: {
  label: string
  items: { label: string; href: string }[]
  open: boolean
  onToggle: () => void
  isActive: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (open) onToggle()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open, onToggle])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className={dropdownTriggerClass(isActive)}
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 min-w-[280px] p-2 rounded-xl bg-[#0F0F14]/95 border border-white/[0.06] backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-4 py-3 text-sm text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-white/[0.04] rounded-lg transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const isIndustryActive = industryPaths.some((p) => pathname.startsWith(p))
  const isServiceActive = servicePaths.some((p) => pathname.startsWith(p))

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1100px]">
        <div
          className={`flex items-center px-2 rounded-2xl transition-all duration-500 ${
            scrolled
              ? "bg-[#0F0F14]/80 border border-white/[0.06] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl"
          }`}
        >
          {/* Logo */}
          <a href="/" className="flex items-center px-3 h-11 shrink-0">
            <Logo gradient className="h-3 w-auto" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center ml-2">
            <a
              href="/platform"
              className={navLinkClass(pathname === "/platform")}
            >
              Функционал
            </a>

            <Dropdown
              label="Отрасли"
              items={industries}
              open={openDropdown === "industries"}
              onToggle={() =>
                setOpenDropdown(openDropdown === "industries" ? null : "industries")
              }
              isActive={isIndustryActive}
            />

            <Dropdown
              label="Услуги"
              items={services}
              open={openDropdown === "services"}
              onToggle={() =>
                setOpenDropdown(openDropdown === "services" ? null : "services")
              }
              isActive={isServiceActive}
            />

            <a
              href="#"
              className={navLinkClass(false)}
            >
              Новости
            </a>

            <a
              href="#"
              className={navLinkClass(false)}
            >
              Блог
            </a>

            <a
              href="/contacts"
              className={navLinkClass(pathname === "/contacts")}
            >
              Контакты
            </a>
          </div>

          {/* CTA Button */}
          <a
            href="/contacts"
            className="hidden md:flex items-center ml-auto px-5 h-9 my-1.5 text-sm font-medium rounded-xl transition-all duration-300 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white hover:shadow-[0_0_24px_rgba(59,130,246,0.4)] hover:brightness-110 whitespace-nowrap"
          >
            Оставить заявку
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
          <div className="md:hidden mt-2 p-3 rounded-2xl bg-[#0F0F14]/95 border border-white/[0.06] backdrop-blur-2xl max-h-[75vh] overflow-y-auto">
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-1 mb-2">
                {[
                  { label: "Функционал", href: "/platform" },
                  { label: "Новости", href: "#" },
                  { label: "Блог", href: "#" },
                  { label: "Контакты", href: "/contacts" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                      pathname === link.href
                        ? "text-[#E4E4E7] bg-white/[0.06]"
                        : "text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-white/[0.04]"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="h-px bg-white/[0.06] my-1" />

              <div className="grid grid-cols-2 gap-2 my-2">
                <div>
                  <div className="px-2 py-1.5 text-[10px] text-[#52525B] uppercase tracking-wider font-medium">Отрасли</div>
                  {industries.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`block px-2 py-2 text-xs rounded-lg transition-all duration-200 leading-tight ${
                        pathname === item.href
                          ? "text-[#E4E4E7] bg-white/[0.06]"
                          : "text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-white/[0.04]"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
                <div>
                  <div className="px-2 py-1.5 text-[10px] text-[#52525B] uppercase tracking-wider font-medium">Услуги</div>
                  {services.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`block px-2 py-2 text-xs rounded-lg transition-all duration-200 leading-tight ${
                        pathname === item.href
                          ? "text-[#E4E4E7] bg-white/[0.06]"
                          : "text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-white/[0.04]"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <a
                href="/contacts"
                className="mt-1 px-4 py-3 text-sm font-medium text-center rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white"
                onClick={() => setMobileOpen(false)}
              >
                Оставить заявку
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
