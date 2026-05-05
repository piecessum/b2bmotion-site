"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"
import { BackButton } from "@/components/back-button"
import { CtaButton } from "@/components/cta-button"

/* ── COLORS ── */
const BLUE = "#4f8ef7"
const RED = "#e8506a"
const GREEN = "#38d9a9"
const YELLOW = "#f6b93b"

/* ── DATA ── */
const contextCards = [
  { label: "Самообслуживание", value: "75%", desc: "B2B-покупателей предпочитают покупать самостоятельно, без участия менеджера", src: "Gartner, 2025", color: BLUE },
  { label: "Ожидания", value: "73%", desc: "ждут в B2B того же опыта, что и в обычных интернет-магазинах: удобные карточки, корзина, быстрое оформление заказа", src: "Clerk.io / Salesforce", color: GREEN },
  { label: "Время на ресёрч", value: "45%", desc: "времени закупщик тратит на исследование решений, и лишь 17% — на общение с поставщиком", src: "eWizCommerce, 2025", color: YELLOW },
  { label: "Стейкхолдеры", value: "6+", desc: "человек участвуют в одном решении о покупке в компаниях 10 000+ сотрудников", src: "Mixology 2025 B2B Buyer Report", color: RED },
]

const painPoints = [
  { pct: "43%", title: "Недостаточная или неточная информация о товаре", desc: "Главная боль закупщика. Списки частично решают проблему: клиент один раз собрал проверенный набор — и переиспользует его." },
  { pct: "30%", title: "Нет информации об остатках", desc: "«Купленные» показывают, что уже покупалось и в каком объёме — база для планирования." },
  { pct: "24%", title: "Плохой UX e-commerce-сайта", desc: "Каждый четвёртый закупщик уходит из-за интерфейса. Режимы «плитка/таблица», фильтры и поиск в списках — ответ на эту боль." },
  { pct: "22%", title: "Сложное оформление заказа", desc: "Готовая спецификация = готовая корзина. Один клик вместо сорока действий на оформление." },
  { pct: "77%", title: "Сменили поставщика из-за инструментов", desc: "76,9% закупщиков меняли поставщика из-за доступных инструментов: быстрый повтор заказа, сохранённые списки, аналитика закупок." },
]

const uxCards = [
  { label: "Baymard Institute", value: "67–90%", desc: "Доля отказов (уходов без покупки) на сайтах с посредственным юзабилити списков. При минимальной оптимизации — падает кратно.", src: "Baymard Product Listings & Filtering Study (200 000+ часов ресёрча)", color: BLUE },
  { label: "Когнитивная нагрузка", value: "−40%", desc: "Снижение времени на оформление повторного заказа при наличии функции быстрого повтора (отраслевая оценка)", src: "Shopify B2B CRO Guide, 2026", color: GREEN },
  { label: "Персонализация", value: "90%", desc: "B2B-покупателей говорят, что персонализированный контент влияет на их решение о покупке", src: "Mixology 2025 B2B Buyer Report", color: YELLOW },
  { label: "Кастомизация", value: "78%", desc: "B2B-покупателей хотят контролировать часть опыта покупки — формат, имена, группировку", src: "UnboundB2B, 2024", color: RED },
]

const roleMap = [
  { role: "Закупщик", text: "Спецификация = рабочий документ.", detail: "Один раз собрал набор под проект — согласовал внутри — оформил. «Купленные» дают быструю повторную закупку расходников без поиска в каталоге." },
  { role: "Инженер-проектировщик", text: "Избранное = технический «черновик».", detail: "Пока подбирает оборудование под объект, откладывает варианты. Сравнивает по характеристикам, не теряя контекст." },
  { role: "Менеджер клиента (в компании)", text: "Списки «Моя компания» = общее рабочее пространство.", detail: "Несколько сотрудников работают с одним согласованным составом без дублей и переписок." },
  { role: "Менеджер поставщика", text: "КП = быстрое коммерческое предложение.", detail: "Создаётся один раз с персональными ценами, переиспользуется клиентом без повторных согласований." },
  { role: "Руководитель закупок", text: "Архив + период = источник данных.", detail: "Видит, что заказывала компания, в каком объёме и за какой срок. База для планирования и переговоров с поставщиком." },
]

