const fetchAlbarformDetailData = async (formId: string) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    throw new Error("API URL을 찾지 못했습니다.");
  }

  const response = await fetch(`${API_URL}/forms/${formId}`, {
    method: "GET",
  });
  if (!response.ok) return new Error("알바폼 상세 조회에 실패했습니다.");
  return response.json();
};

export default fetchAlbarformDetailData;
