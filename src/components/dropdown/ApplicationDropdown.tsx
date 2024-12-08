"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown/DropdownMenu";
import { usePrevPage } from "@/hooks/usePrevPage";
import { useState } from "react";

// isRecruiting 값을 URL에서 추출하여 서버로 전달하세요.
const ApplicationDropdown = () => {
  const [isRecruiting, setIsRecruiting] = useState<boolean | undefined>(
    undefined
  );
  usePrevPage();

  const handleClick = (status: boolean | undefined) => {
    setIsRecruiting(status);
    const params = new URLSearchParams(window.location.search);

    if (status === undefined) {
      params.delete("isRecruiting");
    } else {
      params.set("isRecruiting", status?.toString() || "");
    }

    window.history.pushState({}, "", `?${params}`);
  };

  const valueArr = [
    { value: "전체", status: undefined },
    { value: "모집 중", status: true },
    { value: "모집 마감", status: false },
  ];

  return (
    <DropdownMenu className="w-20 pc:w-[126px]">
      <DropdownMenuTrigger
        checkedValue={
          valueArr.find((item) => item.status === isRecruiting)?.value
        }
        id="application"
      />
      <DropdownMenuContent id="application" className="pc:w-[126px]">
        {valueArr.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => handleClick(item.status)}
            className="py-1.5 pl-2.5 pr-2 text-start text-black-100 hover:text-orange-300 pc:py-2 pc:pl-4 pc:pr-3 pc:text-2lg"
          >
            {item.value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApplicationDropdown;
