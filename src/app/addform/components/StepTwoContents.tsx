import { FieldErrors, UseFormRegister } from "react-hook-form";
import { addFormSchema } from "@/schema/addForm/addFormSchema";
import { z } from "zod";

interface StepTwoContentsProps {
  register: UseFormRegister<z.infer<typeof addFormSchema>>;
  errors: FieldErrors<z.infer<typeof addFormSchema>>;
}

const StepTwoContents = ({ register, errors }: StepTwoContentsProps) => {
  return (
    <div className="flex flex-col space-y-8 pc:w-[640px]">StepTwoContents</div>
  );
};

export default StepTwoContents;
