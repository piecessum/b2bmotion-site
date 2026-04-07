"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { BackButton } from "@/components/back-button"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ScatterChart, Scatter, PieChart, Pie, Cell, ResponsiveContainer,
} from "recharts"

/* ── DATA ── */
const platforms = [
  { name:"B2B Движение", tag:"ru", country:"Россия", model:"SaaS/On-premise", price:"150 000 ₽/мес", deploy:"3 мес", overall:8.2, vq:7.5, rec:"Высокая", design:7, nav:7, content:8, transprice:"Да", g2:"—", capterra:"—", support:"Да", response:"<2 ч", wholesPrices:"Да", perscat:"Да", multidisc:"Да", ordapprove:"Да", c1:"Нативная", moysklad:"Да", mdm:"Встроено", fz152:"Да", multicur:"Да", deploy_type:"SaaS", anim:"Минимум", cases:"10+", demo:"Видео", blog:"Да", darkt:"Нет", mobile:"iOS/Android" },
  { name:"Agora", tag:"ru", country:"Россия", model:"SaaS/On-premise", price:"1 000 000 ₽", deploy:"7 дн–3 мес", overall:8.0, vq:7.0, rec:"Средняя", design:8, nav:8, content:8, transprice:"Частично", g2:"—", capterra:"—", support:"Да", response:"<4 ч", wholesPrices:"Да", perscat:"Да", multidisc:"Да", ordapprove:"Да", c1:"Да", moysklad:"Да", mdm:"Опция", fz152:"Да", multicur:"Да", deploy_type:"SaaS", anim:"Умеренно", cases:"10+", demo:"Демо", blog:"Да", darkt:"Нет", mobile:"По запросу" },
  { name:"Compo", tag:"ru", country:"Россия", model:"On-premise", price:"3 000 000 ₽", deploy:"По запросу", overall:8.5, vq:6.5, rec:"Средняя", design:9, nav:8, content:9, transprice:"Нет", g2:"—", capterra:"—", support:"Да", response:"<4 ч", wholesPrices:"Да", perscat:"Да", multidisc:"Да", ordapprove:"Да", c1:"Да", moysklad:"Да", mdm:"Встроено", fz152:"Да", multicur:"Да", deploy_type:"On-premise", anim:"Много", cases:"5+", demo:"Видео+демо", blog:"Да", darkt:"Да", mobile:"Адаптив" },
  { name:"АЛЬФА: B2B", tag:"ru", country:"Россия", model:"1С-Битрикс", price:"399 900 ₽", deploy:"1 мес", overall:7.3, vq:8.0, rec:"Высокая", design:6, nav:6, content:7, transprice:"Да", g2:"—", capterra:"—", support:"Да", response:"<8 ч", wholesPrices:"Да", perscat:"Да", multidisc:"Да", ordapprove:"Да", c1:"Нативная", moysklad:"Да", mdm:"Нет", fz152:"Да", multicur:"Да", deploy_type:"On-premise", anim:"Минимум", cases:"10+", demo:"Скриншоты", blog:"Да", darkt:"Нет", mobile:"Адаптив" },
  { name:"Sellty", tag:"ru", country:"Россия", model:"SaaS", price:"3 990 ₽/мес", deploy:"Часы", overall:7.0, vq:9.0, rec:"Высокая", design:7, nav:8, content:6, transprice:"Да", g2:"—", capterra:"—", support:"Да", response:"<24 ч", wholesPrices:"Да", perscat:"Да", multidisc:"Ограничено", ordapprove:"Нет", c1:"Да", moysklad:"Да", mdm:"Нет", fz152:"Да", multicur:"Нет", deploy_type:"SaaS", anim:"Умеренно", cases:"0", demo:"Тур", blog:"Нет", darkt:"Нет", mobile:"Адаптив" },
  { name:"Shopify Plus", tag:"global", country:"Канада", model:"SaaS", price:"$2 000/мес", deploy:"1–3 мес", overall:9.0, vq:7.0, rec:"Нет", design:9, nav:9, content:9, transprice:"Частично", g2:"4.5", capterra:"4.6", support:"Нет", response:"<1 ч", wholesPrices:"Да", perscat:"Да", multidisc:"Да", ordapprove:"Да", c1:"Коннектор", moysklad:"Нет", mdm:"Приложения", fz152:"Нет", multicur:"Да", deploy_type:"SaaS", anim:"Много", cases:"100+", demo:"Интерактив", blog:"Да", darkt:"Да", mobile:"Да" },
  { name:"Adobe Commerce", tag:"global", country:"США", model:"Cloud/On-premise", price:"$22 000/год", deploy:"3–6 мес", overall:8.7, vq:6.0, rec:"Нет", design:8, nav:7, content:8, transprice:"Нет", g2:"4.3", capterra:"4.4", support:"Нет", response:"<4 ч", wholesPrices:"Да", perscat:"Да", multidisc:"Да", ordapprove:"Да", c1:"Да", moysklad:"Нет", mdm:"Да", fz152:"Нет", multicur:"Да", deploy_type:"Cloud", anim:"Умеренно", cases:"50+", demo:"Видео", blog:"Да", darkt:"Нет", mobile:"Да" },
  { name:"BigCommerce", tag:"global", country:"США", model:"SaaS", price:"$400/мес", deploy:"1–2 мес", overall:8.8, vq:8.0, rec:"Нет", design:9, nav:9, content:9, transprice:"Частично", g2:"4.4", capterra:"4.5", support:"Нет", response:"<2 ч", wholesPrices:"Да", perscat:"Да", multidisc:"Да", ordapprove:"Да", c1:"Коннектор", moysklad:"Нет", mdm:"Приложения", fz152:"Нет", multicur:"Да", deploy_type:"SaaS", anim:"Много", cases:"30+", demo:"Интерактив", blog:"Да", darkt:"Да", mobile:"Да" },
  { name:"Salesforce B2B", tag:"global", country:"США", model:"SaaS", price:"$25 000/год", deploy:"3–6 мес", overall:9.1, vq:6.0, rec:"Нет", design:9, nav:8, content:9, transprice:"Нет", g2:"4.4", capterra:"4.3", support:"Нет", response:"<4 ч", wholesPrices:"Да", perscat:"Да", multidisc:"Да", ordapprove:"Да", c1:"Коннектор", moysklad:"Нет", mdm:"Да", fz152:"Нет", multicur:"Да", deploy_type:"SaaS", anim:"Много", cases:"100+", demo:"Интерактив", blog:"Да", darkt:"Да", mobile:"Да" },
  { name:"SAP Commerce", tag:"global", country:"Германия", model:"Enterprise Cloud", price:"По запросу", deploy:"6–12 мес", overall:8.9, vq:5.5, rec:"Нет", design:7, nav:7, content:8, transprice:"Нет", g2:"4.2", capterra:"4.1", support:"Нет", response:"<8 ч", wholesPrices:"Да", perscat:"Да", multidisc:"Да", ordapprove:"Да", c1:"Да", moysklad:"Нет", mdm:"Да", fz152:"Нет", multicur:"Да", deploy_type:"Cloud", anim:"Умеренно", cases:"30+", demo:"Видео", blog:"Да", darkt:"Нет", mobile:"Да" },
  { name:"WooCommerce", tag:"global", country:"США", model:"Open-source", price:"$149/год+хост", deploy:"1–2 мес", overall:8.3, vq:9.0, rec:"Средняя", design:7, nav:8, content:8, transprice:"Да", g2:"4.6", capterra:"4.7", support:"Сообщ.", response:"<24 ч", wholesPrices:"Плагины", perscat:"Плагины", multidisc:"Плагины", ordapprove:"Нет", c1:"Плагины", moysklad:"Да", mdm:"Нет", fz152:"Нет", multicur:"Да", deploy_type:"Open-source", anim:"Минимум", cases:"—", demo:"—", blog:"Да", darkt:"Нет", mobile:"Плагины" },
  { name:"Odoo", tag:"global", country:"Бельгия", model:"Open-source/SaaS", price:"€19.90/польз", deploy:"1–3 мес", overall:8.4, vq:8.5, rec:"Нет", design:8, nav:8, content:9, transprice:"Да", g2:"4.4", capterra:"4.5", support:"Да", response:"<12 ч", wholesPrices:"Да", perscat:"Да", multidisc:"Да", ordapprove:"Да", c1:"Да", moysklad:"Нет", mdm:"Да", fz152:"Нет", multicur:"Да", deploy_type:"SaaS", anim:"Умеренно", cases:"—", demo:"—", blog:"Да", darkt:"Нет", mobile:"Да" },
  { name:"Yo!Kart", tag:"global", country:"Индия", model:"Self-hosted", price:"$1499 разово", deploy:"1–2 мес", overall:7.8, vq:8.0, rec:"Нет", design:7, nav:7, content:7, transprice:"Частично", g2:"4.6", capterra:"4.5", support:"Да", response:"<24 ч", wholesPrices:"Да", perscat:"Да", multidisc:"Да", ordapprove:"Да", c1:"Нет", moysklad:"Нет", mdm:"Нет", fz152:"Нет", multicur:"Да", deploy_type:"Self-hosted", anim:"Минимум", cases:"—", demo:"—", blog:"Да", darkt:"Нет", mobile:"Нет" },
]

