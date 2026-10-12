import { NextResponse } from "next/server";
import { incrementClick } from "@/lib/mongodb";
import { profile } from "@/data/profile";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // 등록된 링크만 집계 (임의의 id로 DB가 채워지는 것을 방지)
  if (!profile.links.some((link) => link.id === id)) {
    return NextResponse.json({ error: "존재하지 않는 링크입니다." }, { status: 404 });
  }

  try {
    const count = await incrementClick(id);
    return NextResponse.json({ id, count });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
