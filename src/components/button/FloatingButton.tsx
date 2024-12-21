"use client";

import Image from "next/image";
import Link from "next/link";

interface FloatingButtonProps {
  icon: string;
  color?: "orange300" | "oldLace50" | "white";
  children?: string;
  type?: "link" | "button";
  onClick?: () => void;
  href?: string;
  className?: string;
}

const FloatingButton = ({
  icon,
  color = "orange300",
  children,
  type = "link",
  onClick,
  href,
  className,
}: FloatingButtonProps) => {
  const iconTextClass =
    "w-full max-w-[120px] h-full max-h-[54px] text-base font-semibold pc:max-w-[140px] pc:max-h-16 pc:text-xl";

  // children이 없을 때 스타일
  const noTextClass = "w-[54px] h-[54px] pc:w-16 pc:h-16";

  // color에 따른 배경색 처리
  const colorClass = {
    orange300: "bg-orange-300 text-white",
    oldLace50: "bg-oldLace-50 text-black",
    white: "bg-white text-black",
  };

  // hover 상태 처리
  const hoverClass = {
    orange300: "hover:bg-orange-200",
    oldLace50: "hover:bg-white",
    white: "hover:bg-oldLace-50",
  };

  // active 상태 처리
  const activeClass = {
    orange300: "active:scale-95 active:bg-orange-100", // orange300만 active 효과 있음
    oldLace50: "active:scale-95 ",
    white: "active:scale-95 ",
  };

  // 최종 클래스
  const finalClassName = `shadow-md flex items-center justify-center rounded-full ${children ? "gap-x-0.5" : ""} ${colorClass[color]} transition-transform duration-200 ease-out ${hoverClass[color]} ${activeClass[color]} ${
    children ? iconTextClass : noTextClass
  } ${className}`;

  if (type === "link") {
    return (
      <Link href={href || "#"} className={finalClassName}>
        <Image
          src={icon}
          alt="buttonIcon"
          width={24}
          height={24}
          className="pc:size-9"
        />
        {children && <span>{children}</span>}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={finalClassName}>
      <Image
        src={icon}
        alt="buttonIcon"
        width={24}
        height={24}
        className="pc:size-9"
      />
      {children && <span>{children}</span>}
    </button>
  );
};

export default FloatingButton;
