"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
  type ColorMode,
  type Edge,
  type Node,
  type NodeProps,
  Handle,
  Position,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import "@xyflow/react/dist/style.css";

import {
  Search,
  X,
  Filter,
  Database,
  Key,
  Link2,
  ArrowRight,
  Maximize2,
  Minimize2,
} from "lucide-react";
import {
  dbDomains,
  dbTables,
  getAllRelations,
  getRelationsFor,
  getTableDescription,
  type DbField,
  type DbTable,
  type DomainId,
} from "@/lib/wiki-db-schema";

const NODE_WIDTH = 280;
const FIELD_HEIGHT = 22;
const HEADER_HEIGHT = 36;

function nodeHeight(t: DbTable): number {
  return HEADER_HEIGHT + t.fields.length * FIELD_HEIGHT + 6;
}

function buildLayout(tables: DbTable[]): {
  nodes: Node<TableNodeData>[];
  edges: Edge[];
} {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "LR", nodesep: 30, ranksep: 90 });
  g.setDefaultEdgeLabel(() => ({}));

  for (const t of tables) {
    g.setNode(t.name, { width: NODE_WIDTH, height: nodeHeight(t) });
  }

  const visibleNames = new Set(tables.map((t) => t.name));
  const allRels = getAllRelations().filter(
    (r) => visibleNames.has(r.from) && visibleNames.has(r.to) && !r.self,
  );

  for (const r of allRels) {
    g.setEdge(r.from, r.to, { id: `${r.from}-${r.via}-${r.to}` });
  }

  dagre.layout(g);

  const nodes: Node<TableNodeData>[] = tables.map((t) => {
    const pos = g.node(t.name);
    return {
      id: t.name,
      type: "table",
      position: {
        x: pos.x - NODE_WIDTH / 2,
        y: pos.y - nodeHeight(t) / 2,
      },
      data: { table: t },
      width: NODE_WIDTH,
      height: nodeHeight(t),
      draggable: true,
    };
  });

  const edges: Edge[] = allRels.map((r) => ({
    id: `${r.from}-${r.via}-${r.to}`,
    source: r.from,
    target: r.to,
    label: r.via,
    type: "smoothstep",
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14 },
    labelBgPadding: [4, 2],
    labelBgBorderRadius: 4,
    labelStyle: {
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontSize: 10,
    },
    style: { strokeWidth: 1.2 },
  }));

  return { nodes, edges };
}

interface TableNodeData {
  table: DbTable;
  [key: string]: unknown;
}

function TableNode({ data, selected }: NodeProps<Node<TableNodeData>>) {
  const t = data.table;
  const domain = dbDomains.find((d) => d.id === t.domain)!;
  return (
    <div
      className="rounded-lg overflow-hidden bg-page border shadow-sm"
      style={{
        width: NODE_WIDTH,
        borderColor: selected ? domain.accent : "var(--glass-border)",
        boxShadow: selected ? `0 0 0 2px ${domain.accent}` : undefined,
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ opacity: 0, pointerEvents: "none" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ opacity: 0, pointerEvents: "none" }}
      />
      <div
        className="flex items-center gap-2 px-2.5 border-b border-glass-border"
        style={{
          backgroundColor: `${domain.accent}1c`,
          height: HEADER_HEIGHT,
        }}
      >
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: domain.accent }}
        />
        <code className="font-mono font-semibold text-[12.5px] text-heading truncate">
          {t.name}
        </code>
        {t.optional && (
          <span className="ml-auto text-[9px] uppercase tracking-wider text-dim">
            опц.
          </span>
        )}
      </div>
      <ul className="py-0.5">
        {t.fields.map((f) => (
          <li
            key={f.name}
            className="flex items-center gap-1.5 px-2.5"
            style={{ height: FIELD_HEIGHT }}
          >
            <span className="w-3 shrink-0 flex items-center justify-center">
              {f.kind === "PK" || f.kind === "PFK" ? (
                <Key className="w-3 h-3 text-[#F59E0B]" />
              ) : f.kind === "FK" ? (
                <Link2 className="w-3 h-3 text-[#3B82F6]" />
              ) : (
                <span className="w-1 h-1 rounded-full bg-dim" />
              )}
            </span>
            <code className="font-mono text-[10.5px] text-body flex-1 truncate">
              {f.name}
            </code>
            <code className="font-mono text-[9.5px] text-dim shrink-0">
              {f.type}
            </code>
          </li>
        ))}
      </ul>
    </div>
  );
}

const nodeTypes = { table: TableNode };

export function DbSchemaGraph() {
  return (
    <ReactFlowProvider>
      <DbSchemaGraphInner />
    </ReactFlowProvider>
  );
}

