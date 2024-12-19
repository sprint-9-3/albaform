"use client";

import Image from "next/image";
import ModalContainer from "../modalContainer/ModalContainer";
import SolidButton from "@/components/button/SolidButton";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { useSetAtom } from "jotai";
import { continueApplyAtom } from "@/atoms/continueApply";

const ContinueApplyFormModal = () => {
  const { closeModal } = useModal();
  const { addToast } = useToast();
  const setContinueApply = useSetAtom(continueApplyAtom);

  const handleClickContinue = () => {
    setContinueApply(true);
    closeModal();
  };

  return (
    <ModalContainer>
      <div className="flex flex-col items-center pc:mx-10">
        <div className="modal-image-container">
          <Image
            src="/image/document-edit-orange.svg"
            fill
            alt="작성 중"
            className="object-cover"
          />
        </div>
        <h2 className="modal-title">작성 중인 지원하기폼이 있어요!</h2>
        <p className="modal-sub-title">이어서 작성하시겠어요?</p>
        <div className="mt-6 flex w-[327px] flex-col gap-2 pc:w-[360px]">
          <SolidButton
            style="orange300"
            type="button"
            onClick={handleClickContinue}
          >
            이어쓰기
          </SolidButton>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ContinueApplyFormModal;
