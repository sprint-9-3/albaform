import AddtalkButton from "@/components/button/AddtalkButton";
import AlbatalkSmartSearch from "./components/AlbatalkSmartSearch";
import { Suspense } from "react";

const AlbaTalkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto mt-6 max-w-[327px] pc:max-w-[1480px] tablet:max-w-[600px]">
      <Suspense fallback={<div>로딩 중...</div>}>
        <AlbatalkSmartSearch />
      </Suspense>
      <div className="mt-[50px] pc:mt-10 tablet:mt-10">{children}</div>
      <div className="fixed bottom-[134px] right-6 pc:bottom-[170px] pc:right-[220px] tablet:bottom-[97px] tablet:right-[72px]">
        <AddtalkButton />
      </div>
    </div>
  );
};

export default AlbaTalkLayout;
