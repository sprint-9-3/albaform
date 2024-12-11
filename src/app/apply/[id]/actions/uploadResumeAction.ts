"use server";

export async function uploadResumeAction(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/resume/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("이력서 업로드 실패");
  }

  const result = await response.json();
  return result;
}
