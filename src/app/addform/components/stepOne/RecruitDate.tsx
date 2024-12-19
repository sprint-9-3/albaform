import ErrorText from "@/components/errorText/ErrorText";
import DatePickerCalendar from "@/components/picker/DatepickerCalendar";
import { addFormSchema } from "@/schema/addForm/addFormSchema";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

const RecruitDate = () => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext<z.infer<typeof addFormSchema>>();
  const startDate = watch("recruitmentStartDate");
  const endDate = watch("recruitmentEndDate");

  const [temporaryDateRange, setTemporaryDateRange] = useState<
    [string, string]
  >(() => {
    return [startDate || "", endDate || ""];
  });

  // 서버에서 가져온 폼이 있을 경우 마운트 시에 데이터 업데이트 (값이 사용자에게 안보이는 경우를 해결함)
  useEffect(() => {
    setValue("recruitmentStartDate", temporaryDateRange[0]);
    setValue("recruitmentEndDate", temporaryDateRange[1]);
  }, [temporaryDateRange, setValue]);

  return (
    <div className="flex flex-col space-y-4">
      <label
        htmlFor="recruitmentDate"
        className="text-md font-medium text-black-400 pc:text-xl"
      >
        모집 기간
        <span className="text-orange-300"> *</span>
      </label>
      <DatePickerCalendar
        setDateRange={setTemporaryDateRange}
        initialDate={temporaryDateRange}
      />
      <ErrorText
        error={errors.recruitmentStartDate || errors.recruitmentEndDate}
      >
        {errors.recruitmentStartDate?.message ||
          errors.recruitmentEndDate?.message}
      </ErrorText>
    </div>
  );
};

export default RecruitDate;
