"use client";

import { addFormSchema } from "@/schema/addForm/addFormSchema";
import { z } from "zod";
import { FormProvider } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  currentImageListAtom,
  addFormSubmitDisabledAtom,
  addFormIsSubmittingAtom,
  addFromSubmitTriggerAtom,
} from "@/atoms/addFormAtomStore";
import { useAtom, useSetAtom } from "jotai";
import { handleDateRangeFormat } from "@/utils/formatAddFormDate";
import { addFormImgUpload } from "../actions/addFormImgUpload";
import { useToast } from "@/hooks/useToast";
import { addFormSubmit } from "../actions/addFormSubmit";
import { useAddForm } from "@/hooks/useAddForm";
import StepContent from "./StepContent";

const StepContainer = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "stepOne";
  const [currentImageList, setCurrentImageList] = useAtom(currentImageListAtom);
  const setAddFormSubmitDisabled = useSetAtom(addFormSubmitDisabledAtom);
  const setAddFormIsSubmitting = useSetAtom(addFormIsSubmittingAtom);
  const [submitTrigger, setSubmitTrigger] = useAtom(addFromSubmitTriggerAtom);
  const { addToast } = useToast();
  const router = useRouter();
  const { methods, loadAllTempData } = useAddForm();

  // 등록 버튼 활성화 여부 (선택값이 많아서 isValid 인식의 이상동작으로 값들이 모두 채워지면 활성화)
  useEffect(() => {
    const values = methods.getValues();
    const isComplete = Object.values(values).every((value) => {
      if (typeof value === "number") {
        return value !== undefined;
      }
      return value !== undefined && value !== "";
    });

    setAddFormSubmitDisabled(!isComplete);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, methods.watch(), setAddFormSubmitDisabled]);

  // 등록 중 여부
  useEffect(() => {
    if (methods.formState.isSubmitting) {
      setAddFormIsSubmitting(true);
    } else {
      setAddFormIsSubmitting(false);
    }
  }, [methods.formState.isSubmitting, setAddFormIsSubmitting]);

  // 마운트 시 전체 임시저장 데이터 가져오기
  useEffect(() => {
    loadAllTempData();
  }, [loadAllTempData]);

  const onSubmit = async (data: z.infer<typeof addFormSchema>) => {
    try {
      const imgFormData = new FormData();
      currentImageList.forEach((img) => {
        imgFormData.append("image", img);
      });

      const imgResponse = await addFormImgUpload(imgFormData);

      if (imgResponse.status !== 201) {
        addToast(imgResponse.message as string, "warning");
        return;
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

      methods.setValue("imageUrls", imgResponse.data);

      const updatedData = methods.getValues();

      const formData = new FormData();
      formData.append("imageUrls", JSON.stringify(imgResponse.data));
      formData.append("workDays", JSON.stringify(updatedData.workDays));

      Object.entries(updatedData).forEach(([key, value]) => {
        if (key !== "imageUrls" && key !== "workDays") {
          formData.append(key, value as string);
        }
      });

      const response = await addFormSubmit(formData);

      if (response.status === false) {
        addToast("입력하신 내용을 확인해주세요.", "warning");
        return;
      } else if (response.status !== 201) {
        addToast(response.message as string, "warning");
        return;
      }

      const { id } = response;
      addToast("알바폼 등록이 완료되었습니다.", "success");

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
  };

  useEffect(() => {
    if (submitTrigger) {
      methods.handleSubmit(onSubmit)();
      setSubmitTrigger(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitTrigger]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="p-6">
        <StepContent step={step} />
      </form>
    </FormProvider>
  );
};

export default StepContainer;
