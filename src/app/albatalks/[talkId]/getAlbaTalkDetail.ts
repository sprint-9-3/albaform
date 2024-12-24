"use server";

import instance from "@/lib/instance";

const getAlbaTalkDetail = async (talkId: string) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/posts/${talkId}`);

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

    return { data: response, status: 200 };
  } catch (error) {
    console.error("알바 토크 상세를 조회하는데 실패했습니다:", error);
    return null;
  }
};

export default getAlbaTalkDetail;
