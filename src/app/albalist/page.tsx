import { getAlbaList } from "./api";
import AlbaList from "./components/AlbaList";

const AlbaListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    keyword?: string;
    orderBy?: string;
    isRecruiting?: boolean;
  }>;
}) => {
  const { keyword, orderBy, isRecruiting } = await searchParams;

  const response = await getAlbaList({
    orderBy: orderBy || "mostRecent",
    limit: 6,
    keyword,
    isRecruiting: isRecruiting || true,
  });

  const albaList = response.data || [];
  const nextCursor: number | null = response.nextCursor;

  return <AlbaList list={albaList} initialCursor={nextCursor} />;
};

export default AlbaListPage;
