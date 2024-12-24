import instance from "@/lib/instance";

const fetchApplicantData = async (applicationId: string) => {
  const response = await instance(
    `${process.env.NEXT_PUBLIC_API_URL}/applications/${applicationId}`,
    {
      method: "GET",
      headers: { "content-type": "application/json" },
    }
  );

  if (!response) {
    throw new Error(`instance 요청에 실패했습니다.: ${response.statusText}`);
  }

  return response;
};

export default fetchApplicantData;
