"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CtaButton } from "@/components/cta-button"
import {
  Users,
  Wallet,
  Clock,
  RefreshCw,
  ShieldCheck,
  MessageSquare,
  Rocket,
  Puzzle,
  Activity,
  Server,
  ClipboardList,
  GraduationCap,
  UserCheck,
  Quote,
  ArrowRight,
  MapPin,
  Flag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const teamCards = [
  {
    icon: Users,
    title: "Готовая команда из 7 сотрудников для поддержки B2B-системы",
    desc: "B2B-система — сложный enterprise-продукт. Чтобы она работала без сбоев 365 дней в году, с каждым нашим клиентом плотно работает команда из 7-8 профильных специалистов: бэкенд- и фронтенд-разработчики, DevOps-инженер, дизайнер, 1С-специалист под руководством менеджера проекта. Их время и экспертные компетенции входят в стоимость аренды B2B-системы.",
  },
  {
    icon: Wallet,
    title: "Вся наша экспертиза по цене одного штатного сотрудника",
    desc: "Платеж по абонентскому обслуживанию сопоставим с месячной зарплатой одного специалиста, но предоставляет не только B2B-платформу, но и целую команду профессионалов. Содержать такой штат самостоятельно, даже на полставки — выйдет кратно дороже. Кроме того, в тариф включены адаптация под фирменный стиль компании, интеграция с 1С и мобильное приложение.",
  },
  {
    icon: Clock,
    title: "Бесплатные 20 часов на доработки каждый месяц",
    desc: "Небольшие текущие задачи, доработки системы и кастомизацию под бизнес-процессы компании мы делаем бесплатно в рамках стандартного абонентского платежа в 20 часов. Если требуется крупная нетиповая разработка — составляем детальное ТЗ, заранее обговариваем результат, фиксируем цену. Работа стартует только после того, как все условия утверждены.",
  },
  {
    icon: RefreshCw,
    title: "Все обновления входят в стоимость системы",
    desc: "Система постоянно развивается: новый функционал, обновления интерфейса, изменения в законодательстве, интеграции с новыми сервисами. Когда обновление становится частью основной версии, наши клиенты получают его бесплатно, без доплат и допсоглашений. В итоге, через 10 лет вы будете владеть современной платформой, а не устаревшим софтом, который никто не поддерживает.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия скорости реакции / SLA",
    desc: "Любые технические сбои быстро устраняются в строгом соответствии с регламентом SLA, юридически зафиксированном в нашем клиентском договоре. Все ошибки мы делим на 4 категории приоритета — от незначительных до критических. Самые критичные сбои, когда клиент не может авторизоваться, оформить заказ или зайти в систему, мы устраняем максимально оперативно и отвечаем за сроки финансово и своей репутацией.",
  },
  {
    icon: MessageSquare,
    title: "Прямая связь с программистами и 1С-специалистами",
    desc: "Мы регулярно проводим сессии с нашими клиентами. Кроме того, они могут напрямую связаться с программистами, 1С-специалистами, сотрудниками по внедрению, дизайнерами и другими специалистами в чате, который мы создаем в удобном мессенджере. По всем вопросам общение происходит быстро и напрямую. По важным моментам назначаем созвоны вместо бесконечной переписки.",
  },
]

const implementationColumns = [
  {
    icon: ClipboardList,
    title: "Управление внедрением",
    items: [
      "Закрепление менеджера проекта, команды внедрения и техподдержки с нашей стороны",
      "Связь с разработчиками и 1C-специалистами, чтобы получать детальную информацию",
      "Инструкции по внедрению и 20 часов бесплатной техподдержки",
      "Личные встречи и консультации",
      "План развития проекта на ближайший год",
    ],
  },
  {
    icon: GraduationCap,
    title: "Инструктаж и аттестация команды",
    items: [
      "База знаний для отдела менеджеров",
      "Инструкции",
      "Аттестация на знание B2B-платформы",
      "Скрипты звонков и работа с возражениями",
      "Чек-листы менеджера",
    ],
  },
  {
    icon: UserCheck,
    title: "Адаптация клиентов",
    items: [
      "Интуитивно понятные сценарии работы",
      "Нативное обучение",
      "База знаний для пользователей",
      "Раздел «Помощь» в B2B-системе",
      "Чат с персональным менеджером",
    ],
  },
]

const supportStages = [
  {
    icon: Rocket,
    title: "Техническая интеграция B2B-системы: 6 четких спринтов до запуска",
    desc: "10 лет, более 200 интеграций — мы превратили внедрение в четкую, прогнозируемую технологию. Основа нашего подхода — проверенный шаблон, который мы адаптируем под каждого клиента: 6 спринтов по 2 недели и около 85 детальных задач (карточек). За каждым этапом закреплен ответственный специалист с каждой стороны. Такой подход позволяет двигаться без хаоса и не упустить ни одной детали: от настройки сервера и домена до фирменного стиля, мобильного приложения и финальной рассылки клиентам.",
  },
  {
    icon: MessageSquare,
    title: "Выделенный чат с командой в мессенджере: оперативное общение",
    desc: "Для оперативной коммуникации мы создаем чат в удобном мессенджере, куда добавляем ваших ключевых сотрудников и всю нашу инженерную команду — от разработчиков до проджект-менеджера. Все вопросы решаются здесь же, без задержек и лишней бюрократии: не нужно ждать письма или созвона, чтобы получить ответ. Кроме того, все ключевые позиции дублируются. Если наш сотрудник уходит в отпуск, его задачи бесшовно подхватывает дежурный специалист, уже погруженный в контекст проекта",
  },
  {
    icon: Puzzle,
    title: "Кастомизация и развитие платформы: бесплатный опыт игроков рынка и доработки под ваши процессы",
    desc: "За годы работы мы собрали огромную базу готовых кейсов, ИТ-решений и маркетинговых механик для продвижения B2B-платформ. Все эти практики оцифрованы и структурированы. На этапе технической интеграции клиенты получают свободный доступ к этому опыту. Вы сможете увидеть, какие функции уже успешно работают у других игроков рынка, и бесплатно внедрить проверенные инструменты. Если вашему бизнесу нужны уникальные доработки — мы готовы разработать любое нестандартное решение с нуля, чтобы система идеально адаптировалась под ваши бизнес-процессы и требования.",
  },
  {
    icon: Activity,
    title: "Утренний мониторинг: гарантия бесперебойной работы",
    desc: "Мы берем на себя полную ответственность за стабильность и бесперебойную работу вашей системы. Каждое утро наша команда проводит комплексную проверку: мониторинг серверов, контроль всех модулей системы, отправку формального тестового заказа, чтобы убедиться, что цепочка оформления работает безупречно, без сбоев и задержек. Если обнаружим любые отклонения — устраняем проблему до того, как ее заметят ваши клиенты.",
  },
  {
    icon: Server,
    title: "Выделенный тестовый сервер: надежные и безопасные обновления",
    desc: "Для каждого клиента мы разворачиваем индивидуальный тестовый сервер. Все обновления мы сначала выкладываем туда. Только после финального одобрения мы выкатываем стабильный код на боевую систему. Тестовый сервер требует дополнительных серверных мощностей, двойной выкладки кода и обслуживания, но мы осознанно включаем его в стоимость пакета ради безопасности вашего бизнеса.",
  },
]

const testimonials = [
  {
    company: "ПРОТЭК",
    logo: "/logos/protek.svg",
    caseSlug: "keis-protek",
    text: "Выбрали вас благодаря адекватной цене, сильной поддержке, заметному портфелю клиентов и опыту команды — и ни разу не пожалели. Вы большие молодцы! Особенно Юлия — ей просто нет равных! Вы очень клиентоориентрованная компания и умеете общаться со своими клиентами. Практически все наши пожелания были реализованы.",
  },
  {
    company: "Рейд-21",
    logo: "/logos/raid21.svg",
    caseSlug: "keis-raid21",
    text: "Запуск прошёл быстро и без лишней бюрократии. Поддержка реагирует оперативно, внедрение проходит в диалоге: нас слушают и предлагают решения. Видно постоянное развитие сервиса — новые функции выходят регулярно. Для нас это надёжный технологический партнёр и трамплин для роста. Тандем — 100%.",
  },
  {
    company: "Санлайт",
    logo: "/logos/sanlayt.svg",
    caseSlug: null,
    text: "Мы искали не просто «коробку», а комплексный подход. Уже на этапе демонстрации мы увидели не список функций, а решение конкретных задач. А еще для нас скорость реакции и клиентоориентированность важны так же сильно, как и технические возможности системы. Коллеги полностью оправдывают наши ожидания.",
  },
  {
    company: "Хогарт",
    logo: "/logos/hogart.svg",
    caseSlug: "keis-hogart",
    text: "Нас хвалят партнёры и копируют конкуренты. Работы впереди много, но у нас крепкий тандем с разработчиками. И по опыту можем сказать, что такого эффективного симбиоза, как у Хогарт и 3DaVinci еще нужно поискать. Мы благодарны команде за их образцовый профессионализм и ответсвенность. Так держать!",
  },
  {
    company: "Древиз",
    logo: "/logos/dreviz.svg",
    caseSlug: "keis-dreviz",
    text: "Нравится, что можем гибко управлять ассортиментом: запускать акции, улучшать контент и оперативно обновлять наличие. Работа менеджера — 5/5: на связи, быстро реагирует, помогает с внедрением и доработками. Мы не просто быстрее оформляем заказы, а получаем новые возможности для роста и удержания клиентов.",
  },
  {
    company: "Авента",
    logo: "/logos/aventa.svg",
    caseSlug: null,
    text: "При выборе решения для автоматизации оптовых продаж мы ориентировались на два ключевых фактора: скорость запуска и наличие у разработчика успешных кейсов именно в нашей отрасли. На данный момент мы перевели часть клиентов на самообслуживание через платформу, что позволило существенно снизить операционную нагрузку на менеджеров.",
  },
]

const DEFAULT_ROT = { x: -10, y: -22 }

function ChatFlipCard() {
  const [rot, setRot] = useState(DEFAULT_ROT)
  const [dragging, setDragging] = useState(false)
  const drag = useRef<{ px: number; py: number; rx: number; ry: number } | null>(
    null,
  )

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { px: e.clientX, py: e.clientY, rx: rot.x, ry: rot.y }
    setDragging(true)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.px
    const dy = e.clientY - drag.current.py
    const y = drag.current.ry + dx * 0.4
    const x = Math.max(-85, Math.min(85, drag.current.rx - dy * 0.4))
    setRot({ x, y })
  }

  const endDrag = () => {
    drag.current = null
    setDragging(false)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="[perspective:2200px] w-full touch-none select-none cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => setRot(DEFAULT_ROT)}
      >
        <div
          className="relative [transform-style:preserve-3d]"
          style={{
            transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
            transition: dragging ? "none" : "transform 0.5s ease-out",
          }}
        >
          {/* Лицевая сторона — скрин чата */}
          <div className="relative [backface-visibility:hidden] rounded-2xl border border-border-default overflow-hidden shadow-[0_30px_80px_-30px_rgba(59,130,246,0.5)]">
            <Image
              src="/tech-support/chats.png"
              alt="Общение команды поддержки с клиентами"
              width={2226}
              height={1368}
              sizes="(max-width: 1152px) 100vw, 1152px"
              draggable={false}
              className="w-full h-auto pointer-events-none"
            />
          </div>

          {/* Обратная сторона — текст */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border border-glass-border overflow-hidden flex items-center justify-center p-4 sm:p-8 md:p-16 bg-gradient-to-br from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative max-w-2xl text-center">
              <div className="hidden sm:flex w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/15 items-center justify-center mx-auto mb-4 md:mb-6">
                <MessageSquare className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="font-heading font-bold text-[clamp(15px,4vw,40px)] tracking-[-0.02em] text-white leading-tight mb-2 sm:mb-4 md:mb-5">
                Рассмотрим вашу задачу под любым углом
              </h3>
              {/* Короткий текст для мобилки */}
              <p className="sm:hidden text-[13px] text-white/90 leading-snug">
                Крутим и вертим задачу, пока не подберём лучший ракурс и решение. Всегда
                на связи с живыми специалистами — без ботов и бюрократии.
              </p>
              {/* Полный текст для планшета и десктопа */}
              <p className="hidden sm:block text-base md:text-lg text-white/90 leading-relaxed">
                Как эту карточку — крутим и вертим задачу, пока не подберём лучший ракурс
                и решение. Мы всегда на связи: вы общаетесь напрямую с реальными людьми —
                разработчиками, 1С-специалистами и менеджерами проекта, без ботов, тикетов
                и лишней бюрократии.
              </p>
            </div>
          </div>
        </div>
      </div>

      <span className="inline-flex items-center gap-2 text-sm text-subtle">
        <RefreshCw className="w-4 h-4" />
        Тяните, чтобы покрутить карточку в 3D — а на обороте текст. Двойной клик — вернуть
      </span>
    </div>
  )
}

function StagesRoad() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", updateScrollState, { passive: true })
    window.addEventListener("resize", updateScrollState)
    updateScrollState()
    return () => {
      el.removeEventListener("scroll", updateScrollState)
      window.removeEventListener("resize", updateScrollState)
    }
  }, [updateScrollState])

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = 340
    el.scrollBy({
      left: direction === "left" ? -cardWidth * 2 : cardWidth * 2,
      behavior: "smooth",
    })
  }

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <h2 className="font-heading font-bold text-[clamp(28px,4.5vw,44px)] tracking-[-0.02em] text-heading">
            Поддерживаем B2B-систему на всех этапах
          </h2>
          <span className="md:hidden inline-flex items-center gap-2 text-sm text-subtle">
            Листайте, чтобы пройти весь путь
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Горизонтальный скролл-трек */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-2 snap-x snap-proximity scroll-pl-6 md:scroll-pl-[var(--edge)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:[--edge:max(1.5rem,calc((100vw-72rem)/2))]"
      >
        <div className="relative flex items-start gap-5 w-max pl-6 pr-6 md:pl-[var(--edge)] md:pr-[var(--edge)]">
          {/* Полупрозрачная дорога в серо-фиолетовых тонах */}
          <div className="pointer-events-none absolute top-7 left-6 right-6 md:left-[var(--edge)] md:right-[var(--edge)] h-3.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#8B5CF6]/12 via-slate-400/20 to-[#8B5CF6]/12 backdrop-blur-sm border border-[#8B5CF6]/15">
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#8B5CF6]/35" />
          </div>

          {/* Старт */}
          <div className="shrink-0 snap-start flex flex-col items-center">
            <div className="h-14 flex items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500/90 flex items-center justify-center ring-4 ring-page z-10 shadow-lg">
                <MapPin className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="text-xs font-medium text-subtle mt-1">Старт</span>
          </div>

          {supportStages.map((s, i) => (
            <div
              key={i}
              className="w-[300px] md:w-[340px] shrink-0 snap-start flex flex-col items-center"
            >
              {/* Веха на дороге — иконка этапа */}
              <div className="h-14 flex items-center">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center ring-4 ring-page z-10 shadow-[0_6px_20px_-4px_rgba(59,130,246,0.6)]">
                  <s.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              {/* Карточка этапа */}
              <div className="w-full p-6 md:p-7 bg-surface rounded-2xl border border-border-default hover:border-[#3B82F6]/40 transition-all duration-500 glow-card">
                <h3 className="font-heading font-semibold text-lg text-heading mb-2 leading-snug">
                  {s.title}
                </h3>
                <p className="text-sm text-body leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}

          {/* Финиш */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="h-14 flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center ring-4 ring-page z-10 shadow-lg">
                <Flag className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="text-xs font-medium text-subtle mt-1">Готово</span>
          </div>
        </div>
      </div>

      {/* Кнопки навигации — как в кейсах на главной */}
      <div className="hidden md:flex items-center justify-center gap-3 mt-8 px-6">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
            canScrollLeft
              ? "border-border-default bg-surface hover:border-[#3B82F6]/40 text-heading cursor-pointer"
              : "border-border-default bg-surface/50 text-subtle/40 cursor-default"
          }`}
          aria-label="Прокрутить влево"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
            canScrollRight
              ? "border-border-default bg-surface hover:border-[#3B82F6]/40 text-heading cursor-pointer"
              : "border-border-default bg-surface/50 text-subtle/40 cursor-default"
          }`}
          aria-label="Прокрутить вправо"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}

export default function SupportPage() {
  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      {/* Hero — Выделяем команду под каждого клиента */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/for-bg/bg-techsup-white.png"
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            className="object-cover dark:hidden"
          />
          <Image
            src="/for-bg/bg-techsup-dark.png"
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            className="object-cover hidden dark:block"
          />
          <div className="absolute inset-0 bg-white/55 dark:bg-black/65" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--page) 0%, color-mix(in srgb, var(--page) 85%, transparent) 20%, color-mix(in srgb, var(--page) 40%, transparent) 45%, transparent 78%)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <span className="inline-block text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B82F6] bg-[#3B82F6]/10 px-3 py-1 rounded-full mb-6">
            Техническая поддержка
          </span>
          <h1 className="font-heading font-bold text-[clamp(30px,5vw,52px)] tracking-[-0.02em] text-heading leading-tight mb-6 max-w-3xl">
            Выделяем команду под&nbsp;каждого клиента
          </h1>
          <p className="text-lg md:text-xl text-body leading-relaxed max-w-2xl mb-8">
            Выбирая B2B-систему, вы&nbsp;выбираете команду, с&nbsp;которой будете
            работать бок&nbsp;о&nbsp;бок долгие годы
          </p>
          <CtaButton className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-medium hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            Оставить заявку
            <ArrowRight className="w-4 h-4" />
          </CtaButton>
        </div>
      </section>

      {/* Что входит в поддержку — 6 карточек */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamCards.map((c, i) => (
            <div
              key={i}
              className="p-6 md:p-7 bg-surface-hover rounded-2xl border border-border-default hover:border-[#3B82F6]/40 transition-all duration-500 glow-card"
            >
              <div className="w-11 h-11 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-4">
                <c.icon className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-heading mb-2 leading-snug">
                {c.title}
              </h3>
              <p className="text-sm text-body leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Внедряем B2B-систему в ваши рабочие процессы */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-[clamp(28px,4.5vw,44px)] tracking-[-0.02em] text-heading mb-14">
            Внедряем B2B-систему в ваши рабочие процессы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {implementationColumns.map((col, i) => (
              <div
                key={i}
                className="p-6 md:p-7 bg-surface rounded-2xl border border-border-default"
              >
                <div className="w-11 h-11 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center mb-4">
                  <col.icon className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-heading mb-4">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.items.map((it, j) => (
                    <li key={j} className="flex gap-2.5 text-sm text-body leading-relaxed">
                      <span className="text-[#8B5CF6] shrink-0">—</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <CtaButton className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-medium hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              Оставить заявку
              <ArrowRight className="w-4 h-4" />
            </CtaButton>
          </div>
        </div>
      </section>

      {/* CTA-баннер — Подключить B2B-систему за три месяца */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-glass-border min-h-[340px] flex items-center">
            <Image
              src="/tech-support/banner-support-1.png"
              alt="Операторы технической поддержки"
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover object-right"
            />
            {/* Фиолетовое кинематографичное затемнение слева */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(23,12,48,0.95) 0%, rgba(37,18,74,0.85) 32%, rgba(59,30,120,0.5) 56%, rgba(59,30,120,0.12) 80%, transparent 100%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3B82F6]/15 via-transparent to-transparent" />
            <div className="relative max-w-lg p-10 md:p-14">
              <h2 className="font-heading font-bold text-[clamp(24px,4vw,40px)] tracking-[-0.02em] text-white leading-tight mb-8 [text-shadow:0_2px_16px_rgba(0,0,0,0.4)]">
                Подключить B2B-систему с нашей командой за три месяца
              </h2>
              <CtaButton className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-medium hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                Оставить заявку
                <ArrowRight className="w-4 h-4" />
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      {/* Всегда на связи — 3D флип-карта */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-8">
            <span className="inline-block text-[11px] font-medium uppercase tracking-[0.15em] text-[#3B82F6] bg-[#3B82F6]/10 px-3 py-1 rounded-full">
              Всегда на связи
            </span>
          </div>
          <ChatFlipCard />
        </div>
      </section>

      {/* Поддерживаем B2B-систему на всех этапах — маршрут-дорога */}
      <StagesRoad />

      {/* Наших сотрудников клиенты знают по именам — отзывы */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-[clamp(28px,4.5vw,44px)] tracking-[-0.02em] text-heading mb-4">
            Наших сотрудников клиенты знают по именам
          </h2>
          <p className="text-base md:text-lg text-body leading-relaxed max-w-2xl mb-14">
            В отзывах наши клиенты чаще всего благодарят конкретных сотрудников.
            Вы общаетесь не со скриптами чат-ботов, а с вовлеченными экспертами
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t, i) => {
              const inner = (
                <>
                  {/* Логотип клиента — в шапке карточки */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="relative h-16 w-16 shrink-0">
                      <Image
                        src={t.logo}
                        alt={t.company}
                        fill
                        sizes="64px"
                        className="object-contain object-left dark:invert"
                      />
                    </div>
                    <Quote className="w-7 h-7 text-[#3B82F6]/20 shrink-0" />
                  </div>
                  <p className="text-sm md:text-base text-body leading-relaxed italic mb-5">
                    «{t.text}»
                  </p>
                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-border-default">
                    <span className="font-heading font-semibold text-heading">
                      {t.company}
                    </span>
                    {t.caseSlug && (
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3B82F6]">
                        Читать кейс
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </div>
                </>
              )

              return t.caseSlug ? (
                <Link
                  key={i}
                  href={`/blog/${t.caseSlug}`}
                  className="group relative p-6 md:p-7 bg-surface-hover rounded-2xl border border-border-default overflow-hidden hover:border-[#3B82F6]/40 transition-all duration-500 glow-card"
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={i}
                  className="group relative p-6 md:p-7 bg-surface-hover rounded-2xl border border-border-default overflow-hidden"
                >
                  {inner}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Финальный CTA — Автоматизируйте оптовые продажи c нашей командой */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-glass-border min-h-[360px] flex items-center">
            <Image
              src="/tech-support/banner-support-2.png"
              alt="Команда технической поддержки"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-right"
            />
            {/* Фиолетовое кинематографичное затемнение слева */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(23,12,48,0.95) 0%, rgba(37,18,74,0.85) 32%, rgba(59,30,120,0.5) 56%, rgba(59,30,120,0.12) 80%, transparent 100%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#8B5CF6]/15 via-transparent to-transparent" />
            <div className="relative max-w-lg p-10 md:p-16">
              <h2 className="font-heading font-bold text-[clamp(26px,4vw,44px)] tracking-[-0.02em] text-white leading-tight mb-8 [text-shadow:0_2px_16px_rgba(0,0,0,0.4)]">
                Автоматизируйте оптовые продажи c нашей командой
              </h2>
              <CtaButton className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-medium hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                Оставить заявку
                <ArrowRight className="w-4 h-4" />
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
