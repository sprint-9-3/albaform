import Image from "next/image";
import ModalContainer from "../modalContainer/ModalContainer";

const PatchAlbaformModal = () => {
  return (
    <ModalContainer>
      <div className="flex flex-col items-center">
        <Image
          src="/images/patch-albaform.svg"
          width={120}
          height={120}
          alt="작성 중"
          className="animate-bounceIn h-[80px]] w-[80px] pc:h-[120px] pc:w-[120px]"
        />
        <strong className="mt-[24px] text-2lg font-semibold text-black-400 pc:text-2xl">
          작성 중인 알바폼이 있어요!
        </strong>
        <p className="mt-[8px] text-md font-regular text-gray-400 pc:text-xl">
          이어서 작성하시겠어요?
        </p>
        <button className="mt-[24px] h-[56px] w-[327px] border bg-gray-400 pc:h-[72px] pc:w-[360px]">
          이어쓰기
        </button>
      </div>
    </ModalContainer>
  );
};

export default PatchAlbaformModal;
