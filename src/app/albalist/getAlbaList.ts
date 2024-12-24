"use server";

interface SearchParamsData {
  orderBy?: string;
  limit: number;
  cursor?: number | null;
  keyword?: string;
  isRecruiting?: boolean | undefined;
}

export const getAlbaList = async ({
  orderBy,
  limit,
  cursor,
  keyword,
  isRecruiting,
}: SearchParamsData) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/forms`);

  url.searchParams.append("orderBy", orderBy || "mostRecent");
  url.searchParams.append("limit", String(limit));
  url.searchParams.append("cursor", String(cursor));
  url.searchParams.append("keyword", keyword || "");
  isRecruiting !== undefined &&
    url.searchParams.append("isRecruiting", String(isRecruiting));

  try {
    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        status: response.status,
        message: "알바폼 목록 데이터 가져오기 실패",
      };
    }

    const result = await response.json();

    return {
      data: result.data,
      nextCursor: result.nextCursor,
    };
  } catch (error) {
    console.error("알바폼 목록을 조회하는데 실패했습니다.", error);
    return { data: [], nextCursor: null };
  }
};