const RU_COLOR = "#3B82F6"
const GL_COLOR = "#E8506A"
const GREEN = "#38D9A9"
const YELLOW = "#F6B93B"

const marketGrowth = [
  { year: "2019", value: 0.9 },
  { year: "2021", value: 1.5 },
  { year: "2022", value: 1.8 },
  { year: "2024", value: 2.0 },
  { year: "2025*", value: 2.2 },
  { year: "2027*", value: 3.5 },
]

const globalMarket = [
  { year: "2025", value: 11.55 },
  { year: "2026", value: 13.92 },
  { year: "2028", value: 20 },
  { year: "2030", value: 30 },
  { year: "2032", value: 44 },
  { year: "2034", value: 61.83 },
]

const sortedByOverall = [...platforms].sort((a, b) => a.overall - b.overall)

const radarRU = [
  { metric: "Дизайн", "B2B Движение": 7, Agora: 8, Compo: 9, Sellty: 7 },
  { metric: "Навигация", "B2B Движение": 7, Agora: 8, Compo: 8, Sellty: 8 },
  { metric: "Контент", "B2B Движение": 8, Agora: 8, Compo: 9, Sellty: 6 },
  { metric: "Ц/К", "B2B Движение": 7.5, Agora: 7, Compo: 6.5, Sellty: 9 },
  { metric: "Общий", "B2B Движение": 8.2, Agora: 8, Compo: 8.5, Sellty: 7 },
]

