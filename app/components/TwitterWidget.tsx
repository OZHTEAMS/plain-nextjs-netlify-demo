"use client";

import { useEffect, useRef } from "react";

interface Props {
  account: string;
  height?: number;
}

export default function TwitterWidget({ account, height = 500 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject the official Twitter widget script once
    if (document.getElementById("twitter-wjs")) {
      // Script already loaded — re-process widgets
      if (typeof window !== "undefined" && (window as unknown as { twttr?: { widgets?: { load: (el: HTMLElement | null) => void } } }).twttr?.widgets) {
        (window as unknown as { twttr: { widgets: { load: (el: HTMLElement | null) => void } } }).twttr.widgets.load(containerRef.current);
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "twitter-wjs";
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    return () => {
      // leave the script in DOM to avoid reloading on navigation
    };
  }, [account]);

  return (
    <div className="bg-[#1B2D3F] rounded-xl border border-white/5 overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
        {/* X / Twitter icon */}
        <svg
          className="w-4 h-4 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.73-8.835L1.254 2.25H8.08l4.261 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <h3 className="text-white font-bold text-sm">Twitter / X</h3>
        <a
          href={`https://twitter.com/${account}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-[#C9A84C] text-xs hover:underline"
        >
          @{account} →
        </a>
      </div>
      {/* Twitter renders inside a white background by design */}
      <div ref={containerRef} className="p-3 bg-white rounded-b-xl overflow-hidden">
        <a
          className="twitter-timeline"
          data-height={height}
          data-theme="light"
          data-chrome="noheader nofooter noborders transparent"
          data-tweet-limit="5"
          href={`https://twitter.com/${account}`}
        >
          Cargando tweets de @{account}…
        </a>
      </div>
    </div>
  );
}
