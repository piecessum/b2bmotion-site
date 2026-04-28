"use client";

import { useMemo, useState } from "react";
import { Search, X, Database, Filter, Key, Link2, ArrowRight } from "lucide-react";
import {
  dbDomains,
  dbTables,
  getRelationsFor,
  getAllRelations,
  type DbTable,
  type DbField,
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
      if (t.name.toLowerCase().includes(q)) return true;
      return t.fields.some((f) => f.name.toLowerCase().includes(q));
    });
  }, [q, activeDomain]);

  const relatedNames = useMemo(() => {
    if (!selected) return new Set<string>();
    const { outgoing, incoming } = getRelationsFor(selected);
    const names = new Set<string>();
    outgoing.forEach((r) => names.add(r.to));
    incoming.forEach((r) => names.add(r.from));
    return names;
  }, [selected]);

  const totals = {
    tables: dbTables.length,
    relations: getAllRelations().length,
    domains: dbDomains.length,
  };

  const selectedTable = selected ? dbTables.find((t) => t.name === selected) : null;

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
          {totals.tables} таблиц · {totals.relations} связей · {totals.domains} доменов
        </span>
        <div className="flex-1 min-w-[160px] sm:max-w-[280px] sm:ml-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-dim" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Найти таблицу или поле…"
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

      {/* Body */}
      <div className="p-4 sm:p-5">
        {filtered.length === 0 ? (
          <p className="text-sm text-dim text-center py-8">
            Ничего не нашлось.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((t) => (
              <TableCard
                key={t.name}
                table={t}
                selected={selected === t.name}
                related={relatedNames.has(t.name)}
                fieldQuery={q}
                onSelect={(name) =>
                  setSelected(selected === name ? null : name)
                }
              />
            ))}
          </div>
        )}
      </div>

      {selectedTable && (
        <DetailsPanel
          table={selectedTable}
          onClose={() => setSelected(null)}
          onSelect={setSelected}
        />
      )}

      <p className="px-5 pb-4 text-[11px] text-dim leading-relaxed">
        Кликните по таблице — будут подсвечены все таблицы, связанные с ней по FK.
        В панели деталей видны связи с указанием ключа.
      </p>
    </div>
  );
}

function TableCard({
  table,
  selected,
  related,
  fieldQuery,
  onSelect,
}: {
  table: DbTable;
  selected: boolean;
  related: boolean;
  fieldQuery: string;
  onSelect: (name: string) => void;
}) {
  const domain = dbDomains.find((d) => d.id === table.domain)!;
  const ringStyle: React.CSSProperties = selected
    ? { boxShadow: `0 0 0 2px ${domain.accent}` }
    : related
      ? { boxShadow: `0 0 0 1px ${domain.accent}88` }
      : {};

  return (
    <button
      type="button"
      onClick={() => onSelect(table.name)}
      className={`group text-left rounded-xl bg-page border border-glass-border overflow-hidden transition-all ${
        selected ? "" : "hover:border-[#3B82F6]/30"
      }`}
      style={ringStyle}
    >
      <header
        className="flex items-center justify-between gap-2 px-3 py-2 border-b border-glass-border"
        style={{ backgroundColor: `${domain.accent}12` }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: domain.accent }}
          />
          <code className="font-mono font-semibold text-[13px] text-heading truncate">
            {table.name}
          </code>
        </div>
        {table.optional && (
          <span className="text-[9px] uppercase tracking-wider text-dim shrink-0">
            опц.
          </span>
        )}
      </header>
      <ul className="divide-y divide-[var(--glass-border,rgba(255,255,255,0.05))]">
        {table.fields.map((f) => (
          <FieldRow key={f.name} field={f} highlight={fieldQuery} />
        ))}
      </ul>
    </button>
  );
}

