"use client";

import ErrorText from "@/components/errorText/ErrorText";
import FormInput from "@/components/input/FormInput";
import { signInSchema } from "@/schema/signin/signinSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signinAction } from "../actions/signinActions";
import { useRouter } from "next/navigation";
import SolidButton from "@/components/button/SolidButton";
import { cls } from "@/utils/dynamicTailwinds";
import { useToast } from "@/hooks/useToast";

const SigninContents = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await signinAction(formData);

      if (response.status === 200) {
        router.push("/");
      } else {
        addToast(response.error as string, "warning");
        console.error("로그인 에러", response.error, response.status);
      }
    } catch (error) {
      console.error("로그인 에러", error);
      addToast("로그인에 실패했습니다.", "warning");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="relative flex flex-col space-y-2">
          <label htmlFor="password" className="text-md text-black-400">
            비밀번호
          </label>
          <div
            className={cls(
              "form-input-base flex items-center justify-between focus-within:border-orange-300",
              errors.password ? "border-red" : ""
            )}
          >
            <input
              {...register("password")}
              type={visible ? "text" : "password"}
              name="password"
              placeholder="비밀번호를 입력해주세요."
              className="w-full"
            />
            <Image
              onClick={() => setVisible(!visible)}
              src={visible ? "/icon/visible.svg" : "/icon/non-visible.svg"}
              alt="비밀번호 보이기 버튼"
              width={24}
              height={24}
              priority={true}
            />
            <ErrorText error={errors.password}>
              {errors.password?.message}
            </ErrorText>
          </div>
        </div>
        <SolidButton
          disabled={!isValid || isSubmitting}
          type="submit"
          style="orange300"
          size="large"
        >
          로그인 하기
        </SolidButton>
      </div>
    </form>
  );
};

export default SigninContents;
