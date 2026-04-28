import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function WikiBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Хлебные крошки"
      className="flex items-center flex-wrap gap-1.5 text-[12.5px] text-subtle mb-6"
    >
      <Link
        href="/wiki"
        className="inline-flex items-center gap-1.5 text-dim hover:text-body transition-colors"
      >
        <BookOpen className="w-3.5 h-3.5" />
        База знаний
      </Link>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="inline-flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-dim" />
            {item.href && !last ? (
              <Link
                href={item.href}
                className="text-dim hover:text-body transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-heading font-medium">{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
