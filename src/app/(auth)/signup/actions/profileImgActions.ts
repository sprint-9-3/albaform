"use server";

export const profileImgActions = async (
  imgFormData: FormData,
  accessToken: string
) => {
  try {
    // 이미지 업로드
    const imageData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/images/upload`,
      {
        method: "POST",
        body: imgFormData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!imageData.ok) {
      return {
        status: imageData.status,
        message: "이미지 업로드 실패",
      };
    }

    const data = await imageData.json();

    // 프로필 사진 업로드
    const profileResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      {
        method: "PATCH",
        body: JSON.stringify({ imageUrl: data.url }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return {
      status: profileResponse.status,
      data: await profileResponse.json(),
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
