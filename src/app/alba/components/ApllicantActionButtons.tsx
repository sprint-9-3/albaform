"use client";

import isPast from "@/utils/isPast";
import SolidButton from "@/components/button/SolidButton";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ApllicantActionButtonsProps = {
  formId: string;
  recruitmentEndDate: string;
};

const ApllicantActionButtons = ({
  formId,
  recruitmentEndDate,
}: ApllicantActionButtonsProps) => {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const { openModal } = useModal();
  const isLogin = localStorage.getItem("isLogin");

  useEffect(() => {
    if (isPast(recruitmentEndDate)) setDisabled(true);
  }, [recruitmentEndDate]);

  return (
    <>
      <SolidButton
        icon={disabled ? "" : "/icon/write-fill-md.svg"}
        size="2xl"
        style={disabled ? "gray100" : "orange300"}
        disabled={disabled}
        onClick={() => router.push(`/apply/${formId}`)}
      >
        {disabled ? "모집 완료" : "지원하기"}
      </SolidButton>
      <SolidButton
        icon="/icon/document-md.svg"
        size="2xl"
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
