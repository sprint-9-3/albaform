"use server";

import instance from "@/lib/instance";
import { addFormSchema } from "@/schema/addForm/addFormSchema";
import { revalidateTag } from "next/cache";

export const addFormSubmit = async (
  formData: FormData,
  isEdit: boolean | undefined = false,
  formId?: string
) => {
  const imageUrlsString = formData.get("imageUrls")?.toString() ?? "[]";
  const workDaysString = formData.get("workDays")?.toString() ?? "[]";

  const data = {
    title: formData.get("title")?.toString(),
    description: formData.get("description")?.toString(),
    recruitmentStartDate: formData.get("recruitmentStartDate")?.toString(),
    recruitmentEndDate: formData.get("recruitmentEndDate")?.toString(),
    imageUrls: JSON.parse(imageUrlsString),
    numberOfPositions: Number(formData.get("numberOfPositions")),
    gender: formData.get("gender")?.toString(),
    education: formData.get("education")?.toString(),
    age: formData.get("age")?.toString(),
    preferred: formData.get("preferred")?.toString(),
    location: formData.get("location")?.toString(),
    workStartDate: formData.get("workStartDate")?.toString(),
    workEndDate: formData.get("workEndDate")?.toString(),
    workStartTime: formData.get("workStartTime")?.toString(),
    workEndTime: formData.get("workEndTime")?.toString(),
    workDays: JSON.parse(workDaysString),
    isNegotiableWorkDays: Boolean(formData.get("isNegotiableWorkDays")),
    hourlyWage: Number(formData.get("hourlyWage")),
    isPublic: Boolean(formData.get("isPublic")),
  };

  const checkData = addFormSchema.safeParse(data);

  if (!checkData.success) {
    return {
      status: false,
      message: checkData.error.flatten(),
    };
  }

  try {
    const responseUrl = isEdit
      ? `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/forms`;

    const response = await instance(responseUrl, {
      method: isEdit ? "PATCH" : "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseErrorText = {
      401: "로그인이 필요한 서비스입니다.",
      400: "입력하신 내용을 확인해주세요.",
    };

    if (response.status !== 201 && response.status !== 200) {
      console.error("addFormSubmit에서 오류 발생", response.status);
      return {
        status: response.status,
        message:
          responseErrorText[response.status as keyof typeof responseErrorText],
      };
    }

    const { id } = response;

    revalidateTag("myalbaform");

    return {
      status: response.status,
      id,
    };
  } catch (error) {
    console.error("addFormSubmit에서 서버 오류 발생", error);
    return {
      status: 500,
      message: "알바폼 등록 중에 오류가 발생했습니다.",
    };
  }
};
