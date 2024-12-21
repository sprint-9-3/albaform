"use client";

import PostCard from "@/components/card/PostCard";
import { PostCardProps } from "@/types/post";
import useInfinityScroll from "@/hooks/useInfinityScroll";
import Empty from "./Empty";
import PostCardListSkeleton from "./PostCardSkeleton";
import { useState } from "react";
import { getArticles } from "../getArticles";
import FloatingButton from "@/components/button/FloatingButton";

interface AlbatalkResponse {
  data: PostCardProps[];
  nextCursor: number | null;
}

const AlbatalkList = ({
  posts: initialPosts,
  nextCursor: initialCursor,
  orderBy,
  keyword,
}: {
  posts: PostCardProps[];
  nextCursor: number | null;
  orderBy: string;
  keyword: string;
}) => {
  const [posts, setPosts] = useState(initialPosts);
  const [cursor, setCursor] = useState(initialCursor);
  const [isLoading, setIsLoading] = useState(false);
  const isLogin = localStorage.getItem("isLogin");

  const fetchMoreData = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response: AlbatalkResponse = await getArticles({
        limit: 6,
        cursor,
        keyword,
        orderBy,
      });

      setPosts((prevList) => [
        ...prevList,
        ...response.data.filter(
          (newPost) => !prevList.some((post) => post.id === newPost.id)
        ),
      ]);
      setCursor(response.nextCursor);
    } catch (error) {
      console.error("데이터를 불러오는데 실패했습니다.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const observerRef = useInfinityScroll({
    fetchMoreData,
  });

  return (
    <div>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 pc:grid-cols-3 pc:gap-x-[25px] pc:gap-y-[48px]">
          {posts.map((post) => (
            <PostCard key={post.id} info={post} />
          ))}
        </div>
      ) : (
        <Empty />
      )}

      {cursor && <div ref={observerRef} style={{ height: "1px" }} />}

      {isLoading && <PostCardListSkeleton count={3} />}

      {isLogin && (
        <FloatingButton
          icon="/icon/writing.svg"
          href="/addtalk"
          className="fixed bottom-20 right-10"
        />
      )}
    </div>
  );
};

export default AlbatalkList;
