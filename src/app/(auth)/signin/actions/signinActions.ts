"use server";

import { signInSchema } from "@/schema/signin/signinSchema";

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

  if (!response.ok) {
    return {
      status: response.status,
      error:
        response.status === 401
          ? "이메일 또는 비밀번호를 확인해주세요."
          : response.statusText,
    };
  }

  return {
    status: response.status,
    data: await response.json(),
  };
};
