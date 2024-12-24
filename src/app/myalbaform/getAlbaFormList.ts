"use server";

import instance from "@/lib/instance";

interface SearchParamsData {
  orderBy?: string;
  limit: number;
  cursor?: number | null;
  keyword?: string;
  isPublic?: boolean | undefined;
  isRecruiting?: boolean | undefined;
}

export const getAlbaFormList = async ({
  orderBy,
  limit,
  cursor,
  keyword,
  isPublic,
  isRecruiting,
}: SearchParamsData) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/users/me/forms`);

  url.searchParams.append("orderBy", orderBy || "mostRecent");
  url.searchParams.append("limit", String(limit));
  url.searchParams.append("cursor", String(cursor));
  url.searchParams.append("keyword", keyword || "");
  isPublic !== undefined &&
    url.searchParams.append("isPublic", String(isPublic));
  isRecruiting !== undefined &&
    url.searchParams.append("isRecruiting", String(isRecruiting));

  try {
    const response = await instance(url.toString(), {
      next: { revalidate: 300, tags: ["myalbaform"] },
    });

    if (response.status !== 200) {
      return {
        status: response.status,
        message: "내 알바폼 목록 데이터 가져오기 실패",
      };
    }

    const result = await response;

    return {
      data: result.data,
      nextCursor: result.nextCursor,
    };
  } catch (error) {
    console.error("내 알바폼 목록을 조회하는데 실패했습니다:", error);
    return { data: [], nextCursor: null };
  }
};
