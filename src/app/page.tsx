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
    <main className="flex min-h-screen justify-center px-6 sm:px-8">
      <div className="flex w-full max-w-md flex-col pt-16 pb-10 sm:pt-24">
        <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />

        <ul className="mt-12 flex flex-col gap-4 sm:gap-5">
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

        <footer className="mt-auto pt-16 text-center text-xs tracking-wide text-stone-400">
          링크나무
        </footer>
      </div>
    </main>
  );
}
