import { z } from "zod";

export const changeCEOInfoSchema = z.object({
  nickname: z.string().min(1, { message: "닉네임을 입력해주세요." }),
  storeName: z
    .string()
    .min(1, { message: "가게 이름(상호명)을 필수로 입력해주세요." })
    .optional(),
  storePhoneNumber: z
    .string()
    .regex(/^[0-9]*$/, { message: "올바르지 않은 번호입니다." })
    .optional(),
  phoneNumber: z
    .string()
    .regex(/^(010|011|016|017|018|019)\d{7,8}$/, {
      message: "올바르지 않은 번호입니다.",
    })
    .optional(),
  location: z
    .string()
    .min(1, { message: "가게 위치를 입력해주세요." })
    .optional(),
});
