"use client";

import Image from "next/image";

type ResumeInputProps = {
  title: string;
};

const ResumInput = ({ title }: ResumeInputProps) => {
  return (
    <div className="flex h-[52px] w-full items-center justify-between rounded-lg bg-background-200 p-4">
      <span>{title}.pdf </span>
      <button>
        <Image
          src="/icon/edit-black.svg"
          width={32}
          height={32}
          alt="이력서 수정 버튼"
        />
      </button>
    </div>
  );
};

export default ResumInput;
