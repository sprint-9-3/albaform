"use client";

import Image from "next/image";
import ModalContainer from "../modalContainer/ModalContainer";
import SolidButton from "@/components/button/SolidButton";
import { useModal } from "@/hooks/useModal";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { deleteAlbaformAction } from "../modalActions/deleteAlbaformAction";
import useViewPort from "@/hooks/useViewport";

const DeleteAlbaformModal = () => {
  const { closeModal } = useModal();
  const { addToast } = useToast();
  const viewport = useViewPort();
  const router = useRouter();
  const params = useParams();
  const id = params.formId as string;

  const handleDeleteAlbaform = async () => {
    if (!id) return;
    try {
      const response = await deleteAlbaformAction(id);

      if (response.status !== 204) {
        return addToast(response.message as string, "warning");
      }

      addToast("알바폼을 성공적으로 삭제했습니다.", "success");
      closeModal();
      router.push("/albalist");
      return false;
    } catch (error) {
      console.error("알바폼 삭제 오류", error);
      addToast("서버 오류로 인해 알바폼 삭제에 실패했습니다.", "warning");
      return true;
    }
  };

  return (
    <ModalContainer>
      <div className="flex flex-col items-center pc:mx-10">
        <div className="modal-image-container">
          <Image
            src="/image/email-orange.svg"
            fill
            alt="모집마감"
            className="object-cover"
          />
        </div>
        <h2 className="modal-title">알바폼을 삭제할까요?</h2>
        <p className="modal-sub-title">삭제 후 정보를 복구할 수 없어요.</p>
        <div className="mt-6 h-[56px] w-[327px] pc:h-[72px] pc:w-[360px]">
          <SolidButton
            size={viewport === "pc" ? "2xl" : "xl"}
            style="orange300"
            type="button"
            onClick={handleDeleteAlbaform}
          >
            삭제하기
          </SolidButton>
        </div>
        <p
          onClick={() => closeModal()}
          className="mt-[16px] cursor-pointer text-lg font-regular text-orange-300 pc:mt-[20px] pc:text-xl"
        >
          다음에 할게요
        </p>
      </div>
    </ModalContainer>
  );
};

export default DeleteAlbaformModal;
