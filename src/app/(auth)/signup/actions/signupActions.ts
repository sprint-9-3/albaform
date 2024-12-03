"use server";

import {
  applicantSchema,
  ownerSchema,
} from "../../../../schema/signup/signupSchema";
import { setCookie } from "../../../../lib/cookie";

export const signupActions = async (formData: FormData) => {
  const data = {
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
    nickname: formData.get("nickname")?.toString(),
    role: formData.get("role")?.toString(),
    phoneNumber: formData.get("phoneNumber"),
    name: formData.get("name")?.toString() || "",
    storeName: formData.get("storeName")?.toString() || "",
    storePhoneNumber: formData.get("storePhoneNumber") || "",
    location: formData.get("location")?.toString() || "",
  };

  const result =
    data.role === "APPLICANT"
      ? applicantSchema.safeParse(data)
      : ownerSchema.safeParse(data);

  if (!result.success) {
    return {
      status: false,
      message: result.error.flatten(),
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseErrorText = {
      400: "이미 존재하는 이메일입니다.",
      500: "서버 오류가 발생했습니다.",
    };

    if (!response.ok) {
      console.error("회원가입 요청 실패", response.statusText, response.status);
      return {
        status: response.status,
        message:
          responseErrorText[
            response.status as keyof typeof responseErrorText
          ] || response.statusText,
      };
    }

    const resData = await response.json();
    const { accessToken, refreshToken, ...rest } = resData;

    await setCookie(accessToken, refreshToken, rest.user.role);

    return {
      status: response.status,
    };
  } catch (error) {
    console.error("signupActions에서 에러 발생", error);
    return {
      status: 500,
      message: "회원가입 중 오류가 발생했습니다.",
    };
  }
};
