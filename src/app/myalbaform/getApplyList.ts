"use server";

import instance from "@/lib/instance";

export const getApplyList = async ({
  limit,
  cursor,
  status,
  keyword,
}: {
  limit: number;
  cursor: number;
  status: string | undefined;
  keyword: string;
}) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/users/me/applications`
  );

  url.searchParams.append("limit", String(limit));
  url.searchParams.append("cursor", String(cursor));
  status !== undefined && url.searchParams.append("status", status);
  url.searchParams.append("keyword", keyword || "");

  try {
    const response = await instance(url.toString(), {
      next: { revalidate: 300, tags: ["myalbaform"] },
    });

    if (response.status !== 200) {
      return {
        status: response.status,
        message: "내 지원 내역 목록 데이터 가져오기 실패",
      };
    }

    return {
      data: await response.data,
      nextCursor: await response.nextCursor,
    };
  } catch (error) {
    console.error("내 지원 내역 목록을 조회하는데 실패했습니다:", error);
    return { data: [], nextCursor: null };
  }
};
