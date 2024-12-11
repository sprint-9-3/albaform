import { applySchema } from "@/schema/apply/applySchema";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";

export interface ApplyFormInputData {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  inputStyle: string;
  error: any;
  register: any;
}

export interface ApplyFormInputListProps {
  inputArr: ApplyFormInputData[];
  register: UseFormRegister<z.infer<typeof applySchema>>;
  errors: FieldErrors<z.infer<typeof applySchema>>;
  watch: (fieldName: string) => any;
  setValue: any;
  setVisible: any;
  handleUploadResume: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
