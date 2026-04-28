"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WikiSidebar } from "@/components/wiki/wiki-sidebar";
import { WikiSearch } from "@/components/wiki/wiki-search";
import type { SectionId } from "@/lib/wiki-tree";

interface WikiShellProps {
  children: React.ReactNode;
  activeSection?: SectionId;
  activeCategoryId?: string;
  activeArticleSlug?: string;
}

export function WikiShell({
  children,
  activeSection,
  activeCategoryId,
  activeArticleSlug,
}: WikiShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on escape
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  // Lock scroll when drawer open
  useEffect(() => {
    if (drawerOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [drawerOpen]);

  return (
    <main className="relative min-h-screen bg-page noise-overlay">
      <Navbar />

      <div className="max-w-[1440px] mx-auto pt-28 pb-10 px-4 sm:px-6">
        {/* Mobile toolbar: search + menu trigger */}
        <div className="lg:hidden mb-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Открыть оглавление"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-overlay-3 border border-glass-border text-sm text-body hover:border-[#3B82F6]/30 transition-colors"
          >
            <Menu className="w-4 h-4" />
            Оглавление
          </button>
          <div className="flex-1 min-w-0">
            <WikiSearch variant="trigger" placeholder="Поиск…" />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-[280px] shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-3 pb-10">
              <div className="mb-4">
                <WikiSearch variant="trigger" placeholder="Поиск…" />
              </div>
              <WikiSidebar
                activeSection={activeSection}
                activeCategoryId={activeCategoryId}
                activeArticleSlug={activeArticleSlug}
              />
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-[90] flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
          <aside className="relative w-[300px] max-w-[85vw] h-full bg-page border-r border-glass-border overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-heading">
                Оглавление
              </span>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Закрыть"
                className="p-1.5 text-dim hover:text-body rounded-md hover:bg-overlay-3 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <WikiSidebar
              activeSection={activeSection}
              activeCategoryId={activeCategoryId}
              activeArticleSlug={activeArticleSlug}
              onNavigate={() => setDrawerOpen(false)}
            />
          </aside>
        </div>
      )}

      <Footer />
    </main>
  );
}
