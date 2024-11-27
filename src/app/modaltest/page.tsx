"use client";

//삭제 될 파일 입니다. (모달 실험용)
import { useModal } from "@/hooks/useModal";

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
      <div>
        <button onClick={() => openModal("GetMyApplicationModal")}>
          내 지원 내역 모달
        </button>
      </div>
      <div>
        <button onClick={() => openModal("SelectProgressModal")}>
          진행상태 선택
        </button>
      </div>
      <div>
        <button onClick={() => openModal("ChangePasswordModal")}>
          비밀번호 변경
        </button>
      </div>
      <div>
        <button onClick={() => openModal("ChangeMyInfoModal")}>
          내 정보 수정
        </button>
      </div>
    </div>
  );
};

export default ModalPage;
