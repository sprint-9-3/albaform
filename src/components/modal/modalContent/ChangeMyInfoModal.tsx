"use client";

import ModalContainer from "../modalContainer/ModalContainer";
import FormInput from "@/components/input/FormInput";
import ErrorText from "@/components/errorText/ErrorText";
import { zodResolver } from "@hookform/resolvers/zod";
import { Path, useForm } from "react-hook-form";
import { changeMyInfoSchema } from "@/schema/modal/changeMyInfoSchema";
import { z } from "zod";
import SolidButton from "@/components/button/SolidButton";
import { useModal } from "@/hooks/useModal";
import ProfileImg from "@/app/(auth)/signup/components/ProfileImg";
import { useToast } from "@/hooks/useToast";
import { useAtomValue } from "jotai";
import { profileImgAtom } from "@/atoms/signupAtomStore";
import { profileImgActions } from "@/app/(auth)/signup/actions/profileImgActions";
import { changeMyInfoAction } from "../modalActions/changeMyInfoAction";

const ChangeMyInfoModal = () => {
  const { closeModal } = useModal();
  const { addToast } = useToast();
  const profileImg = useAtomValue(profileImgAtom);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<z.infer<typeof changeMyInfoSchema>>({
    resolver: zodResolver(changeMyInfoSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      nickname: "",
      phoneNumber: "",
    },
  });

  const inputArr = [
    {
      label: "이름",
      name: "name",
      type: "text",
      placeholder: "이름을 입력해주세요.",
      error: errors.name,
      register: register("name"),
    },
    {
      label: "닉네임",
      name: "nickname",
      type: "text",
      placeholder: "닉네임을 입력해주세요.",
      error: errors.nickname,
      register: register("nickname"),
    },
    {
      label: "연락처",
      name: "phoneNumber",
      type: "tel",
      placeholder: "숫자만 입력해주세요.",
      error: errors.phoneNumber,
      register: register("phoneNumber"),
    },
  ];

  const onSubmit = async (data: z.infer<typeof changeMyInfoSchema>) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value || "");
      });

      const response = await changeMyInfoAction(formData);

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
              "정보 수정은 완료되었으나 프로필 사진 업로드 중 오류가 발생했습니다.",
              "warning"
            );
          }
        }

        addToast("정보 수정이 완료되었습니다.", "info");
        closeModal();
      } else {
        console.error(response.message, response.status);
        addToast(response.message as string, "warning");
      }
    } catch (error) {
      console.error("정보 수정 에러 발생", error);
      addToast("정보 수정 중 오류가 발생했습니다.", "warning");
    }
  };

  return (
    <ModalContainer>
      <div className="flex flex-col items-center pb-[8px]">
        <strong className="text-2lg font-semibold text-black-400 pc:text-[32px] pc:leading-[46px]">
          내 정보 수정
        </strong>
        <div className="mt-10 pc:mt-[50px]">
          <ProfileImg />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-[25px] flex flex-col gap-[17px] pc:mt-10 pc:gap-8"
        >
          {inputArr.map((input) => (
            <div key={input.name} className="relative flex flex-col">
              <label htmlFor={input.name} className={labelStyle}>
                {input.label}
                <span className="text-red"> *</span>
              </label>
              <FormInput
                id={input.name}
                name={input.name as Path<z.infer<typeof changeMyInfoSchema>>}
                type={input.type}
                register={register}
                error={input.error}
                className={inputStyle}
                placeholder={input.placeholder}
              />
              <ErrorText error={input.error}>{input.error?.message}</ErrorText>
            </div>
          ))}

          <div className="mt-6 flex gap-[11px] pc:mt-[30px] pc:gap-3">
            <div className={buttmonContainerStyle}>
              <SolidButton
                size="xl"
                style="gray100"
                type="button"
                onClick={() => {
                  closeModal();
                }}
              >
                취소
              </SolidButton>
            </div>
            <div className={buttmonContainerStyle}>
              <SolidButton
                size="xl"
                disabled={!isValid || isSubmitting}
                style="orange300"
                type="submit"
              >
                수정하기
              </SolidButton>
            </div>
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
const buttmonContainerStyle = "h-[58px] w-[158px] pc:h-[72px] pc:w-[314px]";
