import { applySchema } from "@/schema/apply/applySchema";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { z } from "zod";

export interface ApplyFormInputListProps {
  register: UseFormRegister<z.infer<typeof applySchema>>;
  errors: FieldErrors<z.infer<typeof applySchema>>;
  watch: UseFormWatch<z.infer<typeof applySchema>>;
  setValue: UseFormSetValue<z.infer<typeof applySchema>>;
  handleUploadResume: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}
