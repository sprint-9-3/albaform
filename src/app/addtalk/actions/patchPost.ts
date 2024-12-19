"use server";

import instance from "@/lib/instance";

interface data {
  title: string;
  content: string;
  imageUrl?: string;
}

const patchPost = async (talkId: number, data: data) => {
  const response = await instance(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${talkId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    return {
      status: response.status,
      error: response.error,
    };
  }

  return {
    status: response.status,
    data: response,
  };
};

export default patchPost;
