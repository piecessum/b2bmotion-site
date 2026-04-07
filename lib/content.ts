import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  image?: string;
  tags?: string[];
  content: string;
  logo?: string;
  industry?: string;
  metrics?: any[];
  clientInfo?: any;
  problems?: string[];
  solution?: string[];
  results?: any[];
  quote?: any;
  integrations?: string[];
  authorCard?: {
    name: string;
    role: string;
    bio: string;
    photo: string;
  };
  intervieweeCard?: {
    name: string;
    role: string;
    bio: string;
    photo: string;
  };
  source?: {
    text: string;
    linkText: string;
    linkUrl: string;
  };
}

function getContentDir(collection: "blog" | "news") {
  return path.join(process.cwd(), "content", collection);
}

export function getAllPosts(collection: "blog" | "news"): Post[] {
  const dir = getContentDir(collection);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);

    return {
      slug: file.replace(/\.md$/, ""),
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      author: data.author || undefined,
      image: data.image || undefined,
      tags: data.tags || undefined,
      logo: data.logo || undefined,
      industry: data.industry || undefined,
      metrics: data.metrics || undefined,
      clientInfo: data.clientInfo || undefined,
      problems: data.problems || undefined,
      solution: data.solution || undefined,
      results: data.results || undefined,
      quote: data.quote || undefined,
      integrations: data.integrations || undefined,
      authorCard: data.authorCard || undefined,
      intervieweeCard: data.intervieweeCard || undefined,
      source: data.source || undefined,
      content,
    } as Post;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(
  collection: "blog" | "news",
  slug: string,
): Post | null {
  const filePath = path.join(getContentDir(collection), `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    author: data.author || undefined,
    image: data.image || undefined,
    tags: data.tags || undefined,
    logo: data.logo || undefined,
    industry: data.industry || undefined,
    metrics: data.metrics || undefined,
    clientInfo: data.clientInfo || undefined,
    problems: data.problems || undefined,
    solution: data.solution || undefined,
    results: data.results || undefined,
    quote: data.quote || undefined,
    integrations: data.integrations || undefined,
    authorCard: data.authorCard || undefined,
    intervieweeCard: data.intervieweeCard || undefined,
    source: data.source || undefined,
    content,
  };
}
