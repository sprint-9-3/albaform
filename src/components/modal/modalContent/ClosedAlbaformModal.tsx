"use client";

import Image from "next/image";
import ModalContainer from "../modalContainer/ModalContainer";
import SolidButton from "@/components/button/SolidButton";
import useViewPort from "@/hooks/useViewport";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";

const CloseAlbaformModal = () => {
  const router = useRouter();
  const { closeModal } = useModal();
  const viewPort = useViewPort();

  return (
    <ModalContainer>
      <div className="flex flex-col items-center pc:mx-10">
        <div className="modal-image-container">
          <Image
            src="/image/search-document-orange.svg"
            fill
            alt="모집마감"
            className="object-cover"
          />
        </div>
        <h2 className="modal-title">모집 마감</h2>
        <p className="modal-sub-title">모집이 종료된 알바폼 입니다.</p>
        <div className="mt-6 h-[56px] w-[327px] pc:h-[72px] pc:w-[360px]">
          <SolidButton
            size={viewPort === "pc" ? "large" : "small"}
            style="orange300"
            type="button"
            onClick={() => {
              closeModal();
              router.back();
            }}
          >
            뒤로 가기
          </SolidButton>
        </div>
      </div>
    </ModalContainer>
  );
};

export default CloseAlbaformModal;
