"use client";

import ApplyFormButton from "./ApplyFormButton";
import ApplyFormInputList from "./ApplyFormInputList";
import { applySchema } from "@/schema/apply/applySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/useToast";
import { applyFormActions } from "../actions/applyFormAction";
import { uploadResumeAction } from "../actions/uploadResumeAction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { continueApplyAtom } from "@/atoms/continueApply";
import { useAtom } from "jotai";

const ApplyForm = ({ id }: { id: string }) => {
  const { addToast } = useToast();
  const { openModal } = useModal();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [continueApply, setContinueApply] = useAtom(continueApplyAtom);
  const applyFormData = localStorage.getItem("ApplyFormData");
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
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

  //지원하기 폼 들어왔을 때 임시저장 사용할지 결정하는 로직
  useEffect(() => {
    if (applyFormData) {
      openModal("ContinueApplyFormModal");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (continueApply && applyFormData) {
      const parsedData = JSON.parse(applyFormData);
      reset(parsedData); // Use reset to populate form data
      setContinueApply(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continueApply]);

  //폼 제출 기능
  const onSubmit = async (data: z.infer<typeof applySchema>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value || "");
    });

    setLoading(true);
    try {
      const response = await applyFormActions(formData, id);

      if (response.status === 404) {
        return addToast(response.message as string, "warning");
      }

      addToast("지원서 제출에 성공하였습니다", "success");
      localStorage.removeItem("ApplyFormData");
      router.push(`/myapply/${id}`);
    } catch (error) {
      console.error("지원서 제출 오류:", error);
      addToast("서버 오류로 인해 지원서 제출에 실패하였습니다", "warning");
    } finally {
      setLoading(false);
    }
  };

  //이력서 제출 기능
  const handleUploadResume = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const response = await uploadResumeAction(file);

      if (response.status !== 201) {
        addToast(response.message as string, "warning");
        return;
      }

      setValue("resumeName", response.data.resumeName);
      setValue("resumeId", response.data.resumeId.toString());

      addToast("이력서 업로드에 성공하였습니다", "success");
    } catch (error) {
      console.error("이력서 업로드 오류:", error);
      addToast(
        "서버 오류로 인해 이력서 업로드 중 오류가 발생했습니다.",
        "warning"
      );
    } finally {
      setLoading(false);
    }
  };

  //임시 저장 기능 (현 상태 그대로 로컬스토리지에 저장)
  const handleSave = () => {
    const formData = getValues();
    localStorage.setItem("ApplyFormData", JSON.stringify(formData));
    addToast("임시 저장 완료", "success");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[23px] pc:mt-[36px]"
      >
        <ApplyFormInputList
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          handleUploadResume={handleUploadResume}
          loading={loading}
        />

        <ApplyFormButton
          onSave={handleSave}
          isSubmitting={isSubmitting}
          isValid={isValid}
          loading={loading}
        />
      </form>
    </>
  );
};

export default ApplyForm;
