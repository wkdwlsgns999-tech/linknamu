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
          width={144}
          height={144}
          priority
          className="h-36 w-36 rounded-full object-cover ring-4 ring-white shadow-md"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-36 w-36 items-center justify-center rounded-full bg-emerald-500 text-5xl font-bold text-white ring-4 ring-white shadow-md"
        >
          {name.charAt(0)}
        </div>
      )}
      <h1 className="mt-4 text-2xl font-bold">{name}</h1>
      <p className="mt-1 text-gray-600">{bio}</p>
    </header>
  );
}
