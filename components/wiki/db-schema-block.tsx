"use client";

import dynamic from "next/dynamic";

const DbSchemaGraph = dynamic(
  () => import("@/components/wiki/db-schema-graph").then((m) => m.DbSchemaGraph),
  {
    ssr: false,
    loading: () => (
      <div className="not-prose my-8 rounded-2xl bg-overlay-3 border border-glass-border h-[480px] flex items-center justify-center text-sm text-dim">
        Загрузка диаграммы…
      </div>
    ),
  },
);

export function DbSchemaBlock() {
  return <DbSchemaGraph />;
}