function DbSchemaGraphInner() {
  const [query, setQuery] = useState("");
  const [activeDomain, setActiveDomain] = useState<DomainId | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { fitView, setCenter, getNode } = useReactFlow();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme !== "light" : true;
  const colorMode: ColorMode = isDark ? "dark" : "light";

  // Exit fullscreen on Escape; lock body scroll while fullscreen.
  useEffect(() => {
    if (!isFullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isFullscreen]);

  // Re-fit view after fullscreen toggle once layout settles.
  useEffect(() => {
    const id = window.setTimeout(() => {
      fitView({ duration: 250, padding: 0.15 });
    }, 80);
    return () => window.clearTimeout(id);
  }, [isFullscreen, fitView]);

  // Disable fullscreen on mobile widths (force-exit if viewport shrinks).
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    const sync = () => {
      if (mql.matches) setIsFullscreen(false);
    };
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  const q = query.trim().toLowerCase();

  const visibleTables = useMemo(() => {
    return dbTables.filter((t) => {
      if (activeDomain && t.domain !== activeDomain) return false;
      if (!q) return true;
      if (t.name.toLowerCase().includes(q)) return true;
      return t.fields.some((f) => f.name.toLowerCase().includes(q));
    });
  }, [q, activeDomain]);

  const { nodes: layoutNodes, edges: layoutEdges } = useMemo(
    () => buildLayout(visibleTables),
    [visibleTables],
  );

  const relatedNames = useMemo(() => {
    if (!selected) return new Set<string>();
    const { outgoing, incoming } = getRelationsFor(selected);
    const names = new Set<string>();
    outgoing.forEach((r) => names.add(r.to));
    incoming.forEach((r) => names.add(r.from));
    return names;
  }, [selected]);

  // Highlight selected and related: dim other nodes/edges via styles.
  const nodes: Node<TableNodeData>[] = useMemo(() => {
    return layoutNodes.map((n) => {
      const isSelected = n.id === selected;
      const isRelated = relatedNames.has(n.id);
      const isDimmed = !!selected && !isSelected && !isRelated;
      return {
        ...n,
        selected: isSelected,
        style: {
          ...(n.style || {}),
          opacity: isDimmed ? 0.25 : 1,
          transition: "opacity 0.2s",
        },
      };
    });
  }, [layoutNodes, selected, relatedNames]);

  const edges: Edge[] = useMemo(() => {
    return layoutEdges.map((e) => {
      const involves =
        !!selected && (e.source === selected || e.target === selected);
      const isDimmed = !!selected && !involves;
      const accentSrc = dbTables.find((t) => t.name === e.source);
      const accent = accentSrc
        ? dbDomains.find((d) => d.id === accentSrc.domain)?.accent
        : undefined;
      const idleStroke = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)";
      const idleLabelFill = isDark
        ? "rgba(255,255,255,0.78)"
        : "rgba(255,255,255,0.95)";
      const idleLabelBg = isDark ? "rgba(0,0,0,0.55)" : "rgba(15,23,42,0.7)";
      return {
        ...e,
        style: {
          ...(e.style || {}),
          stroke: involves ? accent || "#3B82F6" : idleStroke,
          strokeWidth: involves ? 1.8 : 1.1,
          opacity: isDimmed ? 0.15 : 0.85,
          transition: "opacity 0.2s, stroke 0.2s",
        },
        labelStyle: {
          ...(e.labelStyle || {}),
          fill: involves ? "#fff" : idleLabelFill,
        },
        labelBgStyle: {
          fill: involves ? accent || "#3B82F6" : idleLabelBg,
        },
      };
    });
  }, [layoutEdges, selected, isDark]);

  const handleNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelected((prev) => (prev === node.id ? null : node.id));
  }, []);

  // Re-fit view when filter changes
  useEffect(() => {
    const id = window.setTimeout(() => {
      fitView({ duration: 250, padding: 0.15 });
    }, 50);
    return () => window.clearTimeout(id);
  }, [visibleTables.length, fitView]);

  // Center on selected node
  useEffect(() => {
    if (!selected) return;
    const node = getNode(selected);
    if (!node) return;
    setCenter(
      (node.position.x ?? 0) + NODE_WIDTH / 2,
      (node.position.y ?? 0) + (node.height ?? 100) / 2,
      { zoom: 1, duration: 350 },
    );
  }, [selected, getNode, setCenter]);

  const visibleDomains = useMemo(
    () => dbDomains.filter((d) => dbTables.some((t) => t.domain === d.id)),
    [],
  );

  const totals = {
    tables: dbTables.length,
    relations: getAllRelations().length,
    domains: visibleDomains.length,
  };

  const selectedTable = selected
    ? dbTables.find((t) => t.name === selected)
    : null;

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-50 bg-page border-0 rounded-none flex flex-col not-prose"
          : "not-prose my-8 rounded-2xl bg-overlay-3 border border-glass-border overflow-hidden"
      }
    >
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-glass-border bg-overlay-4">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-[#3B82F6]" />
          <span className="font-heading font-semibold text-sm text-heading">
            Структура шлюзовой БД
          </span>
        </div>
        <span className="text-[11px] text-dim">
          {totals.tables} таблиц · {totals.relations} связей · {totals.domains}{" "}
          доменов
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
        <button
          type="button"
          onClick={() => setIsFullscreen((v) => !v)}
          aria-label={
            isFullscreen ? "Выйти из полноэкранного режима" : "Развернуть на весь экран"
          }
          title={isFullscreen ? "Свернуть (Esc)" : "Развернуть"}
          className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-lg bg-page border border-glass-border text-dim hover:text-body hover:border-[#3B82F6]/40 transition-colors"
        >
          {isFullscreen ? (
            <Minimize2 className="w-3.5 h-3.5" />
          ) : (
            <Maximize2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Domain chips */}
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
        {visibleDomains.map((d) => {
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

      {/* Graph + (in fullscreen) side panel */}
      <div
        className={
          isFullscreen
            ? "flex flex-1 min-h-0"
            : undefined
        }
      >
        <div
          className={
            isFullscreen
              ? "relative bg-page flex-1 min-w-0"
              : "relative bg-page"
          }
          style={isFullscreen ? undefined : { height: "min(70vh, 720px)" }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodeClick={handleNodeClick}
            onPaneClick={() => setSelected(null)}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            minZoom={0.2}
            maxZoom={1.6}
            colorMode={colorMode}
            proOptions={{ hideAttribution: true }}
            nodesConnectable={false}
            nodesFocusable={false}
            edgesFocusable={false}
          >
            <Background
              gap={20}
              color={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}
            />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>

        {/* Details — side panel in fullscreen */}
        {isFullscreen && selectedTable && (
          <DetailsPanel
            table={selectedTable}
            onClose={() => setSelected(null)}
            onSelect={setSelected}
            asSide
          />
        )}
      </div>

      {/* Details — bottom panel when not fullscreen */}
      {!isFullscreen && selectedTable && (
        <DetailsPanel
          table={selectedTable}
          onClose={() => setSelected(null)}
          onSelect={setSelected}
        />
      )}

      <p className="px-5 py-3 text-[11px] text-dim leading-relaxed border-t border-glass-border">
        Прокрутка — масштаб, перетаскивание мышью — пан. Клик по таблице —
        подсветить связанные. Клик в пустую область — сбросить.
      </p>
    </div>
  );
}

function DetailsPanel({
  table,
  onClose,
  onSelect,
  asSide = false,
}: {
  table: DbTable;
  onClose: () => void;
  onSelect: (name: string) => void;
  asSide?: boolean;
}) {
  const domain = dbDomains.find((d) => d.id === table.domain)!;
  const { outgoing, incoming } = getRelationsFor(table.name);
  const selfRefs = outgoing.filter((r) => r.self);
  const outgoingExt = outgoing.filter((r) => !r.self);
  const description = getTableDescription(table.name);

  return (
    <div
      className={
        asSide
          ? "w-[340px] shrink-0 border-l border-glass-border bg-overlay-3 overflow-y-auto p-4"
          : "px-5 pt-4 pb-5 border-t border-glass-border"
      }
    >
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
              {table.fields.length} полей · {outgoing.length + incoming.length}{" "}
              связей
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

        {description && (
          <div className="mb-4 space-y-2">
            <p className="text-[12.5px] text-body leading-relaxed">
              {description.desc}
            </p>
            {description.notes?.map((note, i) => (
              <p
                key={i}
                className="text-[11.5px] text-subtle leading-relaxed border-l-2 pl-3 py-0.5"
                style={{ borderColor: `${domain.accent}66` }}
              >
                {note}
              </p>
            ))}
          </div>
        )}

        <div
          className={
            asSide ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"
          }
        >
          <RelationList
            title="Ссылается на (outgoing)"
            empty="Нет исходящих FK."
            relations={outgoingExt.map((r) => ({
              src: table.name,
              srcField: r.via,
              dst: r.to,
              dstField: "id",
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
            const t = dbTables.find(
              (x) => x.name === (r.src === relations[0].src ? r.dst : r.src),
            );
            const targetDomain = t
              ? dbDomains.find((d) => d.id === t.domain)
              : null;
            const targetName = t?.name || r.dst;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => onSelect(targetName)}
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
