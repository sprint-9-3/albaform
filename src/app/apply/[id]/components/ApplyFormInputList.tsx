import FormInput from "@/components/input/FormInput";
import ErrorText from "@/components/errorText/ErrorText";
import Image from "next/image";
import { cls } from "@/utils/dynamicTailwinds";
import { Path } from "react-hook-form";
import { z } from "zod";
import { applySchema } from "@/schema/apply/applySchema";
import { ApplyFormInputListProps } from "@/types/apply";

const ApplyFormInputList = ({
  inputArr,
  register,
  errors,
  watch,
  setValue,
  setVisible,
  handleUploadResume,
}: ApplyFormInputListProps) => {
  const resumeName = watch("resumeName");
  const resumeId = watch("resumeId");

  return (
    <>
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
              </label>

              <Image
                src={resumeName ? "/icon/Xcircle-md.svg" : "/icon/share-md.svg"}
                alt="파일 업로드"
                width={24}
                height={24}
                className="absolute bottom-4 right-3 cursor-pointer"
                onClick={() => {
                  if (resumeName) {
                    setValue("resumeName", "");
                    setValue("resumeId", "");
                  }
                }}
              />
            </div>
          )}
          <ErrorText error={input.error}>{input.error?.message}</ErrorText>

          {input.name === "password" && (
            <Image
              onClick={() => setVisible((prev: boolean) => !prev)}
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
