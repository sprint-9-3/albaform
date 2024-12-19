"use client";

import {
  addFromSubmitTriggerAtom,
  temporaryDataByStepAtom,
} from "@/atoms/addFormAtomStore";
import SolidButton from "@/components/button/SolidButton";
import { useAddForm } from "@/hooks/useAddForm";
import { useValidateForm } from "@/hooks/useAddForm";
import { useToast } from "@/hooks/useToast";
import { useAtomValue, useSetAtom } from "jotai";
import { useParams } from "next/navigation";

const MainButton = () => {
  const temporaryDataByStep = useAtomValue(temporaryDataByStepAtom);
  const { methods } = useAddForm();
  const { submitDisabled, addFormIsSubmitting } = useValidateForm(methods);
  const setAddFormSubmitTrigger = useSetAtom(addFromSubmitTriggerAtom);
  const params = useParams();
  const { addToast } = useToast();

  const temporaryDataArr = [
    { step: "stepOne", data: temporaryDataByStep.stepOne },
    { step: "stepTwo", data: temporaryDataByStep.stepTwo },
    { step: "stepThree", data: temporaryDataByStep.stepThree },
  ];

  // 임시 저장 기능 (현재는 단계별로 임시저장이 실행되어야 로컬스토리지에 저장됩니다.)
  const handleTemporarySave = () => {
    temporaryDataArr.forEach((item) => {
      if (item.data && Object.keys(item.data).length > 0) {
        localStorage.setItem(item.step, JSON.stringify(item.data));
      }
    });
    addToast("입력한 내용이 임시 저장되었습니다.", "success");
  };

  return (
    <div className="flex flex-col space-y-2 p-6">
      {!params.id ? (
        <>
          <SolidButton style="outOrange300" onClick={handleTemporarySave}>
            임시 저장
          </SolidButton>
          <SolidButton
            type="submit"
            style="orange300"
            onClick={() => setAddFormSubmitTrigger(true)}
            disabled={submitDisabled || addFormIsSubmitting}
          >
            {addFormIsSubmitting ? "등록중..." : "등록하기"}
          </SolidButton>
        </>
      ) : (
        <SolidButton
          type="submit"
          style="orange300"
          onClick={() => setAddFormSubmitTrigger(true)}
          disabled={submitDisabled || addFormIsSubmitting}
        >
          {addFormIsSubmitting ? "수정중..." : "수정하기"}
        </SolidButton>
      )}
    </div>
  );
};

export default MainButton;