const radarGlobal = [
  { metric: "Дизайн", "Shopify Plus": 9, BigCommerce: 9, Salesforce: 9, WooCommerce: 7 },
  { metric: "Навигация", "Shopify Plus": 9, BigCommerce: 9, Salesforce: 8, WooCommerce: 8 },
  { metric: "Контент", "Shopify Plus": 9, BigCommerce: 9, Salesforce: 9, WooCommerce: 8 },
  { metric: "Ц/К", "Shopify Plus": 7, BigCommerce: 8, Salesforce: 6, WooCommerce: 9 },
  { metric: "Общий", "Shopify Plus": 9, BigCommerce: 8.8, Salesforce: 9.1, WooCommerce: 8.3 },
]

const landingData = [...platforms]
  .map((p) => ({ name: p.name, tag: p.tag, avg: +((p.design + p.nav + p.content) / 3).toFixed(1) }))
  .sort((a, b) => a.avg - b.avg)

const landingCompare = platforms.map((p) => ({ name: p.name, design: p.design, content: p.content }))

const segmentData = [
  { segment: "Малый бизнес", ru: 2, global: 5 },
  { segment: "Средний бизнес", ru: 3, global: 6 },
  { segment: "Крупный бизнес", ru: 4, global: 7 },
  { segment: "Enterprise", ru: 4, global: 6 },
]

const deployData = (() => {
  const map: Record<string, number> = {}
  platforms.forEach((p) => { map[p.deploy_type] = (map[p.deploy_type] || 0) + 1 })
  const COLORS = [RU_COLOR, GL_COLOR, GREEN, YELLOW, "#B48CFF"]
  return Object.entries(map).map(([name, value], i) => ({ name, value, color: COLORS[i % COLORS.length] }))
})()

/* ── HELPERS ── */
function CellBadge({ value }: { value: string }) {
  if (value === "Да" || value === "Нативная" || value === "Встроено")
    return <span className="text-emerald-400 text-xs font-medium">&#10003; {value}</span>
  if (value === "Нет")
    return <span className="text-red-400/70 text-xs">&#10007; Нет</span>
  return <span className="text-amber-400/80 text-xs">~ {value}</span>
}

function TagBadge({ tag }: { tag: string }) {
  return tag === "ru" ? (
    <span className="inline-block px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded bg-[#3B82F6]/10 text-[#60A5FA] mr-2">RU</span>
  ) : (
    <span className="inline-block px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded bg-[#E8506A]/10 text-[#E8506A] mr-2">GL</span>
  )
}

