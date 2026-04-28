import Image from "next/image";
import { DbSchemaBlock } from "@/components/wiki/db-schema-block";
import { DbFieldsTable } from "@/components/wiki/db-fields-table";
import { getTable } from "@/lib/wiki-db-schema";

/**
 * Из заголовка вида «name - описание» / «name — описание» / «name» вытащить
 * первый токен и проверить, что это известная шлюзовая таблица.
 */
function tableNameFromHeading(heading: string | undefined): string | null {
  if (!heading) return null;
  const stripped = heading.replace(/<[^>]+>/g, "").trim();
  const first = stripped.split(/\s+[-—–]\s+|\s+/, 1)[0]?.trim();
  if (!first) return null;
  return getTable(first) ? first : null;
}

interface TextBlock {
  ty: string;
  te?: string;
  url?: string;
  w?: string;
  h?: string;
  color?: string;
  bg?: string;
  fs?: string;
  ic?: string;
  alt?: string;
  caption?: string;
  link?: string;
  blank?: string;
  rh?: string | null;
  rw?: string | null;
  al?: string | null;
  [key: string]: any;
}

interface RichTextRendererProps {
  content: TextBlock[];
}

function renderHTML(html: string) {
  return { __html: html };
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content || content.length === 0) {
    return (
      <div className="text-center py-10 text-subtle">
        <p>Контент статьи отсутствует или не загружен.</p>
      </div>
    );
  }

  // Запоминаем последний встретившийся заголовок, чтобы при image-блоке
  // решить, не подменить ли скриншот таблицы на структурированную таблицу полей.
  let lastHeadingText: string | undefined;

  return (
    <div className="space-y-6">
      {content.map((block, index) => {
        if (block.ty === "heading" || block.ty === "header") {
          lastHeadingText = block.te;
        }
        switch (block.ty) {
          case "text":
            return (
              <div
                key={index}
                className="text-body leading-relaxed"
                dangerouslySetInnerHTML={renderHTML(block.te || "")}
              />
            );

          case "callout":
            const borderColor = block.ic || "#7b7b7b";
            return (
              <div
                key={index}
                className="rounded-xl p-5 border-l-4 bg-[#fafbfc] dark:bg-white/[0.04]"
                style={{ borderLeftColor: borderColor }}
              >
                <div
                  className="text-body leading-relaxed"
                  dangerouslySetInnerHTML={renderHTML(block.te || "")}
                />
              </div>
            );

          case "image": {
            if (!block.url) return null;
            const tableName = tableNameFromHeading(lastHeadingText);
            if (tableName) {
              return <DbFieldsTable key={index} name={tableName} />;
            }
            return (
              <div key={index} className="my-6">
                <div className="relative w-full overflow-hidden rounded-xl bg-surface-inner">
                  <Image
                    src={block.url}
                    alt={block.alt || ""}
                    width={parseInt(block.w || "1280")}
                    height={parseInt(block.h || "720")}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
                {block.caption && (
                  <p className="text-xs text-dim mt-2 text-center italic">
                    {block.caption}
                  </p>
                )}
              </div>
            );
          }

          case "br":
            return <div key={index} className="h-4" />;

          case "header":
            return (
              <h2
                key={index}
                className="font-heading font-semibold text-2xl text-heading mt-8 mb-4"
                dangerouslySetInnerHTML={renderHTML(block.te || "")}
              />
            );

          case "heading": {
            const level = (block.le as number) || 2;
            const html = renderHTML(block.te || "");
            if (level <= 2) {
              return (
                <h2
                  key={index}
                  className="font-heading font-semibold text-2xl text-heading mt-8 mb-3"
                  dangerouslySetInnerHTML={html}
                />
              );
            }
            if (level === 3) {
              return (
                <h3
                  key={index}
                  className="font-heading font-semibold text-xl text-heading mt-6 mb-2"
                  dangerouslySetInnerHTML={html}
                />
              );
            }
            return (
              <h4
                key={index}
                className="font-heading font-semibold text-base text-heading mt-5 mb-2"
                dangerouslySetInnerHTML={html}
              />
            );
          }

          case "preface":
            return (
              <p
                key={index}
                className="text-base text-subtle leading-relaxed italic"
                dangerouslySetInnerHTML={renderHTML(block.te || "")}
              />
            );

          case "db-schema":
            return <DbSchemaBlock key={index} />;

          default:
            return null;
        }
      })}
    </div>
  );
}
