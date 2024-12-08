import { FieldErrors, UseFormRegister } from "react-hook-form";
import { addFormSchema } from "@/schema/addForm/addFormSchema";
import { z } from "zod";

interface StepThreeContentsProps {
  register: UseFormRegister<z.infer<typeof addFormSchema>>;
  errors: FieldErrors<z.infer<typeof addFormSchema>>;
}

const StepThreeContents = ({ register, errors }: StepThreeContentsProps) => {
  return (
    <div className="flex flex-col space-y-8 pc:w-[640px]">
      StepThreeContents
    </div>
  );
};

export default StepThreeContents;
