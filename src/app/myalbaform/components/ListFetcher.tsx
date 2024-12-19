import AlbaFormList from "./AlbaFormList";
import { getAlbaFormList } from "../getAlbaFormList";
import ApplyList from "./ApplyList";
import { AlbaFormListParams, ApplyListParams } from "../page";
import { getApplyList } from "../getApplyList";

interface AlbaFormListProps {
  params: AlbaFormListParams;
  role: string;
}

interface ApplyListProps {
  params: ApplyListParams;
  role: string;
}

const ListFetcher = async ({
  params,
  role,
}: AlbaFormListProps | ApplyListProps) => {
  if (role === "OWNER") {
    const albaParams = params as AlbaFormListParams;

    const response = await getAlbaFormList({
      orderBy: albaParams.orderBy || "mostRecent",
      limit: 6,
      cursor: 0,
      keyword: albaParams.keyword,
      isPublic: albaParams.isPublic,
      isRecruiting:
        albaParams.isRecruiting === undefined
          ? undefined
          : albaParams.isRecruiting,
    });

    const list = response.data || [];
    const nextCursor: number | null = response.nextCursor;

    return (
      <AlbaFormList
        list={list}
        nextCursor={nextCursor}
        role={role}
        params={albaParams}
      />
    );
  } else {
    const applyParams = params as ApplyListParams;

    const response = await getApplyList({
      limit: 12,
      cursor: 0,
      status: applyParams.status === undefined ? undefined : applyParams.status,
      keyword: applyParams.keyword || "",
    });

    const list = response.data || [];
    const nextCursor: number | null | undefined = response.nextCursor;

    return (
      <ApplyList
        list={list}
        nextCursor={nextCursor}
        params={applyParams}
        role={role}
      />
    );
  }
};

export default ListFetcher;
