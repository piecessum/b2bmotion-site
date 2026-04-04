import Image from "next/image"

interface TextBlock {
  ty: string
  te?: string
  url?: string
  w?: string
  h?: string
  color?: string
  bg?: string
  fs?: string
  ic?: string
  alt?: string
  caption?: string
  link?: string
  blank?: string
  rh?: string | null
  rw?: string | null
  al?: string | null
  [key: string]: any
}

interface RichTextRendererProps {
  content: TextBlock[]
}

function renderHTML(html: string) {
  return { __html: html }
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content || content.length === 0) {
    return (
      <div className="text-center py-10 text-subtle">
        <p>Контент статьи отсутствует или не загружен.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {content.map((block, index) => {
        switch (block.ty) {
          case "text":
            return (
              <div
                key={index}
                className="text-body leading-relaxed"
                dangerouslySetInnerHTML={renderHTML(block.te || "")}
              />
            )

          case "callout":
            const bgColor = block.bg || "#f1f1f1"
            const borderColor = block.ic || "#7b7b7b"
            return (
              <div
                key={index}
                className="rounded-xl p-5 border-l-4"
                style={{
                  backgroundColor: bgColor,
                  borderColor: borderColor,
                }}
              >
                <div
                  className="text-body leading-relaxed"
                  dangerouslySetInnerHTML={renderHTML(block.te || "")}
                />
              </div>
            )

          case "image":
            if (!block.url) return null
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
            )

          case "br":
            return <div key={index} className="h-4" />

          case "header":
            return (
              <h2
                key={index}
                className="font-heading font-semibold text-2xl text-heading mt-8 mb-4"
                dangerouslySetInnerHTML={renderHTML(block.te || "")}
              />
            )

          default:
            return null
        }
      })}
    </div>
  )
}
