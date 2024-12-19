"use server";

import instance from "@/lib/instance";
import { applySchema } from "@/schema/apply/applySchema";

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

  const parsedData = applySchema.safeParse(data);

  if (!parsedData.success) {
    return {
      status: false,
      message: parsedData.error.flatten(),
    };
  }

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

  if (response.status !== 200) {
    return {
      status: response.status,
      message: response.error,
    };
  }

  return {
    status: response.status,
    id: response.id,
  };
};
