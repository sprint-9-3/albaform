"use server";

import instance from "@/lib/instance";

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await instance(
    `${process.env.NEXT_PUBLIC_API_URL}/images/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (response.status !== 201) {
    return {
      status: response.status,
      error: response.error,
    };
  }

  return { status: response.status, data: response.url };
};

export default uploadImage;
