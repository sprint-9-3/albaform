"use server";

import instance from "@/lib/instance";

const postComment = async ({
  id,
  formData,
}: {
  id: number;
  formData: { content: string };
}) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/comments`
  );

  const response = await instance(url.toString(), {
    method: "POST",
    body: JSON.stringify(formData),
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

export default postComment;
