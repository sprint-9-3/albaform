import ErrorText from "@/components/errorText/ErrorText";
import DatePickerCalendar from "@/components/picker/DatepickerCalendar";
import { useEffect, useState } from "react";
import { addFormSchema } from "@/schema/addForm/addFormSchema";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

// stepThree에서는 포맷없이 임시저장 후 서버전달 직전 포맷 변환
const WorkDay = () => {
  const {
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<z.infer<typeof addFormSchema>>();
  const [temporaryDateRange, setTemporaryDateRange] = useState<
    [string, string]
  >(() => {
    const workStartDate = watch("workStartDate");
    const workEndDate = watch("workEndDate");
    return [workStartDate || "", workEndDate || ""];
  });

  useEffect(() => {
    setValue("workStartDate", temporaryDateRange[0]);
    setValue("workEndDate", temporaryDateRange[1]);
  }, [temporaryDateRange, setValue]);

  return (
    <div className="relative flex flex-col space-y-4">
      <label
        htmlFor="workDay"
        className="text-md font-medium text-black-400 pc:text-xl"
      >
        근무 기간
        <span className="text-orange-300"> *</span>
      </label>
      <DatePickerCalendar
        setDateRange={setTemporaryDateRange}
        initialDate={temporaryDateRange}
      />
      <ErrorText error={errors.workStartDate || errors.workEndDate}>
        {errors.workStartDate?.message || errors.workEndDate?.message}
      </ErrorText>
    </div>
  );
};

export default WorkDay;
