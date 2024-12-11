import { z } from "zod";

export const applySchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  phoneNumber: z.string().regex(/^(|010|011|016|017|018|019)\d{7,8}$/, {
    message: "올바르지 않은 번호입니다.",
  }),
  experienceMonths: z
    .string()
    .regex(/^\d+$/, { message: "숫자(정수)만 입력해주세요." })
    .refine((value) => parseInt(value, 10) <= 600, {
      message: "최대 600개월까지 입력 가능합니다.",
    }),

  resumeName: z.string().regex(/\.(pdf|word)$/, {
    message: "허용되는 파일 형식은 pdf, word 입니다.",
  }),
  resumeId: z.string(),
  introduction: z
    .string()
    .min(1, { message: "자기 소개를 입력해주세요." })
    .max(200, { message: "200자 이내로 입력해주세요." })
    .regex(/([A-Za-zㄱ-ㅎ가-힣0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/`~\\|-])/, {
      message: "해당 기호는 사용할 수 없습니다.",
    })
    .trim(),
  password: z
    .string()
    .min(8, { message: "비밀번호 8자 이상 입력해주세요." })
    .max(12, { message: "비밀번호는 12자 이내여야합니다." })
    .trim(),
});
