"use server";

import instance from "@/lib/instance";

export const applyFormActions = async (formData: FormData, formId: string) => {
  const data = {
    name: formData.get("name")?.toString(),
    phoneNumber: formData.get("phoneNumber")?.toString(),
    experienceMonths: formData.get("experienceMonths")?.toString(),
    resumeName: formData.get("resumeName")?.toString(),
    resumeId: formData.get("resumeId")?.toString(),
    introduction: formData.get("introduction"),
    password: formData.get("password")?.toString() || "",
  };

  const response = await instance(
    `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/applications`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status < 200 || response.status >= 300) {
    throw new Error(response.error || "지원서 제출 중 문제가 발생했습니다.");
  }

  return response;
};
