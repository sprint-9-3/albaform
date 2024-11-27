import Image from "next/image";
import ModalContainer from "../modalContainer/ModalContainer";

const PatchAlbaformModal = () => {
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
        <strong className="modal-title">작성 중인 알바폼이 있어요!</strong>
        <p className="modal-sub-title">이어서 작성하시겠어요?</p>
        <button className="mt-[24px] h-[56px] w-[327px] border bg-gray-400 pc:h-[72px] pc:w-[360px]">
          이어쓰기
        </button>
      </div>
    </ModalContainer>
  );
};

export default PatchAlbaformModal;
