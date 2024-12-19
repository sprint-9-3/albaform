"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-white">
      <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-5">
        <div className="flex items-center space-x-3">
          <Image
            src="/logo/main-logo.svg"
            alt="404 아이콘"
            width={60}
            height={60}
          />
          <div className="flex flex-col space-y-1">
            <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다.</h1>
            <p className="text-base">경로를 다시 한번 확인해주세요!</p>
          </div>
        </div>
        <button
          onClick={() => router.push("/")}
          className="rounded-md bg-orange-300 px-5 py-2 text-center text-2lg text-white transition-colors hover:bg-orange-500"
        >
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default NotFound;
