"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchInput = ({ ...rest }) => {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const keyword = searchParams.get("keyword");

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmitSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword === search) return;

    const query = search ? `?keyword=${search}` : "";
    router.push(`${pathname}${query}`);
  };

  return (
    <form
      onSubmit={handleSubmitSearch}
      className="relative h-[54px] w-[327px] pc:h-[64px] pc:w-[1229px] tablet:h-[54px] tablet:w-[490px]"
    >
      <input
        className={inputStyle}
        onChange={handleChangeSearch}
        value={search}
        type="text"
        {...rest}
      />
      <button type="submit" className="absolute left-4 top-4">
        <Image
          src="/icon/search-md.svg"
          width={36}
          height={36}
          alt="검색"
          className="h-6 w-6 pc:h-9 pc:w-9"
        />
      </button>
    </form>
  );
};

export default SearchInput;

const inputStyle =
  "w-full rounded-[16px] border border-background-200 bg-background-200 p-[14px] pl-[46px] text-lg font-regular placeholder:text-lg placeholder:font-regular placeholder:text-gray-200 focus:border-orange-300 pc:rounded-[24px] pc:px-6 pc:py-[14px] pc:placeholder:text-xl pc:pl-[68px] pc:text-xl ";
