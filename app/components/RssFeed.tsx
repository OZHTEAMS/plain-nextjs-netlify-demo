// Server Component — revalida cada 30 minutos
// Parsea múltiples feeds RSS de medios venezolanos

import Parser from "rss-parser";

const RSS_FEEDS = [
  { url: "https://efectococuyo.com/feed/", label: "Efecto Cocuyo" },
  { url: "https://runrun.es/feed", label: "Runrun.es" },
  { url: "https://www.el-nacional.com/feed/", label: "El Nacional" },
  {
    url: "https://prodavinci.com/feed/",
    label: "ProDaVinci",
  },
];

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  source: string;
}

async function fetchFeeds(): Promise<FeedItem[]> {
  const parser = new Parser({ timeout: 5000 });

  const results = await Promise.allSettled(
    RSS_FEEDS.map(async ({ url, label }) => {
      const feed = await parser.parseURL(url);
      return feed.items.slice(0, 3).map((item) => ({
        title: item.title ?? "(sin título)",
        link: item.link ?? "#",
        pubDate: item.pubDate ?? "",
        contentSnippet: item.contentSnippet,
        source: label,
      }));
    })
  );

  return results
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .sort(
      (a, b) =>
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    )
    .slice(0, 9);
}

export default async function RssFeed() {
  let items: FeedItem[] = [];
  try {
    items = await fetchFeeds();
  } catch {
    // silently fail — widget no bloquea la página
  }

  return (
    <div className="bg-[#1B2D3F] rounded-xl border border-white/5 overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
        <span className="text-[#C9A84C] text-base leading-none">⚡</span>
        <h3 className="text-white font-bold text-sm">Feed de Noticias</h3>
        <span className="ml-auto text-slate-500 text-[10px]">
          {RSS_FEEDS.map((f) => f.label).join(" · ")}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="text-slate-500 text-sm p-6 text-center">
          No se pudo cargar el feed de noticias.
        </p>
      ) : (
        <ul className="divide-y divide-white/5">
          {items.map((item, i) => (
            <li
              key={i}
              className="px-5 py-4 hover:bg-white/[0.04] transition-colors"
            >
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block space-y-1"
              >
                <span className="text-[#C9A84C] text-[9px] font-black uppercase tracking-[0.2em]">
                  {item.source}
                </span>
                <p className="text-white text-sm font-semibold hover:text-[#C9A84C] transition-colors leading-snug line-clamp-2">
                  {item.title}
                </p>
                {item.pubDate && (
                  <time className="text-slate-500 text-[11px] block">
                    {new Date(item.pubDate).toLocaleDateString("es-VE", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