const benchmarks = [
  { metric: "Доля выручки от подборок и рекомендаций", value: "26% при 7% трафика", src: "Clerk.io" },
  { metric: "Доля повторов того же товара во вторых покупках", value: "77%", src: "BS&Co (156K клиентов)" },
  { metric: "Рост пожизненной ценности клиента при +10 п.п. повторных покупок", value: "+25–40%", src: "Finsi" },
  { metric: "Ценность повторного клиента по сравнению с новым", value: "в 5–7 раз выше", src: "Shopify" },
  { metric: "Стоимость удержания по сравнению с привлечением", value: "в 5–25 раз дешевле", src: "Shopify" },
  { metric: "Средний чек повторного клиента", value: "+67%", src: "EasyApps" },
  { metric: "B2B-покупатели, ожидающие потребительского опыта", value: "73%", src: "Salesforce" },
  { metric: "B2B, предпочитающие самостоятельную покупку", value: "75%", src: "Gartner 2025" },
  { metric: "Закупщики с проблемами на e-com сайтах", value: "76%", src: "Avionos" },
  { metric: "Готовы платить дороже за хороший portal", value: "83%", src: "Avionos" },
  { metric: "Меняли поставщика из-за инструментов", value: "76,9%", src: "Avionos" },
  { metric: "Влияние персонализации на решение", value: "90%", src: "Mixology 2025" },
  { metric: "Стейкхолдеров в решении (enterprise)", value: "6+", src: "Mixology 2025" },
  { metric: "Базовая конверсия B2B e-commerce", value: "1,8–3,0%", src: "Elogic 2026" },
  { metric: "Конверсия B2B с функциями быстрого повтора", value: "до 5%+", src: "Turis 2025" },
  { metric: "Рост repeat rate от replenishment-механик", value: "+15–25%", src: "EasyApps" },
]

const conclusions = [
  { role: "Для пользователя", text: "Списки — это снижение когнитивной нагрузки в сложном процессе закупок. Закупщик работает не с каталогом из 100 000 SKU, а со своими 20–30 проверенными подборками. Это тот же механизм, что закладки в браузере — но для работы." },
  { role: "Для компании-клиента", text: "Списки формируют корпоративную память закупок. Когда закупщик уходит — списки остаются. Компания не теряет знание о том, что и у кого покупала. Это аргумент для внедрения платформы на уровне руководства." },
  { role: "Для менеджера поставщика", text: "КП с персональными ценами = многоразовый инструмент. Один раз оформленное предложение переиспользуется клиентом без повторных согласований. Меньше рутины, больше фокуса на новых сделках." },
  { role: "Для платформы", text: "Списки привязывают клиента. Чем больше у клиента собственных спецификаций и подборок на платформе, тем выше стоимость ухода к конкуренту. Это самый дешёвый инструмент удержания." },
  { role: "Для продаж", text: "Демонстрационный кейс. При продаже платформы корпоративному клиенту списки показываются как конкретный ответ на вопрос «что мы получим взамен интеграции» — в цифрах, а не в обещаниях." },
]

const sourcesLeft = [
  { name: "Clerk.io", desc: "30 Ecommerce Recommendation Stats (2025)", url: "https://www.clerk.io/blog/product-recommendations-statistics" },
  { name: "BS&Co", desc: "Repeat Purchase Rate Benchmarks, 156K Customers (2026)", url: "https://bsandco.us/blog-post/repeat-purchase-rate-benchmarks" },
  { name: "Finsi", desc: "Repeat Purchase Rate Benchmarks (2026)", url: "https://www.finsi.ai/blog/repeat-purchase-rate-ecommerce/" },
  { name: "Shopify Enterprise", desc: "B2B E-commerce Trends & CRO (2026)" },
  { name: "Baymard Institute", desc: "Product Listings & Filtering UX Research" },
  { name: "Salsify", desc: "Curated Commerce Report (2026)" },
  { name: "Avionos", desc: "B2B Procurement Survey (160 специалистов по закупкам)" },
]

