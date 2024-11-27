"use client";

import {
  editDeleteDropdownAtom,
  editDeleteOpenAtom,
} from "@/atoms/dropdownAtomStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown/DropdownMenu";
import { useAtom } from "jotai";
import Image from "next/image";

const EditDeleteDropdown = () => {
  const [editDeleteDropdown, setEditDeleteDropdown] = useAtom(
    editDeleteDropdownAtom
  );

  const [isEditOpen, setIsEditOpen] = useAtom(editDeleteOpenAtom("edit"));
  const [isDeleteOpen, setIsDeleteOpen] = useAtom(editDeleteOpenAtom("delete"));

  const handleEditClick = () => {
    setEditDeleteDropdown(!editDeleteDropdown);
    setIsEditOpen(!isEditOpen);
    setIsDeleteOpen(false);
  };

  const handleDeleteClick = () => {
    setEditDeleteDropdown(!editDeleteDropdown);
    setIsDeleteOpen(!isDeleteOpen);
    setIsEditOpen(false);
  };

  const itemArr = [
    {
      text: "수정하기",
      onClick: handleEditClick,
    },
    {
      text: "삭제하기",
      onClick: handleDeleteClick,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        id="editDelete"
        checkedValue={editDeleteDropdown}
        className="rounded-lg"
      >
        <Image
          src="/icon/kebab-lg.svg"
          alt="수정 및 삭제 드롭다운"
          width={24}
          height={24}
          className="pc:size-[30px]"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        id="editDelete"
        className="translate-x-[-100px] items-center rounded-lg p-1 pc:w-[132px]"
      >
        {itemArr.map((item) => (
          <DropdownMenuItem
            key={item.text}
            onClick={item.onClick}
            className="rounded-lg px-3 py-2 text-center"
          >
            {item.text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditDeleteDropdown;
