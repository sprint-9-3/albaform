"use client";

import { publicStatusAtom } from "@/atoms/dropdownAtomStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown/DropdownMenu";
import { useAtom } from "jotai";

// import한 컴포넌트에서 useAtomValue로 publicStatus 값을 받으세요.
const PublicDropdown = () => {
  const [publicStatus, setPublicStatus] = useAtom(publicStatusAtom);

  const handleClick = (status: boolean | undefined) => {
    setPublicStatus(status);
  };

  const valueArr = [
    { value: "전체", status: undefined },
    { value: "공개", status: true },
    { value: "비공개", status: false },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        checkedValue={
          valueArr.find((item) => item.status === publicStatus)?.value
        }
        id="public"
      />
      <DropdownMenuContent id="public" className="pc:w-[126px]">
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

export default PublicDropdown;
