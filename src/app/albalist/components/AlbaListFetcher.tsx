"use server";

import AlbaList from "./AlbaList";
import { getAlbaList } from "../getAlbaList";
import { cookies } from "next/headers";

export interface AlbaListFetcherProps {
  params: {
    keyword?: string;
    orderBy?: string;
    isRecruiting?: boolean;
    isPublic?: boolean;
  };
}

const AlbaListFetcher = async ({ params }: AlbaListFetcherProps) => {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value || "APPLICANT";

  const response = await getAlbaList({
    orderBy: params.orderBy || "mostRecent",
    limit: 6,
    cursor: 0,
    keyword: params.keyword,
    isRecruiting:
      params.isRecruiting === undefined ? undefined : params.isRecruiting,
  });

  const albaList = response.data || [];
  const nextCursor: number | null = response.nextCursor;

  return (
    <AlbaList
      list={albaList}
      nextCursor={nextCursor}
      role={role}
      params={params}
    />
  );
};

export default AlbaListFetcher;
