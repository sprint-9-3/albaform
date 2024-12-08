"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown/DropdownMenu";
import { usePrevPage } from "@/hooks/usePrevPage";
import { useState } from "react";

// isPublic 값을 URL에서 추출하여 서버로 전달하세요.
const PublicDropdown = () => {
  const [isPublic, setIsPublic] = useState<boolean | undefined>(undefined);
  usePrevPage();

  const handleClick = (status: boolean | undefined) => {
    setIsPublic(status);
    const params = new URLSearchParams(window.location.search);
    if (status === undefined) {
      params.delete("isPublic");
    } else {
      params.set("isPublic", status?.toString() || "");
    }

    window.history.pushState({}, "", `?${params}`);
  };

  const valueArr = [
    { value: "전체", status: undefined },
    { value: "공개", status: true },
    { value: "비공개", status: false },
  ];

  return (
    <DropdownMenu className="w-20 pc:w-[126px]">
      <DropdownMenuTrigger
        checkedValue={valueArr.find((item) => item.status === isPublic)?.value}
        id="public"
      />
      <DropdownMenuContent id="public" className="pc:w-[126px]">
        {valueArr.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => handleClick(item.status)}
            className="py-1.5 pl-2.5 pr-2 text-start text-black-100 shadow-lg hover:text-orange-300 pc:py-2 pc:pl-4 pc:pr-3 pc:text-2lg"
          >
            {item.value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PublicDropdown;
