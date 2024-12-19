"use server";

import { cookies } from "next/headers";

// 쿠키 설정
export const setCookie = async (
  accessToken: string,
  refreshToken: string,
  role: string,
  id: string
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
    {
      name: "id",
      value: id,
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
    const cookieArr = ["accessToken", "refreshToken", "role", "id"];
    await Promise.all(cookieArr.map((cookie) => cookieStore.delete(cookie)));
    // 로컬 스토리지에 isLogin도 삭제되어야 함. 근데 서버에서 실행되는 함수라 안됨 -> 12.19 정준영
  }
};
