import { FieldErrors } from "react-hook-form";

import {
  applicantSchema,
  ownerSchema,
} from "../../../../schema/signup/signupSchema";

import { UseFormRegister } from "react-hook-form";
import { z } from "zod";

interface StepTwoInputProps {
  userType: string;
  register: UseFormRegister<
    z.infer<typeof applicantSchema> | z.infer<typeof ownerSchema>
  >;
  errors: FieldErrors<
    z.infer<typeof applicantSchema> | z.infer<typeof ownerSchema>
  >;
}

export const StepTwoInput = ({
  userType,
  register,
  errors,
}: StepTwoInputProps) => {
  const isApplicant = userType === "applicant";
  const applicantErrors = errors as FieldErrors<
    z.infer<typeof applicantSchema>
  >;
  const ownerErrors = errors as FieldErrors<z.infer<typeof ownerSchema>>;

  const commonInput = [
    {
      name: "nickname",
      title: "닉네임",
      placeholder: "닉네임을 입력해주세요.",
      type: "text",
      isRequired: true,
      error: errors.nickname?.message,
      register: register("nickname"),
    },
  ];

  const applicantInput = [
    {
      name: "name",
      title: "이름",
      placeholder: "이름을 입력해주세요.",
      type: "text",
      isRequired: true,
      error: applicantErrors.name?.message,
      register: register("name"),
    },
    {
      name: "phoneNumber",
      title: "연락처",
      placeholder: "숫자만 입력해주세요.",
      type: "tel",
      isRequired: true,
      error: applicantErrors.phoneNumber?.message,
      register: register("phoneNumber"),
    },
  ];

  const ownerInput = [
    {
      name: "storeName",
      title: "가게 이름",
      placeholder: "가게 이름(상호명)을 입력해주세요.",
      type: "text",
      isRequired: true,
      error: ownerErrors.storeName?.message,
      register: register("storeName"),
    },
    {
      name: "storePhoneNumber",
      title: "가게 전화번호",
      placeholder: "숫자만 입력해주세요.",
      type: "tel",
      isRequired: true,
      error: ownerErrors.storePhoneNumber?.message,
      register: register("storePhoneNumber"),
    },
    {
      name: "phoneNumber",
      title: "사장님 전화번호",
      placeholder: "숫자만 입력해주세요.",
      type: "tel",
      isRequired: false,
      error: ownerErrors.phoneNumber?.message,
      register: register("phoneNumber"),
    },
  ];

  const inputArr = [
    ...commonInput,
    ...(isApplicant ? applicantInput : ownerInput),
  ];

  return inputArr;
};
