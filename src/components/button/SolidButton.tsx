"use client";

import Image from "next/image";

interface SolidButtonProps {
  size?: "2xl" | "xl" | "lg" | "md" | "sm";
  style?:
    | "orange300"
    | "orange200"
    | "gray100"
    | "outOrange300"
    | "outOrange200"
    | "outGray100";
  icon?: string;
  children: string;
  disabled?: boolean;
  className?: string;
  [key: string]: any;
}

const SolidButton = ({
  size = "sm",
  style = "orange300",
  icon,
  children,
  disabled = false,
  className,
  ...rest
}: SolidButtonProps) => {
  // 사이즈
  const buttonSizes = {
    "2xl": "max-w-[640px] h-[72px] text-xl",
    xl: "max-w-[327px] h-[58px] text-base",
    lg: "max-w-[214px] h-16 text-xl",
    md: "max-w-[158px] h-[58px] text-base",
    sm: "max-w-[108px] h-[46px] text-sm",
  };

  // 버튼 스타일
  const styles = {
    orange300: "bg-orange-300 text-white active:scale-95 hover:opacity-90",
    orange200: "bg-orange-200 text-white active:scale-95 hover:opacity-90",
    gray100: "bg-gray-100 text-white active:scale-95 hover:opacity-90",
    outOrange300:
      "border border-orange-300 bg-transparent text-orange-300 active:scale-95 hover:opacity-90",
    outOrange200:
      "border border-orange-200 bg-transparent text-orange-200 active:scale-95 hover:opacity-90",
    outGray100:
      "border border-gray-100 bg-transparent text-gray-400 active:scale-95 hover:opacity-90",
    disabledOrange: "bg-gray-100 text-white",
    disabledGray: "bg-gray-100 text-white",
    disabledOutOrange: "border border-gray-100 bg-transparent text-gray-100",
    disabledOutGray: "border border-gray-100 bg-transparent text-gray-400",
  };

  // 활성화 상태 or 비활성화 상태 스타일
  const buttonStyles = {
    orange300: disabled ? styles.disabledOrange : styles.orange300,
    orange200: disabled ? styles.disabledOrange : styles.orange200,
    gray100: disabled ? styles.disabledGray : styles.gray100,
    outOrange300: disabled ? styles.disabledOutOrange : styles.outOrange300,
    outOrange200: disabled ? styles.disabledOutOrange : styles.outOrange200,
    outGray100: disabled ? styles.disabledOutGray : styles.outGray100,
  };

  // 공통
  const commonClass = `w-full flex items-center gap-x-2 font-semibold rounded-lg justify-center transition-transform duration-200 ease-out`;

  // 최종 스타일
  const finalClassName = `${commonClass} ${buttonSizes[size]} ${buttonStyles[style]} ${className}`;

  return (
    <button className={finalClassName} disabled={disabled} {...rest}>
      {icon && (
        <span>
          <Image
            src={icon}
            alt="buttonIcon"
            width={24}
            height={24}
            className="pc:size-9"
          />
        </span>
      )}
      {children}
    </button>
  );
};

export default SolidButton;
