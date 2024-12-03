"use server";

export interface getArticlesProps {
  limit: number;
  cursor?: number | null;
  orderBy?: string;
  keyword?: string;
}

export const getArticles = async (query: getArticlesProps) => {
  const { limit = 6, cursor = 0, orderBy = "mostRecent", keyword = "" } = query;

  const queryString = new URLSearchParams({
    limit: String(limit),
    cursor: String(cursor),
    orderBy,
    ...(keyword && { keyword }),
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts?${queryString}`
    );

    if (!response.ok) throw new Error("게시글 데이터 요청에 실패했습니다.");

    const result = await response.json();

    return result;
  } catch (err) {
    console.error("게시글 목록을 조회하는데 실패했습니다.", err);
    return { data: [], nextCursor: null };
  }
};
