"use client";

import { addFormSchema } from "@/schema/addForm/addFormSchema";
import { z } from "zod";
import { FormProvider } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useCallback } from "react";
import {
  currentImageListAtom,
  addFromSubmitTriggerAtom,
} from "@/atoms/addFormAtomStore";
import { useAtom, useAtomValue } from "jotai";
import { handleDateRangeFormat } from "@/utils/formatAddFormDate";
import { addFormImgUpload } from "../actions/addFormImgUpload";
import { useToast } from "@/hooks/useToast";
import { addFormSubmit } from "../actions/addFormSubmit";
import {
  useAddForm,
  useAddFormInit,
  useValidateForm,
} from "@/hooks/useAddForm";
import StepContent from "./StepContent";
import { newWriteAtom } from "@/atoms/newWrite";

interface StepContainerProps {
  albaForm?:
    | z.infer<typeof addFormSchema>
    | {
        status: number;
        message: string;
      };
  formId?: string;
}

const StepContainer = ({ albaForm, formId }: StepContainerProps) => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "stepOne";
  const [currentImageList, setCurrentImageList] = useAtom(currentImageListAtom);
  const [submitTrigger, setSubmitTrigger] = useAtom(addFromSubmitTriggerAtom);
  const { addToast } = useToast();
  const [isNewWrite, setIsNewWrite] = useAtom(newWriteAtom);
  const { methods, loadAllTempData, resetAllTempData } = useAddForm();
  const router = useRouter();
  const isEdit = albaForm && !("status" in albaForm);
  const { initializeAddForm } = useAddFormInit({ albaForm });

  // 수정하기 마운트 시 초기화
  useEffect(() => {
    if (isEdit) {
      initializeAddForm(methods, setCurrentImageList);
    }
  }, [isEdit, initializeAddForm, methods, setCurrentImageList]);

  // 마운트 시 전체 임시저장 데이터 가져오기
  useEffect(() => {
    loadAllTempData();
  }, [loadAllTempData]);

  // 새로 쓰기 버튼 클릭 시 전체 임시저장 데이터 초기화
  useEffect(() => {
    if (isNewWrite) {
      resetAllTempData();
      setCurrentImageList([]);
    }
    setIsNewWrite(false);
  }, [isNewWrite, resetAllTempData, setCurrentImageList, setIsNewWrite]);

  useValidateForm(methods);

  const onSubmit = useCallback(
    async (data: z.infer<typeof addFormSchema>) => {
      try {
        const imgFormData = new FormData();

        const newImageList = currentImageList.filter(
          (img) => img.name !== "serverImage"
        );

        let uploadUrls: string[] = [];

        if (albaForm && !("status" in albaForm)) {
          const existingUrls = albaForm.imageUrls || [];
          uploadUrls = [...existingUrls];
        }

        if (newImageList.length > 0) {
          newImageList.forEach((img) => {
            imgFormData.append("image", img);
          });
        }

        const imgResponse = await addFormImgUpload(imgFormData);

        if (imgResponse.status !== 201) {
          addToast(imgResponse.message as string, "warning");
          return;
        }

        if (imgResponse.data) {
          uploadUrls = [...uploadUrls, ...imgResponse.data];
        }

        const dateFields = [
          "workStartDate",
          "workEndDate",
          "recruitmentStartDate",
          "recruitmentEndDate",
        ] as const;

        dateFields.forEach((field) => {
          methods.setValue(field, handleDateRangeFormat(data[field]));
        });

        methods.setValue("imageUrls", uploadUrls);

        const updatedData = methods.getValues();

        const formData = new FormData();
        formData.append("imageUrls", JSON.stringify(uploadUrls));
        formData.append("workDays", JSON.stringify(updatedData.workDays));

        Object.entries(updatedData).forEach(([key, value]) => {
          if (key !== "imageUrls" && key !== "workDays") {
            formData.append(key, value as string);
          }
        });

        const response = await addFormSubmit(formData, isEdit, formId);

        if (response.status === false) {
          addToast("입력하신 내용을 확인해주세요.", "warning");
          return;
        } else if (response.status !== 201 && response.status !== 200) {
          addToast(response.message as string, "warning");
          return;
        }

        const { id } = response;
        if (isEdit) {
          addToast("알바폼 수정이 완료되었습니다.", "success");
        } else {
          addToast("알바폼 등록이 완료되었습니다.", "success");
        }

        ["stepOne", "stepTwo", "stepThree"].forEach((step) => {
          localStorage.removeItem(step);
        });

        methods.reset();
        setCurrentImageList([]);

        router.push(`/alba/${id}`);
      } catch (error) {
        console.error("알바폼 등록 중 오류 발생", error);
        addToast("알바폼 등록 중 오류가 발생했습니다.", "warning");
      }
    },
    [
      addToast,
      currentImageList,
      isEdit,
      formId,
      router,
      albaForm,
      methods,
      setCurrentImageList,
    ]
  );

  useEffect(() => {
    if (submitTrigger) {
      methods.handleSubmit(onSubmit)();
      setSubmitTrigger(false);
    }
  }, [submitTrigger, methods, onSubmit, setSubmitTrigger]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="p-6">
        <StepContent step={step} />
      </form>
    </FormProvider>
  );
};

export default StepContainer;
