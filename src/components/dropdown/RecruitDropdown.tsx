"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown/DropdownMenu";
import { usePrevPage } from "@/hooks/usePrevPage";
import { useSearchParamsCustom } from "@/hooks/useSearchParamsCustom";
import { useState } from "react";

// status 값을 URL에서 추출하여 서버로 전달하세요.
const RecruitDropdown = () => {
  usePrevPage();

  const [recruitStatus, setRecruitStatus] = useState<string | undefined>(
    undefined
  );
  const { updateURL } = useSearchParamsCustom({
    key: "status",
    value: recruitStatus?.toString() || undefined,
  });

  const handleClick = (status: string | undefined) => {
    setRecruitStatus(status);
    updateURL({ key: "status", value: status?.toString() || undefined });
  };

  const valueArr = [
    { value: "전체", status: undefined },
    { value: "거절", status: "REJECTED" },
    { value: "면접 대기", status: "INTERVIEW_PENDING" },
    { value: "면접 완료", status: "INTERVIEW_COMPLETED" },
    { value: "채용 완료", status: "HIRED" },
  ];

  return (
    <DropdownMenu className="w-20 pc:w-[126px]">
      <DropdownMenuTrigger
        checkedValue={
          valueArr.find((item) => item.status === recruitStatus)?.value
        }
        id="recruit"
      />
      <DropdownMenuContent id="recruit" className="pc:w-[126px]">
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

export default RecruitDropdown;
