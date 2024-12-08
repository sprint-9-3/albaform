import { z } from "zod";

export const addFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "제목을 입력해주세요." })
    .max(20, { message: "제목은 20자 이상 입력할 수 없습니다." })
    .trim(),
  description: z
    .string()
    .min(1, { message: "내용을 입력해주세요." })
    .max(200, { message: "내용은 200자 이상 입력할 수 없습니다." })
    .regex(/([A-Za-zㄱ-ㅎ가-힣0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/`~\\|-])/, {
      message: "해당 기호는 사용할 수 없습니다.",
    })
    .trim(),
  recruitmentStartDate: z
    .string()
    .min(1, { message: "모집 시작일을 입력해주세요." }),
  recruitmentEndDate: z
    .string()
    .min(1, { message: "모집 종료일을 입력해주세요." }),
  imageUrls: z
    .array(z.string())
    .min(1, { message: "이미지를 1장 이상 첨부해주세요." }),
  numberOfPositions: z
    .number()
    .min(1, { message: "모집 인원을 입력해주세요." }),
  gender: z.string().min(1, { message: "성별을 선택해주세요." }),
  education: z.string().min(1, { message: "학력을 선택해주세요." }),
  age: z.string().min(1, { message: "연령대를 선택해주세요." }),
  preferred: z.string().min(1, { message: "우대사항을 선택해주세요." }),
  location: z.string().min(1, { message: "근무지를 입력해주세요." }).trim(),
  workStartDate: z.string().min(1, { message: "근무 시작일을 선택해주세요." }),
  workEndDate: z.string().min(1, { message: "근무 종료일을 선택해주세요." }),
  workStartTime: z
    .string()
    .min(1, { message: "근무 시작시간을 선택해주세요." }),
  workEndTime: z.string().min(1, { message: "근무 종료시간을 선택해주세요." }),
  workDays: z.array(z.string()).min(1, { message: "근무요일을 선택해주세요." }),
  isNegotiableWorkDays: z.boolean(),
  hourlyWage: z.number().min(1, { message: "시급을 입력해주세요." }),
  isPublic: z.boolean(),
});
