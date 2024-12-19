import { useFormContext } from "react-hook-form";
import { addFormSchema } from "@/schema/addForm/addFormSchema";
import { z } from "zod";
import { useEffect, useMemo, useState } from "react";
import RequirementPicker from "@/components/picker/RequirementPicker";
import {
  stepActiveAtomFamily,
  temporaryDataByStepAtom,
} from "@/atoms/addFormAtomStore";
import { useSetAtom } from "jotai";
import LoadingSkeleton from "./LoadingSkeleton";

const StepTwoContents = () => {
  const {
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<z.infer<typeof addFormSchema>>();
  const setTemporaryDataByStep = useSetAtom(temporaryDataByStepAtom);
  const setStepActive = useSetAtom(stepActiveAtomFamily("stepTwo"));
  const [loading, setLoading] = useState(true);
  const [stepTwoData, setStepTwoData] = useState(() => {
    const currentValues = getValues();
    return {
      numberOfPositions: currentValues.numberOfPositions || 0,
      gender: currentValues.gender || "",
      education: currentValues.education || "",
      age: currentValues.age || "",
      preferred: currentValues.preferred || "",
    };
  });

  const fields = useMemo(
    () =>
      ["numberOfPositions", "gender", "education", "age", "preferred"] as const,
    []
  );

  const inputArr = [
    {
      label: "모집인원",
      name: "numberOfPositions",
      errors: errors.numberOfPositions,
    },
    { label: "성별", name: "gender", errors: errors.gender },
    { label: "학력", name: "education", errors: errors.education },
    { label: "연령", name: "age", errors: errors.age },
    { label: "우대사항", name: "preferred", errors: errors.preferred },
  ];

  // 2단계 '작성중' 태그 여부
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

  // 추출한 필수값을 폼에 적용
  useEffect(() => {
    if (stepTwoData) {
      const formattedData = {
        ...stepTwoData,
        numberOfPositions:
          String(stepTwoData.numberOfPositions) === "인원미정"
            ? 0
            : Number(stepTwoData.numberOfPositions),
      };
      fields.forEach((field) => {
        setValue(field, formattedData[field]);
      });
    }
  }, [stepTwoData, setValue, fields]);

  // 임시 데이터 atom 업데이트
  useEffect(() => {
    setTemporaryDataByStep((prev) => ({
      ...prev,
      stepTwo: stepTwoData,
    }));
  }, [stepTwoData, setTemporaryDataByStep]);

  // 임시 데이터 있으면 로컬스토리지에서 불러오기
  useEffect(() => {
    const localStorageData = localStorage.getItem("stepTwo");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);

      fields.forEach((field) => {
        setValue(field, parsedData[field]);
      });
      setStepTwoData(parsedData);
    }
    setLoading(false);
  }, [setValue, setStepTwoData, fields]);

  if (loading) {
    return <LoadingSkeleton count={5} />;
  }

  return (
    <div className="flex flex-col space-y-8 pc:w-[640px]">
      <div className="relative flex flex-col space-y-4">
        {inputArr.map((input) => (
          <div key={input.name}>
            <RequirementPicker
              label={
                input.label as
                  | "모집인원"
                  | "성별"
                  | "학력"
                  | "연령"
                  | "우대사항"
              }
              setStepTwoData={setStepTwoData}
              initialValue={stepTwoData}
              errors={errors}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepTwoContents;
