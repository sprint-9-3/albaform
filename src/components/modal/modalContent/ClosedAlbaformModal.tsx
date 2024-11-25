import Image from "next/image";
import ModalContainer from "../modalContainer/ModalContainer";

const CloseAlbaformModal = () => {
  return (
    <ModalContainer>
      <div className="flex flex-col items-center">
        <Image
          src="/images/close-albaform.svg"
          width={120}
          height={120}
          alt="모집마감"
          className="animate-bounceIn h-[80px] w-[80px] pc:h-[120px] pc:w-[120px]"
        />
        <strong className="mt-[24px] text-2lg font-semibold text-black-400 pc:text-2xl">
          모집 마감
        </strong>
        <p className="mt-[8px] text-md font-regular text-gray-400 pc:text-xl">
          모집이 종료된 알바폼 입니다.
        </p>
        <button className="mt-[24px] h-[56px] w-[327px] border bg-gray-400 pc:h-[72px] pc:w-[360px]">
          홈으로 가기
        </button>
      </div>
    </ModalContainer>
  );
};

export default CloseAlbaformModal;
