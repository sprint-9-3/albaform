import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import {
  applicantSchema,
  ownerSchema,
} from "../../../../schema/signup/signupSchema";
import Image from "next/image";
import PrimaryCTA from "@/components/button/PrimaryCTA";
import { StepTwoInput } from "./StepTwoInput";
import { cls } from "@/utils/DynamicTailwind";
import ProfileImg from "./ProfileImg";
import FormInput from "@/components/input/FormInput";
import ErrorText from "@/components/errorText/ErrorText";

interface SignupSecondContentsProps {
  register: UseFormRegister<
    z.infer<typeof applicantSchema> | z.infer<typeof ownerSchema>
  >;
  errors: FieldErrors<
    z.infer<typeof applicantSchema> | z.infer<typeof ownerSchema>
  >;
  isSubmitting: boolean;
  userType: string;
  isValid: boolean;
}

const SignupSecondContents = ({
  register,
  errors,
  isSubmitting,
  userType,
  isValid,
}: SignupSecondContentsProps) => {
  const inputArr = StepTwoInput({ userType, register, errors });
  const ownerErrors = errors as FieldErrors<z.infer<typeof ownerSchema>>;

  return (
    <div className="flex flex-col items-center space-y-10">
      <ProfileImg />
      {inputArr.map((input) => (
        <div
          className="relative flex w-full flex-col space-y-2"
          key={input.name}
        >
          <label htmlFor={input.name} className="text-md text-black-400">
            {input.title}{" "}
            {input.isRequired && <span className="text-orange-300">*</span>}
          </label>
          <FormInput
            register={register}
            type={input.type}
            name={
              input.name as Path<
                z.infer<typeof applicantSchema> | z.infer<typeof ownerSchema>
              >
            }
            error={
              input.error as FieldErrors<
                z.infer<typeof applicantSchema> | z.infer<typeof ownerSchema>
              >
            }
            placeholder={input.placeholder}
          />
          <ErrorText error={input.error}>{input.error}</ErrorText>
        </div>
      ))}
      {userType === "owner" && (
        <div className="relative flex w-full flex-col space-y-2">
          <label htmlFor="storeLocation" className="text-md text-black-400">
            가게 위치
          </label>
          <div
            className={cls(
              "form-input-base flex items-center space-x-2 focus-within:border-orange-300",
              ownerErrors.location ? "border-red" : ""
            )}
          >
            <Image
              src="/icon/pin-fill-lg.svg"
              alt="가게 위치"
              width={36}
              height={36}
            />
            <input
              {...register("location")}
              type="text"
              name="location"
              className="w-full"
              placeholder="위치를 입력해주세요."
            />
            <ErrorText error={ownerErrors.location}>
              {ownerErrors.location?.message}
            </ErrorText>
          </div>
        </div>
      )}
      <PrimaryCTA disabled={!isValid || isSubmitting} type="submit">
        시작하기
      </PrimaryCTA>
    </div>
  );
};

export default SignupSecondContents;
