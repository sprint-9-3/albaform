"use client";

import Image from "next/image";
import Link from "next/link";
import SignupSecondContents from "./SignupSecondContents";
import PrimaryCTA from "@/components/button/PrimaryCTA";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  applicantSchema,
  ownerSchema,
} from "../../../../schema/signup/signupSchema";
import { cls } from "@/utils/DynamicTailwind";
import { signupActions } from "../actions/signupActions";
import { profileImgAtom } from "@/atoms/signupAtomStore";
import { useAtomValue } from "jotai";
import useToken from "@/hooks/useToken";
import { profileImgActions } from "../actions/profileImgActions";
import FormInput from "@/components/input/FormInput";
import ErrorText from "@/components/errorText/ErrorText";
import Cookies from "js-cookie";
export type FormSchema =
  | z.infer<typeof applicantSchema>
  | z.infer<typeof ownerSchema>;

const SignupContents = ({
  userType,
  stepOneDone,
}: {
  userType: string;
  stepOneDone: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordConfirm, setVisiblePasswordConfirm] = useState(false);
  const currentParams = new URLSearchParams(searchParams.toString());
  const profileImg = useAtomValue(profileImgAtom);
  const { setTokens } = useToken();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(
      userType === "applicant" ? applicantSchema : ownerSchema
    ),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      role: userType === "applicant" ? "APPLICANT" : "OWNER",
      passwordConfirm: "",
      nickname: "",
      name: "",
      phoneNumber: "",
      storeName: "",
      storePhoneNumber: "",
      location: "",
    },
  });
  const isValidFirstStep =
    !watch("email") || !watch("password") || !watch("passwordConfirm");

  const handleNextStep = () => {
    currentParams.set("stepOneDone", "true");
    router.push(`/signup/${userType}?${currentParams.toString()}`);
  };

  const onSubmit = async (data: FormSchema) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value || "");
      });

      const response = await signupActions(formData);

      if (response.status === 200) {
        const { accessToken } = response.data;

        if (profileImg) {
          const imgFormData = new FormData();
          imgFormData.append("image", profileImg);

          try {
            const profileImgResponse = await profileImgActions(
              imgFormData,
              accessToken
            );

            if (profileImgResponse.status !== 200) {
              alert(profileImgResponse.message); // 토스트 변경
              throw new Error(
                profileImgResponse.message || "프로필 이미지 업로드 실패"
              );
            }
          } catch (error) {
            console.error("프로필 사진 업로드 오류", error);
            alert(
              "회원가입은 완료되었으나 프로필 사진 업로드 중 오류가 발생했습니다."
            ); // 토스트 변경
          }
        }

        alert("회원가입이 완료되었습니다."); // 토스트 변경
        reset();
        setTokens(response.data.accessToken, response.data.refreshToken);
        Cookies.set("role", response.data.user.role);
      } else {
        console.error(response.message);
        alert(response.message); // 토스트 변경
      }
    } catch (error) {
      console.error("signup에서 에러 발생", error);
      alert("회원가입 중 오류가 발생했습니다."); // 토스트 변경
    }
  };

  const passwordArr = [
    {
      name: "password",
      title: "비밀번호",
      placeholder: "비밀번호를 입력해주세요.",
      visible: visiblePassword,
      visibleFn: setVisiblePassword,
      register: { ...register("password") },
      error: errors.password?.message,
    },
    {
      name: "passwordConfirm",
      title: "비밀번호 확인",
      placeholder: "비밀번호를 한번 더 입력해주세요.",
      visible: visiblePasswordConfirm,
      visibleFn: setVisiblePasswordConfirm,
      register: { ...register("passwordConfirm") },
      error: errors.passwordConfirm?.message,
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!stepOneDone ? (
        <div className="flex flex-col space-y-10">
          <div className="relative flex flex-col space-y-2">
            <label htmlFor="email" className="text-md text-black-400">
              이메일
            </label>
            <FormInput
              type="email"
              placeholder="이메일을 입력해주세요."
              register={register}
              error={errors.email}
              name="email"
            />
            <ErrorText error={errors.email}>{errors.email?.message}</ErrorText>
          </div>
          {passwordArr.map((item) => (
            <div key={item.name} className="relative flex flex-col space-y-2">
              <label htmlFor={item.name} className="text-md text-black-400">
                {item.title}
              </label>
              <div
                className={cls(
                  "form-input-base flex items-center justify-between focus-within:border-orange-300",
                  item.error ? "border-red" : ""
                )}
              >
                <input
                  {...item.register}
                  type={item.visible ? "text" : "password"}
                  name={item.name}
                  placeholder={item.placeholder}
                  className="w-full"
                />
                <Image
                  onClick={() => item.visibleFn(!item.visible)}
                  src={
                    item.visible ? "/icon/visible.svg" : "/icon/non-visible.svg"
                  }
                  alt="비밀번호 보이기 버튼"
                  width={24}
                  height={24}
                />
              </div>
              <ErrorText error={item.error}>{item.error}</ErrorText>
            </div>
          ))}
          <PrimaryCTA
            disabled={isValidFirstStep}
            type="button"
            onClick={handleNextStep}
          >
            다음
          </PrimaryCTA>
          <p className="text-center text-xs text-black-100 pc:text-lg">
            가입 시
            <Link
              href="/terms"
              className="ml-1 font-semibold text-orange-300 underline"
            >
              이용약관
            </Link>
            에 동의한 것으로 간주됩니다.
          </p>
        </div>
      ) : (
        <SignupSecondContents
          userType={userType}
          isValid={isValid}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      )}
    </form>
  );
};

export default SignupContents;
