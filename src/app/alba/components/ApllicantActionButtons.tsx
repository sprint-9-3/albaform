"use client";

import isPast from "@/utils/isPast";
import SolidButton from "@/components/button/SolidButton";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";

type ApllicantActionButtonsProps = {
  formId: string;
  recruitmentEndDate: string;
  isLogin?: boolean;
};

const ApllicantActionButtons = ({
  formId,
  recruitmentEndDate,
  isLogin = false,
}: ApllicantActionButtonsProps) => {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const { openModal } = useModal();
  const { addToast } = useToast();

  useEffect(() => {
    if (isPast(recruitmentEndDate)) setDisabled(true);
  }, [recruitmentEndDate]);

  const handleNavigate = () => {
    if (!isLogin) addToast("로그인이 필요한 서비스입니다.", "warning");
    else router.push(`/myapply/${formId}`);
  };

  return (
    <>
      <SolidButton
        icon={disabled ? "" : "/icon/write-fill-md.svg"}
        style={disabled ? "gray100" : "orange300"}
        disabled={disabled}
        onClick={handleNavigate}
      >
        {disabled ? "모집 완료" : "지원하기"}
      </SolidButton>
      <SolidButton
        icon="/icon/document-md.svg"
        style="outOrange300"
        onClick={
          isLogin
            ? () => router.push(`/myapply/${formId}`)
            : () => openModal("GetMyApplicationModal")
        }
      >
        내 지원 내역 보기
      </SolidButton>
    </>
  );
};

export default ApllicantActionButtons;
