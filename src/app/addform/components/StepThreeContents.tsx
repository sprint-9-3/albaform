import { useFormContext } from "react-hook-form";
import { addFormSchema } from "@/schema/addForm/addFormSchema";
import { z } from "zod";
import {
  stepActiveAtomFamily,
  temporaryDataByStepAtom,
} from "@/atoms/addFormAtomStore";
import { useSetAtom } from "jotai";
import Location from "./stepThree/Location";
import RecruitmentDate from "./stepThree/WorkDay";
import WorkingTime from "./stepThree/WorkingTime";
import WorkDate from "./stepThree/WorkDate";
import HourlyWage from "./stepThree/HourlyWage";
import IsPublicCheck from "./stepThree/IsPublicCheck";
import { useEffect, useMemo, useState } from "react";
import { AddFormStepProps } from "@/types/addform";
import LoadingSkeleton from "./LoadingSkeleton";

const StepThreeContents = () => {
  const { watch, setValue } = useFormContext<z.infer<typeof addFormSchema>>();
  const setTemporaryDataByStep = useSetAtom(temporaryDataByStepAtom);
  const setStepActive = useSetAtom(stepActiveAtomFamily("stepThree"));
  const [loading, setLoading] = useState(true);

  const fields = useMemo(
    () =>
      [
        "location",
        "workStartDate",
        "workEndDate",
        "workStartTime",
        "workEndTime",
        "workDays",
        "hourlyWage",
        "isPublic",
        "isNegotiableWorkDays",
      ] as const,
    []
  );

  // 임시 데이터 atom 업데이트
  useEffect(() => {
    const subscription = watch((value) => {
      const stepThreeData = fields.reduce(
        (acc, field) => ({
          ...acc,
          [field]: field === "hourlyWage" ? Number(value[field]) : value[field],
        }),
        {} as NonNullable<AddFormStepProps["stepThree"]>
      );
      setTemporaryDataByStep((prev) => ({
        ...prev,
        stepThree: stepThreeData,
      }));
    });

    return () => subscription.unsubscribe();
  }, [watch, fields, setTemporaryDataByStep]);

  // 3단계 '작성중' 태그 여부
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && fields.includes(name as (typeof fields)[number])) {
        const currentValue = value[name as keyof typeof value];
        if (currentValue && String(currentValue).trim() !== "") {
          setStepActive(true);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, fields, setStepActive]);

  // 임시 데이터 로컬스토리지에서 불러오기
  useEffect(() => {
    const localStorageData = localStorage.getItem("stepThree");
    if (localStorageData) {
      const data = JSON.parse(localStorageData);
      fields.forEach((field) => {
        setValue(field, data[field]);
      });
    }
    setLoading(false);
  }, [setValue, fields]);

  if (loading) {
    return <LoadingSkeleton count={5} />;
  }

  return (
    <div className="flex flex-col space-y-8 pc:w-[640px]">
      <Location />
      <RecruitmentDate />
      <WorkingTime />
      <WorkDate />
      <HourlyWage />
      <IsPublicCheck />
    </div>
  );
};

export default StepThreeContents;
