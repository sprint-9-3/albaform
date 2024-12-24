"use client";

import Image from "next/image";
import { useState } from "react";

const NoticeProgressToolTip = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    isOpen && (
      <div className="relative flex h-[40px] w-[287px] items-center rounded-lg bg-blue-300 px-3 py-2 text-white">
        {/* 위에 튀어나온 삼각형 */}
        <div className="absolute -top-2 left-4 h-0 w-0 border-b-[8px] border-l-[8px] border-r-[8px] border-blue-300 border-l-transparent border-r-transparent" />
        <Image src={"/icon/info-md.svg"} width={16} height={16} alt="info" />
        <span className="ml-2 text-xs">
          알바폼 현재 진행상태를 변경할 수 있어요!
        </span>
        <button className="ml-auto" onClick={() => setIsOpen(false)}>
          <Image
            src={"/icon/close-md.svg"}
            width={16}
            height={16}
            alt="close"
          />
        </button>
      </div>
    )
  );
};

export default NoticeProgressToolTip;
