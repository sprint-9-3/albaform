"use client";

import { useModal } from "@/atoms/modalAtom";

const ModalPage = () => {
  const { openModal } = useModal();

  return (
    <div className="mt-[50px] flex flex-col gap-[60px] pl-[30px]">
      <div>
        <button onClick={() => openModal("ClosedAlbaformModal")}>
          모집 마감 모달
        </button>
      </div>
      <div>
        <button onClick={() => openModal("DeleteAlbaformModal")}>
          알바폼 삭제 모달
        </button>
      </div>
      <div>
        <button onClick={() => openModal("PatchAlbaformModal")}>
          이어쓰기 모달
        </button>
      </div>
    </div>
  );
};

export default ModalPage;
