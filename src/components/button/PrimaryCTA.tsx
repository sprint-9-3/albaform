interface PrimaryCTAProps {
  children: React.ReactNode;
  disabled: boolean;
  type: "button" | "submit";
  onClick?: () => void;
}

const PrimaryCTA = ({
  children,
  disabled,
  type,
  onClick,
  ...rest
}: PrimaryCTAProps) => {
  return (
    <button
      type={type}
      className="w-full max-w-[640px] rounded-lg bg-orange-300 p-4 text-lg font-semibold text-white transition-colors hover:bg-orange-200 disabled:bg-gray-100"
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default PrimaryCTA;
