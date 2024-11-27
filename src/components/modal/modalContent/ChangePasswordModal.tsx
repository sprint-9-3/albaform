"use client";

import ErrorText from "@/components/errorText/ErrorText";
import ModalContainer from "../modalContainer/ModalContainer";
import FormInput from "@/components/input/FormInput";
import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Path } from "react-hook-form";
import { changePasswordSchema } from "@/schema/modal/changePasswordSchema";

const ChangePasswordModal = () => {
  const [visible, setVisible] = useState({
    currentPassword: false,
    newPassword: false,
    newPasswordConfirm: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  const toggleVisibility = (field: keyof typeof visible) => {
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const inputArr = [
    {
      id: "currentPassword",
      label: "현재 비밀번호",
      name: "currentPassword",
      type: visible.currentPassword ? "text" : "password",
      placeholder: "현재 비밀번호를 입력해주세요.",
      error: errors.currentPassword,
      register: { ...register("currentPassword") },
    },
    {
      id: "newPassword",
      label: "새 비밀번호",
      name: "newPassword",
      type: visible.newPassword ? "text" : "password",
      placeholder: "새로운 비밀번호를 입력해주세요.",
      error: errors.newPassword,
      register: { ...register("newPassword") },
    },
    {
      id: "newPasswordConfirm",
      label: "새 비밀번호 확인",
      name: "newPasswordConfirm",
      type: visible.newPasswordConfirm ? "text" : "password",
      placeholder: "새로운 비밀번호를 다시 한번 입력해주세요.",
      error: errors.newPasswordConfirm,
      register: { ...register("newPasswordConfirm") },
    },
  ];

  const onSubmit = () => {
    // 제출 기능 필요
  };

  return (
    <ModalContainer>
      <div className="flex flex-col items-center pb-[8px] pc:mx-[-40px]">
        <strong className="text-2lg font-semibold text-black-400 pc:text-[32px] pc:leading-[46px]">
          비밀번호 변경
        </strong>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-[33px] flex flex-col gap-[17px] pc:mt-12 pc:gap-8"
        >
          {inputArr.map((input) => (
            <div key={input.id} className="relative flex flex-col">
              <label htmlFor={input.id} className={labelStyle}>
                {input.label}
              </label>
              <FormInput
                id={input.id}
                name={input.name as Path<z.infer<typeof changePasswordSchema>>}
                type={input.type}
                placeholder={input.placeholder}
                error={input.error}
                register={register}
                className={inputStyle}
              />
              <Image
                onClick={() =>
                  toggleVisibility(input.name as keyof typeof visible)
                }
                src={
                  input.type === "text"
                    ? "/icon/visible.svg"
                    : "/icon/non-visible.svg"
                }
                alt="비밀번호 보이기 버튼"
                width={24}
                height={24}
                priority={true}
                className="absolute bottom-[14px] right-3"
              />
              <ErrorText error={input.error}>{input.error?.message}</ErrorText>
            </div>
          ))}

          <div className="mt-6 flex gap-[11px] pc:mt-[30px] pc:gap-3">
            <button className="h-[58px] w-[158px] rounded-[8px] border bg-gray-100 text-white pc:h-[72px] pc:w-[314px]">
              취소
            </button>
            <button className="h-[58px] w-[158px] rounded-[8px] border bg-orange-300 text-white pc:h-[72px] pc:w-[314px]">
              수정하기
            </button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default ChangePasswordModal;

const labelStyle =
  "text-md font-regular text-black-400 w-fit cursor-pointer pc:text-xl";
const inputStyle =
  "mt-2 rounded-[8px] bg-gray-50 p-[14px] pr-10 placeholder:text-lg placeholder:font-regular border focus:border-orange-300 pc:mt-4";
