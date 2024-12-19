import ErrorText from "@/components/errorText/ErrorText";
import { addFormSchema } from "@/schema/addForm/addFormSchema";
import { cls } from "@/utils/dynamicTailwinds";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

const AlbaformDescription = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<z.infer<typeof addFormSchema>>();

  return (
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
          "addform-input-base resize-none outline-none",
          errors.description ? "ring-1 ring-red" : ""
        )}
        placeholder="최대 200자까지 입력 가능합니다."
      />
      <ErrorText error={errors.description}>
        {errors.description?.message}
      </ErrorText>
    </div>
  );
};

export default AlbaformDescription;
