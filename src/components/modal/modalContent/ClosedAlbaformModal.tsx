import Image from "next/image";
import ModalContainer from "../modalContainer/ModalContainer";

const CloseAlbaformModal = () => {
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
        <strong className="modal-title">모집 마감</strong>
        <p className="modal-sub-title">모집이 종료된 알바폼 입니다.</p>
        <button className="mt-[24px] h-[56px] w-[327px] border bg-gray-400 pc:h-[72px] pc:w-[360px]">
          홈으로 가기
        </button>
      </div>
    </ModalContainer>
  );
};

export default CloseAlbaformModal;
