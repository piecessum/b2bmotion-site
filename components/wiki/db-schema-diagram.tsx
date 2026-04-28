"use client";

import { useMemo, useState } from "react";
import { Search, X, Database, Filter, Link2 } from "lucide-react";
import {
  dbDomains,
  dbTables,
  getRelatedTables,
  type DbTable,
  type DomainId,
} from "@/lib/wiki-db-schema";

export function DbSchemaDiagram() {
  const [query, setQuery] = useState("");
  const [activeDomain, setActiveDomain] = useState<DomainId | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return dbTables.filter((t) => {
      if (activeDomain && t.domain !== activeDomain) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.label.toLowerCase().includes(q)
      );
    });
  }, [q, activeDomain]);

  const grouped = useMemo(() => {
    return dbDomains
      .map((d) => ({
        domain: d,
        tables: filtered.filter((t) => t.domain === d.id),
      }))
      .filter((g) => g.tables.length > 0);
  }, [filtered]);

  const selectedTable = selected ? dbTables.find((t) => t.name === selected) : null;
  const relatedNames = useMemo(() => {
    if (!selected) return new Set<string>();
    return new Set(getRelatedTables(selected).map((t) => t.name));
  }, [selected]);

  const totals = {
    tables: dbTables.length,
    optional: dbTables.filter((t) => t.optional).length,
    domains: dbDomains.length,
  };

  return (
    <div className="not-prose my-8 rounded-2xl bg-overlay-3 border border-glass-border overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-glass-border bg-overlay-4">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-[#3B82F6]" />
          <span className="font-heading font-semibold text-sm text-heading">
            Структура шлюзовой БД
          </span>
        </div>
        <span className="text-[11px] text-dim">
          {totals.tables} таблиц · {totals.domains} доменов
        </span>
        <div className="flex-1 min-w-[160px] sm:max-w-[280px] sm:ml-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-dim" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Найти таблицу…"
              className="w-full pl-9 pr-8 py-2 text-[13px] bg-page border border-glass-border rounded-lg outline-none text-body placeholder:text-dim focus:border-[#3B82F6]/40 transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Очистить"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-dim hover:text-body"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Domain filter chips */}
      <div className="flex flex-wrap items-center gap-1.5 px-5 py-3 border-b border-glass-border">
        <Filter className="w-3 h-3 text-dim mr-1" />
        <button
          type="button"
          onClick={() => setActiveDomain(null)}
          className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
            activeDomain === null
              ? "bg-overlay-4 text-heading border border-glass-border"
              : "text-dim hover:text-body"
          }`}
        >
          Все
        </button>
        {dbDomains.map((d) => {
          const active = activeDomain === d.id;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveDomain(active ? null : d.id)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                active
                  ? "text-heading border"
                  : "text-dim hover:text-body border border-transparent"
              }`}
              style={
                active
                  ? {
                      backgroundColor: `${d.accent}15`,
                      borderColor: `${d.accent}55`,
                    }
                  : undefined
              }
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: d.accent }}
              />
              {d.title}
            </button>
          );
        })}
      </div>

      {/* Body: grid of domains */}
      <div className="p-4 sm:p-5">
        {grouped.length === 0 ? (
          <p className="text-sm text-dim text-center py-8">
            По запросу <span className="text-body">«{query}»</span> ничего не нашлось.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {grouped.map(({ domain, tables }) => (
              <DomainColumn
                key={domain.id}
                domain={domain}
                tables={tables}
                selected={selected}
                relatedNames={relatedNames}
                onSelect={setSelected}
              />
            ))}
          </div>
        )}
      </div>

      <p className="px-5 pb-4 text-[11px] text-dim leading-relaxed">
        Связи показаны схематически — выведены по соглашениям именования и описаниям таблиц.
        Полный список полей и FK — в статье «Описание полей шлюзовых таблиц».
      </p>

      {selectedTable && (
        <DetailsPanel
          table={selectedTable}
          onClose={() => setSelected(null)}
          onSelect={setSelected}
        />
      )}
    </div>
  );
}

