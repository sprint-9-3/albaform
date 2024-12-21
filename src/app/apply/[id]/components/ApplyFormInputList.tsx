import FormInput from "@/components/input/FormInput";
import ErrorText from "@/components/errorText/ErrorText";
import Image from "next/image";
import { cls } from "@/utils/dynamicTailwinds";
import { Path } from "react-hook-form";
import { z } from "zod";
import { applySchema } from "@/schema/apply/applySchema";
import { ApplyFormInputListProps } from "@/types/apply";
import { useState } from "react";

const ApplyFormInputList = ({
  register,
  errors,
  watch,
  setValue,
  handleUploadResume,
  loading,
}: ApplyFormInputListProps) => {
  const resumeName = watch("resumeName");
  const resumeId = watch("resumeId");
  const [visible, setVisible] = useState(false);

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

  return (
    <>
      {inputArr.map((input) => (
        <div key={input.name} className="relative flex flex-col">
          <label htmlFor={input.name} className={labelStyle}>
            {input.label}
            <span className="text-orange-300"> *</span>
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
            <label
              className={cls(
                inputStyle,
                "flex cursor-pointer items-center",
                resumeName ? "text-black-400" : "text-gray-300"
              )}
            >
              <div className="inline-block overflow-hidden text-ellipsis whitespace-nowrap">
                {loading
                  ? "로딩 중..."
                  : resumeName
                    ? resumeName
                    : input.placeholder}
              </div>
              <input
                type="file"
                hidden
                id={input.name}
                {...register("resumeName")}
                accept=".pdf,.doc,.docx"
                onChange={handleUploadResume}
              />
              <input
                value={resumeId}
                {...register("resumeId")}
                hidden
                readOnly
              />
              <Image
                src={resumeName ? "/icon/Xcircle-md.svg" : "/icon/share-md.svg"}
                alt="파일 업로드"
                width={24}
                height={24}
                className="absolute bottom-4 right-3 cursor-pointer"
                onClick={(e) => {
                  if (resumeName) {
                    e.preventDefault();
                    setValue("resumeName", "");
                    setValue("resumeId", "");
                  }
                }}
              />
            </label>
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
    </>
  );
};

export default ApplyFormInputList;

const labelStyle =
  "text-md font-regular text-black-400 w-fit cursor-pointer mt-[33px] pc:mt-[52px] pc:text-xl";
const inputStyle =
  "mt-4 rounded-[8px] bg-background-200 p-[14px] pr-10 placeholder:text-lg placeholder:font-regular border border-background-200 focus:border-orange-300 pc:mt-4";
