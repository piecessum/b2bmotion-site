"use client"

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
    text: "Выбрали вас благодаря адекватной цене, сильной поддержке, заметному портфелю клиентов и опыту команды — и ни разу не пожалели. Вы большие молодцы! Особенно Юлия — ей просто нет равных! Вы очень клиентоориентрованная компания и умеете общаться со своими клиентами. Практически все наши пожелания были реализованы.",
  },
  {
    company: "Рейд-21",
    text: "Запуск прошёл быстро и без лишней бюрократии. Поддержка реагирует оперативно, внедрение проходит в диалоге: нас слушают и предлагают решения. Видно постоянное развитие сервиса — новые функции выходят регулярно. Для нас это надёжный технологический партнёр и трамплин для роста. Тандем — 100%.",
  },
  {
    company: "Санлайт",
    text: "Мы искали не просто «коробку», а комплексный подход. Уже на этапе демонстрации мы увидели не список функций, а решение конкретных задач. А еще для нас скорость реакции и клиентоориентированность важны так же сильно, как и технические возможности системы. Коллеги полностью оправдывают наши ожидания.",
  },
  {
    company: "Хогарт",
    text: "Нас хвалят партнёры и копируют конкуренты. Работы впереди много, но у нас крепкий тандем с разработчиками. И по опыту можем сказать, что такого эффективного симбиоза, как у Хогарт и 3DaVinci еще нужно поискать. Мы благодарны команде за их образцовый профессионализм и ответсвенность. Так держать!",
  },
  {
    company: "Древиз",
    text: "Нравится, что можем гибко управлять ассортиментом: запускать акции, улучшать контент и оперативно обновлять наличие. Работа менеджера — 5/5: на связи, быстро реагирует, помогает с внедрением и доработками. Мы не просто быстрее оформляем заказы, а получаем новые возможности для роста и удержания клиентов.",
  },
  {
    company: "Авента",
    text: "При выборе решения для автоматизации оптовых продаж мы ориентировались на два ключевых фактора: скорость запуска и наличие у разработчика успешных кейсов именно в нашей отрасли. На данный момент мы перевели часть клиентов на самообслуживание через платформу, что позволило существенно снизить операционную нагрузку на менеджеров.",
  },
]

export default function SupportPage() {
  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      {/* Hero — Выделяем команду под каждого клиента */}
      <section className="relative pt-36 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-[11px] font-medium uppercase tracking-[0.15em] text-[#60A5FA] bg-[#3B82F6]/10 px-3 py-1 rounded-full mb-6">
            Техническая поддержка
          </span>
          <h1 className="font-heading font-bold text-[clamp(30px,5vw,52px)] tracking-[-0.02em] text-heading leading-tight mb-6">
            Выделяем команду под каждого клиента
          </h1>
          <p className="text-lg md:text-xl text-subtle leading-relaxed max-w-2xl mx-auto mb-8">
            Выбирая B2B-систему, вы выбираете команду, с которой будете работать
            бок о бок долгие годы
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
      <section className="py-20 px-6 bg-page-alt">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-[clamp(28px,4.5vw,44px)] tracking-[-0.02em] text-heading text-center mb-14">
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
          <div className="text-center mt-12">
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
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#3B82F6]/20 via-[#8B5CF6]/15 to-[#06B6D4]/20 border border-glass-border p-10 md:p-14 text-center">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#3B82F6]/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#8B5CF6]/20 rounded-full blur-3xl animate-pulse delay-700" />
            <div className="relative">
              <h2 className="font-heading font-bold text-[clamp(24px,4vw,40px)] tracking-[-0.02em] text-heading leading-tight mb-8 max-w-2xl mx-auto">
                Подключить B2B-систему с нашей командой за три месяца
              </h2>
              <CtaButton className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-medium hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                Оставить заявку
                <ArrowRight className="w-4 h-4" />
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      {/* Поддерживаем B2B-систему на всех этапах */}
      <section className="py-20 px-6 bg-page-alt">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-[clamp(28px,4.5vw,44px)] tracking-[-0.02em] text-heading text-center mb-14">
            Поддерживаем B2B-систему на всех этапах
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supportStages.map((s, i) => (
              <div
                key={i}
                className={`p-6 md:p-7 bg-surface rounded-2xl border border-border-default ${
                  i === supportStages.length - 1 && supportStages.length % 2 === 1
                    ? "md:col-span-2"
                    : ""
                }`}
              >
                <div className="w-11 h-11 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center mb-4">
                  <s.icon className="w-5 h-5 text-[#06B6D4]" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-heading mb-2 leading-snug">
                  {s.title}
                </h3>
                <p className="text-sm text-body leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Наших сотрудников клиенты знают по именам — отзывы */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-[clamp(28px,4.5vw,44px)] tracking-[-0.02em] text-heading text-center mb-4">
            Наших сотрудников клиенты знают по именам
          </h2>
          <p className="text-base md:text-lg text-subtle leading-relaxed text-center max-w-2xl mx-auto mb-14">
            В отзывах наши клиенты чаще всего благодарят конкретных сотрудников.
            Вы общаетесь не со скриптами чат-ботов, а с вовлеченными экспертами
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="relative p-6 md:p-7 bg-surface-hover rounded-2xl border border-border-default overflow-hidden"
              >
                <Quote className="absolute top-5 right-5 w-8 h-8 text-[#3B82F6]/10" />
                <p className="text-sm md:text-base text-body leading-relaxed italic mb-5">
                  «{t.text}»
                </p>
                <div className="font-heading font-semibold text-heading pt-4 border-t border-border-default">
                  {t.company}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Финальный CTA — Автоматизируйте оптовые продажи c нашей командой */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#3B82F6]/20 via-[#8B5CF6]/15 to-[#06B6D4]/20 border border-glass-border p-10 md:p-16 text-center">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#3B82F6]/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#8B5CF6]/20 rounded-full blur-3xl animate-pulse delay-700" />
            <div className="relative">
              <h2 className="font-heading font-bold text-[clamp(26px,4vw,44px)] tracking-[-0.02em] text-heading leading-tight mb-8 max-w-2xl mx-auto">
                Автоматизируйте оптовые продажи c нашей командой
              </h2>
              <CtaButton className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-medium hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(59,130,246,0.3)]">
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
