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
      <DropdownMenuContent id="recruit">
        {valueArr.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => handleClick(item.status)}
          >
            {item.value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RecruitDropdown;
