"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown/DropdownMenu";
import { useSearchParamsCustom } from "@/hooks/useSearchParamsCustom";
import Image from "next/image";
import { useEffect, useState } from "react";

interface OrderBy {
  title: string;
  value: string;
}

// title은 화면에 표출되는 명칭, value는 실제 서버로 전달되는 값입니다.
// orderBy 값을 URL에서 추출하여 서버로 전달하세요.
const OrderByDropdown = () => {
  const [orderBy, setOrderBy] = useState<OrderBy>({
    title: "최신 순",
    value: "mostRecent",
  });
  const { updateURL } = useSearchParamsCustom({
    key: "orderBy",
    value: orderBy.value,
  });

  const handleClick = (value: string, title: string) => {
    setOrderBy({ value, title });
    updateURL({ key: "orderBy", value });
  };

  useEffect(() => {
    updateURL({ key: "orderBy", value: orderBy.value });
  }, [orderBy.value, updateURL]);

  const valueArr = [
    { title: "최신 순", value: "mostRecent" },
    { title: "시급높은순", value: "highestWage" },
    { title: "지원자 많은순", value: "mostApplied" },
    { title: "스크랩 많은순", value: "mostScrapped" },
  ];

  return (
    <DropdownMenu className="bg-transparent">
      <DropdownMenuTrigger
        asChild
        checkedValue={orderBy.value}
        id="orderBy"
        className="mb-1 rounded-lg"
      >
        <div className="flex items-center space-x-1">
          <span className="text-xs pc:text-base">{orderBy.title}</span>
          <Image
            src="/icon/arrow-bottom.svg"
            alt="정렬 드롭다운"
            width={16}
            height={16}
            sizes="(max-width: 768px) 16px, 24px"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        id="orderBy"
        className="w-24 translate-x-[-45px] items-center bg-white p-1 shadow-lg pc:w-[132px] pc:translate-x-[-70px]"
      >
        {valueArr.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => handleClick(item.value, item.title)}
            className="rounded-lg px-3 py-2 text-center font-semibold tracking-tighter text-gray-400 hover:text-black-400 pc:text-base"
          >
            {item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderByDropdown;
