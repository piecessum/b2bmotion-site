"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowLeft } from "lucide-react";
import {
  dictionaryGroups,
  groupAnchorId,
  letterAnchorId,
  type DictionaryGroup,
} from "@/lib/dictionary";

/** Отступ сверху при переходе по якорю — под фиксированную шапку. */
const SCROLL_OFFSET = 120;

type IndexItem = {
  id: string;
  /** Подпись в содержании. */
  label: string;
  /** Заголовок алфавита (A — Z / А — Я) — выделяется пожирнее. */
  isGroup: boolean;
};

export default function DictionaryPage() {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string>("");
  const railRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  /** Плоский список пунктов содержания: заголовок алфавита + его буквы. */
  const indexItems = useMemo<IndexItem[]>(
    () =>
      dictionaryGroups.flatMap((group) => [
        { id: groupAnchorId(group.id), label: group.title, isGroup: true },
        ...group.letters.map((l) => ({
          id: letterAnchorId(group.id, l.letter),
          label: l.letter,
          isGroup: false,
        })),
      ]),
    [],
  );

  const scrollToId = useCallback((id: string, smooth: boolean) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  }, []);

  // Подсветка текущего раздела при прокрутке
  useEffect(() => {
    const onScroll = () => {
      let current = indexItems[0]?.id ?? "";
      for (const item of indexItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= SCROLL_OFFSET + 24) {
          current = item.id;
        }
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [indexItems]);

  /** Протягивание пальцем/мышью по полоске букв — как в контактах iPhone. */
  const jumpFromPoint = useCallback(
    (x: number, y: number) => {
      const el = document
        .elementFromPoint(x, y)
        ?.closest<HTMLElement>("[data-anchor]");
      const id = el?.dataset.anchor;
      if (id) scrollToId(id, false);
    },
    [scrollToId],
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    railRef.current?.setPointerCapture?.(e.pointerId);
    jumpFromPoint(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    e.preventDefault();
    jumpFromPoint(e.clientX, e.clientY);
  };

  const stopDragging = (e: React.PointerEvent) => {
    draggingRef.current = false;
    railRef.current?.releasePointerCapture?.(e.pointerId);
  };

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      {/* overflow-hidden только на декоре: на секции он ломает sticky у содержания */}
      <section className="relative pt-36 pb-24 px-6">
        <div className="absolute inset-x-0 top-0 h-[700px] overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.06]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full blur-[120px]" />
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-subtle hover:text-[#3B82F6] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </button>

          <h1 className="font-heading font-bold text-[clamp(30px,5.5vw,48px)] leading-[1.15] tracking-[-0.02em] mb-8">
            <span className="text-heading">Словарь иностранных слов </span>
            <span className="gradient-text">и профессиональных терминов</span>
          </h1>

          {/* Сноска */}
          <div className="max-w-3xl border-l-2 border-[#3B82F6]/40 pl-5 space-y-4 mb-16">
            <p className="text-body leading-relaxed">
              Словарь составлен для посетителей сайтов b2bmotion.ru и
              3davinci.ru, а также пользователей платформы «В2В Движение» и её
              модификаций, чтобы информация на наших сайтах была максимально
              прозрачной и понятной. Для соответствия обновлённым требованиям
              Закона о защите прав потребителей от 24.06.2025 № 168-ФЗ (ст.
              10.1.) в нём собраны профессиональные понятия и иностранные
              заимствования, которые часто встречаются в сфере разработки
              цифровых решений для оптовой торговли и описываются международными
              техническими терминами.
            </p>
            <p className="text-body leading-relaxed">
              Если вы столкнулись с незнакомым словом, которого нет в словаре, —
              пожалуйста, напишите нам на почту:{" "}
              <a
                href="mailto:support@3davinci.ru"
                className="text-[#3B82F6] hover:underline"
              >
                support@3davinci.ru
              </a>{" "}
              или позвоните по номеру:{" "}
              <a
                href="tel:+74993503436"
                className="text-[#3B82F6] hover:underline"
              >
                +7 (499) 350-34-36
              </a>
              , и мы оперативно поможем во всём разобраться.
            </p>
          </div>

          <div className="flex gap-12">
            {/* Термины */}
            <div className="min-w-0 flex-1 space-y-16">
              {dictionaryGroups.map((group) => (
                <DictionaryGroupSection key={group.id} group={group} />
              ))}
            </div>

            {/* Содержание — не скроллится вместе со страницей */}
            <aside className="hidden lg:block w-32 shrink-0">
              <div className="sticky top-28">
                <p className="text-xs uppercase tracking-wider text-dimmest mb-3">
                  Содержание
                </p>
                <div
                  className="flex flex-col items-start gap-0.5 select-none"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={stopDragging}
                  onPointerCancel={stopDragging}
                  ref={railRef}
                >
                  {indexItems.map((item) => (
                    <IndexButton
                      key={item.id}
                      item={item}
                      active={activeId === item.id}
                      onClick={() => scrollToId(item.id, true)}
                    />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Мобильная полоска букв у правого края — как в контактах iPhone */}
      <div
        className="lg:hidden fixed right-1 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-px py-2 px-1 rounded-full bg-page/70 backdrop-blur-sm border border-border-subtle select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        {indexItems.map((item) => (
          <button
            key={item.id}
            data-anchor={item.id}
            onClick={() => scrollToId(item.id, true)}
            className={`px-1 leading-none transition-colors ${
              item.isGroup
                ? "text-[11px] font-bold py-1"
                : "text-[10px] font-medium py-0.5"
            } ${
              activeId === item.id
                ? "text-[#3B82F6]"
                : item.isGroup
                  ? "text-subtle"
                  : "text-dimmer"
            }`}
            aria-label={item.label}
          >
            {item.isGroup ? item.label.split(" ")[0] : item.label}
          </button>
        ))}
      </div>

      <Footer />
    </main>
  );
}

function IndexButton({
  item,
  active,
  onClick,
}: {
  item: IndexItem;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      data-anchor={item.id}
      onClick={onClick}
      className={`text-left transition-colors ${
        item.isGroup
          ? "text-sm font-bold mt-4 first:mt-0 mb-1"
          : "text-[13px] font-medium pl-3"
      } ${
        active
          ? "text-[#3B82F6]"
          : item.isGroup
            ? "text-heading hover:text-[#3B82F6]"
            : "text-dimmer hover:text-body"
      }`}
    >
      {item.label}
    </button>
  );
}

function DictionaryGroupSection({ group }: { group: DictionaryGroup }) {
  return (
    <section id={groupAnchorId(group.id)} className="scroll-mt-32">
      <h2 className="font-heading font-bold text-2xl text-heading pb-3 mb-8 border-b border-border-default">
        {group.title}{" "}
        <span className="text-dimmer font-normal text-lg">
          {group.id === "latin" ? "(англ.)" : "(рус.)"}
        </span>
      </h2>

      <div className="space-y-10">
        {group.letters.map((letter) => (
          <div
            key={letter.letter}
            id={letterAnchorId(group.id, letter.letter)}
            className="scroll-mt-32"
          >
            <h3 className="font-heading font-semibold text-lg text-[#3B82F6] mb-4">
              {letter.letter}
            </h3>
            <dl className="space-y-5">
              {letter.entries.map((entry) => (
                <div key={entry.term}>
                  <dt className="inline font-semibold text-heading">
                    {entry.term}
                  </dt>
                  <dd className="inline text-body leading-relaxed">
                    {" "}
                    — {entry.definition}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}
