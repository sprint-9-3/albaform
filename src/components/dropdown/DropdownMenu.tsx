import { dropdownTriggerAtom } from "@/atoms/dropdownAtomStore";
import { cls } from "@/utils/dynamicTailwinds";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import { RefObject, useEffect, useRef } from "react";

// 드롭다운 메뉴 컨테이너
const DropdownMenu = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cls(
        "w-20 flex-col overflow-hidden rounded bg-white pc:w-[126px]",
        className ? className : ""
      )}
    >
      {children}
    </div>
  );
};

// 드롭다운 메뉴 트리거
const DropdownMenuTrigger = ({
  asChild,
  children,
  checkedValue,
  className,
  id,
}: {
  asChild?: boolean;
  children?: React.ReactNode;
  checkedValue: boolean | string | undefined;
  className?: string;
  id: string;
}) => {
  const [dropdownTrigger, setDropdownTrigger] = useAtom(
    dropdownTriggerAtom(id)
  );

  const triggerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setDropdownTrigger(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setDropdownTrigger]);

  const handleClick = () => {
    setDropdownTrigger(!dropdownTrigger);
  };

  if (asChild) {
    return (
      <div
        ref={triggerRef as RefObject<HTMLDivElement>}
        className="relative mb-1 w-full cursor-pointer"
        onClick={handleClick}
      >
        {children}
      </div>
    );
  }

  return (
    <button
      ref={triggerRef as RefObject<HTMLButtonElement>}
      onClick={handleClick}
      className={cls(
        "relative mb-1 flex w-full items-center justify-between rounded border-[1px] bg-white py-1.5 pl-2.5 pr-2 text-start text-xs text-black-100 pc:py-2 pc:pl-4 pc:pr-3 pc:text-2lg",
        className ? className : ""
      )}
    >
      {checkedValue}
      <Image
        src="/icon/arrow-bottom.svg"
        alt="드롭다운 펼치기"
        width={24}
        height={24}
      />
    </button>
  );
};

// 드롭다운 메뉴 컨텐츠 (menuItem들을 감싸야 합니다.)
const DropdownMenuContent = ({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) => {
  const dropdownTrigger = useAtomValue(dropdownTriggerAtom(id));

  return (
    dropdownTrigger && (
      <div
        className={cls(
          "absolute z-10 flex w-20 flex-col overflow-hidden rounded border-[1px]",
          className ? className : ""
        )}
      >
        {children}
      </div>
    )
  );
};

// 드롭다운 메뉴 아이템
const DropdownMenuItem = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={cls(
        "w-full border-gray-100 bg-white text-xs text-black-100 transition-all hover:bg-orange-500 hover:text-orange-300 pc:text-2lg",
        className ? className : ""
      )}
    >
      {children}
    </button>
  );
};

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
};
