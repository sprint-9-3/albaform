"use client";

import Image from "next/image";
import deleteIcon from "@/../public/icon/trash-md.svg";
import deleteIconLarge from "@/../public/icon/trash-lg.svg";

interface DeletebuttonProps {
  size?: "small" | "large";
  [key: string]: any;
}

const DeleteButton = ({ size = "small", ...rest }: DeletebuttonProps) => {
  // 크기 설정
  const sizeClass =
    size === "small"
      ? "w-full max-w-[70px] py-[17px]"
      : "w-full max-w-[114px] py-[18px]";

  // 공통
  const commonClass =
    "flex justify-center  rounded bg-line-200 transition-transform duration-200 ease-out hover:opacity-90 active:scale-95";

  // 최종 스타일
  const finalClassName = `${commonClass} ${sizeClass}`;

  return (
    <button className={finalClassName} {...rest}>
      <Image
        src={size === "small" ? deleteIcon : deleteIconLarge}
        alt="buttonIcon"
        width={size === "small" ? 24 : 36}
        height={size === "small" ? 24 : 36}
      />
    </button>
  );
};

export default DeleteButton;
