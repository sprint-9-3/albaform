"use client";

import { useModal } from "@/atoms/modalAtom";
import Image from "next/image";
import { ReactNode, useEffect, useRef } from "react";

const ModalContainer = ({ children }: { children: ReactNode }) => {
  const { closeModal } = useModal();
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className="fixed inset-0 z-10 flex items-end justify-center bg-black/50 pc:items-center tablet:items-center">
      <div
        ref={modalRef}
        className="relative rounded-[24px] rounded-b-none bg-gray-50 px-[24px] pb-[16px] pt-[24px] pc:rounded-[24px] pc:px-[80px] pc:pb-[24px] pc:pt-[32px] tablet:rounded-[24px]"
      >
        {children}
        <button
          onClick={() => closeModal()}
          className="absolute right-[16px] top-[16px] pc:right-[24px] pc:top-[24px]"
        >
          <Image
            src="/icons/X.svg"
            width={36}
            height={36}
            alt="닫기"
            className="h-auto w-[24px] pc:w-[36px]"
          />
        </button>
      </div>
    </div>
  );
};

export default ModalContainer;
