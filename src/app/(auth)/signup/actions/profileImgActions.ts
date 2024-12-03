"use server";

import instance from "@/lib/instance";

export const profileImgActions = async (imgFormData: FormData) => {
  try {
    // 이미지 업로드
    const imageData = await instance(
      `${process.env.NEXT_PUBLIC_API_URL}/images/upload`,
      {
        method: "POST",
        body: imgFormData,
      }
    );

    if (imageData.status !== 201) {
      return {
        status: imageData.status,
        message: "이미지 업로드 실패",
      };
    }

    // 프로필 사진 업로드
    const profileResponse = await instance(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      {
        method: "PATCH",
        body: JSON.stringify({ imageUrl: imageData.data.url }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      status: profileResponse.status,
    };
  } catch (error) {
    console.error("프로필 이미지 업로드 실패:", error);
    return {
      status: 500,
      message:
        error instanceof Error
          ? error.message
          : "이미지 업로드 중 오류가 발생했습니다",
    };
  }
};
