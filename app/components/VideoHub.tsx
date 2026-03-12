// Server Component — revalida cada hora
// Requiere: YOUTUBE_API_KEY y YOUTUBE_PLAYLIST_ID en .env

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
interface PlaylistItem {
  id: string;
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: { medium?: Thumbnail; default: Thumbnail };
    resourceId: { videoId: string };
  };
}

async function fetchPlaylist(
  playlistId: string,
  apiKey: string
): Promise<PlaylistItem[]> {
  const url = new URL(
    "https://www.googleapis.com/youtube/v3/playlistItems"
  );
  url.searchParams.set("part", "snippet");
  url.searchParams.set("maxResults", "6");
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.items ?? []) as PlaylistItem[];
}

export default async function VideoHub() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistId = process.env.YOUTUBE_PLAYLIST_ID;

  if (!apiKey || !playlistId) {
    return (
      <div className="bg-[#1B2D3F] rounded-xl border border-white/5 p-8 text-center">
        <p className="text-slate-500 text-sm">
          Configura{" "}
          <code className="text-[#C9A84C]">YOUTUBE_API_KEY</code> y{" "}
          <code className="text-[#C9A84C]">YOUTUBE_PLAYLIST_ID</code> en
          tu <code className="text-slate-400">.env</code> para activar el
          Video Hub.
        </p>
      </div>
    );
  }

  const items = await fetchPlaylist(playlistId, apiKey);

  return (
    <div className="bg-[#1B2D3F] rounded-xl border border-white/5 overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-red-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
        </svg>
        <h3 className="text-white font-bold text-sm">Video Hub</h3>
      </div>

      {items.length === 0 ? (
        <p className="text-slate-500 text-sm p-6 text-center">
          No se encontraron videos en la lista de reproducción.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {items.map((item) => {
            const videoId = item.snippet.resourceId.videoId;
            const thumb =
              item.snippet.thumbnails.medium?.url ??
              item.snippet.thumbnails.default.url;
            return (
              <a
                key={item.id}
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg overflow-hidden border border-white/5 hover:border-[#C9A84C]/40 transition-all duration-300"
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumb}
                    alt={item.snippet.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-white ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-[#152030]">
                  <p className="text-white text-xs font-semibold line-clamp-2 group-hover:text-[#C9A84C] transition-colors">
                    {item.snippet.title}
                  </p>
                  <time className="text-slate-500 text-[10px] mt-1 block">
                    {new Date(item.snippet.publishedAt).toLocaleDateString(
                      "es-VE",
                      { year: "numeric", month: "short", day: "numeric" }
                    )}
                  </time>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
