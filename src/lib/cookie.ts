"use server";

import { cookies } from "next/headers";

// 쿠키 설정
export const setCookie = async (
  accessToken: string,
  refreshToken: string,
  role: string
) => {
  const tokenArr = [
    {
      name: "accessToken",
      value: accessToken,
      maxAge: 3600,
    },
    {
      name: "refreshToken",
      value: refreshToken,
      maxAge: 86400,
    },
    {
      name: "role",
      value: role,
    },
  ];

  await Promise.all(tokenArr.map((token) => createCookie(token)));
};

// 쿠키 생성
interface CookieData {
  name: string;
  value: string;
  maxAge?: number;
}

export const createCookie = async (data: CookieData) => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: data.name,
    value: data.value,
    secure: true,
    httpOnly: true,
    maxAge: data.maxAge,
  });
};

// 쿠키 삭제 (로그아웃 시 호출하세요)
export const deleteCookie = async (isLogout: boolean) => {
  const cookieStore = await cookies();

  if (isLogout) {
    const cookieArr = ["accessToken", "refreshToken", "role"];
    await Promise.all(cookieArr.map((cookie) => cookieStore.delete(cookie)));
  }
};
