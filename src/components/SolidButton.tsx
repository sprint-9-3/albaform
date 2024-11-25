"use client";

import Image from "next/image";

interface SolidButtonProps {
  icon?: string;
  children: string;
  size?: "small" | "large";
  style: "orange300" | "orange200" | "outOrange300" | "outOrange200";
  disabled?: boolean;
  [key: string]: any;
}

const SolidButton = ({
  icon,
  children,
  size = "small",
  style,
  disabled = false,
  ...rest
}: SolidButtonProps) => {
  // 크기 설정
  const sizeClass =
    size === "small"
      ? "w-full max-w-[327px] py-4 text-base"
      : "w-full max-w-[640px] h-[72px] text-xl";

  // 스타일 설정
  let styleClass = "";

  if (disabled) {
    if (style == "orange200" || "orange300") {
      styleClass = "bg-gray-100 text-white cursor-not-allowed";
    } else if (style == "outOrange200" || "outOrange300") {
      styleClass =
        "border border-bg-gray-100 text-bg-gray-100 bg-transparent cursor-not-allowed";
    }
  } else {
    if (style === "orange300")
      styleClass = "bg-orange-300 text-white active:scale-95";
    else if (style === "orange200")
      styleClass = "bg-orange-200 text-white active:scale-95";
    else if (style === "outOrange300")
      styleClass =
        "border border-orange-300 text-orange-300 bg-transparent active:scale-95";
    else if (style === "outOrange200")
      styleClass =
        "border border-orange-200 text-orange-200 bg-transparent active:scale-95";
  }

  // 공통
  const commonClass =
    "flex items-center gap-x-2 font-semibold rounded-lg justify-center transition-transform duration-200 ease-out hover:opacity-90";

  // 최종 스타일
  const finalClassName = `${commonClass} ${sizeClass} ${styleClass}`;

  return (
    <button className={finalClassName} disabled={disabled} {...rest}>
      {icon && (
        <span>
          <Image
            src={icon}
            alt="buttonIcon"
            width={size === "small" ? 24 : 36}
            height={size === "small" ? 24 : 36}
          />
        </span>
      )}
      {children}
    </button>
  );
};

export default SolidButton;
