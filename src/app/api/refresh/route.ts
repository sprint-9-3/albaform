import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const cookieStore = await cookies();
  const refreshToken = await req.json();

  if (!refreshToken) {
    return new NextResponse("리프레시토큰을 확인해주세요.", { status: 400 });
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        body: JSON.stringify(refreshToken),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return new NextResponse(null, { status: response.status });
    }

    const { accessToken } = await response.json();

    cookieStore.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      sameSite: "lax",
    });

    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error("새 액세스토큰 발급에서 오류 발생", error);
    return new NextResponse(null, { status: 500 });
  }
};
