// Server Component — revalida cada 5 minutos

interface CryptoPrice {
  usd: number;
  usd_24h_change: number;
}
interface CryptoData {
  bitcoin: CryptoPrice;
  ethereum: CryptoPrice;
}
interface VeDolarRate {
  fuente: string;
  nombre: string;
  compra: number;
  venta: number;
}

async function fetchMarketData() {
  const [cryptoRes, dolarRes] = await Promise.allSettled([
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true",
      { next: { revalidate: 300 } }
    ),
    fetch("https://ve.dolarapi.com/v1/dolares", {
      next: { revalidate: 300 },
    }),
  ]);

  const crypto =
    cryptoRes.status === "fulfilled" && cryptoRes.value.ok
      ? ((await cryptoRes.value.json()) as CryptoData)
      : null;

  const dolar =
    dolarRes.status === "fulfilled" && dolarRes.value.ok
      ? ((await dolarRes.value.json()) as VeDolarRate[])
      : null;

  return { crypto, dolar };
}

function TickerItem({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change?: number;
}) {
  const isPositive = (change ?? 0) >= 0;
  return (
    <div className="flex items-center gap-2 px-5 py-2 border-r border-white/10 last:border-0 shrink-0">
      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
        {label}
      </span>
      <span className="text-white text-xs font-bold">{value}</span>
      {change !== undefined && (
        <span
          className={`text-[10px] font-bold ${
            isPositive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {isPositive ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
        </span>
      )}
    </div>
  );
}

export default async function MarketTicker() {
  try {
    const { crypto, dolar } = await fetchMarketData();

    const paralelo = dolar?.find(
      (d) =>
        d.fuente === "EnParaleloVzla" ||
        d.nombre?.toLowerCase().includes("paralelo")
    );
    const bcv = dolar?.find(
      (d) =>
        d.fuente === "BCV" || d.nombre?.toLowerCase().includes("bcv")
    );

    if (!crypto && !dolar) return null;

    return (
      <div className="w-full bg-[#060E1A] border-b border-[#C9A84C]/20 overflow-x-auto">
        <div className="flex items-center min-w-max">
          <span className="text-[#C9A84C] text-[9px] font-black uppercase tracking-[0.3em] px-4 shrink-0 border-r border-white/10 py-2">
            Mercados
          </span>
          {crypto && (
            <>
              <TickerItem
                label="BTC"
                value={`$${crypto.bitcoin.usd.toLocaleString("en-US")}`}
                change={crypto.bitcoin.usd_24h_change}
              />
              <TickerItem
                label="ETH"
                value={`$${crypto.ethereum.usd.toLocaleString("en-US")}`}
                change={crypto.ethereum.usd_24h_change}
              />
            </>
          )}
          {bcv && (
            <TickerItem
              label="USD/VES BCV"
              value={`Bs. ${bcv.venta.toLocaleString("es-VE")}`}
            />
          )}
          {paralelo && (
            <TickerItem
              label="USD Paralelo"
              value={`Bs. ${paralelo.venta.toLocaleString("es-VE")}`}
            />
          )}
        </div>
      </div>
    );
  } catch {
    return null;
  }
}
