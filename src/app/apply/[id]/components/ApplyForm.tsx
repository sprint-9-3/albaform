"use client";

import FormInput from "@/components/input/FormInput";
import ErrorText from "@/components/errorText/ErrorText";
import ApplyButton from "./ApplyButton";
import Image from "next/image";
import { cls } from "@/utils/dynamicTailwinds";
import { applySchema } from "@/schema/apply/applySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Path, useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";

const ApplyForm = ({ id }: { id: string }) => {
  const [visible, setVisible] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [resumeId, setResumeId] = useState(null);
  const { addToast } = useToast();
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
      introduction: "",
      password: "",
    },
  });

  //인풋 요소
  const inputArr = [
    {
      label: "이름",
      name: "name",
      type: "text",
      placeholder: "이름을 입력해주세요.",
      error: errors.name,
      register: register("name"),
      inputStyle: "basic",
    },
    {
      label: "연락처",
      name: "phoneNumber",
      type: "tel",
      placeholder: "숫자만 입력해주세요.",
      error: errors.phoneNumber,
      register: register("phoneNumber"),
      inputStyle: "basic",
    },
    {
      label: "경력(개월 수)",
      name: "experienceMonths",
      type: "number",
      placeholder: "숫자만 입력해주세요.",
      error: errors.experienceMonths,
      register: register("experienceMonths"),
      inputStyle: "basic",
    },
    {
      label: "이력서",
      name: "resumeName",
      type: "file",
      placeholder: "파일 업로드하기",
      error: errors.resumeName,
      register: register("resumeName"),
      inputStyle: "file",
    },
    {
      label: "자기 소개",
      name: "introduction",
      type: "text",
      placeholder: "최대 200자까지 입력 가능합니다.",
      error: errors.introduction,
      register: register("introduction"),
      inputStyle: "textarea",
    },
    {
      label: "비밀번호",
      name: "password",
      type: visible ? "text" : "password",
      placeholder: "비밀번호를 입력해주세요.",
      error: errors.password,
      register: register("password"),
      inputStyle: "basic",
    },
  ];

  //폼 제출 기능
  const onSubmit = async (data: z.infer<typeof applySchema>) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}/applications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            resumeName,
            resumeId,
          }),
        }
      );

      if (!response.ok) throw new Error("지원서 제출 실패");

      addToast("지원서를 성공적으로 제출하였습니다!", "success");
    } catch (error) {
      console.error("지원서 제출 오류:", error);
      addToast("지원서 제출 중 오류가 발생했습니다.", "warning");
    }
  };

  //이력서 제출 기능
  const handleUploadResume = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resume/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("이력서 업로드 실패");

      const result = await response.json();
      setResumeName(result.resumeName);
      setResumeId(result.resumeId);
      setValue("resumeName", result.resumeName);
      addToast("이력서 업로드에 성공하였습니다!", "success");
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
      {inputArr.map((input) => (
        <div key={input.name} className="relative flex flex-col">
          <label htmlFor={input.name} className={labelStyle}>
            {input.label}
            <span className="text-red"> *</span>
          </label>
          {input.inputStyle === "basic" && (
            <FormInput
              id={input.name}
              name={input.name as Path<z.infer<typeof applySchema>>}
              type={input.type}
              register={register}
              error={input.error}
              placeholder={input.placeholder}
              className={inputStyle}
            />
          )}
          {input.inputStyle === "textarea" && (
            <textarea
              id={input.name}
              {...register("introduction")}
              className={cls(
                "h-[132px] resize-none appearance-none focus:outline-none",
                inputStyle,
                errors.introduction ? "border-red" : ""
              )}
              placeholder="최대 200자까지 입력 가능합니다."
            />
          )}
          {input.inputStyle === "file" && (
            <div className={cls(inputStyle, "cursor-pointer text-gray-300")}>
              <label htmlFor={input.name}>
                {resumeName ? resumeName : input.placeholder}
                <input
                  type="file"
                  className="hidden"
                  id={input.name}
                  accept=".pdf,.doc,.docx"
                  onChange={handleUploadResume}
                />
              </label>
              <Image
                src={resumeName ? "/icon/Xcircle-md.svg" : "/icon/share-md.svg"}
                alt="파일 업로드"
                width={24}
                height={24}
                className="absolute bottom-4 right-3 cursor-pointer"
                onClick={() => {
                  if (resumeName) {
                    setResumeName(""); // 초기화
                    setResumeId(null); // resumeId도 초기화
                    setValue("resumeName", ""); // 폼 상태 초기화
                  }
                }}
              />
            </div>
          )}
          <ErrorText error={input.error}>{input.error?.message}</ErrorText>

          {input.name === "password" && (
            <Image
              onClick={() => setVisible(!visible)}
              src={
                input.type === "text"
                  ? "/icon/visible.svg"
                  : "/icon/non-visible.svg"
              }
              alt="비밀번호 보기"
              width={24}
              height={24}
              className="absolute bottom-4 right-3 cursor-pointer"
            />
          )}
          {input.name === "password" && (
            <p className="absolute bottom-[-20px] left-0 text-xs text-gray-400 pc:bottom-[-26px] pc:text-md">
              *지원내역 확인에 사용됩니다.
            </p>
          )}
        </div>
      ))}

      <ApplyButton
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
