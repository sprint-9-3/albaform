"use client";

import Image from "next/image";
import ModalContainer from "../modalContainer/ModalContainer";
import FormInput from "@/components/input/FormInput";
import ErrorText from "@/components/errorText/ErrorText";
import { useState } from "react";
import { useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { changeCEOInfoSchema } from "@/schema/modal/changeCEOInfoSchema";

const ChangeCEOInfoModal = () => {
  const [previewSrc, setPreviewSrc] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<z.infer<typeof changeCEOInfoSchema>>({
    resolver: zodResolver(changeCEOInfoSchema),
    mode: "onChange",
    defaultValues: {
      nickname: "",
      storeName: "",
      storePhoneNumber: "",
      phoneNumber: "",
      location: "",
    },
  });

  const inputArr = [
    {
      label: "닉네임",
      name: "nickname",
      type: "text",
      placeholder: "닉네임을 입력해주세요.",
      error: errors.nickname,
      register: register("nickname"),
      required: true,
    },
    {
      label: "가게 이름",
      name: "storeName",
      type: "text",
      placeholder: "가게 이름(상호명)을 입력해주세요.",
      error: errors.storeName,
      register: register("storeName"),
      required: true,
    },
    {
      label: "가게 전화번호",
      name: "storePhoneNumber",
      type: "tel",
      placeholder: "숫자만 입력해주세요.",
      error: errors.storePhoneNumber,
      register: register("storePhoneNumber"),
      required: true,
    },
    {
      label: "사장님 전화번호",
      name: "phoneNumber",
      type: "tel",
      placeholder: "숫자만 입력해주세요.",
      error: errors.phoneNumber,
      register: register("phoneNumber"),
      required: false,
    },
    {
      label: "가게 위치",
      name: "location",
      type: "text",
      placeholder: "위치를 입력해주세요.",
      error: errors.location,
      register: register("location"),
      required: true,
    },
  ];

  const onSubmit = () => {
    // 기능 구현 필요
  };

  return (
    <ModalContainer>
      <div className="flex flex-col items-center pb-[8px]">
        <strong className="text-2lg font-semibold text-black-400 pc:text-[32px] pc:leading-[46px]">
          사장님 정보 관리
        </strong>
        <label className="relative mt-10 cursor-pointer pc:mt-[50px]">
          <Image
            src={previewSrc || "/icon/profile-circle-lg.svg"}
            alt="프로필사진 변경"
            width={80}
            height={80}
            className="size-20 rounded-full border-4 border-line-100 bg-background-200 object-cover pc:size-[100px]"
            priority={true}
          />
          <Image
            src="/icon/write-lg.svg"
            alt="프로필사진 변경버튼"
            width={24}
            height={24}
            className="absolute bottom-2 right-0 size-6 rounded-full border-[3px] border-gray-50 bg-background-300 pc:bottom-0 pc:size-9"
            priority={true}
          />
          <input className="hidden" />
        </label>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex flex-col pc:mt-10"
        >
          {inputArr.map((input) => (
            <div key={input.name} className="relative flex flex-col">
              <label htmlFor={input.name} className={labelStyle}>
                {input.label}
                {input.required && <span className="text-red"> *</span>}
              </label>
              <FormInput
                id={input.name}
                name={input.name as Path<z.infer<typeof changeCEOInfoSchema>>}
                type={input.type}
                register={register}
                error={input.error}
                placeholder={input.placeholder}
                className={
                  input.name === "location" ? `${inputStyle} pl-11` : inputStyle
                }
              />
              <ErrorText error={input.error}>{input.error?.message}</ErrorText>
              {input.name === "location" ? (
                <Image
                  src="/icon/pin-fill-lg.svg"
                  alt="가게 위치"
                  width={36}
                  height={36}
                  className="absolute bottom-2 left-2"
                />
              ) : (
                ""
              )}
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

export default ChangeCEOInfoModal;

const labelStyle =
  "text-md font-regular text-black-400 w-fit cursor-pointer mt-[17px] pc:mt-8 pc:text-xl";
const inputStyle =
  "mt-[8px] rounded-[8px] bg-grya-50 p-[14px] placeholder:text-md placeholder:font-regular border focus:border-orange-300 pc:mt-4";
