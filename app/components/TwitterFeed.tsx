"use client";

import { useEffect, useRef } from "react";

interface TwitterFeedProps {
  account: string;
  height?: number;
}

export default function TwitterFeed({ account, height = 500 }: TwitterFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const el = containerRef.current;
    if (!el) return;

    el.innerHTML = "";

    const anchor = document.createElement("a");
    anchor.className = "twitter-timeline";
    anchor.setAttribute("data-height", String(height));
    anchor.setAttribute("data-theme", "light");
    anchor.setAttribute("data-chrome", "noheader nofooter noborders transparent");
    anchor.setAttribute("data-tweet-limit", "5");
    anchor.href = `https://twitter.com/${account}`;
    anchor.textContent = `Cargando tweets de @${account}...`;
    el.appendChild(anchor);

    const existing = document.getElementById("twitter-wjs") as HTMLScriptElement | null;
    if (existing) {
      const twttr = (window as unknown as { twttr?: { widgets?: { load: (target?: HTMLElement) => void } } }).twttr;
      twttr?.widgets?.load(el);
      return;
    }

    const script = document.createElement("script");
    script.id = "twitter-wjs";
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);
  }, [account, height]);

  return (
    <div className="bg-[#1B2D3F] rounded-xl border border-white/5 overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
        <h3 className="text-white font-bold text-sm">Twitter / X</h3>
        <a
          href={`https://twitter.com/${account}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-[#C9A84C] text-xs hover:underline"
        >
          @{account} {"->"}
        </a>
      </div>

      <div ref={containerRef} className="bg-white p-3 rounded-b-xl min-h-[220px]" />
    </div>
  );
}
