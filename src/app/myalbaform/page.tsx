"use server";

import { cookies } from "next/headers";
import { Suspense } from "react";
import SkeletonCardList from "./components/SkeletonCardList";
import ListFetcher from "./components/ListFetcher";

export interface AlbaFormListParams {
  keyword?: string;
  orderBy?: string;
  isRecruiting?: boolean;
  isPublic?: boolean;
}

export interface ApplyListParams {
  keyword?: string;
  status?: string | undefined;
}

const MyAlbaFormPage = async ({
  searchParams,
}: {
  searchParams: Promise<AlbaFormListParams | ApplyListParams>;
}) => {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value || "APPLICANT";

  const importedSearchParams = await searchParams;

  let params: AlbaFormListParams | ApplyListParams;

  if (role === "OWNER") {
    const { keyword, orderBy, isRecruiting, isPublic } =
      importedSearchParams as AlbaFormListParams;

    params = {
      keyword,
      orderBy,
      isRecruiting,
      isPublic,
    };
  } else {
    const { keyword, status } = importedSearchParams as ApplyListParams;

    params = {
      keyword,
      status,
    };
  }

  return (
    <div className="flex justify-center">
      <Suspense
        key={
          role === "OWNER"
            ? `${(params as AlbaFormListParams).orderBy}-${
                (params as AlbaFormListParams).keyword
              }-${(params as AlbaFormListParams).isRecruiting}-${
                (params as AlbaFormListParams).isPublic
              }`
            : `${(params as ApplyListParams).keyword}-${
                (params as ApplyListParams).status
              }`
        }
        fallback={<SkeletonCardList count={12} role={role} />}
      >
        <ListFetcher params={params} role={role} />
      </Suspense>
    </div>
  );
};

export default MyAlbaFormPage;