function FieldRow({
  field,
  highlight,
}: {
  field: DbField;
  highlight: string;
}) {
  const isMatch =
    !!highlight && field.name.toLowerCase().includes(highlight.toLowerCase());

  return (
    <li
      className={`flex items-center gap-2 px-3 py-1 text-[11.5px] ${
        isMatch ? "bg-[#3B82F6]/[0.08]" : ""
      }`}
    >
      <span className="w-3 shrink-0 flex items-center justify-center">
        {field.kind === "PK" || field.kind === "PFK" ? (
          <Key className="w-3 h-3 text-[#F59E0B]" aria-label="PK" />
        ) : field.kind === "FK" ? (
          <Link2 className="w-3 h-3 text-[#3B82F6]" aria-label="FK" />
        ) : (
          <span className="w-1 h-1 rounded-full bg-dim" />
        )}
      </span>
      <code className="font-mono text-body flex-1 truncate">{field.name}</code>
      <code className="font-mono text-[10.5px] text-dim shrink-0">{field.type}</code>
    </li>
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
  const domain = dbDomains.find((d) => d.id === table.domain)!;
  const { outgoing, incoming } = getRelationsFor(table.name);
  const selfRefs = outgoing.filter((r) => r.self);
  const outgoingExt = outgoing.filter((r) => !r.self);

  return (
    <div className="px-5 pb-5">
      <div
        className="rounded-xl border bg-page p-4"
        style={{ borderColor: `${domain.accent}55` }}
      >
        <div className="flex items-start justify-between gap-3 mb-4">
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
            <p className="text-[11px] text-dim mt-1 tabular-nums">
              {table.fields.length} полей · {outgoing.length + incoming.length} связей
            </p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RelationList
            title="Ссылается на (outgoing)"
            empty="Нет исходящих FK."
            relations={outgoingExt.map((r) => ({
              src: table.name,
              srcField: r.via,
              dst: r.to,
              dstField: "id",
              direction: "out" as const,
            }))}
            onSelect={onSelect}
          />
          <RelationList
            title="Ссылаются (incoming)"
            empty="Никто не ссылается."
            relations={incoming.map((r) => ({
              src: r.from,
              srcField: r.via,
              dst: table.name,
              dstField: "id",
              direction: "in" as const,
            }))}
            onSelect={onSelect}
          />
        </div>

        {selfRefs.length > 0 && (
          <div className="mt-3 text-[12px] text-subtle">
            <span className="text-dim">Self-reference:</span>{" "}
            {selfRefs.map((r, i) => (
              <span key={i}>
                <code className="font-mono text-body">
                  {r.from}.{r.via} → {r.to}.id
                </code>
                {i < selfRefs.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RelationList({
  title,
  empty,
  relations,
  onSelect,
}: {
  title: string;
  empty: string;
  relations: Array<{
    src: string;
    srcField: string;
    dst: string;
    dstField: string;
    direction: "in" | "out";
  }>;
  onSelect: (name: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2 text-[11px] uppercase tracking-[0.15em] text-dim font-medium">
        <Link2 className="w-3 h-3" />
        {title}
      </div>
      {relations.length === 0 ? (
        <p className="text-[12px] text-dim italic">{empty}</p>
      ) : (
        <ul className="space-y-1">
          {relations.map((r, i) => {
            const targetTable = r.direction === "out" ? r.dst : r.src;
            const targetDomain = (() => {
              const t = dbTables.find((x) => x.name === targetTable);
              return t ? dbDomains.find((d) => d.id === t.domain) : null;
            })();
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => onSelect(targetTable)}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-overlay-3 border border-glass-border hover:border-[#3B82F6]/30 hover:bg-overlay-4 transition-colors text-left"
                >
                  {targetDomain && (
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: targetDomain.accent }}
                    />
                  )}
                  <code className="font-mono text-[11.5px] text-body truncate">
                    <span className="text-heading">{r.src}</span>.{r.srcField}
                  </code>
                  <ArrowRight className="w-3 h-3 text-dim shrink-0" />
                  <code className="font-mono text-[11.5px] text-body truncate">
                    <span className="text-heading">{r.dst}</span>.{r.dstField}
                  </code>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
