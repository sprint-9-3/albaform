"use client";

import { useModal } from "@/hooks/useModal";
import Image from "next/image";

const ShareButton = () => {
  const { openModal } = useModal();

  return (
    <button
      className="flex size-[54px] items-center justify-center rounded-full bg-orange-300 shadow-md pc:size-[64px]"
      onClick={() => openModal("ShareSNSModal")}
    >
      <Image src="/icon/link.svg" width={24} height={24} alt="공유하기 버튼" />
    </button>
  );
};

export default ShareButton;
