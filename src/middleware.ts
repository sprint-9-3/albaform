import { NextRequest, NextResponse } from "next/server";
import { createCookie } from "./lib/cookie";

export const middleware = async (request: NextRequest) => {
  const url = new URL(request.url);
  const path = url.pathname;
  const role = request.cookies.get("role");
  const referer = request.headers.get("referer");
  const ownerPath = [
    "/owner",
    "/addform",
    "/addform/",
    "/applications/",
    "/myalbaform",
  ];
  const applicantPath = ["/applicant", "/apply/", "/myapply/", "/mypage"];
  const accessToken = request.cookies.get("accessToken");

  // 액세스토큰 만료 시 리프레시토큰으로 액세스토큰 재발급 후 요청 재전송
  if (!accessToken) {
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const { accessToken } = await response.json();
      await createCookie({ name: "accessToken", value: accessToken });

      const originalRequest = new Headers(request.headers);
      originalRequest.set("Authorization", `Bearer ${accessToken}`);

      const newRequest = new Request(request.url, {
        method: request.method,
        headers: originalRequest,
        body: request.body,
      });

      return fetch(newRequest);
    }
  }

  // 사장님용 페이지
  if (role && role.value === "APPLICANT" && ownerPath.includes(path)) {
    // const prevUrl = referer || url.origin;
    // const errorUrl = new URL(prevUrl);
    // errorUrl.searchParams.set("error", "matchErrror");

    if (referer) {
      return NextResponse.redirect(referer);
    } else {
      return NextResponse.redirect(url.origin);
    }
  }

  // 지원자용 페이지
  if (role && role.value === "OWNER" && applicantPath.includes(path)) {
    // const prevUrl = referer || url.origin;
    // const errorUrl = new URL(prevUrl);
    // errorUrl.searchParams.set("error", "matchErrror");

    if (referer) {
      return NextResponse.redirect(referer);
    } else {
      return NextResponse.redirect(url.origin);
    }
  }

  // 비회원이 전용페이지 접근하는 것을 차단
  if (!role && !accessToken) {
    const isOwnerPath = ownerPath.some((path) => url.pathname.startsWith(path));
    const isApplicantPath = applicantPath.some((path) =>
      url.pathname.startsWith(path)
    );
    if (isOwnerPath || isApplicantPath) {
      return NextResponse.redirect(new URL("/signin/applicant", request.url));
    }
  }

  // 로그인되어 있으면 로그인페이지로 못가도록 막음
  if (path.startsWith("/signin")) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
};
