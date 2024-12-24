import Link from "next/link";

const LoginButton = () => {
  return (
    <Link href="/signin/applicant">
      <div className="flex h-[52px] w-[120px] items-center justify-center rounded-lg text-2lg text-orange-300 hover:opacity-90 pc:bg-orange-300 pc:text-white">
        <button>로그인</button>
      </div>
    </Link>
  );
};

export default LoginButton;
