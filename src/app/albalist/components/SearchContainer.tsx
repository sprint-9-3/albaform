import SearchInput from "@/components/input/SearchInput";
import PublicDropdown from "@/components/dropdown/PublicDropdown";
import ApplicationDropdown from "@/components/dropdown/ApplicationDropdown";
import OrderByDropdown from "@/components/dropdown/OrderByDropdown";

const SearchContainer = () => {
  return (
    <div className="mx-auto border-b border-line-100">
      <div className="m-auto px-6 pb-[10px] pt-[14px] pc:max-w-[1480px] pc:px-0 pc:pb-[20px] pc:pt-6 tablet:px-[72px]">
        <SearchInput placeholder="어떤 알바를 찾고 계세요?" />
        <div className="mt-[14px] flex items-center justify-between pc:mt-6">
          <div className="flex gap-x-[10px] pc:gap-x-4">
            <PublicDropdown />
            <ApplicationDropdown />
          </div>
          <OrderByDropdown />
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
