"use client";

interface RoundedButtonProps {
  children: string;
  size?: "small" | "large";
  [key: string]: any;
}

const RoundedButton = ({
  children,
  size = "small",
  ...rest
}: RoundedButtonProps) => {
  // 스타일 설정
  const styleClass =
    size === "small"
      ? "w-full max-w-[149px] py-4 text-base"
      : "w-full max-w-[223px] py-6 text-2xl";

  // 공통
  const commonClass =
    "font-bold text-white bg-blue-300 rounded-[100px] transition-transform duration-200 ease-out hover:opacity-90 active:scale-95";

  // 최종 스타일
  const finalClassName = `${styleClass} ${commonClass}`;

  return (
    <button className={finalClassName} {...rest}>
      {children}
    </button>
  );
};

export default RoundedButton;
