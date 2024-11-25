"use client";

import Image from "next/image";

interface FloatingButtonProps {
  icon: string;
  size?: "small" | "large";
  color?: "orange300" | "oldLace50" | "white";
  children?: string;
  className?: string;
  [key: string]: any;
}

const FloatingButton = ({
  icon,
  size = "small",
  color = "orange300",
  children = "",
  className = "",
  ...rest
}: FloatingButtonProps) => {
  const sizeClass =
    size === "small"
      ? "w-full max-w-[120px] h-full max-h-[54px] text-base font-semibold"
      : "w-full max-w-[140px] h-full max-h-16 text-xl font-semibold";

  // children이 없을 때 스타일
  const noTextClass = size === "small" ? "w-[54px] h-[54px]" : "w-16 h-16";

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
  const finalClassName = `flex items-center justify-center rounded-full ${children ? "gap-x-0.5" : ""} ${colorClass[color]} transition-transform duration-200 ease-out ${hoverClass[color]} ${activeClass[color]} ${
    children ? sizeClass : noTextClass
  } ${className}`;

  return (
    <button className={finalClassName} {...rest}>
      <Image
        src={icon}
        alt="buttonIcon"
        width={size === "small" ? 24 : 36}
        height={size === "small" ? 24 : 36}
      />
      {children && <span>{children}</span>}
    </button>
  );
};

export default FloatingButton;
