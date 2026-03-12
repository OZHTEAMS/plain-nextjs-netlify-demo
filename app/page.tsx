export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import RssFeed from "./components/RssFeed";
import VideoHub from "./components/VideoHub";
import TelegramFeed from "./components/TelegramFeed";
import TwitterWidget from "./components/TwitterWidget";

export default async function Home() {
  if (
    !process.env.DATABASE_URL ||
    process.env.DATABASE_URL ===
      "prisma+postgres://accelerate.prisma-data.net/?api_key=API_KEY"
  ) {
    redirect("/setup");
  }

  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#0F1F38]">
      {/* Hero */}
      <section className="py-20 px-8 text-center bg-gradient-to-b from-[#0A1628] to-[#0F1F38]">
        <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
          Análisis · Inversión · Prosperidad
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
          Venezuelan{" "}
          <span className="text-[#C9A84C]">Wealth</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Inteligencia financiera para el venezolano que construye su futuro.
        </p>
      </section>

      {/* Articles grid */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-xl font-bold text-[#C9A84C] mb-8 pb-4 border-b border-[#C9A84C]/20 uppercase tracking-widest">
          Artículos Recientes
        </h2>

        {posts.length === 0 ? (
          <p className="text-slate-500 text-center py-24">
            No hay artículos publicados aún.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <article className="bg-[#1B2D3F] rounded-xl p-6 border border-white/5 hover:border-[#C9A84C]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 h-full flex flex-col">
                  <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-white text-xl font-bold mb-3 group-hover:text-[#C9A84C] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 flex-1">
                    {post.content}
                  </p>
                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                    <time className="text-xs text-slate-500">
                      {new Date(post.createdAt).toLocaleDateString("es-VE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span className="text-[#C9A84C] text-xs font-semibold group-hover:translate-x-1 transition-transform inline-block">
                      Leer →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Widgets row ─────────────────────────────── */}
      <section className="px-6 py-12 max-w-6xl mx-auto space-y-10">
        {/* RSS + Twitter side by side */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Suspense
            fallback={
              <div className="bg-[#1B2D3F] rounded-xl border border-white/5 h-64 animate-pulse" />
            }
          >
            <RssFeed />
          </Suspense>

          <TwitterWidget
            account={process.env.TWITTER_ACCOUNT ?? "bbcmundo"}
            height={480}
          />
        </div>

        {/* Video Hub — full width */}
        <Suspense
          fallback={
            <div className="bg-[#1B2D3F] rounded-xl border border-white/5 h-64 animate-pulse" />
          }
        >
          <VideoHub />
        </Suspense>

        {/* Telegram — full width */}
        <TelegramFeed
          channel={process.env.TELEGRAM_CHANNEL ?? "venezuelanwealth"}
        />
      </section>
    </div>
  );
}
