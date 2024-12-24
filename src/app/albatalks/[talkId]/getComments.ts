"use server";

import instance from "@/lib/instance";

const getComments = async (id: number, page: number, pageSize: number) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/comments`
  );

  url.searchParams.append("page", page.toString());
  url.searchParams.append("pageSize", pageSize.toString());

  try {
    const response = await instance(url.toString(), {
      cache: "no-store",
    });

    if (response.status !== 200) {
      return {
        status: response.status,
        message: response.error,
      };
    }

    return {
      data: response.data, // 댓글 리스트
      totalItemCount: response.totalItemCount, // 전체 댓글 수
      currentPage: response.currentPage, // 현재 페이지
      totalPages: response.totalPages, // 전체 페이지 수
    };
  } catch (error) {
    console.error("댓글 목록을 조회하는데 실패했습니다.", error);
    return {
      data: [],
      totalItemCount: 0,
      currentPage: 0,
      totalPages: 0,
    };
  }
};

export default getComments;
