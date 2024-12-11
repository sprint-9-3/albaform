"use client";

import CancelButton from "@/components/button/CancelButton";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const ApplyFormContainer = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <div className="relative mt-6 pc:mt-[80px]">
      <h2 className="text-xl font-semibold text-black-500 pc:text-3xl">
        알바폼 지원하기
      </h2>
      {children}
      <div className="absolute right-0 top-[-4px] h-10 w-[80px] pc:top-[-6px] pc:h-[56px] pc:w-[122px]">
        <CancelButton onClick={() => router.back()}>작성 취소</CancelButton>
      </div>
    </div>
  );
};

export default ApplyFormContainer;
