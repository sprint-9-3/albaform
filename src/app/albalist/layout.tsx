import SearchInput from "@/components/input/SearchInput";
import { ReactNode } from "react";

const AlbaListLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto mt-4 max-w-[327px] pc:max-w-[1480px] tablet:max-w-[600px]">
      <SearchInput placeholder="어떤 알바를 찾고 계세요?" />
      {children}
    </div>
  );
};

export default AlbaListLayout;
