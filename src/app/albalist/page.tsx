"use server";

import { Suspense } from "react";
import AlbaListFetcher from "./components/AlbaListFetcher";
import CardListSkeleton from "./components/CardListSkeleton";

interface AlbaListPageProps {
  searchParams: Promise<{
    keyword?: string;
    orderBy?: string;
    isRecruiting?: string;
    isPublic?: string;
  }>;
}

const AlbaListPage = async ({ searchParams }: AlbaListPageProps) => {
  const { keyword, orderBy, isRecruiting, isPublic } = await searchParams;

  const params = {
    keyword,
    orderBy,
    isRecruiting:
      isRecruiting === "true"
        ? true
        : isRecruiting === "false"
          ? false
          : undefined,
    isPublic:
      isPublic === "true" ? true : isPublic === "false" ? false : undefined,
  };

  return (
    <div className="flex justify-center">
      <Suspense
        key={`${params.orderBy}-${params.keyword}-${params.isRecruiting}-${params.isPublic}`}
        fallback={<CardListSkeleton count={6} />}
      >
        <AlbaListFetcher params={params} />
      </Suspense>
    </div>
  );
};

export default AlbaListPage;
