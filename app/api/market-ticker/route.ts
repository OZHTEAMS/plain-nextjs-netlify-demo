import { NextResponse } from "next/server";

type TickerItem = {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
};

const YAHOO_SYMBOLS: Array<{ symbol: string; name: string }> = [
  { symbol: "CL=F", name: "Petróleo WTI" },
  { symbol: "^GSPC", name: "S&P 500" },
  { symbol: "^DJI", name: "Dow Jones" },
  { symbol: "^IXIC", name: "Nasdaq" },
  { symbol: "GC=F", name: "Oro" },
];

export async function GET() {
  try {
    const symbols = YAHOO_SYMBOLS.map((s) => s.symbol).join(",");
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols)}`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    const data = await res.json();
    const result = data?.quoteResponse?.result ?? [];

    const nameBySymbol = new Map(YAHOO_SYMBOLS.map((s) => [s.symbol, s.name]));

    const items: TickerItem[] = result
      .map((r: Record<string, unknown>) => ({
        symbol: String(r.symbol ?? ""),
        name: nameBySymbol.get(String(r.symbol ?? "")) ?? String(r.shortName ?? r.symbol ?? "Activo"),
        price: Number(r.regularMarketPrice ?? 0),
        changePercent: Number(r.regularMarketChangePercent ?? 0),
      }))
      .filter((item: TickerItem) => item.symbol && Number.isFinite(item.price));

    return NextResponse.json({ items }, { status: 200 });
  } catch {
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
