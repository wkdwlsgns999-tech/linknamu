export type LinkItem = {
  id: string;
  title: string;
  description?: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  image?: string; // public/ 기준 경로 또는 외부 URL(next.config.ts에 도메인 허용 필요). 없으면 이름 첫 글자를 표시
  links: LinkItem[];
};

// TODO: 보여 주기용 더미 값. 실제 내용으로 교체할 것
export const profile: Profile = {
  name: "김개발",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  image: "/profile.jpg",
  links: [
    {
      id: "github",
      title: "👨‍🦲 GitHub",
      description: "제가 만든 프로젝트와 코드",
      url: "https://github.com/wkdwlsgns999-tech",
    },
    {
      id: "blog",
      title: "🟢 Blog",
      description: "개발하며 배운 것들을 기록합니다",
      url: "https://blog.naver.com/wkdwlsgns234",
    },
    {
      id: "email",
      title: "🐕 Email",
      description: "메일 보내기",
      url: "mailto:wkdwlsgns999@gmail.com",
    },
  ],
};
