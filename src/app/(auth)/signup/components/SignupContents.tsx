"use client";

import Image from "next/image";
import Link from "next/link";
import SignupSecondContents from "./SignupSecondContents";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  applicantSchema,
  ownerSchema,
} from "../../../../schema/signup/signupSchema";
import { signupActions } from "../actions/signupActions";
import { profileImgAtom } from "@/atoms/signupAtomStore";
import { useAtomValue } from "jotai";
import { profileImgActions } from "../actions/profileImgActions";
import FormInput from "@/components/input/FormInput";
import ErrorText from "@/components/errorText/ErrorText";
import SolidButton from "@/components/button/SolidButton";
import { cls } from "@/utils/dynamicTailwinds";
import { useToast } from "@/hooks/useToast";
import { addressAtom } from "@/atoms/addressAtom";

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
  const [confirmMsg, setConfirmMsg] = useState("");
  const currentParams = new URLSearchParams(searchParams.toString());
  const profileImg = useAtomValue(profileImgAtom);
  const address = useAtomValue(addressAtom);
  const { addToast } = useToast();

  const methods = useForm<FormSchema>({
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
    !methods.watch("email") ||
    !methods.watch("password") ||
    !methods.watch("passwordConfirm") ||
    methods.watch("password") !== methods.watch("passwordConfirm");

  useEffect(() => {
    if (methods.watch("password") !== methods.watch("passwordConfirm")) {
      setConfirmMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmMsg("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.watch("passwordConfirm")]);

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
        if (profileImg) {
          const imgFormData = new FormData();
          imgFormData.append("image", profileImg);

          try {
            const profileImgResponse = await profileImgActions(imgFormData);

            if (profileImgResponse.status !== 200) {
              addToast(profileImgResponse.message as string, "warning");
              console.error(
                "프로필 사진 업로드 오류",
                profileImgResponse.message
              );
            }
          } catch (error) {
            console.error("프로필 사진 업로드 오류", error);
            addToast(
              "회원가입은 완료되었으나 프로필 사진 업로드 중 오류가 발생했습니다.",
              "warning"
            );
          }
        }

        addToast("회원가입이 완료되었습니다.", "info");
        localStorage.setItem("isLogin", "true");

        methods.reset();
        router.push("/");
      } else {
        console.error(response.message, response.status);
        addToast(response.message as string, "warning");
      }
    } catch (error) {
      console.error("signup에서 에러 발생", error);
      addToast("회원가입 중 오류가 발생했습니다.", "warning");
    }
  };

  const passwordArr = [
    {
      name: "password",
      title: "비밀번호",
      placeholder: "비밀번호를 입력해주세요.",
      visible: visiblePassword,
      visibleFn: setVisiblePassword,
      register: { ...methods.register("password") },
      error: methods.formState.errors.password?.message,
    },
    {
      name: "passwordConfirm",
      title: "비밀번호 확인",
      placeholder: "비밀번호를 한번 더 입력해주세요.",
      visible: visiblePasswordConfirm,
      visibleFn: setVisiblePasswordConfirm,
      register: { ...methods.register("passwordConfirm") },
      error: confirmMsg,
    },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {!stepOneDone ? (
          <div className="flex flex-col space-y-10">
            <div className="relative flex flex-col space-y-2">
              <label htmlFor="email" className="text-md text-black-400">
                이메일
              </label>
              <FormInput
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                register={methods.register}
                error={methods.formState.errors.email}
                name="email"
              />
              <ErrorText error={methods.formState.errors.email}>
                {methods.formState.errors.email?.message}
              </ErrorText>
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
                    id={item.name}
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
                        ? "/icon/visible.svg"
                        : "/icon/non-visible.svg"
                    }
                    alt="비밀번호 보이기 버튼"
                    width={24}
                    height={24}
                    priority={true}
                    className="cursor-pointer"
                  />
                </div>
                <ErrorText error={item.error}>{item.error}</ErrorText>
              </div>
            ))}
            <SolidButton
              disabled={isValidFirstStep}
              type="button"
              onClick={handleNextStep}
              style="orange300"
              size="2xl"
            >
              다음
            </SolidButton>
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
          <SignupSecondContents userType={userType} address={address} />
        )}
      </form>
    </FormProvider>
  );
};

export default SignupContents;