function DomainColumn({
  domain,
  tables,
  selected,
  relatedNames,
  onSelect,
}: {
  domain: { id: DomainId; title: string; accent: string };
  tables: DbTable[];
  selected: string | null;
  relatedNames: Set<string>;
  onSelect: (name: string) => void;
}) {
  return (
    <section className="rounded-xl bg-page border border-glass-border overflow-hidden">
      <header
        className="flex items-center justify-between px-3 py-2 border-b border-glass-border"
        style={{ backgroundColor: `${domain.accent}10` }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: domain.accent }}
          />
          <h3 className="font-heading font-semibold text-[12px] text-heading truncate">
            {domain.title}
          </h3>
        </div>
        <span className="text-[10px] text-dim tabular-nums">{tables.length}</span>
      </header>
      <ul className="divide-y divide-[var(--glass-border,rgba(255,255,255,0.06))]">
        {tables.map((t) => {
          const isSelected = selected === t.name;
          const isRelated = relatedNames.has(t.name);
          return (
            <li key={t.name}>
              <button
                type="button"
                onClick={() => onSelect(isSelected ? "" : t.name)}
                className={`w-full text-left px-3 py-2 transition-colors ${
                  isSelected
                    ? "bg-overlay-4"
                    : isRelated
                      ? "bg-overlay-3"
                      : "hover:bg-overlay-3"
                }`}
                style={
                  isSelected
                    ? { boxShadow: `inset 3px 0 0 ${domain.accent}` }
                    : isRelated
                      ? { boxShadow: `inset 3px 0 0 ${domain.accent}66` }
                      : undefined
                }
              >
                <div className="flex items-center justify-between gap-2">
                  <code className="text-[12px] font-mono text-heading truncate">
                    {t.name}
                  </code>
                  {t.optional && (
                    <span className="text-[9px] uppercase tracking-wider text-dim shrink-0">
                      опц.
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-subtle truncate mt-0.5">{t.label}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function DetailsPanel({
  table,
  onClose,
  onSelect,
}: {
  table: DbTable;
  onClose: () => void;
  onSelect: (name: string) => void;
}) {
  const related = getRelatedTables(table.name);
  const domain = dbDomains.find((d) => d.id === table.domain)!;

  return (
    <div className="px-5 pb-5">
      <div
        className="rounded-xl border bg-page p-4"
        style={{ borderColor: `${domain.accent}40` }}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: domain.accent }}
              />
              <span className="text-[10px] uppercase tracking-[0.15em] text-dim font-medium">
                {domain.title}
              </span>
            </div>
            <code className="text-base font-mono font-semibold text-heading break-all">
              {table.name}
            </code>
            <p className="text-[13px] text-subtle mt-1">{table.label}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="shrink-0 p-1.5 text-dim hover:text-body rounded-md hover:bg-overlay-3 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {related.length > 0 ? (
          <div>
            <div className="flex items-center gap-1.5 mb-2 text-[11px] uppercase tracking-[0.15em] text-dim font-medium">
              <Link2 className="w-3 h-3" />
              Связанные таблицы ({related.length})
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {related.map((r) => {
                const rDomain = dbDomains.find((d) => d.id === r.domain)!;
                return (
                  <li key={r.name}>
                    <button
                      type="button"
                      onClick={() => onSelect(r.name)}
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11.5px] bg-overlay-3 border border-glass-border hover:border-[#3B82F6]/30 hover:bg-overlay-4 transition-colors"
                      title={r.label}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: rDomain.accent }}
                      />
                      <code className="font-mono text-body">{r.name}</code>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p className="text-[12px] text-dim italic">
            Нет связей по выводимым правилам — справочная или независимая таблица.
          </p>
        )}
      </div>
    </div>
  );
}
