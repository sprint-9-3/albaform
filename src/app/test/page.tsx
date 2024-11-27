import PostCard from "@/components/card/PostCard";

const page = () => {
  const mockData = {
    writer: {
      imageUrl: "",
      nickname: "junjeong",
      id: 0,
    },
    updatedAt: "2024-11-27T06:43:38.097Z",
    createdAt: "2024-11-27T06:43:38.097Z",
    commentCount: 0,
    likeCount: 0,
    imageUrl: "string",
    content:
      "안녕 내 이름은 정준영이야 안녕 내 이름은 정준영이야안녕 내 이름은 정준영이야안녕 내 이름은 정준영이야안녕 내 이름은 정준영이야안녕 내 이름은 정준영이야",
    title: "제목",
    id: 0,
  };
  return <PostCard info={mockData} />;
};

export default page;
