import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image?: string;
};

export default function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      {image ? (
        <Image
          src={image}
          alt={`${name} 프로필 사진`}
          width={128}
          height={128}
          priority
          className="h-32 w-32 rounded-full object-cover ring-4 ring-white/90 shadow-[0_14px_32px_-12px_rgb(160_90_50/0.5)]"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-orange-200 to-orange-400 text-5xl font-bold text-white ring-4 ring-white/90 shadow-[0_14px_32px_-12px_rgb(160_90_50/0.5)]"
        >
          {name.charAt(0)}
        </div>
      )}
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{name}</h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-stone-500">{bio}</p>
    </header>
  );
}
