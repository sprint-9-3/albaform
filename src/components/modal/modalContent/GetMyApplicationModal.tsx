"use client";

import ModalContainer from "../modalContainer/ModalContainer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { getMyApplicationSchema } from "@/schema/modal/getMyApplicationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/input/FormInput";
import ErrorText from "@/components/errorText/ErrorText";
import Image from "next/image";
import { useState } from "react";

const GetMyApplicationModal = () => {
  const [visible, setVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<z.infer<typeof getMyApplicationSchema>>({
    resolver: zodResolver(getMyApplicationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof getMyApplicationSchema>) => {
    // 기능 구현 필요
  };

  return (
    <ModalContainer>
      <div className="flex flex-col pb-[8px]">
        <strong className="text-2lg font-semibold text-black-400 pc:text-[32px] pc:leading-[46px]">
          내 지원 내역
        </strong>
        <div className="mt-6 text-md font-medium text-gray-400 pc:mt-8 pc:text-lg">
          <p>
            지원일시{" "}
            <span className="ml-2 text-md font-medium text-black-200 pc:ml-6 pc:text-lg">
              {"2024년 05월 29일 10:15"}
            </span>
          </p>
          <p className="mt-[6px] pc:mt-[14px]">
            진행 상태
            <span className="ml-2 rounded-[4px] bg-orange-500 px-2 py-1 text-[12px] font-semibold leading-[20px] text-orange-300 pc:ml-6 pc:px-3 pc:py-[6px] pc:text-lg">
              {"면접대기"}
            </span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex flex-col pc:mt-10"
        >
          <div className="relative flex flex-col">
            <label htmlFor="name" className={labelStyle}>
              이름
            </label>
            <FormInput
              name="name"
              type="name"
              register={register}
              error={errors.name}
              className={inputStyle}
              placeholder="홍길동"
              id="name"
            />
            <ErrorText error={errors.name}>{errors.name?.message}</ErrorText>
          </div>
          <div className="relative flex flex-col">
            <label htmlFor="phoneNumber" className={`${labelStyle} mt-[16px]`}>
              전화번호
            </label>
            <FormInput
              name="phoneNumber"
              type="phoneNumber"
              register={register}
              error={errors.name}
              className={inputStyle}
              placeholder="010-1234-5678"
              id="phoneNumber"
            />
            <ErrorText error={errors.phoneNumber}>
              {errors.phoneNumber?.message}
            </ErrorText>
          </div>
          <div className="relative flex flex-col">
            <label htmlFor="password" className={`${labelStyle} mt-[16px]`}>
              비밀번호
            </label>
            <FormInput
              name="password"
              type={visible ? "text" : "password"}
              register={register}
              error={errors.name}
              className={`${inputStyle} pr-[50px]`}
              placeholder="********"
              id="password"
            />
            <Image
              onClick={() => setVisible(!visible)}
              src={visible ? "/icon/visible.svg" : "/icon/non-visible.svg"}
              alt="비밀번호 보이기 버튼"
              width={24}
              height={24}
              priority={true}
              className="absolute right-3 top-[63px] pc:top-[67px]"
            />
            <ErrorText error={errors.password}>
              {errors.password?.message}
            </ErrorText>
          </div>
        </form>

        <button className="mt-[24px] w-[327px] rounded-[8px] bg-orange-300 p-[16px] text-white pc:mt-[46px]">
          지원 내역 상세 보기
        </button>
      </div>
    </ModalContainer>
  );
};

export default GetMyApplicationModal;

const labelStyle =
  "text-md font-regular text-black-400 w-fit cursor-pointer pc:text-lg";
const inputStyle =
  "mt-[8px] rounded-[8px] bg-background-200 p-[14px] placeholder:text-md placeholder:font-regular border focus:outline-orange-300";
