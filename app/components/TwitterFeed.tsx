"use client";

import { TwitterTimelineEmbed } from "react-twitter-embed";

interface TwitterFeedProps {
  account: string;
  height?: number;
}

export default function TwitterFeed({ account, height = 500 }: TwitterFeedProps) {
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

      <div className="bg-white p-3 rounded-b-xl min-h-[220px]">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName={account}
          options={{ height }}
          noHeader
          noFooter
          transparent
        />
      </div>
    </div>
  );
}