/* ── PAGE ── */
export default function B2BPlatformsReport() {
  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <article className="pt-36 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back to blog */}
          <BackButton
            storageKey="blog_back_url"
            fallback="/blog"
            className="inline-flex items-center gap-2 text-sm text-dim hover:text-body transition-colors mb-10"
          >
            Блог
          </BackButton>

          {/* Hero */}
          <header className="mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[#60A5FA] bg-[#3B82F6]/[0.06] border border-[#3B82F6]/[0.1] rounded-full">
              Аналитический отчёт · Март 2026
            </span>
            <h1 className="font-heading font-bold text-[clamp(28px,4vw,48px)] tracking-[-0.02em] text-heading leading-tight mb-4">
              B2B eCommerce Платформы:{" "}
              <span className="gradient-text">Россия vs Мировой рынок</span>
            </h1>
            <p className="text-lg text-subtle max-w-2xl mb-6">
              Комплексный обзор 13 платформ — функциональность, дизайн лендингов, цены и рекомендации по выбору
            </p>
            <div className="text-xs text-dim space-y-0.5">
              <p>Данные: собственное исследование + Data Insight · Gartner · Forrester · G2 · Capterra · RBC</p>
              <p className="text-subtle font-medium">2024–2025</p>
            </div>
          </header>

          {/* TOC */}
          <nav className="flex flex-wrap gap-2 mb-16">
            {[
              { label: "Рынок", href: "#market" },
              { label: "Обзор платформ", href: "#overview" },
              { label: "Функциональность", href: "#functional" },
              { label: "Лендинги", href: "#landing" },
              { label: "Сравнение", href: "#comparison" },
              { label: "Выводы", href: "#insights" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-overlay-3 border border-glass-border text-subtle hover:text-body hover:border-[#3B82F6]/20 transition-all duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* ═══════ SECTION 1: MARKET ═══════ */}
          <section id="market" className="mb-20">
            <SectionHeader num="01" title="Контекст рынка" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <MarketCard label="Рынок B2B ecom РФ 2025" value="2 трлн ₽" sub="Рост +11% год к году (Data Insight)" color={RU_COLOR} />
              <MarketCard label="Глобальный рынок платформ" value="$13.9 млрд" sub="Прогноз 2026 → $61.8 млрд к 2034" color={GREEN} />
              <MarketCard label="Прогноз Gartner по онлайн-B2B" value="80%" sub="всех B2B-транзакций онлайн к концу 2025" color={YELLOW} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ChartBox title="Рост российского рынка B2B онлайн-торговли" sub="Объём в трлн рублей (факт + прогноз)">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={marketGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                    <XAxis dataKey="year" tick={{ fill: "var(--dim-text)", fontSize: 12 }} />
                    <YAxis tick={{ fill: "var(--dim-text)", fontSize: 12 }} />
                    <Tooltip {...tooltipProps} />
                    <Bar dataKey="value" name="B2B e-com РФ (трлн ₽)" radius={[4, 4, 0, 0]}>
                      {marketGrowth.map((_, i) => (
                        <Cell key={i} fill={i === marketGrowth.length - 1 ? GREEN : RU_COLOR} fillOpacity={0.5 + i * 0.08} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartBox>

              <ChartBox title="Глобальный рынок платформ eCommerce" sub="Выручка в млрд $ (CAGR 20.49%)">
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={globalMarket}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                    <XAxis dataKey="year" tick={{ fill: "var(--dim-text)", fontSize: 12 }} />
                    <YAxis tick={{ fill: "var(--dim-text)", fontSize: 12 }} />
                    <Tooltip {...tooltipProps} />
                    <Line type="monotone" dataKey="value" name="Global ecom ($B)" stroke={GL_COLOR} strokeWidth={2} fill={GL_COLOR} fillOpacity={0.1} dot={{ fill: GL_COLOR, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartBox>
            </div>
          </section>

          <div className="section-divider mb-16" />

          {/* ═══════ SECTION 2: OVERVIEW ═══════ */}
          <section id="overview" className="mb-20">
            <SectionHeader num="02" title="Общий рейтинг платформ" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <StatCard label="Платформ в обзоре" value="13" sub="5 RU + 8 Global" accent={RU_COLOR} />
              <StatCard label="Лидер глобал" value="9.1" sub="Salesforce B2B Commerce" accent={GL_COLOR} />
              <StatCard label="Лидер РФ-рынка" value="8.5" sub="Compo" accent={GREEN} />
              <StatCard label="Лучшее цена/качество" value="9.0" sub="Sellty & WooCommerce" accent={YELLOW} />
            </div>

            <ChartBox title="Общая оценка vs Цена/качество" sub="Позиционирование каждой платформы" className="mb-5">
              <ResponsiveContainer width="100%" height={360}>
                <ScatterChart margin={{ top: 30, right: 20, bottom: 30, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                  <XAxis type="number" dataKey="x" name="Общая оценка" domain={[5, 10]} tick={{ fill: "var(--dim-text)", fontSize: 11 }} label={{ value: "Общая оценка", position: "bottom", offset: 10, fill: "var(--dimmer-text)", fontSize: 11 }} />
                  <YAxis type="number" dataKey="y" name="Цена/качество" domain={[4, 10]} tick={{ fill: "var(--dim-text)", fontSize: 11 }} label={{ value: "Цена/качество", angle: -90, position: "insideLeft", fill: "var(--dimmer-text)", fontSize: 11 }} />
                  <Tooltip
                    {...tooltipProps}
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null
                      const d = payload[0].payload
                      return (
                        <div style={tooltipStyle}>
                          <span style={{ fontWeight: 600 }}>{d.name}</span>: Общ.{d.x} / Ц/К {d.y}
                        </div>
                      )
                    }}
                  />
                  <Legend verticalAlign="top" wrapperStyle={{ fontSize: 12, color: "var(--dim-text)", paddingBottom: 8 }} />
                  <Scatter name="Российские" data={platforms.filter((p) => p.tag === "ru").map((p) => ({ x: p.overall, y: p.vq, name: p.name }))} fill={RU_COLOR} />
                  <Scatter name="Глобальные" data={platforms.filter((p) => p.tag === "global").map((p) => ({ x: p.overall, y: p.vq, name: p.name }))} fill={GL_COLOR} />
                </ScatterChart>
              </ResponsiveContainer>
            </ChartBox>

            <ChartBox title="Рейтинг платформ — общая оценка" sub="Шкала 1–10">
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={sortedByOverall} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                  <XAxis type="number" domain={[6, 10]} tick={{ fill: "var(--dim-text)", fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: "var(--body-text)", fontSize: 11 }} width={110} />
                  <Tooltip {...tooltipProps} />
                  <Bar dataKey="overall" name="Общая оценка" radius={[0, 4, 4, 0]}>
                    {sortedByOverall.map((p, i) => (
                      <Cell key={i} fill={p.tag === "ru" ? RU_COLOR : GL_COLOR} fillOpacity={0.6} stroke={p.tag === "ru" ? RU_COLOR : GL_COLOR} strokeWidth={1.5} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartBox>
          </section>

          <div className="section-divider mb-16" />

          {/* ═══════ SECTION 3: FUNCTIONALITY ═══════ */}
          <section id="functional" className="mb-20">
            <SectionHeader num="03" title="Функциональность" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <ChartBox title="Профили российских платформ" sub="Радарная диаграмма по ключевым параметрам">
                <ResponsiveContainer width="100%" height={380}>
                  <RadarChart data={radarRU} cx="50%" cy="55%">
                    <PolarGrid stroke="var(--glass-border)" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: "var(--dim-text)", fontSize: 12 }} />
                    <PolarRadiusAxis domain={[0, 10]} angle={90} tickCount={6} axisLine={false} tick={{ fill: "var(--dim-text)", fontSize: 11 }} />
                    <Radar name="B2B Движение" dataKey="B2B Движение" stroke={RU_COLOR} fill={RU_COLOR} fillOpacity={0.1} strokeWidth={2} />
                    <Radar name="Agora" dataKey="Agora" stroke={GREEN} fill={GREEN} fillOpacity={0.1} strokeWidth={2} />
                    <Radar name="Compo" dataKey="Compo" stroke={YELLOW} fill={YELLOW} fillOpacity={0.1} strokeWidth={2} />
                    <Radar name="Sellty" dataKey="Sellty" stroke={GL_COLOR} fill={GL_COLOR} fillOpacity={0.08} strokeWidth={2} />
                    <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11, color: "var(--dim-text)", paddingBottom: 4 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartBox>

              <ChartBox title="Профили глобальных платформ" sub="Топ-4 глобальные платформы">
                <ResponsiveContainer width="100%" height={380}>
                  <RadarChart data={radarGlobal} cx="50%" cy="55%">
                    <PolarGrid stroke="var(--glass-border)" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: "var(--dim-text)", fontSize: 12 }} />
                    <PolarRadiusAxis domain={[0, 10]} angle={90} tickCount={6} axisLine={false} tick={{ fill: "var(--dim-text)", fontSize: 11 }} />
                    <Radar name="Shopify Plus" dataKey="Shopify Plus" stroke={RU_COLOR} fill={RU_COLOR} fillOpacity={0.1} strokeWidth={2} />
                    <Radar name="BigCommerce" dataKey="BigCommerce" stroke={GREEN} fill={GREEN} fillOpacity={0.1} strokeWidth={2} />
                    <Radar name="Salesforce" dataKey="Salesforce" stroke={YELLOW} fill={YELLOW} fillOpacity={0.1} strokeWidth={2} />
                    <Radar name="WooCommerce" dataKey="WooCommerce" stroke={GL_COLOR} fill={GL_COLOR} fillOpacity={0.08} strokeWidth={2} />
                    <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11, color: "var(--dim-text)", paddingBottom: 4 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartBox>
            </div>

            <ChartBox title="Матрица ключевых функций" sub="Наличие критически важных B2B-функций">
              <div className="overflow-x-auto mt-3">
                <table className="w-full min-w-[1050px] text-sm">
                  <thead>
                    <tr className="border-b border-glass-border">
                      {["Платформа", "Опт. цены", "Персон. каталоги", "Мульти-скидки", "Согл. заказов", "1С интеграция", "МойСклад", "MDM/PIM", "ФЗ-152", "Мультивалюта"].map((h) => (
                        <th key={h} className="text-left py-3 px-2 text-[10px] font-medium uppercase tracking-wider text-dim whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {platforms.map((p) => (
                      <tr key={p.name} className="border-b border-glass-border/50 hover:bg-overlay-2 transition-colors">
                        <td className="py-2.5 px-2 font-medium text-body whitespace-nowrap"><TagBadge tag={p.tag} />{p.name}</td>
                        <td className="py-2.5 px-2 whitespace-nowrap"><CellBadge value={p.wholesPrices} /></td>
                        <td className="py-2.5 px-2 whitespace-nowrap"><CellBadge value={p.perscat} /></td>
                        <td className="py-2.5 px-2 whitespace-nowrap"><CellBadge value={p.multidisc} /></td>
                        <td className="py-2.5 px-2 whitespace-nowrap"><CellBadge value={p.ordapprove} /></td>
                        <td className="py-2.5 px-2 whitespace-nowrap"><CellBadge value={p.c1} /></td>
                        <td className="py-2.5 px-2 whitespace-nowrap"><CellBadge value={p.moysklad} /></td>
                        <td className="py-2.5 px-2 whitespace-nowrap"><CellBadge value={p.mdm} /></td>
                        <td className="py-2.5 px-2 whitespace-nowrap"><CellBadge value={p.fz152} /></td>
                        <td className="py-2.5 px-2 whitespace-nowrap"><CellBadge value={p.multicur} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ChartBox>
          </section>

          <div className="section-divider mb-16" />

          {/* ═══════ SECTION 4: LANDING ═══════ */}
          <section id="landing" className="mb-20">
            <SectionHeader num="04" title="Качество лендингов" />
            <p className="text-subtle text-sm mb-8 max-w-2xl">
              Анализ корпоративных сайтов по параметрам: современность дизайна, навигация, полнота контента, прозрачность цен и наличие демо-материалов.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <ChartBox title="Совокупный балл лендинга" sub="Дизайн + навигация + контент">
                <div className="space-y-2 mt-3">
                  {landingData.map((p) => (
                    <div key={p.name} className="flex items-center gap-3">
                      <span className="text-xs text-body w-28 shrink-0 truncate">{p.name}</span>
                      <div className="flex-1 h-5 rounded-full bg-overlay-3 overflow-hidden">
                        <div
                          className="h-full rounded-full flex items-center justify-end pr-2 text-[9px] font-medium text-white/70"
                          style={{ width: `${(p.avg / 10) * 100}%`, background: p.tag === "ru" ? `${RU_COLOR}aa` : `${GL_COLOR}aa` }}
                        >
                          {p.tag === "ru" ? "RU" : "GL"}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-heading w-8 text-right">{p.avg}</span>
                    </div>
                  ))}
                </div>
              </ChartBox>

              <ChartBox title="Дизайн vs Полнота контента" sub="Два ключевых параметра в сравнении">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={landingCompare} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                    <XAxis type="number" domain={[0, 10]} tick={{ fill: "var(--dim-text)", fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" tick={{ fill: "var(--body-text)", fontSize: 10 }} width={100} />
                    <Tooltip {...tooltipProps} />
                    <Legend wrapperStyle={{ fontSize: 11, color: "var(--dim-text)" }} />
                    <Bar dataKey="design" name="Дизайн" fill={`${RU_COLOR}b3`} radius={[0, 3, 3, 0]} />
                    <Bar dataKey="content" name="Контент" fill={`${GREEN}99`} radius={[0, 3, 3, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartBox>
            </div>

            <ChartBox title="Детальный анализ лендингов" sub="Все параметры аудита">
              <div className="overflow-x-auto mt-3">
                <table className="w-full min-w-[800px] text-sm">
                  <thead>
                    <tr className="border-b border-glass-border">
                      {["Платформа", "Дизайн", "Анимации", "Навигация", "Контент", "Кейсы", "Демо", "Цены открыты", "Тёмная тема", "Блог"].map((h) => (
                        <th key={h} className="text-left py-3 px-2 text-[10px] font-medium uppercase tracking-wider text-dim">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {platforms.map((p) => (
                      <tr key={p.name} className="border-b border-glass-border/50 hover:bg-overlay-2 transition-colors">
                        <td className="py-2.5 px-2 font-medium text-body whitespace-nowrap"><TagBadge tag={p.tag} />{p.name}</td>
                        <td className="py-2.5 px-2 text-xs text-body">{p.design}/10</td>
                        <td className="py-2.5 px-2 text-xs text-dim">{p.anim}</td>
                        <td className="py-2.5 px-2 text-xs text-body">{p.nav}/10</td>
                        <td className="py-2.5 px-2 text-xs text-body">{p.content}/10</td>
                        <td className="py-2.5 px-2 text-xs text-dim">{p.cases}</td>
                        <td className="py-2.5 px-2 text-xs text-dim">{p.demo || "—"}</td>
                        <td className="py-2.5 px-2"><CellBadge value={p.transprice} /></td>
                        <td className="py-2.5 px-2"><CellBadge value={p.darkt} /></td>
                        <td className="py-2.5 px-2"><CellBadge value={p.blog} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ChartBox>
          </section>

          <div className="section-divider mb-16" />

          {/* ═══════ SECTION 5: COMPARISON ═══════ */}
          <section id="comparison" className="mb-20">
            <SectionHeader num="05" title="Цены и сегменты" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <ChartBox title="Целевая аудитория платформ" sub="Покрытие сегментов по размеру бизнеса">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={segmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                    <XAxis dataKey="segment" tick={{ fill: "var(--dim-text)", fontSize: 11 }} />
                    <YAxis tick={{ fill: "var(--dim-text)", fontSize: 11 }} domain={[0, 9]} />
                    <Tooltip {...tooltipProps} />
                    <Legend wrapperStyle={{ fontSize: 11, color: "var(--dim-text)" }} />
                    <Bar dataKey="ru" name="Российские (из 5)" fill={`${RU_COLOR}b3`} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="global" name="Глобальные (из 8)" fill={`${GL_COLOR}99`} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartBox>

              <ChartBox title="Модели развёртывания" sub="Распределение по типу инфраструктуры">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={deployData} cx="50%" cy="45%" innerRadius={50} outerRadius={85} dataKey="value" nameKey="name" paddingAngle={2}>
                      {deployData.map((d, i) => (
                        <Cell key={i} fill={d.color} fillOpacity={0.8} stroke="var(--glass-border)" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip {...tooltipProps} />
                    <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: 11, color: "var(--dim-text)" }} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartBox>
            </div>

            <ChartBox title="Полная таблица сравнения" sub="Ключевые характеристики всех платформ">
              <div className="overflow-x-auto mt-3">
                <table className="w-full min-w-[1100px] text-sm">
                  <thead>
                    <tr className="border-b border-glass-border">
                      {["Платформа", "Страна", "Модель", "Стартовая цена", "Внедрение", "Поддержка RU", "Ответ", "G2", "Capterra", "Общий балл", "Ц/К", "Рек. для РФ"].map((h) => (
                        <th key={h} className="text-left py-3 px-2 text-[10px] font-medium uppercase tracking-wider text-dim">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {platforms.map((p) => (
                      <tr key={p.name} className="border-b border-glass-border/50 hover:bg-overlay-2 transition-colors">
                        <td className="py-2.5 px-2 font-semibold text-body whitespace-nowrap"><TagBadge tag={p.tag} />{p.name}</td>
                        <td className="py-2.5 px-2 text-xs text-dim">{p.country}</td>
                        <td className="py-2.5 px-2 text-[11px] text-dim">{p.model}</td>
                        <td className="py-2.5 px-2">
                          <span className="inline-block px-2 py-0.5 text-[11px] font-medium rounded-md bg-overlay-3 border border-glass-border text-body">{p.price}</span>
                        </td>
                        <td className="py-2.5 px-2 text-xs text-dim">{p.deploy}</td>
                        <td className="py-2.5 px-2"><CellBadge value={p.support} /></td>
                        <td className="py-2.5 px-2 text-xs text-dim">{p.response}</td>
                        <td className="py-2.5 px-2 text-xs">{p.g2 === "—" ? <span className="text-dim">—</span> : <span className="text-amber-400">&#9733; {p.g2}</span>}</td>
                        <td className="py-2.5 px-2 text-xs">{p.capterra === "—" ? <span className="text-dim">—</span> : <span className="text-amber-400">&#9733; {p.capterra}</span>}</td>
                        <td className="py-2.5 px-2 font-heading font-bold text-sm text-heading">{p.overall}</td>
                        <td className="py-2.5 px-2 text-sm text-emerald-400">{p.vq}</td>
                        <td className="py-2.5 px-2 text-xs font-medium" style={{ color: p.rec === "Высокая" ? GREEN : p.rec === "Средняя" ? YELLOW : GL_COLOR }}>{p.rec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ChartBox>
          </section>

          <div className="section-divider mb-16" />

          {/* ═══════ SECTION 6: INSIGHTS ═══════ */}
          <section id="insights" className="mb-20">
            <SectionHeader num="06" title="Аналитика и выводы" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              <InsightCard
                icon="🏆"
                color={RU_COLOR}
                title="Российские платформы: конкурентоспособны"
                text={<>
                  <strong>Compo (8.5), B2B Движение (8.2) и Agora (8.0)</strong> показывают оценки, сопоставимые с Adobe Commerce (8.7) и превышающие многих мировых игроков. При этом они имеют критически важные для РФ преимущества: <strong>нативная 1С-интеграция, ФЗ-152, российские платёжные системы</strong> и русскоязычная поддержка.
                </>}
              />
              <InsightCard
                icon="⚠️"
                color={GL_COLOR}
                title="Разрыв в экосистеме"
                text={<>
                  Глобальные платформы — <strong>Salesforce (9.1), SAP (8.9), BigCommerce (8.8)</strong> — имеют зрелые экосистемы с сотнями интеграций. Российские платформы только формируют собственные экосистемы, что пока ограничивает их применимость в Enterprise-сегменте.
                </>}
              />
              <InsightCard
                icon="💡"
                color={GREEN}
                title="Ценовая эффективность — козырь РФ"
                text={<>
                  <strong>Sellty (9.0/10 ц/к)</strong> при цене от 3 990 ₽/мес предлагает быстрый старт для МСБ. <strong>АЛЬФА: B2B</strong> выигрывает для среднего бизнеса с 1С. Западные enterprise-решения стартуют от <strong>$25 000/год</strong> — это 2+ млн рублей без учёта внедрения.
                </>}
              />
              <InsightCard
                icon="🌍"
                color={YELLOW}
                title="Тренды рынка 2025–2026"
                text={<>
                  По данным <strong>Gartner</strong>: 80% B2B-транзакций уйдут онлайн, 90% B2B-закупок будут управляться AI-агентами к 2028. <strong>Forrester</strong>: 66% B2B-покупателей ожидают полной персонализации. Российский рынок растёт на 11%+ в год.
                </>}
              />
            </div>

            {/* Recommendations grid */}
            <ChartBox title="Матрица рекомендаций: Какую платформу выбрать?" sub="Рекомендации по сценарию использования" className="mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                <RecCard color={GREEN} segment="Малый бизнес РФ" name="Sellty" desc="Быстрый старт, низкая цена, интеграция с 1С. Идеально для первых шагов в B2B онлайн." />
                <RecCard color={RU_COLOR} segment="Средний бизнес РФ" name="B2B Движение / Agora" desc="Развитый функционал, мобильное приложение, MDM, нативная 1С. Лучший баланс возможностей." />
                <RecCard color={YELLOW} segment="Крупный / Enterprise РФ" name="Compo / АЛЬФА: B2B" desc="Полный функционал, on-premise или SaaS, кастомизация, соответствие всем российским требованиям." />
                <RecCard color={GL_COLOR} segment="Глобальный mid-market" name="BigCommerce B2B" desc="Лучшее сочетание цены и мощности среди глобальных SaaS. Рейтинг G2: 4.4, от $400/мес." />
                <RecCard color={GL_COLOR} segment="Глобальный Enterprise" name="Salesforce / SAP" desc="Максимальная функциональность, AI-возможности, зрелая экосистема. Gartner Leaders." />
                <RecCard color={GREEN} segment="Бюджетное глобальное" name="WooCommerce / Odoo" desc="Open-source с широкими возможностями расширения. WooCommerce: Capterra 4.7." />
              </div>
            </ChartBox>

            {/* Conclusion */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#3B82F6]/[0.06] via-[#8B5CF6]/[0.04] to-[#06B6D4]/[0.06] border border-glass-border">
              <h3 className="font-heading font-bold text-xl text-heading mb-6">Итоговые выводы</h3>
              <ul className="space-y-4">
                {[
                  { bold: "Российские B2B платформы достигли функциональной зрелости", text: " — Compo, B2B Движение и Agora по совокупным показателям превосходят ряд западных аналогов и полностью закрывают потребности российского Enterprise" },
                  { bold: "Импортозамещение состоялось функционально, но не по экосистеме", text: " — нехватка готовых коннекторов, небольшие магазины приложений и ограниченные публичные кейсы остаются слабым местом РФ-платформ" },
                  { bold: "Лендинги — недооценённый актив", text: " — глобальные игроки инвестируют значительно больше в качество маркетинговых сайтов; российским платформам есть куда расти в части storytelling и демо-контента" },
                  { bold: "Рынок РФ растёт уверенно", text: " — 2 трлн рублей в 2025 году, Data Insight фиксирует зрелость экосистемы и ожидает дальнейшего роста по аналогии с B2C-сегментом" },
                  { bold: "Главный тренд 2026", text: " — AI-первые функции, guided selling и персонализация покупательского опыта становятся точкой дифференциации между платформами следующего поколения" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] mt-2 shrink-0" />
                    <p className="text-body leading-relaxed text-sm">
                      <strong className="text-heading font-semibold">{item.bold}</strong>{item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Bottom nav */}
          <div className="section-divider mb-10" />
          <div className="flex items-center justify-between">
            <BackButton
              storageKey="blog_back_url"
              fallback="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#60A5FA] hover:gap-3 transition-all duration-300"
            >
              Блог
            </BackButton>
            <a
              href="mailto:hello@b2b-dvizhenie.ru"
              className="shimmer-btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] transition-all duration-300 hover:brightness-110"
            >
              Запросить демо
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}

/* ── SHARED COMPONENTS ── */

const tooltipStyle: React.CSSProperties = {
  background: "var(--page)",
  border: "1px solid var(--glass-border)",
  borderRadius: "10px",
  fontSize: "13px",
  color: "var(--heading)",
  padding: "10px 14px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  lineHeight: "1.5",
  pointerEvents: "none" as const,
  maxWidth: "200px",
  whiteSpace: "normal" as const,
}

const tooltipWrapperStyle: React.CSSProperties = {
  zIndex: 50,
  pointerEvents: "none",
  overflow: "hidden",
}

const tooltipItemStyle: React.CSSProperties = {
  color: "var(--heading)",
}

const tooltipLabelStyle: React.CSSProperties = {
  color: "var(--heading)",
  fontWeight: 600,
}

const tooltipProps = {
  contentStyle: tooltipStyle,
  wrapperStyle: tooltipWrapperStyle,
  itemStyle: tooltipItemStyle,
  labelStyle: tooltipLabelStyle,
  cursor: false as const,
  isAnimationActive: false,
  allowEscapeViewBox: { x: false, y: true },
  offset: 10,
}


function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-8">
      <span className="font-heading font-bold text-xl sm:text-2xl gradient-text">{num}</span>
      <h2 className="font-heading font-bold text-xl sm:text-2xl text-heading">{title}</h2>
    </div>
  )
}

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub: string; accent: string }) {
  return (
    <div className="relative p-5 rounded-xl glass-card overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: accent }} />
      <p className="text-[10px] uppercase tracking-wider text-dim mb-2">{label}</p>
      <p className="font-heading font-bold text-2xl mb-1" style={{ color: accent }}>{value}</p>
      <p className="text-xs text-dim">{sub}</p>
    </div>
  )
}

function MarketCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="p-6 rounded-xl glass-card">
      <p className="text-[10px] uppercase tracking-wider text-dim mb-3">{label}</p>
      <p className="font-heading font-bold text-2xl mb-2" style={{ color }}>{value}</p>
      <p className="text-xs text-dim">{sub}</p>
    </div>
  )
}

function ChartBox({ title, sub, children, className = "" }: { title: string; sub: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-6 rounded-2xl glass-card overflow-hidden md:overflow-visible relative hover:z-10 ${className}`}>
      <h3 className="font-heading font-semibold text-sm text-heading mb-1">{title}</h3>
      <p className="text-[11px] text-dim mb-4">{sub}</p>
      {children}
    </div>
  )
}

function InsightCard({ icon, color, title, text }: { icon: string; color: string; title: string; text: React.ReactNode }) {
  return (
    <div
      className="p-6 rounded-xl border"
      style={{ background: `${color}08`, borderColor: `${color}20` }}
    >
      <span className="text-2xl mb-3 block">{icon}</span>
      <h4 className="font-heading font-semibold text-sm text-heading mb-2">{title}</h4>
      <p className="text-xs text-body leading-relaxed [&>strong]:text-heading [&>strong]:font-medium">{text}</p>
    </div>
  )
}

function RecCard({ color, segment, name, desc }: { color: string; segment: string; name: string; desc: string }) {
  return (
    <div
      className="p-5 rounded-xl border"
      style={{ background: `${color}08`, borderColor: `${color}20` }}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.1em] mb-2" style={{ color }}>{segment}</p>
      <p className="font-heading font-semibold text-sm text-heading mb-1.5">{name}</p>
      <p className="text-xs text-dim leading-relaxed">{desc}</p>
    </div>
  )
}
