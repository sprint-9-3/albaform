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
import SolidButton from "@/components/button/SolidButton";
import { useModal } from "@/hooks/useModal";
import { useParams, useRouter } from "next/navigation";
import { getMyApplicationAction } from "../modalActions/getMyApplicationAction";
import { useToast } from "@/hooks/useToast";
import useViewPort from "@/hooks/useViewport";

const GetMyApplicationModal = () => {
  const { closeModal } = useModal();
  const { addToast } = useToast();
  const viewport = useViewPort();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const formId = params.formId as string;
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
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value || "");
      });

      const response = await getMyApplicationAction(formData, formId);

      if (response.status === 200) {
        closeModal();

        router.push(`/myapply/${formId}`); //지원 상세 조회 페이지로 이동
      } else {
        console.error(response.message, response.status);
        addToast(response.message as string, "warning");
      }
    } catch (error) {
      console.error("지원 내역 조회 에러 발생", error);
      addToast("지원 내역 조회 중 오류가 발생했습니다.", "warning");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalContainer>
      <div className="flex flex-col items-center pb-[8px]">
        <h2 className="text-2lg font-semibold text-black-400 pc:text-[32px] pc:leading-[46px]">
          내 지원 내역
        </h2>

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

          <div className="mt-6 w-[327px] pc:mt-[46px] pc:w-[360px]">
            <SolidButton
              size={viewport === "pc" ? "2xl" : "xl"}
              disabled={!isValid || isSubmitting}
              style="orange300"
              type="submit"
            >
              {loading ? "로딩 중..." : "지원 내역 상세 보기"}
            </SolidButton>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default GetMyApplicationModal;

const labelStyle =
  "text-md font-regular text-black-400 w-fit cursor-pointer pc:text-lg";
const inputStyle =
  "mt-[8px] rounded-[8px] bg-background-200 p-[14px] placeholder:text-md placeholder:font-regular border focus:border-orange-300";
