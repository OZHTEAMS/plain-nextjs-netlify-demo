"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [dbConfigured, setDbConfigured] = useState(true);

  useEffect(() => {
    const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;
    if (
      !databaseUrl ||
      databaseUrl ===
        "prisma+postgres://accelerate.prisma-data.net/?api_key=API_KEY"
    ) {
      setDbConfigured(false);
    }
  }, []);

  return (
    <header className="w-full bg-[#0A1628] border-b border-white/10 py-4 px-8">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-[#C9A84C] text-xl font-extrabold tracking-tight">
            Venezuelan
          </span>
          <span className="text-white text-xl font-extrabold tracking-tight">
            &nbsp;Wealth
          </span>
        </Link>

        {dbConfigured && (
          <div className="flex items-center gap-6">
            <Link
              href="/posts"
              className="text-slate-300 hover:text-[#C9A84C] transition-colors text-sm"
            >
              Artículos
            </Link>
            <Link
              href="/posts/new"
              className="text-slate-300 hover:text-[#C9A84C] transition-colors text-sm"
            >
              Nuevo Artículo
            </Link>
            <Link
              href="/success-stories"
              className="text-slate-300 hover:text-[#C9A84C] transition-colors text-sm"
            >
              Venezolanos en el Mundo
            </Link>
            <Link
              href="/users/new"
              className="bg-[#C9A84C] text-[#0A1628] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-400 transition-colors"
            >
              Nuevo Usuario
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
