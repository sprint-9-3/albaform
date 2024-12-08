import {
  currentImageListAtom,
  temporaryDataByStepAtom,
} from "@/atoms/addFormAtom";
import ErrorText from "@/components/errorText/ErrorText";
import FormInput from "@/components/input/FormInput";
import DatePickerCalendar from "@/components/picker/DatepickerCalendar";
import { addFormSchema } from "@/schema/addForm/addFormSchema";
import { cls } from "@/utils/dynamicTailwinds";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { z } from "zod";
import ImageInput from "@/components/button/ImageInput";
import useViewPort from "@/hooks/useViewport";

interface StepOneContentsProps {
  register: UseFormRegister<z.infer<typeof addFormSchema>>;
  errors: FieldErrors<z.infer<typeof addFormSchema>>;
  watch: UseFormWatch<z.infer<typeof addFormSchema>>;
  setValue: UseFormSetValue<z.infer<typeof addFormSchema>>;
  getValues: UseFormGetValues<z.infer<typeof addFormSchema>>;
}

const StepOneContents = ({
  register,
  errors,
  watch,
  setValue,
  getValues,
}: StepOneContentsProps) => {
  const viewPort = useViewPort();
  const [currentImageList, setCurrentImageList] = useAtom(currentImageListAtom);
  const setTemporaryDataByStep = useSetAtom(temporaryDataByStepAtom);
  const [dateRange, setDateRange] = useState<[string, string]>(["", ""]);

  // 서버전달 시 필요한 날짜 포맷 변환
  const handleDateRangeFormat = (dateString: string) => {
    const formattedDate =
      dateString.replace(/\.\s*/g, "-").slice(0, -1) + "T00:00:00";
    return formattedDate;
  };

  // 모집 기간 날짜 포맷 변환 후 서버전달 데이터에 저장
  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const startDate = handleDateRangeFormat(dateRange[0]);
      const endDate = handleDateRangeFormat(dateRange[1]);
      setValue("recruitmentStartDate", startDate);
      setValue("recruitmentEndDate", endDate);
    }
  }, [dateRange, setValue]);

  // 임시 데이터 atom 업데이트
  useEffect(() => {
    const temporaryStepOneData = {
      title: getValues("title"),
      description: getValues("description"),
      recruitmentStartDate: dateRange[0],
      recruitmentEndDate: dateRange[1],
      imageUrls: currentImageList, // 임시저장을 위해 서버 업로드 전 이미지를 저장
    };

    setTemporaryDataByStep({
      stepOne: temporaryStepOneData,
    });
  }, [dateRange, getValues, setTemporaryDataByStep, currentImageList]);

  // 임시 데이터 있으면 로컬스토리지에서 불러오기
  useEffect(() => {
    const localStorageData = localStorage.getItem("stepOne");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setValue("title", parsedData.title);
      setValue("description", parsedData.description);
      setValue("recruitmentStartDate", parsedData.recruitmentStartDate);
      setValue("recruitmentEndDate", parsedData.recruitmentEndDate);
      setCurrentImageList(parsedData.imageUrls);
      setDateRange([
        parsedData.recruitmentStartDate,
        parsedData.recruitmentEndDate,
      ]);
    }
  }, [setValue, setCurrentImageList]);

  return (
    <div className="flex flex-col space-y-8 pc:w-[640px]">
      <div className="relative flex flex-col space-y-4">
        <label
          htmlFor="title"
          className="text-md font-medium text-black-400 pc:text-xl"
        >
          알바폼 제목
          <span className="text-orange-300"> *</span>
        </label>
        <FormInput
          id="title"
          type="text"
          placeholder="제목을 입력해주세요."
          register={register}
          error={errors.title}
          name="title"
          className={cls(
            "addform-input-base",
            errors.title ? "ring-1 ring-red" : ""
          )}
        />
        <ErrorText error={errors.title}>{errors.title?.message}</ErrorText>
      </div>
      <div className="relative flex flex-col space-y-4">
        <label
          htmlFor="description"
          className="text-md font-medium text-black-400 pc:text-xl"
        >
          소개글
          <span className="text-orange-300"> *</span>
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows={5}
          className={cls(
            "addform-input-base outline-none",
            errors.description ? "ring-1 ring-red" : ""
          )}
          placeholder="최대 200자까지 입력 가능합니다."
        />
        <ErrorText error={errors.description}>
          {errors.description?.message}
        </ErrorText>
      </div>
      <div className="flex flex-col space-y-4">
        <label
          htmlFor="recruitmentDate"
          className="text-md font-medium text-black-400 pc:text-xl"
        >
          모집 기간
          <span className="text-orange-300"> *</span>
        </label>
        <DatePickerCalendar
          setDateRange={setDateRange}
          initialDate={dateRange}
        />
        <ErrorText
          error={errors.recruitmentStartDate || errors.recruitmentEndDate}
        >
          {errors.recruitmentStartDate?.message ||
            errors.recruitmentEndDate?.message}
        </ErrorText>
      </div>
      <div className="flex flex-col space-y-4">
        <label
          htmlFor="image"
          className="text-md font-medium text-black-400 pc:text-xl"
        >
          이미지 첨부
        </label>
        <ImageInput
          size={viewPort === "pc" ? "medium" : "small"}
          onImageChange={setCurrentImageList}
        />
      </div>
    </div>
  );
};

export default StepOneContents;
