import {
  currentImageListAtom,
  stepActiveAtomFamily,
  temporaryDataByStepAtom,
} from "@/atoms/addFormAtomStore";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { base64ToFile } from "@/utils/imageFileConvert";
import LoadingSkeleton from "./LoadingSkeleton";
import AlbaformTitle from "./stepOne/AlbaformTitle";
import AlbaformDescription from "./stepOne/AlbaformDescription";
import RecruitDate from "./stepOne/RecruitDate";
import AddformImage from "./stepOne/AddformImage";
import {
  useAddFormStepOne,
  useStepOneTemporaryData,
  useStepOneActive,
} from "@/hooks/useAddFormStepOne";
import { newWriteAtom } from "@/atoms/newWrite";

const StepOneContents = () => {
  const { watch, setValue, stepOneData, fields } = useAddFormStepOne();
  const [currentImageList, setCurrentImageList] = useAtom(currentImageListAtom);
  const setTemporaryDataByStep = useSetAtom(temporaryDataByStepAtom);
  const setStepOneActive = useSetAtom(stepActiveAtomFamily("stepOne"));
  const startDate = watch("recruitmentStartDate");
  const endDate = watch("recruitmentEndDate");
  let temporaryDateRange: [string, string] = [startDate || "", endDate || ""];
  const isNewWrite = useAtomValue(newWriteAtom);

  const [loading, setLoading] = useState(true);
  const { loadFromLocalStorage } = useStepOneTemporaryData({
    currentImageList,
    temporaryDateRange,
    setTemporaryDataByStep,
  });

  // 1단계 '작성중' 태그 여부
  useStepOneActive({ fields, setStepOneActive });

  // 추출한 필수값을 폼에 적용
  useEffect(() => {
    if (stepOneData) {
      fields.forEach((field) => {
        setValue(field, stepOneData[field]);
      });
    }
  }, [stepOneData, setValue, fields]);

  // 임시 데이터 있으면 로컬스토리지에서 불러오기
  useEffect(() => {
    if (isNewWrite) {
      fields.forEach((field) => {
        setValue(field, "");
      });
      setTemporaryDataByStep({
        stepOne: {
          title: "",
          description: "",
          recruitmentStartDate: "",
          recruitmentEndDate: "",
          tempImage: [],
        },
      });
      setLoading(false);
      return;
    }

    const loadData = async () => {
      const localStorageData = await loadFromLocalStorage();
      if (localStorageData) {
        fields.forEach((field) => {
          setValue(field, localStorageData[field]);
        });

        // 임시 이미지 파일 객체로 변환
        Promise.all(
          localStorageData.tempImage.map(async (base64: string) => {
            return await base64ToFile(base64, "imageUrls");
          })
        ).then((files) => {
          setCurrentImageList(files);
        });
      }
      setLoading(false);
    };

    loadData();
  }, [
    setValue,
    setCurrentImageList,
    fields,
    loadFromLocalStorage,
    isNewWrite,
    setTemporaryDataByStep,
  ]);

  if (loading) {
    return <LoadingSkeleton isImage={true} />;
  }

  return (
    <div className="flex flex-col space-y-8 pc:w-[640px]">
      <AlbaformTitle />
      <AlbaformDescription />
      <RecruitDate />
      <AddformImage />
    </div>
  );
};

export default StepOneContents;
