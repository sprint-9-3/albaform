import Image from "next/image";
import ModalContainer from "../modalContainer/ModalContainer";

const DeleteAlbaformModal = () => {
  return (
    <ModalContainer>
      <div className="flex flex-col items-center">
        <Image
          src="/images/close-albaform.svg"
          width={120}
          height={120}
          alt="모집마감"
          className="animate-bounceIn h-[80px]] w-[80px] pc:h-[120px] pc:w-[120px]"
        />
        <strong className="mt-[24px] text-2lg font-semibold text-black-400 pc:text-2xl">
          알바폼을 삭제할까요?
        </strong>
        <p className="mt-[8px] text-md font-regular text-gray-400 pc:text-xl">
          삭제 후 정보를 복구할 수 없어요.
        </p>
        <button className="mt-[24px] h-[56px] w-[327px] border bg-gray-400 pc:h-[72px] pc:w-[360px]">
          시작하기
        </button>
        <p className="mt-[16px] cursor-pointer text-lg font-regular text-orange-300 pc:mt-[20px] pc:text-xl">
          다음에 할게요
        </p>
      </div>
    </ModalContainer>
  );
};

export default DeleteAlbaformModal;
