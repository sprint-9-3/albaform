"use client";

import { AppliedAlbaData } from "@/types/alba";
import { ApplyListParams } from "../page";
import { useCallback, useState } from "react";
import { getApplyList } from "../getApplyList";
import useInfinityScroll from "@/hooks/useInfinityScroll";
import ApplicationInfo from "@/components/card/ApplicationInfo";
import SkeletonCardList from "./SkeletonCardList";
import EmptyState from "./EmptyState";
import Link from "next/link";

interface Props {
  list: AppliedAlbaData[];
  nextCursor: number | null | undefined;
  params: ApplyListParams;
  role: string;
}

const ApplyList = ({ list, nextCursor, params, role }: Props) => {
  const [applyList, setApplyList] = useState<AppliedAlbaData[]>(list);
  const [cursor, setCursor] = useState(nextCursor);
  const [isLoading, setIsLoading] = useState(false);
  const keyword = params?.keyword ?? "";
  const status = params?.status ?? undefined;

  const fetchMoreData = useCallback(async () => {
    if (!cursor || applyList.length === 0) return;
    setIsLoading(true);
    try {
      const response = await getApplyList({
        limit: 6,
        cursor,
        keyword,
        status,
      });

      setApplyList((prevList) => [
        ...prevList,
        ...response.data.filter(
          (newList: AppliedAlbaData) =>
            !prevList.some((card) => card.id === newList.id)
        ),
      ]);

      setCursor(response.nextCursor);
    } catch (error) {
      console.error("내 지원 내역 목록을 가져오는데 실패했습니다.", error);
    } finally {
      setIsLoading(false);
    }
  }, [cursor, applyList.length, keyword, status]);

  // 무한 스크롤 Ref
  const observerRef = useInfinityScroll({ fetchMoreData });

  return (
    <main>
      {applyList.length > 0 ? (
        <ul className="mx-auto flex w-[375px] flex-col pc:mt-6 pc:w-[1481px] pc:flex-row pc:flex-wrap pc:justify-start pc:gap-x-[25px] pc:gap-y-10 tablet:mt-6 tablet:w-[750px] tablet:flex-row tablet:flex-wrap">
          {applyList?.map((item) => (
            <li key={item.id}>
              <Link href={`/alba/${item.form.id}`}>
                <ApplicationInfo info={item} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState role={role} />
      )}
      {cursor && applyList.length > 0 && (
        <div ref={observerRef} style={{ height: "10px" }} />
      )}
      {isLoading && applyList.length > 0 && (
        <SkeletonCardList count={6} role={role} />
      )}
    </main>
  );
};

export default ApplyList;
