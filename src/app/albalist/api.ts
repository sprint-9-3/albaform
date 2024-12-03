interface SearchParamsData {
  orderBy?: string;
  limit: number;
  keyword?: string;
  isRecruiting?: boolean | undefined;
}

export const getAlbaList = async ({
  orderBy,
  limit,
  keyword,
  isRecruiting,
}: SearchParamsData) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/forms`);

  url.searchParams.append("orderBy", orderBy || "mostRecent");
  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("keyword", keyword || "");
  isRecruiting !== undefined &&
    url.searchParams.append("isRecruiting", String(isRecruiting));

  const response = await fetch(url.toString());
  const result = await response.json();

  return {
    status: response.status,
    data: result.data,
    nextCursor: result.nextCursor,
  };
};
