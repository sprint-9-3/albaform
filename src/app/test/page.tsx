import CommentCard from "@/components/card/CommentCard";

const page = () => {
  const mock = {
    post: {
      content:
        "알바 추천해주세요.알바 추천해주세요.알바 추천해주세요.알바 추천해주세요.알바 추천해주세요.알바 추천해주세요.알바 추천해주세요.",
      title: "알바 추천해주세요.",
      id: 0,
    },
    updatedAt: "2024-11-27T06:52:01.461Z",
    createdAt: "2024-11-27T06:52:01.461Z",
    content: "스터디카페 했었는데 너무 좋았어요",
    id: 0,
  };
  return <CommentCard info={mock} />;
};

export default page;
