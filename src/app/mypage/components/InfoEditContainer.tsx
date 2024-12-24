"use client";

import SolidButton from "@/components/button/SolidButton";
import MyInfoEditDropdown from "@/components/dropdown/MyInfoEditDropdown";
import { useModal } from "@/hooks/useModal";

const MyInfoEditContainer = () => {
  const { openModal } = useModal();

  return (
    <div>
      <div className="hidden pc:flex pc:gap-4">
        <div className="w-[180px]">
          <SolidButton
            size="xl"
            style="orange300"
            onClick={() => openModal("ChangeMyInfoModal")}
          >
            내 정보 수정
          </SolidButton>
        </div>
        <div className="w-[180px]">
          <SolidButton
            size="xl"
            style="outOrange300"
            onClick={() => openModal("ChangePasswordModal")}
          >
            비밀번호 변경
          </SolidButton>
        </div>
      </div>
      <div className="pc:hidden">
        <MyInfoEditDropdown
          onMyInfoEdit={() => openModal("ChangeMyInfoModal")}
          onPasswordEdit={() => openModal("ChangePasswordModal")}
        />
      </div>
    </div>
  );
};

export default MyInfoEditContainer;
