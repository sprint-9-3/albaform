"use server";

import instance from "@/lib/instance";

interface data {
  title: string;
  content: string;
  imageUrl?: string;
}

const addTalk = async (data: data) => {
  const response = await instance(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 201) {
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

export default addTalk;
