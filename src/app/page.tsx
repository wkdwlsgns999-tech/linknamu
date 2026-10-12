import { connection } from "next/server";
import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import { profile } from "@/data/profile";
import { getClickCounts } from "@/lib/mongodb";

export default async function Home() {
  // 빌드 시점이 아니라 요청마다 최신 클릭 수를 불러오도록 동적 렌더링
  await connection();
  const counts = await getClickCounts();

  return (
    <main className="flex min-h-screen justify-center sm:items-center sm:px-4 sm:py-12">
      {/* 모바일에서는 화면 전체, 넓은 화면에서는 와이어프레임처럼 둥근 카드 프레임 */}
      <div className="flex w-full max-w-md flex-col px-4 py-12 sm:rounded-[2rem] sm:border sm:border-gray-200 sm:bg-white/70 sm:px-8 sm:shadow-lg sm:backdrop-blur">
        <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />

        <ul className="mt-10 flex flex-col gap-6">
          {profile.links.map((link) => (
            <li key={link.id}>
              <LinkCard
                id={link.id}
                title={link.title}
                description={link.description}
                url={link.url}
                initialCount={counts[link.id] ?? 0}
              />
            </li>
          ))}
        </ul>

        <footer className="mt-auto pt-12 text-center text-xs text-gray-400">
          링크나무
        </footer>
      </div>
    </main>
  );
}
