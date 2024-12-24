import { addFormSchema } from "@/schema/addForm/addFormSchema";
import { AddFormStepProps } from "@/types/addform";
import { fileToBase64 } from "@/utils/imageFileConvert";
import { useCallback, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

// stepOne 데이터 관리
export const useAddFormStepOne = () => {
  const { watch, setValue, getValues } =
    useFormContext<z.infer<typeof addFormSchema>>();

  const fields = useMemo(
    () =>
      [
        "title",
        "description",
        "recruitmentStartDate",
        "recruitmentEndDate",
      ] as const,
    []
  );

  const stepOneData = useMemo(() => {
    return fields.reduce(
      (acc, field) => ({ ...acc, [field]: watch(field) }),
      {} as NonNullable<AddFormStepProps["stepOne"]>
    );
  }, [watch, fields]);

  return { watch, setValue, getValues, stepOneData, fields };
};

// stepOne 임시 데이터 관리
export const useStepOneTemporaryData = ({
  currentImageList,
  temporaryDateRange,
  setTemporaryDataByStep,
}: {
  currentImageList: File[];
  temporaryDateRange: [string, string];
  setTemporaryDataByStep: (data: AddFormStepProps) => void;
}) => {
  const { getValues } = useFormContext<z.infer<typeof addFormSchema>>();

  // 임시 데이터 atom 업데이트
  useEffect(() => {
    const title = getValues("title");
    const description = getValues("description");

    const updateTemporaryData = async () => {
      const base64Images = await Promise.all(
        currentImageList.map((img) => fileToBase64(img))
      );

      const temporaryStepOneData = {
        title,
        description,
        recruitmentStartDate: temporaryDateRange[0],
        recruitmentEndDate: temporaryDateRange[1],
        tempImage: base64Images, // 임시저장을 위해 서버 업로드 전 이미지를 저장
      };

      setTemporaryDataByStep({
        stepOne: temporaryStepOneData,
      });
    };

    updateTemporaryData();
  }, [getValues, setTemporaryDataByStep, currentImageList, temporaryDateRange]);

  const loadFromLocalStorage = useCallback(() => {
    const localStorageData = localStorage.getItem("stepOne");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      return parsedData;
    }
    return null;
  }, []);

  return { loadFromLocalStorage };
};

export const useStepOneActive = ({
  fields,
  setStepOneActive,
}: {
  fields: readonly string[];
  setStepOneActive: (active: boolean) => void;
}) => {
  const { watch } = useFormContext<z.infer<typeof addFormSchema>>();

  // 1단계 '작성중' 태그 여부
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && fields.includes(name as (typeof fields)[number])) {
        const currentValue = value[name as keyof typeof value];
        if (currentValue && String(currentValue).trim() !== "") {
          setStepOneActive(true);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, fields, setStepOneActive]);
};
