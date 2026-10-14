"use client";

import { useState } from "react";

type Props = {
  id: string;
  title: string;
  description?: string;
  url: string;
  initialCount: number;
};

export default function LinkCard({ id, title, description, url, initialCount }: Props) {
  const [count, setCount] = useState(initialCount);

  function handleClick() {
    // sendBeacon은 페이지를 떠나도 요청이 끝까지 전송됨
    const endpoint = `/api/links/${encodeURIComponent(id)}/click`;
    if (!navigator.sendBeacon?.(endpoint)) {
      fetch(endpoint, { method: "POST", keepalive: true }).catch(() => {});
    }
    setCount((c) => c + 1);
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="relative flex min-h-20 w-full flex-col items-center justify-center rounded-3xl border border-white/70 bg-white/45 px-14 py-5 text-center shadow-[0_6px_24px_-12px_rgb(140_80_40/0.25)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_10px_28px_-12px_rgb(140_80_40/0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 active:translate-y-0"
    >
      <span className="text-base font-semibold">{title}</span>
      {description && <span className="mt-1 text-sm text-stone-500">{description}</span>}
      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs tabular-nums text-stone-400">
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
