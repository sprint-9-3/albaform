import ErrorText from "@/components/errorText/ErrorText";
import FormInput from "@/components/input/FormInput";
import { addFormSchema } from "@/schema/addForm/addFormSchema";
import { cls } from "@/utils/dynamicTailwinds";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

const AlbaformTitle = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<z.infer<typeof addFormSchema>>();

  return (
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
          "addform-input-base outline-none",
          errors.title ? "ring-1 ring-red" : ""
        )}
      />
      <ErrorText error={errors.title}>{errors.title?.message}</ErrorText>
    </div>
  );
};

export default AlbaformTitle;
