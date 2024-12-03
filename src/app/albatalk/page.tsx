"use server";

import { PostCardProps } from "@/types/post";
import { getArticles } from "./api/getArticles";
import AlbatalkList from "./components/AlbatalkList";

const AlbaTalkPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ orderBy?: string; keyword?: string }>;
}) => {
  const { orderBy = "mostRecent", keyword = "" } = await searchParams;

  const response = await getArticles({
    limit: 6,
    cursor: 0,
    orderBy,
    keyword,
  });
  const nextCursor: number | null = response.nextCursor;
  const posts: PostCardProps[] = response.data;

  return <AlbatalkList posts={posts} nextCursor={nextCursor} />;
};

export default AlbaTalkPage;
