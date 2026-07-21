"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

// Список блога — это /blog и /blog?<фильтры>, но НЕ статья /blog/<slug>.
const isBlogList = (url: string) => url === "/blog" || url.startsWith("/blog?");

export function BackButton({
  storageKey,
  fallback = "/blog",
  children,
  className,
}: {
  storageKey: string;
  fallback?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  const scrollKey = storageKey.replace("_back_url", "_scroll");

  // Если пользователь пришёл не из списка блога (например, с /support),
  // подпись меняем на «Назад» — иначе «Блог» вводила бы в заблуждение.
  const [label, setLabel] = useState<React.ReactNode>(children);
  useEffect(() => {
    const prev = sessionStorage.getItem("nav_prev");
    setLabel(prev && !isBlogList(prev) ? "Назад" : children);
  }, [children]);

  return (
    <button
      onClick={() => {
        const prev = sessionStorage.getItem("nav_prev");
        const saved = sessionStorage.getItem(storageKey);
        const fromBlogList = prev != null && isBlogList(prev);

        // Пришли из списка блога → восстанавливаем его состояние (фильтры + скролл).
        // Пришли откуда-то ещё → возвращаемся ровно на ту страницу.
        // Прямой заход без истории → fallback (обычно /blog).
        const target = fromBlogList ? saved || prev : prev || saved || fallback;

        // Скролл восстанавливаем только при возврате в список блога.
        const scrollY = fromBlogList ? sessionStorage.getItem(scrollKey) : null;
        if (scrollY) {
          const restore = () => {
            window.scrollTo(0, parseInt(scrollY, 10));
            sessionStorage.removeItem(scrollKey);
          };
          // requestAnimationFrame ensures DOM has rendered
          const observer = new MutationObserver(() => {
            observer.disconnect();
            requestAnimationFrame(restore);
          });
          observer.observe(document.body, { childList: true, subtree: true });
          // Fallback timeout in case no DOM mutation fires
          setTimeout(restore, 300);
        }

        router.push(target);
      }}
      className={className}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </button>
  );
}
