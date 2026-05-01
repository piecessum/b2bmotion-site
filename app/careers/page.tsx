import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Вакансии — B2B Движение",
  description:
    "Открытые вакансии 3DaVinci. Сейчас актуальных нет, но мы всегда открыты к сильным кандидатам — расскажите о себе и своих сильных сторонах.",
};

const mailtoHref =
  "mailto:ageev@b2bmotion.ru" +
  "?subject=" +
  encodeURIComponent("Предложить кандидатуру") +
  "&body=" +
  encodeURIComponent(
    "Здравствуйте!\n\n" +
      "Хочу присоединиться к команде 3DaVinci.\n\n" +
      "Коротко о себе:\n— \n\n" +
      "Что умею и чем могу быть полезен проекту:\n— \n\n" +
      "Контакты для связи:\n— "
  );

function EmptyIllustration() {
  return (
    <svg
      viewBox="0 0 277 277"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Открытых вакансий пока нет"
      className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px]"
    >
      <g clipPath="url(#empty-clip)">
        {/* «Пол» — лёгкий контрастный прямоугольник под коробкой */}
        <rect
          width="146.416"
          height="153.826"
          rx="15"
          transform="matrix(0.865969 0.500097 -0.865969 0.500097 154.208 104.778)"
          className="fill-[var(--page-alt)]"
        />

        {/* Грани коробки — surface, чтобы менялись с темой */}
        <path
          d="M48.303 181.706L138.07 233.527V164.547L107.899 147.302L48.303 113.24V181.706Z"
          className="fill-[var(--surface)]"
        />
        <path
          d="M138.07 233.527L226.464 181.706V113.24L167.78 147.302L138.07 164.547V233.527Z"
          className="fill-[var(--surface-hover)]"
        />
        <path
          d="M226.464 113.24L138.07 61.7616V129.885L167.78 147.302L226.464 113.24Z"
          className="fill-[var(--surface-inner)]"
        />
        <path
          d="M138.07 61.7616L48.303 113.24L107.899 147.302L138.07 129.885V61.7616Z"
          className="fill-[var(--surface)]"
        />
        <path
          d="M107.899 147.302L138.07 164.547L167.78 147.302L138.07 129.885L107.899 147.302Z"
          className="fill-[var(--surface-inner)]"
        />

        {/* Контур коробки — фирменный градиентный цвет (читается в обеих темах) */}
        <path
          d="M138.07 233.527L48.303 181.706V113.24M138.07 233.527L226.464 181.706V113.24M138.07 233.527V164.547M138.07 129.885V61.7616M138.07 129.885L107.899 147.302M138.07 129.885L167.78 147.302M48.303 113.24L138.07 61.7616M48.303 113.24L107.899 147.302M138.07 164.547L107.899 147.302M138.07 164.547L167.78 147.302M226.464 113.24L138.07 61.7616M226.464 113.24L167.78 147.302"
          stroke="url(#empty-stroke)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Акцентная «волна» и круги — фирменный цианово-фиолетовый акцент */}
        <path
          opacity="0.95"
          d="M137.384 86.4301C110.345 86.4301 87.9948 106.509 84.431 132.569L138.203 163.287L190.905 132.569C187.341 106.509 164.423 86.4301 137.384 86.4301Z"
          fill="url(#empty-accent)"
        />
        <circle
          opacity="0.95"
          cx="177.127"
          cy="70.4955"
          r="17.3593"
          fill="url(#empty-accent)"
        />
        <circle
          opacity="0.95"
          cx="93.0717"
          cy="43.4887"
          r="8.22283"
          fill="url(#empty-accent)"
        />
        <circle
          opacity="0.95"
          cx="123.798"
          cy="22.1114"
          r="4.11142"
          fill="url(#empty-accent)"
        />
      </g>
      <defs>
        <linearGradient
          id="empty-stroke"
          x1="48"
          y1="62"
          x2="226"
          y2="234"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient
          id="empty-accent"
          x1="84"
          y1="22"
          x2="191"
          y2="163"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#06B6D4" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
        <clipPath id="empty-clip">
          <rect width="277" height="277" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function CareersPage() {
  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <section className="relative pt-36 pb-20 px-6">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA] mb-5">
            Карьера в 3DaVinci
          </span>
          <h1 className="font-heading font-bold text-[clamp(36px,7vw,64px)] leading-[1.05] tracking-[-0.02em] mb-6">
            <span className="text-heading">Здесь мы публикуем </span>
            <span className="gradient-text">вакансии</span>
          </h1>
          <p className="text-lg sm:text-xl text-subtle max-w-2xl mx-auto leading-relaxed">
            Открытых позиций сейчас нет. Но если вы хотите работать у нас —
            расскажите о себе: чем занимаетесь, что умеете и чем сможете быть
            полезны проекту. Мы обязательно рассмотрим любую кандидатуру.
          </p>
        </div>
      </section>

      <section className="relative pb-32 px-6">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="rounded-3xl border border-glass-border bg-overlay-2 p-10 sm:p-14 flex flex-col items-center text-center">
            <EmptyIllustration />

            <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-heading mt-8 mb-3">
              Актуальных вакансий пока нет
            </h2>
            <p className="text-base text-dim max-w-md leading-relaxed mb-8">
              Напишите Дмитрию Агееву, руководителю продаж — он передаст ваше
              письмо команде и директору компании.
            </p>

            <a
              href={mailtoHref}
              className="shimmer-btn inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] text-white text-base font-semibold rounded-2xl hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] transition-all duration-300 hover:brightness-110"
            >
              Предложить кандидатуру
              <ArrowRight className="w-5 h-5" />
            </a>

            <p className="text-xs text-dimmest mt-5">
              Письмо откроется в вашем почтовом клиенте
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
