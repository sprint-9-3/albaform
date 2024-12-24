"use client";

import ModalContainer from "../modalContainer/ModalContainer";
import SolidButton from "@/components/button/SolidButton";
import useViewPort from "@/hooks/useViewport";
import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { selectProgressAction } from "../modalActions/selectProgressAction";
import { useParams } from "next/navigation";

export type ProgressValue =
  | "REJECTED"
  | "INTERVIEW_PENDING"
  | "INTERVIEW_COMPLETED"
  | "HIRED";

const progressList: { name: string; value: ProgressValue }[] = [
  { name: "거절", value: "REJECTED" },
  { name: "면접 대기", value: "INTERVIEW_PENDING" },
  { name: "면접 완료", value: "INTERVIEW_COMPLETED" },
  { name: "채용 완료", value: "HIRED" },
];

const SelectProgressModal = () => {
  const { closeModal } = useModal();
  const { addToast } = useToast();
  const viewPort = useViewPort();
  const [selected, setSelected] = useState<ProgressValue>("INTERVIEW_PENDING");

  const { applicationId } = useParams() as { applicationId: string };

  const handleChange = (value: ProgressValue) => {
    setSelected(value);
  };

  const handleSubmit = async () => {
    try {
      const response = await selectProgressAction(
        { status: selected },
        Number(applicationId)
      );

      if (response.status) {
        addToast("지원상태 수정이 완료되었습니다.", "success");
        closeModal();
      } else {
        console.error(response.message, response.status);
        addToast(response.message as string, "warning");
      }
    } catch (error) {
      console.error("지원상태 수정 에러 발생", error);
      addToast("지원상태 수정 중 오류가 발생했습니다.", "warning");
    }
  };

  return (
    <ModalContainer>
      <div className="flex flex-col items-center pb-[8px] pt-[4px] pc:pb-[8px] pc:pt-[8px]">
        <h2 className="modal-title mt-0">진행상태 선택</h2>
        <p className="modal-sub-title">현재 진행상태를 알려주세요.</p>

        <ul className="mt-[24px] flex w-full flex-col gap-[10px] pc:mt-12">
          {progressList.map((progress) => (
            <li key={progress.name}>
              <label
                className={`bg-orang-100 flex items-center justify-between rounded-[8px] border border-line-100 p-[14px] text-md font-medium pc:text-2lg ${selected === progress.value ? "border-orange-300 bg-orange-300 text-gray-50" : ""}`}
              >
                {progress.name}
                <input
                  type="radio"
                  name="progress"
                  value={progress.value}
                  checked={selected === progress.value}
                  onChange={() => handleChange(progress.value)}
                  className="size-5 appearance-none rounded-full border-[5px] border-gray-50 ring-1 ring-gray-300 checked:bg-orange-300 checked:ring-orange-300"
                />
              </label>
            </li>
          ))}
        </ul>

        <div className="mt-[30px] flex gap-[11px] pc:gap-[8px]">
          <div className={buttmonContainerStyle}>
            <SolidButton
              size={viewPort === "pc" ? "large" : "small"}
              style="gray100"
              type="button"
              onClick={() => {
                closeModal();
              }}
            >
              취소
            </SolidButton>
          </div>
          <div className={buttmonContainerStyle}>
            <SolidButton
              size={viewPort === "pc" ? "large" : "small"}
              style="orange300"
              type="button"
              onClick={handleSubmit}
            >
              선택하기
            </SolidButton>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default SelectProgressModal;

const buttmonContainerStyle = "h-[58px] w-[158px] pc:h-[72px] pc:w-[176px]";
