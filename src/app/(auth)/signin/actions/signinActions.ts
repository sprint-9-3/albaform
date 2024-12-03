"use server";

import { signInSchema } from "@/schema/signin/signinSchema";
import { setCookie } from "../../../../lib/cookie";

export const signinAction = async (formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (!data.email || !data.password) {
    return {
      error: "이메일 또는 비밀번호를 입력해주세요.",
    };
  }

  const parsedData = signInSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      error: parsedData.error.flatten(),
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseErrorText = {
    401: "이메일 또는 비밀번호를 확인해주세요.",
    404: "존재하지 않는 사용자입니다.",
    500: "서버 오류가 발생했습니다.",
  };

  if (!response.ok) {
    console.error("로그인 요청 실패", response.statusText, response.status);
    return {
      status: response.status,
      error:
        responseErrorText[response.status as keyof typeof responseErrorText] ||
        response.statusText,
    };
  }

  const { accessToken, refreshToken, ...rest } = await response.json();

  await setCookie(accessToken, refreshToken, rest.user.role);

  return {
    status: response.status,
  };
};
