"use client";

import ApplyFormButton from "./ApplyFormButton";
import ApplyFormInputList from "./ApplyFormInputList";
import { ApplyFormInputArr } from "./ApplyFormInputArr";
import { applySchema } from "@/schema/apply/applySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { applyFormActions } from "../actions/applyFormAction";
import { uploadResumeAction } from "../actions/uploadResumeAction";

const ApplyForm = ({ id }: { id: string }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<z.infer<typeof applySchema>>({
    resolver: zodResolver(applySchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phoneNumber: "",
      experienceMonths: "",
      resumeName: "",
      resumeId: "",
      introduction: "",
      password: "",
    },
  });
  const [visible, setVisible] = useState(false);
  const { addToast } = useToast();

  //인풋 요소
  const inputArr = ApplyFormInputArr({ register, errors, visible });

  //폼 제출 기능
  const onSubmit = async (data: z.infer<typeof applySchema>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value || "");
    });

    try {
      await applyFormActions(formData, id);

      addToast("지원서를 성공적으로 제출하였습니다", "success");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "지원서 제출 중 알 수 없는 오류가 발생했습니다.";

      console.error("지원서 제출 오류:", error);
      addToast(errorMessage, "warning");
    }
  };

  //이력서 제출 기능
  const handleUploadResume = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadResumeAction(file);

      setValue("resumeName", result.resumeName);
      setValue("resumeId", result.resumeId.toString());

      addToast("이력서 업로드에 성공하였습니다", "success");
    } catch (error) {
      console.error("이력서 업로드 오류:", error);
      addToast("이력서 업로드 중 오류가 발생했습니다.", "warning");
    }
  };

  //임시 저장 기능 (현 상태 그대로 로컬스토리지에 저장)
  const handleSave = () => {
    const ApplyFormData = watch();

    localStorage.setItem("ApplyFormData", JSON.stringify(ApplyFormData));
    addToast("임시 저장 완료", "success");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-[23px] pc:mt-[36px]">
      <ApplyFormInputList
        inputArr={inputArr}
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
        setVisible={setVisible}
        handleUploadResume={handleUploadResume}
      />

      <ApplyFormButton
        onSave={handleSave}
        isSubmitting={isSubmitting}
        isValid={isValid}
      />
    </form>
  );
};

export default ApplyForm;

const labelStyle =
  "text-md font-regular text-black-400 w-fit cursor-pointer mt-[33px] pc:mt-[52px] pc:text-xl";
const inputStyle =
  "mt-4 rounded-[8px] bg-background-200 p-[14px] pr-10 placeholder:text-lg placeholder:font-regular border border-background-200 focus:border-orange-300 pc:mt-4";
