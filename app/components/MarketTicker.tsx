"use client";

import useSWR from "swr";

type TickerItem = {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
};

type TickerResponse = {
  items: TickerItem[];
};

const fetcher = async (url: string): Promise<TickerResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("No se pudo cargar el ticker");
  }
  return res.json();
};

function TickerCard({ item }: { item: TickerItem }) {
  const positive = item.changePercent >= 0;

  return (
    <div className="flex items-center gap-2 px-5 py-2 border-r border-white/10 shrink-0">
      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
        {item.name}
      </span>
      <span className="text-white text-xs font-bold">${item.price.toFixed(2)}</span>
      <span
        className={`text-[10px] font-bold ${
          positive ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {positive ? "▲" : "▼"} {Math.abs(item.changePercent).toFixed(2)}%
      </span>
    </div>
  );
}

export default function MarketTicker() {
  const { data } = useSWR("/api/market-ticker", fetcher, {
    refreshInterval: 60_000,
    revalidateOnFocus: false,
  });

  const items = data?.items ?? [];
  if (items.length === 0) return null;

  // Duplicate sequence for seamless infinite marquee
  const loop = [...items, ...items];

  return (
    <div className="w-full bg-[#060E1A] border-b border-[#C9A84C]/20 overflow-hidden">
      <div className="flex items-center">
        <span className="text-[#C9A84C] text-[9px] font-black uppercase tracking-[0.3em] px-4 shrink-0 border-r border-white/10 py-2">
          Mercados
        </span>
        <div className="ticker-track">
          {loop.map((item, i) => (
            <TickerCard key={`${item.symbol}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
