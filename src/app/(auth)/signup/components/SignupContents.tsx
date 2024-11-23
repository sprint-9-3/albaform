"use client";

import Image from "next/image";
import Link from "next/link";
import SignupSecondContents from "./SignupSecondContents";
import PrimaryCTA from "@/app/components/button/PrimaryCTA";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicantSchema, ownerSchema } from "../zodSchema/signupSchema";
import { cls } from "@/app/lib/utils";
import { signupActions } from "../actions/signupActions";
import { profileImgAtom } from "@/atoms/signupAtomStore";
import { useAtomValue } from "jotai";
import useToken from "@/hooks/useToken";
import { profileImgActions } from "../actions/profileImgActions";
import FormInput from "@/app/components/input/FormInput";

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
        setTokens(response.data.accessToken, response.data.refreshToken);

        if (profileImg) {
          const formData = new FormData();
          formData.append("image", profileImg);
          const profileImgResponse = await profileImgActions(formData);

          if (profileImgResponse.status !== 200) {
            alert(profileImgResponse.message); // 토스트 변경
            return;
          }
        }

        alert("회원가입이 완료되었습니다."); // 토스트 변경
        reset();
        router.push("/signin");
      } else {
        console.error(response.message);
        alert(response.message); // 회원가입 실패 시 토스트 띄우기
      }
    } catch (error) {
      console.error("signup에서 에러 발생", error);
      alert("회원가입 중 오류가 발생했습니다."); // 회원가입 중 오류 시 토스트 띄우기
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
            {errors.email && (
              <p className="absolute bottom-0 right-0 translate-y-full text-sm font-medium text-red">
                {errors.email.message}
              </p>
            )}
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
                    item.visible
                      ? "/icons/visibility_on.png"
                      : "/icons/visibility_off.png"
                  }
                  alt="비밀번호 보이기 버튼"
                  width={24}
                  height={24}
                />
              </div>
              {item.error && (
                <p className="absolute bottom-0 right-0 translate-y-full text-sm font-medium text-red">
                  {item.error}
                </p>
              )}
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