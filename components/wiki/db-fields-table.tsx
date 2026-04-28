import { Key, Link2 } from "lucide-react";
import {
  dbDomains,
  getTable,
  type DbField,
} from "@/lib/wiki-db-schema";

interface DbFieldsTableProps {
  name: string;
}

function fieldKindBadge(kind?: DbField["kind"]) {
  if (!kind) return null;
  if (kind === "PK") {
    return (
      <span
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium"
        style={{ backgroundColor: "#F59E0B22", color: "#F59E0B" }}
      >
        <Key className="w-2.5 h-2.5" />
        PK
      </span>
    );
  }
  if (kind === "FK") {
    return (
      <span
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium"
        style={{ backgroundColor: "#3B82F622", color: "#3B82F6" }}
      >
        <Link2 className="w-2.5 h-2.5" />
        FK
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium"
      style={{ backgroundColor: "#A855F722", color: "#A855F7" }}
    >
      <Key className="w-2.5 h-2.5" />
      PFK
    </span>
  );
}

export function DbFieldsTable({ name }: DbFieldsTableProps) {
  const table = getTable(name);
  if (!table) return null;
  const domain = dbDomains.find((d) => d.id === table.domain);
  const accent = domain?.accent ?? "#3B82F6";

  return (
    <div className="not-prose my-6 rounded-xl border border-glass-border bg-overlay-3 overflow-hidden">
      <div
        className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-glass-border"
        style={{ backgroundColor: `${accent}12` }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: accent }}
          />
          <code className="font-mono font-semibold text-[13px] text-heading truncate">
            {table.name}
          </code>
          {table.optional && (
            <span className="text-[9px] uppercase tracking-wider text-dim">
              опц.
            </span>
          )}
        </div>
        {domain && (
          <span className="text-[10px] uppercase tracking-[0.15em] text-dim font-medium shrink-0">
            {domain.title}
          </span>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[12.5px] border-collapse">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-[0.12em] text-dim">
              <th className="font-medium px-4 py-2 border-b border-glass-border">
                Поле
              </th>
              <th className="font-medium px-4 py-2 border-b border-glass-border">
                Тип
              </th>
              <th className="font-medium px-4 py-2 border-b border-glass-border">
                Ключ
              </th>
              <th className="font-medium px-4 py-2 border-b border-glass-border">
                Ссылается на
              </th>
            </tr>
          </thead>
          <tbody>
            {table.fields.map((f, i) => (
              <tr
                key={f.name}
                className={
                  i % 2 === 1 ? "bg-overlay-2" : undefined
                }
              >
                <td className="px-4 py-1.5 align-top">
                  <code className="font-mono text-body">{f.name}</code>
                </td>
                <td className="px-4 py-1.5 align-top">
                  <code className="font-mono text-[11.5px] text-dim">
                    {f.type}
                  </code>
                </td>
                <td className="px-4 py-1.5 align-top">
                  {fieldKindBadge(f.kind)}
                </td>
                <td className="px-4 py-1.5 align-top">
                  {f.refs ? (
                    <code className="font-mono text-[11.5px] text-body">
                      {f.refs}
                      <span className="text-dim">.id</span>
                    </code>
                  ) : (
                    <span className="text-dim">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
