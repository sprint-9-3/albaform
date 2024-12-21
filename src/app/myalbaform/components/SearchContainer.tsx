import SearchInput from "@/components/input/SearchInput";
import PublicDropdown from "@/components/dropdown/PublicDropdown";
import ApplicationDropdown from "@/components/dropdown/ApplicationDropdown";
import OrderByDropdown from "@/components/dropdown/OrderByDropdown";
import { cookies } from "next/headers";
import RecruitDropdown from "@/components/dropdown/RecruitDropdown";

const SearchContainer = async () => {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value || "APPLICANT";

  return (
    <div className="mx-auto border-b border-line-100">
      <div className="m-auto px-6 pb-[10px] pt-[14px] pc:max-w-[1480px] pc:px-0 pc:pb-[20px] pc:pt-6 tablet:px-[72px]">
        <SearchInput
          placeholder={
            role === "OWNER"
              ? "검색어로 조회해 보세요."
              : "어떤 알바를 찾고 계세요?"
          }
        />
        {role === "OWNER" ? (
          <div className="mt-[14px] flex items-center justify-between pc:mt-6">
            <div className="flex gap-x-[10px] pc:gap-x-4">
              <PublicDropdown />
              <ApplicationDropdown />
            </div>
            <OrderByDropdown />
          </div>
        ) : (
          <div className="ml-0 mt-[14px] pc:mt-6">
            <RecruitDropdown />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchContainer;
