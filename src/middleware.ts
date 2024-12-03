import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const url = new URL(request.url);
  const path = url.pathname;
  const role = request.cookies.get("role");
  const referrer = request.headers.get("referrer");

  if (role && role.value === "APPLICANT" && path.startsWith("/owner")) {
    // 사장님용 페이지라고 알려주는 모달 오픈 또는 경고 후 이전페이지로 리다이렉트
    return NextResponse.redirect(new URL(referrer || "/", request.url));
  }

  if (role && role.value === "OWNER" && path.startsWith("/applicant")) {
    // 사장님용 페이지라고 알려주는 모달 오픈 또는 경고 후 이전페이지로 리다이렉트
    return NextResponse.redirect(new URL(referrer || "/", request.url));
  }

  // 로그인되어 있으면 로그인페이지로 못가도록 막음
  if (path.startsWith("/signin")) {
    const accessToken = request.cookies.get("accessToken");

    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
};
