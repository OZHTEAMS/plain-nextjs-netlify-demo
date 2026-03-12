"use client";

import { useEffect, useRef } from "react";

interface TelegramChannelProps {
  channel: string;
  postId?: number;
}

export default function TelegramChannel({
  channel,
  postId = 1,
}: TelegramChannelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const normalizedChannel = channel
    .replace(/^https?:\/\/t\.me\//, "")
    .replace(/^@/, "")
    .replace(/\/$/, "");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-post", `${normalizedChannel}/${postId}`);
    script.setAttribute("data-width", "100%");
    script.setAttribute("data-dark", "1");
    script.setAttribute("data-color", "C9A84C");
    el.appendChild(script);

    return () => {
      el.innerHTML = "";
    };
  }, [normalizedChannel, postId]);

  return (
    <div className="bg-[#1B2D3F] rounded-xl border border-white/5 overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
        <h3 className="text-white font-bold text-sm">Canal de Telegram</h3>
        <a
          href={`https://t.me/${normalizedChannel}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-[#C9A84C] text-xs hover:underline"
        >
          @{normalizedChannel} {"->"}
        </a>
      </div>
      <div ref={containerRef} className="px-4 py-4 min-h-[120px]" />
    </div>
  );
}
