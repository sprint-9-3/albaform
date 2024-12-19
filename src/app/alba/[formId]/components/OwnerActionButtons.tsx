"use client";

import SolidButton from "@/components/button/SolidButton";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";

const OwnerActionButtons = ({ formId }: { formId: string }) => {
  const router = useRouter();
  const { openModal } = useModal();

  return (
    <>
      <SolidButton
        icon="/icon/document-md.svg"
        style="orange300"
        onClick={() => openModal("ApplicantListModal")}
      >
        지원 현황 조회
      </SolidButton>
      <SolidButton
        icon="/icon/write-lg.svg"
        style="orange300"
        onClick={() => router.push(`/addform/${formId}`)}
      >
        수정하기
      </SolidButton>
      <SolidButton
        icon="/icon/trash-md.svg"
        style="gray100"
        onClick={() => openModal("DeleteAlbaformModal")}
      >
        삭제하기
      </SolidButton>
    </>
  );
};

export default OwnerActionButtons;
