"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const devicesRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [devicesVisible, setDevicesVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 }
    )

    const reveals = sectionRef.current?.querySelectorAll(".reveal")
    reveals?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setDevicesVisible(true)
        })
      },
      { threshold: 0.05 }
    )
    if (devicesRef.current) observer.observe(devicesRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePos({ x, y })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-32 md:pt-40"
    >
      {/* Aurora gradient orbs */}
      <div className="aurora-bg">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Mouse-following spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.05), transparent 40%)`,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-particle"
            style={{
              width: 2 + Math.random() * 5,
              height: 2 + Math.random() * 5,
              background:
                i % 3 === 0
                  ? `rgba(59, 130, 246, ${0.15 + Math.random() * 0.2})`
                  : i % 3 === 1
                  ? `rgba(139, 92, 246, ${0.12 + Math.random() * 0.18})`
                  : `rgba(255, 255, 255, ${0.06 + Math.random() * 0.1})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${16 + Math.random() * 14}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Main heading */}
        <h1 className="reveal reveal-delay-1 font-heading font-bold leading-[1.05] mb-4">
          <span
            className="block text-heading tracking-[0.06em]"
            style={{ fontSize: "clamp(48px, 10vw, 88px)" }}
          >
            B2B <span className="gradient-text">ДВИЖЕНИЕ</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="reveal reveal-delay-2 font-heading font-bold text-heading mb-10"
          style={{ fontSize: "clamp(24px, 4.5vw, 44px)" }}
        >
          10 лет помогаем компаниям
        </p>

        {/* CTA Button */}
        <div className="reveal reveal-delay-3 mb-14">
          <a
            href="#cta"
            className="shimmer-btn inline-flex items-center gap-2.5 px-10 py-5 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white text-lg font-semibold rounded-2xl hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_50px_rgba(59,130,246,0.45)] transition-all duration-300 hover:brightness-110"
          >
            Автоматизировать продажи
          </a>
        </div>

        {/* Stats row */}
        <div className="reveal reveal-delay-4 flex flex-wrap items-center justify-center gap-10 md:gap-16 mb-16">
          {[
            { value: "50+", label: "клиентов" },
            { value: "2.4М+", label: "товаров в каталогах" },
            { value: "10", label: "лет опыта" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-heading font-bold text-2xl md:text-3xl text-heading">
                {stat.value}
              </div>
              <div className="text-xs text-dim mt-1 tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Devices showcase — desktop: all 3, mobile: phone only */}
      <div ref={devicesRef} className="reveal reveal-delay-5 relative z-10 w-full max-w-5xl mx-auto px-6 mt-auto">
        {/* Desktop layout */}
        <div className="relative mx-auto hidden md:block" style={{ maxWidth: 900, perspective: "1200px" }}>
          {/* Glow behind laptop */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-gradient-to-r from-[#3B82F6]/10 via-[#8B5CF6]/8 to-[#06B6D4]/10 blur-[80px] pointer-events-none dark:opacity-100 opacity-50" />

          {/* Tablet — left, BEHIND laptop */}
          <div
            className="absolute z-0 transition-all ease-out"
            style={{
              transitionDuration: "1.4s",
              transitionDelay: "300ms",
              bottom: "5%",
              left: "-24%",
              width: "55%",
              opacity: devicesVisible ? 1 : 0,
              transform: devicesVisible
                ? "translateZ(0) translateX(0) scale(1)"
                : "translateZ(-200px) translateX(-40px) scale(0.85)",
            }}
          >
            <Image
              src="/pad.png"
              alt="B2B платформа на планшете"
              width={680}
              height={510}
              className="w-full h-auto drop-shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            />
          </div>

          {/* Laptop — center, static, ON TOP */}
          <Image
            src="/laptop-hero.png"
            alt="B2B Движение — платформа для оптовых продаж"
            width={1400}
            height={900}
            className="relative z-10 w-full h-auto drop-shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            priority
          />

          {/* Phone — right, IN FRONT of laptop */}
          <div
            className="absolute z-20 transition-all ease-out"
            style={{
              transitionDuration: "1.4s",
              transitionDelay: "500ms",
              bottom: "2%",
              right: "-8%",
              width: "24%",
              opacity: devicesVisible ? 1 : 0,
              transform: devicesVisible
                ? "translateZ(0) translateX(0) scale(1)"
                : "translateZ(-200px) translateX(40px) scale(0.85)",
            }}
          >
            <Image
              src="/phone.png"
              alt="B2B платформа на смартфоне"
              width={320}
              height={640}
              className="w-full h-auto drop-shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            />
          </div>
        </div>

        {/* Mobile layout — phone only */}
        <div className="md:hidden flex justify-center">
          <div className="w-[280px]">
            <Image
              src="/phone.png"
              alt="B2B платформа на смартфоне"
              width={320}
              height={640}
              className="w-full h-auto drop-shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-page to-transparent pointer-events-none z-20" />
    </section>
  )
}
