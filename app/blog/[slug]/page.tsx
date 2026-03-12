export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0F1F38]">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="text-[#C9A84C] text-sm hover:underline mb-10 inline-flex items-center gap-1"
        >
          ← Volver al inicio
        </Link>

        <div className="mt-8">
          <span className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest">
            {post.category}
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mt-3 mb-5">
            {post.title}
          </h1>

          <time className="text-slate-500 text-sm block mb-10 pb-10 border-b border-white/10">
            {new Date(post.createdAt).toLocaleDateString("es-VE", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          <div className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </article>
    </div>
  );
}
