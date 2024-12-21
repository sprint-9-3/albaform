"use client";

import AlbarPreview from "@/components/card/AlbarPreview";
import { AlbarformData } from "@/types/alba";
import EmptyState from "./EmptyState";
import FloatingButton from "@/components/button/FloatingButton";
import plusIcon from "@/../public/icon/plus-md.svg";
import useInfinityScroll from "@/hooks/useInfinityScroll";
import SkeletonCardList from "./SkeletonCardList";
import { useCallback, useState } from "react";
import { getAlbaFormList } from "../getAlbaFormList";
import { AlbaFormListParams } from "../page";

interface Props {
  list: AlbarformData[];
  nextCursor: number | null;
  role: string;
  params?: AlbaFormListParams;
}

const AlbaFormList = ({ list, nextCursor, role, params }: Props) => {
  const [formList, setFormList] = useState(list);
  const [cursor, setCursor] = useState(nextCursor);
  const [isLoading, setIsLoading] = useState(false);
  const orderBy = params?.orderBy ?? "mostRecent";
  const keyword = params?.keyword ?? "";
  const isPublic = params?.isPublic ?? undefined;
  const isRecruiting = params?.isRecruiting ?? undefined;

  const fetchMoreData = useCallback(async () => {
    if (!cursor || formList.length === 0) return;
    setIsLoading(true);
    try {
      const response = await getAlbaFormList({
        orderBy,
        limit: 6,
        cursor,
        keyword,
        isPublic,
        isRecruiting,
      });

      setFormList((prevList) => [
        ...prevList,
        ...response.data.filter(
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
  }, [orderBy, cursor, formList.length, keyword, isRecruiting, isPublic]);

  // 무한 스크롤 Ref
  const observerRef = useInfinityScroll({ fetchMoreData });

  return (
    <main className="min-h-screen">
      <section className="mx-auto mt-[9px] w-[327px] pc:mt-14 pc:w-[1479px] tablet:mt-[14px] tablet:w-[670px]">
        {formList.length > 0 ? (
          <ul className="flex flex-col gap-y-8 pc:flex-row pc:flex-wrap pc:gap-x-6 pc:gap-y-16 tablet:flex-row tablet:flex-wrap tablet:gap-x-4 tablet:gap-y-12">
            {formList.map((item: AlbarformData) => (
              <li key={item.id} className="pc:w-[calc(33.333%_-_16px)]">
                <AlbarPreview info={item} role={role} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState role={role} />
        )}
      </section>
      <FloatingButton
        icon={plusIcon}
        href="/addform"
        className="pc:size-large fixed bottom-20 right-10 z-10"
      >
        폼 만들기
      </FloatingButton>
      {cursor && formList.length > 0 && (
        <div ref={observerRef} style={{ height: "10px" }} />
      )}
      {isLoading && formList.length > 0 && (
        <SkeletonCardList count={3} role={role} />
      )}
    </main>
  );
};

export default AlbaFormList;
