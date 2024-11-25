"use client";

import PrimaryCTA from "@/components/button/PrimaryCTA";
import ErrorText from "@/components/errorText/ErrorText";
import FormInput from "@/components/input/FormInput";
import { cls } from "@/utils/DynamicTailwind";
import { signInSchema } from "@/schema/signin/signinSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signinAction } from "../actions/signinActions";
import { useRouter } from "next/navigation";
import useToken from "@/hooks/useToken";
import Cookies from "js-cookie";

const SigninContents = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const { setTokens } = useToken();
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
        setTokens(response.data.accessToken, response.data.refreshToken);
        Cookies.set("role", response.data.user.role);

        router.push("/");
      } else {
        alert(response.error); // 토스트 변경
        console.error("로그인 에러", response.error, response.status);
      }
    } catch (error) {
      console.error("로그인 에러", error);
      alert("로그인에 실패했습니다."); // 토스트 변경
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
        <PrimaryCTA disabled={!isValid || isSubmitting} type="submit">
          로그인 하기
        </PrimaryCTA>
      </div>
    </form>
  );
};

export default SigninContents;
