"use client";

import { recruitStatusAtom } from "@/atoms/dropdownAtomStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown/DropdownMenu";
import { useAtom } from "jotai";

const RecruitDropdown = () => {
  const [recruitStatus, setRecruitStatus] = useAtom(recruitStatusAtom);

  const handleClick = (status: string | undefined) => {
    setRecruitStatus(status);
  };

  const valueArr = [
    { value: "전체", status: undefined },
    { value: "거절", status: "REJECTED" },
    { value: "면접 대기", status: "INTERVIEW_PENDING" },
    { value: "면접 완료", status: "INTERVIEW_COMPLETED" },
    { value: "채용 완료", status: "HIRED" },
  ];

  return (
    <DropdownMenu>
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
            className="py-1.5 pl-2.5 pr-2 text-start pc:py-2 pc:pl-4 pc:pr-3"
          >
            {item.value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RecruitDropdown;
