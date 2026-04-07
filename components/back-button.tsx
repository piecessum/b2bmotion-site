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

  return (
    <button
      onClick={() => {
        const saved = sessionStorage.getItem(storageKey);
        router.push(saved || fallback);
      }}
      className={className}
    >
      <ArrowLeft className="w-4 h-4" />
      {children}
    </button>
  );
}
