"use client";

import AlbarPreview from "@/components/card/AlbarPreview";
import { AlbarformData } from "@/types/alba";
import EmptyState from "./EmptyState";
import BlurWrapper from "./BlurWrapper";
import Link from "next/link";
import FloatingButton from "@/components/button/FloatingButton";
import plusIcon from "@/../public/icon/plus-md.svg";
import useInfinityScroll from "@/hooks/useInfinityScroll";
import { AlbaListFetcherProps } from "./AlbaListFetcher";
import CardListSkeleton from "./CardListSkeleton";
import { useCallback, useState } from "react";
import { getAlbaList } from "../getAlbaList";

interface AlbaListProps {
  list: AlbarformData[];
  nextCursor: number | null;
  role: string;
  params?: AlbaListFetcherProps["params"];
}

const AlbaList = ({ list, nextCursor, role, params }: AlbaListProps) => {
  const [albaList, setAlbaList] = useState(list);
  const [cursor, setCursor] = useState(nextCursor);
  const [isLoading, setIsLoading] = useState(false);
  const orderBy = params?.orderBy ?? "mostRecent";
  const keyword = params?.keyword ?? "";
  const isPublic = params?.isPublic ?? undefined;
  const isRecruiting = params?.isRecruiting ?? undefined;

  const fetchMoreData = useCallback(async () => {
    if (!nextCursor) return;
    setIsLoading(true);
    try {
      const response = await getAlbaList({
        orderBy,
        limit: 6,
        cursor,
        keyword,
        isRecruiting,
      });

      const filteredData =
        isPublic !== undefined
          ? response.data.filter(
              (item: AlbarformData) => item.isPublic === isPublic
            )
          : response.data;

      setAlbaList((prevList) => [
        ...prevList,
        ...filteredData.filter(
          (newList: AlbarformData) =>
            !prevList.some((card) => card.id === newList.id)
        ),
      ]);

      setCursor(response.nextCursor);
    } catch (error) {
      console.error("알바폼 목록을 가져오는데 실패했습니다.", error);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy, cursor, nextCursor, keyword, isRecruiting, isPublic]);

  // 무한 스크롤 Ref
  const observerRef = useInfinityScroll({ fetchMoreData });

  return (
    <main className="min-h-screen bg-background-100">
      <section className="mx-auto mt-[9px] w-[327px] pc:mt-14 pc:w-[1479px] tablet:mt-[14px]">
        {albaList.length > 0 ? (
          <ul className="flex flex-col gap-y-8 pc:flex-row pc:flex-wrap pc:gap-x-6 pc:gap-y-16 tablet:gap-y-12">
            {albaList.map((item: AlbarformData) => (
              <li key={item.id} className="pc:w-[calc(33.333%_-_16px)]">
                {item.isPublic ? (
                  <Link href={`/alba/${item.id}`} className="block">
                    <BlurWrapper isPublic={item.isPublic}>
                      <AlbarPreview info={item} />
                    </BlurWrapper>
                  </Link>
                ) : (
                  <BlurWrapper isPublic={item.isPublic}>
                    <AlbarPreview info={item} />
                  </BlurWrapper>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState role={role} />
        )}
      </section>
      {role === "OWNER" && (
        <FloatingButton
          icon={plusIcon}
          href="/addform"
          className="pc:size-large fixed bottom-5 right-5 z-10 pc:bottom-20 pc:right-20 tablet:bottom-10 tablet:right-10"
        >
          폼 만들기
        </FloatingButton>
      )}
      {cursor && <div ref={observerRef} style={{ height: "10px" }} />}
      {isLoading && <CardListSkeleton count={3} />}
    </main>
  );
};

export default AlbaList;
