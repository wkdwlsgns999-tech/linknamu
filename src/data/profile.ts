export type LinkItem = {
  id: string;
  title: string;
  description?: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  image?: string; // public/ 기준 경로. 없으면 이름 첫 글자를 표시
  links: LinkItem[];
};

// TODO: 보여 주기용 더미 값. 실제 내용으로 교체할 것
export const profile: Profile = {
  name: "장진훈",
  bio: "세계 최강 바이브코더",
  image: "/profile.jpg",
  links: [
    {
      id: "github",
      title: "GitHub",
      description: "제가 만든 프로젝트와 코드",
      url: "https://github.com/",
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      description: "경력과 이력",
      url: "https://www.linkedin.com/",
    },
    {
      id: "blog",
      title: "Blog",
      description: "개발하며 배운 것들을 기록합니다",
      url: "https://example.com/",
    },
  ],
};
