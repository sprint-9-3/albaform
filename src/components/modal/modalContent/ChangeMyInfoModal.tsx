import Image from "next/image";
import ModalContainer from "../modalContainer/ModalContainer";
import FormInput from "@/components/input/FormInput";
import ErrorText from "@/components/errorText/ErrorText";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changeMyInfoSchema } from "@/schema/modal/changeMyInfoSchema";
import { z } from "zod";

const ChangeMyInfoModal = () => {
  const [previewSrc, setPreviewSrc] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<z.infer<typeof changeMyInfoSchema>>({
    resolver: zodResolver(changeMyInfoSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      nickName: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async () => {}; // 기능 구현 필요

  return (
    <ModalContainer>
      <div className="flex flex-col items-center pb-[8px]">
        <strong className="text-2lg font-semibold text-black-400 pc:text-[32px] pc:leading-[46px]">
          내 정보 수정
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mt-[25px] flex flex-col pc:mt-10">
            <label htmlFor="name" className={labelStyle}>
              이름<span className="text-red"> *</span>
            </label>
            <FormInput
              id="name"
              name="name"
              type="text"
              register={register}
              error={errors.name}
              className={inputStyle}
              placeholder="이름을 입력해주세요."
            />
            <ErrorText error={errors.name}>{errors.name?.message}</ErrorText>
          </div>
          <div className="relative flex flex-col">
            <label
              htmlFor="nickName"
              className={`${labelStyle} mt-[17px] pc:mt-8`}
            >
              닉네임<span className="text-red"> *</span>
            </label>
            <FormInput
              id="nickName"
              name="nickName"
              type="text"
              register={register}
              error={errors.nickName}
              className={inputStyle}
              placeholder="닉네임을 입력해주세요"
            />
            <ErrorText error={errors.nickName}>
              {errors.nickName?.message}
            </ErrorText>
          </div>
          <div className="relative flex flex-col">
            <label
              htmlFor="phoneNumber"
              className={`${labelStyle} mt-[17px] pc:mt-8`}
            >
              연락처<span className="text-red"> *</span>
            </label>
            <FormInput
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              register={register}
              error={errors.phoneNumber}
              className={inputStyle}
              placeholder="숫자만 입력해주세요."
            />
            <ErrorText error={errors.phoneNumber}>
              {errors.phoneNumber?.message}
            </ErrorText>
          </div>

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

export default ChangeMyInfoModal;

const labelStyle =
  "text-md font-regular text-black-400 w-fit cursor-pointer pc:text-lg";
const inputStyle =
  "mt-[8px] rounded-[8px] bg-gray-50 p-[14px] placeholder:text-md placeholder:font-regular border focus:boder-orange-300";
