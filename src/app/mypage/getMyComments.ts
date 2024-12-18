"use server";

import instance from "@/lib/instance";

export interface getMyCommentsProps {
  page: number;
  pageSize: number | null;
}

export const getMyComments = async (query: getMyCommentsProps) => {
  const { page = 1, pageSize = 9 } = query;

  const queryString = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  const response = await instance(
    `${process.env.NEXT_PUBLIC_API_URL}/users/me/comments?${queryString}`
  );

  console.log("코멘트 패치 데이터 : ", response);

  if (response.status !== 200) {
    return {
      status: response.status,
      message: response.error,
    };
  }

  return {
    data: response.data,
    totalItemCount: response.totalItemCount,
    currentPage: response.currentPage,
    totalPages: response.totalPages,
  };
};
