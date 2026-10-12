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
      className="relative flex min-h-24 w-full flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-14 py-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md active:translate-y-0"
    >
      <span className="text-lg font-semibold">{title}</span>
      {description && <span className="mt-1 text-sm text-gray-500">{description}</span>}
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-normal text-gray-400">
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
