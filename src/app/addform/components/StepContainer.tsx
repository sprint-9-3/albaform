"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { addFormSchema } from "@/schema/addForm/addFormSchema";
import StepOneContents from "./StepOneContents";
import StepTwoContents from "./StepTwoContents";
import StepThreeContents from "./StepThreeContents";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Fragment } from "react";
import { currentImageListAtom } from "@/atoms/addFormAtom";
import { useAtomValue } from "jotai";

const StepContainer = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "stepOne";
  const currentImageList = useAtomValue(currentImageListAtom);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm<z.infer<typeof addFormSchema>>({
    resolver: zodResolver(addFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      recruitmentStartDate: "",
      recruitmentEndDate: "",
      imageUrls: [],
      numberOfPositions: 0,
      gender: "",
      education: "",
      age: "",
      preferred: "",
      location: "",
      workStartDate: "",
      workEndDate: "",
      workStartTime: "",
      workEndTime: "",
      workDays: [],
      isNegotiableWorkDays: false,
      hourlyWage: 0,
      isPublic: false,
    },
  });

  const componentsByStepArr = [
    { step: "stepOne", component: StepOneContents },
    { step: "stepTwo", component: StepTwoContents },
    { step: "stepThree", component: StepThreeContents },
  ];

  return (
    <form className="p-6">
      {componentsByStepArr.map((component) => (
        <Fragment key={component.step}>
          {step === component.step && (
            <component.component
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              getValues={getValues}
            />
          )}
        </Fragment>
      ))}
    </form>
  );
};

export default StepContainer;
