"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthPageNavigation = () => {
  const pathname = usePathname();
  const isSignInPage = pathname.includes("/signin");
  const isApplicantPage =
    pathname === "/signin/applicant" || pathname === "/signup/applicant";
  const isOwnerPage =
    pathname === "/signin/owner" || pathname === "/signup/owner";

  return (
    <ul className="flex gap-[24px] text-gray-300 mobile:hidden">
      <li>
        <Link
          href={isSignInPage ? "/signin/owner" : "/signup/owner"}
          className={isOwnerPage ? "text-orange-300" : ""}
        >
          사장님 전용
        </Link>
      </li>
      <li>
        <Link
          href={isSignInPage ? "/signin/applicant" : "/signup/applicant"}
          className={isApplicantPage ? "text-orange-300" : ""}
        >
          지원자 전용
        </Link>
      </li>
    </ul>
  );
};

export default AuthPageNavigation;
