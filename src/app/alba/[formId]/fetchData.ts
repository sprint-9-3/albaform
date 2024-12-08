const fetchData = async (formId: string) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    throw new Error("API URL이 env파일에 정의되어 있지 않습니다.");
  }

  const response = await fetch(`${API_URL}/forms/${formId}`);
  if (!response.ok) {
    throw new Error(`데이터 요청에 실패했습니다.: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export default fetchData;
