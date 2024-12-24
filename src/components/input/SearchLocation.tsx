"use client";

import Image from "next/image";
import { useState } from "react";

interface SearchLocationProps {
  onSearch: (value: string) => void;
}

const SearchLocation = ({ onSearch }: SearchLocationProps) => {
  const [search, setSearch] = useState("");

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmitSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <form
      onSubmit={handleSubmitSearch}
      className="relative h-[54px] w-full pc:h-[72px] pc:w-[1229px] tablet:h-[54px] tablet:w-[490px]"
    >
      <input
        className={inputStyle}
        onChange={handleChangeSearch}
        type="text"
        value={search}
        placeholder="근무지를 입력해주세요"
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

export default SearchLocation;

const inputStyle =
  "w-full rounded-[16px] border border-background-200 pc:h-[72px] bg-background-200 p-[14px] pl-[46px] text-lg font-regular placeholder:text-lg placeholder:font-regular placeholder:text-gray-200 focus:border-orange-300 pc:rounded-[24px] pc:px-6 pc:py-[14px] pc:placeholder:text-xl pc:pl-[68px] pc:text-xl ";
