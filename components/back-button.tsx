"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton({
  fallback = "/blog",
  children,
  className,
}: {
  fallback?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push(fallback);
        }
      }}
      className={className}
    >
      <ArrowLeft className="w-4 h-4" />
      {children}
    </button>
  );
}
