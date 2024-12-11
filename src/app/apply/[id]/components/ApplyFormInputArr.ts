import { applySchema } from "@/schema/apply/applySchema";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";

interface ApplyInputArrProps {
  register: UseFormRegister<z.infer<typeof applySchema>>;
  errors: FieldErrors<z.infer<typeof applySchema>>;
  visible: boolean;
}

export const ApplyFormInputArr = ({
  register,
  errors,
  visible,
}: ApplyInputArrProps) => {
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

  return inputArr;
};
