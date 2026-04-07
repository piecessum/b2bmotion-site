"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

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

  return (
    <button
      onClick={() => {
        const saved = sessionStorage.getItem(storageKey);
        const scrollY = sessionStorage.getItem(scrollKey);
        if (scrollY) {
          // Restore scroll after navigation completes
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
        router.push(saved || fallback);
      }}
      className={className}
    >
      <ArrowLeft className="w-4 h-4" />
      {children}
    </button>
  );
}
