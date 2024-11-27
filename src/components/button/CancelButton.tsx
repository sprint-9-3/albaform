"use client";

interface CancelbuttonProps {
  children: string;
  size?: "small" | "large";
  [key: string]: any;
}

const CancelButton = ({
  children,
  size = "small",
  ...rest
}: CancelbuttonProps) => {
  // 크기 설정
  const sizeClass =
    size === "small"
      ? "w-full max-w-20 py-2 text-sm"
      : "w-full max-w-[122px] py-3 text-xl";

  // 공통
  const commonClass =
    "rounded-lg bg-gray-100 text-white transition-transform duration-200 ease-out hover:opacity-90 active:scale-95";

  // 최종 스타일
  const finalClassName = `${commonClass} ${sizeClass}`;

  return (
    <button className={finalClassName} {...rest}>
      {children}
    </button>
  );
};

export default CancelButton;
