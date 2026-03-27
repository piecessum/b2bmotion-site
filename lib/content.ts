import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  author?: string
  image?: string
  content: string
}

function getContentDir(collection: "blog" | "news") {
  return path.join(process.cwd(), "content", collection)
}

export function getAllPosts(collection: "blog" | "news"): Post[] {
  const dir = getContentDir(collection)

  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"))

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8")
    const { data, content } = matter(raw)

    return {
      slug: file.replace(/\.md$/, ""),
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      author: data.author || undefined,
      image: data.image || undefined,
      content,
    } as Post
  })

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(
  collection: "blog" | "news",
  slug: string
): Post | null {
  const filePath = path.join(getContentDir(collection), `${slug}.md`)

  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    author: data.author || undefined,
    image: data.image || undefined,
    content,
  }
}