const sourcesRight = [
  { name: "Gartner", desc: "2025 B2B Buyer Survey (rep-free preference)" },
  { name: "Mixology Digital", desc: "2025 B2B Buyer Report" },
  { name: "Elogic", desc: "B2B Ecommerce Conversion Benchmarks (2026)" },
  { name: "Turis", desc: "B2B Ecommerce Conversion Rates (2025)" },
  { name: "eWizCommerce", desc: "Modern B2B Buying Process (2025)" },
  { name: "UnboundB2B", desc: "Factors in B2B Buying Decisions" },
  { name: "EasyApps", desc: "Retention Revenue Calculator" },
  { name: "Highspot / Cognism", desc: "B2B Buyer Journey Research (2025–2026)" },
]

/* ── PAGE ── */
export default function B2BListsReport() {
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
              Аналитический отчёт · 2026
            </span>
            <h1 className="font-heading font-bold text-[clamp(28px,4vw,48px)] tracking-[-0.02em] text-heading leading-tight mb-4">
              Списки товаров{" "}
              <span className="gradient-text">в B2B-маркетплейсах</span>
            </h1>
            <p className="text-lg text-subtle max-w-2xl mb-6">
              Как готовые подборки, спецификации, избранное и «купленные ранее» меняют поведение покупателей, ускоряют процессы закупок и растят выручку платформы.
            </p>
            <div className="text-xs text-dim space-y-0.5">
              <p>Данные: UX-исследования · отраслевые бенчмарки · поведенческая статистика</p>
              <p>Аудитория: product, маркетинг, продажи · Источников: 15+</p>
            </div>
          </header>

          {/* TOC */}
          <nav className="flex flex-wrap gap-2 mb-16">
            {[
              { label: "Контекст", href: "#context" },
              { label: "Боль покупателя", href: "#pain" },
              { label: "Поведение", href: "#behaviour" },
              { label: "UX и удобство", href: "#ux" },
              { label: "Рекомендованные подборки", href: "#curated" },
              { label: "Бенчмарки", href: "#benchmarks" },
              { label: "Модель ROI", href: "#roi" },
              { label: "Выводы", href: "#conclusions" },
              { label: "Источники", href: "#sources" },
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

          {/* ═══════ 01 КОНТЕКСТ ═══════ */}
          <section id="context" className="mb-20">
            <SectionHeader num="01" title="B2B-покупатель 2026: цифровой, самостоятельный, уставший" />
            <p className="text-subtle text-sm mb-8 max-w-3xl">
              За последние 3 года B2B-закупки сместились в онлайн. Покупатель приходит на платформу с готовым запросом, не хочет звонить менеджеру и ждёт такого же удобства, как в потребительских маркетплейсах.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {contextCards.map((c) => (
                <StatCard key={c.label} label={c.label} value={c.value} desc={c.desc} src={c.src} color={c.color} />
              ))}
            </div>

            <div className="p-6 rounded-xl glass-card">
              <p className="text-body text-sm leading-relaxed">
                Поведенческий сдвиг: покупатель <strong className="text-heading">приходит готовым</strong>, хочет быстро найти, сохранить, согласовать и оформить. Каждое лишнее действие — риск потери сделки. Именно здесь списки перестают быть «приятной фичей» и становятся частью основной логики платформы.
              </p>
            </div>
          </section>

          <div className="section-divider mb-16" />

          {/* ═══════ 02 БОЛЬ ПОКУПАТЕЛЯ ═══════ */}
          <section id="pain" className="mb-20">
            <SectionHeader num="02" title="Что раздражает закупщиков на B2B-сайтах" />
            <p className="text-subtle text-sm mb-8 max-w-3xl">
              Исследование Avionos среди 160 специалистов по закупкам в компаниях с оборотом от $100 млн показало: только 24% не испытывают вообще никаких проблем при онлайн-закупке. Остальные 76% наступают на одни и те же грабли.
            </p>

            <div className="space-y-1 mb-8">
              {painPoints.map((p, i) => (
                <div key={i} className="flex gap-5 p-5 rounded-xl glass-card items-start">
                  <span className="font-heading font-bold text-2xl shrink-0 w-16" style={{ color: RED }}>{p.pct}</span>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-heading mb-1">{p.title}</h4>
                    <p className="text-xs text-subtle leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <QuoteBlock
              text="«83% специалистов по закупкам готовы платить больше, если у поставщика удобный онлайн-магазин и личный кабинет клиента.»"
              src="Avionos B2B Procurement Survey"
            />
          </section>

          <div className="section-divider mb-16" />

          {/* ═══════ 03 ПОВЕДЕНИЕ ═══════ */}
          <section id="behaviour" className="mb-20">
            <SectionHeader num="03" title="Главное открытие: 77% повторных покупок — это один и тот же товар" />
            <p className="text-subtle text-sm mb-8 max-w-3xl">
              Анализ 156 000 клиентов и 7 454 повторных сценариев показал противоречие с индустриальным консенсусом. Все строят алгоритмы допродаж сопутствующих товаров, а покупатель приходит за тем же самым.
            </p>

            {/* Infographic */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#3B82F6]/[0.06] via-[#38D9A9]/[0.03] to-transparent border border-glass-border mb-8">
              <h3 className="font-heading font-bold text-lg text-heading mb-1">Из чего состоят повторные покупки</h3>
              <p className="text-xs text-dim mb-6">Анализ 7 454 сценариев вторых покупок по 156 000 клиентов</p>

              {/* Bar — vertical on mobile, horizontal on sm+ */}
              <div className="hidden sm:flex h-28 rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)] mb-6">
                <div className="flex flex-col justify-center px-7 bg-gradient-to-br from-[#4f8ef7] to-[#6ea8ff] text-white" style={{ width: "77%" }}>
                  <span className="font-heading font-black text-4xl leading-none">77%</span>
                  <span className="text-sm mt-2 opacity-90">повторный заказ того же товара</span>
                </div>
                <div className="flex flex-col justify-center px-7 bg-overlay-3 border-l-2 border-dashed border-glass-border flex-1">
                  <span className="font-heading font-black text-4xl leading-none text-heading">23%</span>
                  <span className="text-sm mt-2 text-subtle">покупка сопутствующего товара</span>
                </div>
              </div>
              <div className="flex sm:hidden flex-col rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)] mb-6">
                <div className="flex flex-col justify-center px-5 py-6 bg-gradient-to-br from-[#4f8ef7] to-[#6ea8ff] text-white" style={{ flexBasis: "77%" }}>
                  <span className="font-heading font-black text-4xl leading-none">77%</span>
                  <span className="text-xs mt-2 opacity-90">повторный заказ того же товара</span>
                </div>
                <div className="flex flex-col justify-center px-5 py-3 bg-overlay-3 border-t-2 border-dashed border-glass-border" style={{ flexBasis: "23%" }}>
                  <span className="font-heading font-black text-2xl leading-none text-heading">23%</span>
                  <span className="text-xs mt-1 text-subtle">покупка сопутствующего товара</span>
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div className="flex gap-3 items-start text-sm text-subtle">
                  <span className="w-3 h-3 rounded-full bg-[#4f8ef7] mt-1 shrink-0" />
                  <div><strong className="text-heading">Повторный заказ</strong> — клиент возвращается и покупает ровно то же, что уже брал. Это главный сценарий B2B-удержания.</div>
                </div>
                <div className="flex gap-3 items-start text-sm text-subtle">
                  <span className="w-3 h-3 rounded-full bg-overlay-3 border border-glass-border mt-1 shrink-0" />
                  <div><strong className="text-heading">Допродажа</strong> — клиент покупает связанный товар. Работает, но кратно реже.</div>
                </div>
              </div>

              {/* Insight */}
              <div className="p-5 rounded-xl bg-[#f6b93b]/[0.08] border-l-[3px] border-[#f6b93b]">
                <p className="text-[10px] font-heading font-medium uppercase tracking-[0.2em] text-[#f6b93b] mb-2">Инсайт</p>
                <p className="text-sm text-body leading-relaxed">
                  Весь маркетинг построен на блоках «похожие товары» и «с этим покупают». Но три четверти клиентов хотят не похожее, а <strong className="text-[#f6b93b]">то же самое, удобно повторить</strong>. Блок «Купленные» — прямой ответ на это поведение.
                </p>
              </div>

              <p className="text-xs text-dim mt-5">Источник: BS&Co, выборка 156 000 клиентов (2026)</p>
            </div>

            {/* 3 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <StatCard label="Вероятность" value="45%" desc="Клиент, совершивший 2-ю покупку, совершит и 3-ю" src="Finsi, 2026" color={YELLOW} />
              <StatCard label="Вероятность" value="54%" desc="После 3-й покупки вероятность 4-й ещё выше — эффект накопления" src="Finsi, 2026" color={YELLOW} />
              <StatCard label="Ценность клиента" value="в 5–7 раз" desc="приносит денег повторный клиент по сравнению с разовым — за всё время работы с ним" src="Shopify Enterprise" color={GREEN} />
            </div>

            <div className="p-6 rounded-xl glass-card">
              <p className="text-body text-sm leading-relaxed">
                Практический вывод: <strong className="text-heading">блок «Купленные товары»</strong> — это не архив, а главный инструмент удержания. Он конвертирует факт прошлой покупки в будущую выручку при минимальном маркетинговом усилии.
              </p>
            </div>
          </section>

          <div className="section-divider mb-16" />

          {/* ═══════ 04 UX ═══════ */}
          <section id="ux" className="mb-20">
            <SectionHeader num="04" title="Списки снимают когнитивную нагрузку" />
            <p className="text-subtle text-sm mb-8 max-w-3xl">
              В B2B-закупках средний чек больше, а цена ошибки выше. Закупщик держит в голове десятки артикулов, номиналов, совместимостей. Списки выносят эту нагрузку из памяти в интерфейс.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {uxCards.map((c) => (
                <StatCard key={c.label} label={c.label} value={c.value} desc={c.desc} src={c.src} color={c.color} />
              ))}
            </div>

            <h3 className="font-heading font-semibold text-base text-heading mb-5">Зачем списки нужны конечному пользователю — по ролям</h3>
            <div className="space-y-1">
              {roleMap.map((r, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-6 p-5 rounded-xl glass-card items-start">
                  <span className="font-heading font-semibold text-sm shrink-0 sm:w-44" style={{ color: GREEN }}>{r.role}</span>
                  <p className="text-sm text-subtle leading-relaxed">
                    <strong className="text-heading">{r.text}</strong> {r.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="section-divider mb-16" />

          {/* ═══════ 05 РЕКОМЕНДОВАННЫЕ ПОДБОРКИ ═══════ */}
          <section id="curated" className="mb-20">
            <SectionHeader num="05" title="Курируемые подборки: 7% трафика → 26% выручки" />
            <p className="text-subtle text-sm mb-8 max-w-3xl">
              Исследования e-commerce показывают устойчивую аномалию: курируемые подборки и рекомендации генерируют непропорционально большую долю выручки относительно трафика, который на них приходится.
            </p>

            {/* Big stat */}
            <div className="text-center py-14 px-6 rounded-2xl bg-gradient-to-br from-[#3B82F6]/[0.06] via-[#38D9A9]/[0.03] to-transparent border border-glass-border mb-8">
              <p className="font-heading font-black text-[clamp(60px,10vw,140px)] leading-none tracking-[-0.04em] gradient-text">26%</p>
              <p className="text-base text-body mt-4 max-w-xl mx-auto">
                доли <strong className="text-heading">всей выручки</strong> приходится на подборки и рекомендации, при том что они получают всего 7% трафика
              </p>
              <p className="text-xs text-dim mt-5">Clerk.io, агрегированное исследование 2025</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <StatCard label="Ритейлеры" value="54%" desc="называют курируемые подборки главным способом увеличить средний чек" src="Clerk.io" color={BLUE} />
              <StatCard label="Walmart" value="Brand Shops" desc="В 2025 запустил Brand Shelves — курируемые витрины брендов. Прямой аналог «Рекомендованных списков»" src="Shopify Enterprise Report" color={GREEN} />
              <StatCard label="Покупатели" value="47%" desc="уходят к конкурентам, если рекомендации нерелевантны — не делать подборки опаснее, чем делать" src="Clerk.io" color={YELLOW} />
            </div>

            <QuoteBlock
              text="«Curated commerce — это модель, сочетающая персонализацию и курирование и упрощающая решения о покупке. Покупатели открывают новые бренды, покупают у проверенных и отслеживают заказы в одном месте.»"
              src="Salsify Curated Commerce Report 2026"
            />
          </section>

          <div className="section-divider mb-16" />

          {/* ═══════ 06 БЕНЧМАРКИ ═══════ */}
          <section id="benchmarks" className="mb-20">
            <SectionHeader num="06" title="Бенчмарки по функционалу списков" />
            <p className="text-subtle text-sm mb-8 max-w-3xl">
              Все ключевые цифры отчёта в одном месте — для быстрых ссылок в презентациях и внутренних обсуждениях.
            </p>

            <div className="p-6 rounded-2xl glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm">
                  <thead>
                    <tr className="border-b border-glass-border">
                      <th className="text-left py-3 px-3 text-[10px] font-medium uppercase tracking-wider text-dim">Метрика</th>
                      <th className="text-left py-3 px-3 text-[10px] font-medium uppercase tracking-wider text-[#f6b93b]">Значение</th>
                      <th className="text-left py-3 px-3 text-[10px] font-medium uppercase tracking-wider text-dim">Источник</th>
                    </tr>
                  </thead>
                  <tbody>
                    {benchmarks.map((b, i) => (
                      <tr key={i} className="border-b border-glass-border/50 hover:bg-overlay-2 transition-colors">
                        <td className="py-3 px-3 text-body">{b.metric}</td>
                        <td className="py-3 px-3 font-heading font-semibold text-[#f6b93b]">{b.value}</td>
                        <td className="py-3 px-3 text-dim text-xs">{b.src}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <div className="section-divider mb-16" />

          {/* ═══════ 07 ROI ═══════ */}
          <section id="roi" className="mb-20">
            <SectionHeader num="07" title="Расчёт эффекта на типовом клиенте" />
            <p className="text-subtle text-sm mb-8 max-w-3xl">
              Консервативная оценка по нижним границам отраслевых бенчмарков. Моделируется эффект от внедрения всех блоков страницы списков у среднего B2B-клиента электротехнического маркетплейса.
            </p>

            <div className="p-8 rounded-2xl glass-card max-w-3xl">
              <p className="text-subtle text-sm mb-6">
                Клиент: годовой оборот 50 млн ₽, средний чек 120 тыс. ₽, доля повторных покупателей 22%
              </p>

              <div className="space-y-0">
                {[
                  { label: "Рост среднего чека через спецификации (+15%)", value: "+7 500 000 ₽" },
                  { label: "Рост частоты через «Купленные» (+10 п.п. к повторным покупкам → +25% к ценности клиента)", value: "+12 500 000 ₽" },
                  { label: "Экономия времени менеджеров (~30% рутины)", value: "экономия ФОТ" },
                  { label: "Снижение оттока за счёт «Моя компания» и шаринга", value: "+удержание" },
                ].map((row, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 py-4 border-b border-glass-border text-sm">
                    <span className="text-body">{row.label}</span>
                    <span className="font-heading font-semibold text-[#f6b93b] shrink-0">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-6 mt-4 border-t-2 border-[#38d9a9]">
                <span className="font-heading font-bold text-lg text-heading">Итого, консервативно</span>
                <span className="font-heading font-bold text-lg text-[#38d9a9]">+20 млн ₽ / +40%</span>
              </div>
            </div>

            <div className="p-6 rounded-xl glass-card mt-6 max-w-3xl">
              <p className="text-body text-sm leading-relaxed">
                В категориях с <strong className="text-heading">регулярным потреблением</strong> (расходники, МРО, электротехнические компоненты) эффект обычно выше консервативной оценки — за счёт более высокой доли повторных закупок одних и тех же позиций.
              </p>
            </div>
          </section>

          <div className="section-divider mb-16" />

          {/* ═══════ 08 ВЫВОДЫ ═══════ */}
          <section id="conclusions" className="mb-20">
            <SectionHeader num="08" title="Что это значит для продукта" />

            <div className="space-y-1">
              {conclusions.map((c, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-6 p-5 rounded-xl glass-card items-start">
                  <span className="font-heading font-semibold text-sm shrink-0 sm:w-48" style={{ color: GREEN }}>{c.role}</span>
                  <p className="text-sm text-body leading-relaxed">
                    <strong className="text-heading">{c.text.split(".")[0]}.</strong>{c.text.substring(c.text.indexOf(".") + 1)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="section-divider mb-16" />

          {/* ═══════ 09 ИСТОЧНИКИ ═══════ */}
          <section id="sources" className="mb-20">
            <SectionHeader num="09" title="Ссылки на исследования" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {sourcesLeft.map((s, i) => (
                  <p key={i} className="text-sm text-subtle leading-relaxed">
                    <strong className="text-heading">{s.name}</strong> — {s.desc}
                    {s.url && (
                      <>
                        <br />
                        <a href={s.url} className="text-[#60A5FA] hover:underline text-xs" target="_blank" rel="noopener noreferrer">
                          {s.url.replace("https://www.", "").replace("https://", "")}
                        </a>
                      </>
                    )}
                  </p>
                ))}
              </div>
              <div className="space-y-3">
                {sourcesRight.map((s, i) => (
                  <p key={i} className="text-sm text-subtle leading-relaxed">
                    <strong className="text-heading">{s.name}</strong> — {s.desc}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Footer note */}
          <div className="text-center py-10 text-xs text-dim space-y-1">
            <p>Отчёт подготовлен для блога B2B Движение · 2026</p>
            <p>Все цифры приведены со ссылками на первоисточники · Удобочитаемая интерпретация бенчмарков</p>
          </div>

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
            <CtaButton
              className="shimmer-btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] transition-all duration-300 hover:brightness-110"
            >
              Запросить демо
              <ArrowRight className="w-4 h-4" />
            </CtaButton>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}

/* ── SHARED COMPONENTS ── */

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-8">
      <span className="font-heading font-bold text-xl sm:text-2xl gradient-text">{num}</span>
      <h2 className="font-heading font-bold text-xl sm:text-2xl text-heading">{title}</h2>
    </div>
  )
}

function StatCard({ label, value, desc, src, color }: { label: string; value: string; desc: string; src: string; color: string }) {
  return (
    <div className="relative p-5 rounded-xl glass-card overflow-hidden group hover:border-[color:var(--accent)] transition-colors">
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: color }} />
      <p className="text-[10px] uppercase tracking-wider text-dim mb-2">{label}</p>
      <p className="font-heading font-bold text-2xl mb-2" style={{ color }}>{value}</p>
      <p className="text-xs text-body leading-relaxed mb-2">{desc}</p>
      <p className="text-[11px] text-dim italic">{src}</p>
    </div>
  )
}

function QuoteBlock({ text, src }: { text: string; src: string }) {
  return (
    <div className="p-6 rounded-xl bg-overlay-2 border-l-[3px] border-[#f6b93b]">
      <p className="text-base text-body leading-relaxed italic font-light">{text}</p>
      <p className="mt-3 text-[10px] font-heading font-medium uppercase tracking-[0.15em] text-dim">{src}</p>
    </div>
  )
}
