import { getAllPosts } from "@/lib/content";
import { redirect } from "next/navigation";

export function generateStaticParams() {
  const posts = getAllPosts("blog");
  const caseStudies = posts.filter(
    (post) => post.tags?.includes("кейс") || post.slug.startsWith("keis-"),
  );
  return caseStudies.map((post) => ({ slug: post.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/blog/${slug}`);
}
