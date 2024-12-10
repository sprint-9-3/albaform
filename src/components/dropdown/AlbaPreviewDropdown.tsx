"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown/DropdownMenu";

const AlbaPreviewDropdown = ({
  children,
  goToApply,
  onScrap,
  id,
}: {
  children: React.ReactNode;
  goToApply: () => void;
  onScrap: () => void;
  id?: number;
}) => {
  const itemArr = [
    {
      text: "지원하기",
      onClick: goToApply,
    },
    {
      text: "스크랩",
      onClick: onScrap,
    },
  ];

  return (
    <DropdownMenu className="bg-transparent">
      <DropdownMenuTrigger
        asChild
        id={`albaPreview-${id}`}
        checkedValue={undefined}
        className="rounded-lg"
      >
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        id={`albaPreview-${id}`}
        className="translate-x-[-50px] items-center bg-white p-1 pc:w-[132px] pc:translate-x-[-100px]"
      >
        {itemArr.map((item) => (
          <DropdownMenuItem
            key={item.text}
            onClick={item.onClick}
            className="rounded-lg px-3 py-2 text-center font-semibold text-gray-400 hover:text-black-400 pc:text-base"
          >
            {item.text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AlbaPreviewDropdown;
