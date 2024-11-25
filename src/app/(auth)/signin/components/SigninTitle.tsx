import { cls } from "@/utils/DynamicTailwind";
import Link from "next/link";

const SigninTitle = ({ userType }: { userType: string }) => {
  const userTypeText = userType === "applicant" ? "사장님" : "지원자";
  const linkArr = [
    {
      type: "owner",
      title: "사장님 전용",
      href: "/signin/owner",
      signupHref: "/signup/owner",
    },
    {
      type: "applicant",
      title: "지원자 전용",
      href: "/signin/applicant",
      signupHref: "/signup/applicant",
    },
  ];

  return (
    <div className="flex flex-col space-y-10">
      <nav className="flex items-center justify-center space-x-4 pc:hidden">
        {linkArr.map((link) => (
          <Link
            key={link.type}
            href={link.href}
            className={cls(
              "text-lg font-bold leading-[26px] text-gray-300",
              link.type === userType ? "text-orange-300" : ""
            )}
          >
            {link.title}
          </Link>
        ))}
      </nav>
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-semibold text-black-500 pc:text-3xl">
          로그인
        </h1>
        <div className="flex flex-col items-center space-y-[2px]">
          <p className="text-xs text-black-100 pc:text-xl">
            아직 계정이 없으신가요?
            <Link
              href={
                userType === "applicant" ? "/signup/applicant" : "/signup/owner"
              }
              className="ml-2 font-semibold text-black-400 underline"
            >
              회원가입 하기
            </Link>
          </p>
          <span className="text-xs text-black-100 pc:text-xl">
            {userTypeText} 로그인은 {userTypeText} 전용 페이지에서 할 수
            있습니다.
          </span>
        </div>
      </div>
    </div>
  );
};

export default SigninTitle;
