"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Search, X, Command, ArrowRight } from "lucide-react";
import {
  searchWiki,
  wikiSections,
  type WikiSearchResult,
} from "@/lib/wiki-tree";

/* ── Trigger button (stateless) ── */

interface WikiSearchTriggerProps {
  onOpen: () => void;
  className?: string;
  placeholder?: string;
}

export function WikiSearchTrigger({
  onOpen,
  className,
  placeholder = "Поиск по базе знаний…",
}: WikiSearchTriggerProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group flex items-center gap-2.5 w-full px-3.5 py-2 rounded-xl bg-overlay-3 border border-glass-border text-sm text-dim hover:text-body hover:border-[#3B82F6]/30 transition-colors ${className ?? ""}`}
    >
      <Search className="w-4 h-4 shrink-0" />
      <span className="flex-1 text-left truncate">{placeholder}</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-overlay-4 border border-glass-border text-dim">
        <Command className="w-3 h-3" /> K
      </kbd>
    </button>
  );
}

/* ── Modal (controlled) ── */

interface WikiSearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function WikiSearchModal({ open, onClose }: WikiSearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [open]);

  // reset query whenever modal closes
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  if (!open) return null;
  return <ModalBody query={query} onQueryChange={setQuery} onClose={onClose} />;
}

function ModalBody({
  query,
  onQueryChange,
  onClose,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results: WikiSearchResult[] = useMemo(
    () => searchWiki(query, 30),
    [query],
  );

  const grouped = useMemo(() => {
    const map = new Map<string, WikiSearchResult[]>();
    for (const r of results) {
      const key = r.article.section;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(r);
    }
    return Array.from(map.entries()).map(([sectionId, items]) => {
      const meta = wikiSections.find((s) => s.id === sectionId)!;
      return { meta, items };
    });
  }, [results]);

  const flatList = results;

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const navigateToActive = useCallback(() => {
    const item = flatList[activeIndex];
    if (item) {
      router.push(item.article.url);
      onClose();
    }
  }, [activeIndex, flatList, router, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, flatList.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        navigateToActive();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flatList.length, navigateToActive, onClose]);

  return (
    <div
      role="dialog"
      aria-label="Поиск по базе знаний"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl rounded-2xl bg-page border border-glass-border shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b border-glass-border">
          <Search className="w-4 h-4 text-dim shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Введите запрос — заголовок, категория или фрагмент текста"
            className="flex-1 py-4 bg-transparent border-0 outline-none text-base text-body placeholder:text-dim"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="p-1.5 text-dim hover:text-body rounded-md hover:bg-overlay-3 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() === "" ? (
            <div className="px-6 py-10 text-center text-sm text-dim">
              Начните вводить запрос — поиск идёт по всем трём разделам базы
              знаний.
              <div className="mt-4 flex items-center justify-center gap-3 text-[11px] text-dim">
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-overlay-4 border border-glass-border">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-overlay-4 border border-glass-border">
                    ↓
                  </kbd>
                  навигация
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-overlay-4 border border-glass-border">
                    Enter
                  </kbd>
                  открыть
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-overlay-4 border border-glass-border">
                    Esc
                  </kbd>
                  закрыть
                </span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-dim">
              Ничего не нашлось по запросу{" "}
              <span className="text-body">«{query}»</span>. Попробуйте более
              короткий или другой запрос.
            </div>
          ) : (
            <ul className="py-2">
              {grouped.map(({ meta, items }) => (
                <li key={meta.id}>
                  <div className="px-4 pt-3 pb-1.5 text-[10px] uppercase tracking-[0.15em] font-medium text-dim">
                    {meta.title}
                  </div>
                  <ul>
                    {items.map((r) => {
                      const flatIdx = flatList.indexOf(r);
                      const active = flatIdx === activeIndex;
                      return (
                        <li key={r.article.id}>
                          <a
                            href={r.article.url}
                            onMouseEnter={() => setActiveIndex(flatIdx)}
                            onClick={(e) => {
                              e.preventDefault();
                              router.push(r.article.url);
                              onClose();
                            }}
                            className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                              active
                                ? "bg-overlay-4"
                                : "hover:bg-overlay-3"
                            }`}
                          >
                            <span
                              className="w-1 h-8 rounded-full shrink-0"
                              style={{ backgroundColor: meta.accent }}
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm text-heading font-medium truncate">
                                {r.article.title}
                              </span>
                              <span className="block text-[11px] text-dim truncate">
                                {r.article.category}
                              </span>
                            </span>
                            <ArrowRight
                              className={`w-4 h-4 transition-opacity ${
                                active ? "opacity-100 text-body" : "opacity-0"
                              }`}
                            />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
