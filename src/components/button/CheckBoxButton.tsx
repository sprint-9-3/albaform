"use client";

interface CheckBoxButtonProps {
  size?: "small" | "large";
  name: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const CheckBoxButton = ({
  size = "small",
  name,
  checked = false,
  disabled = false,
  onChange,
}: CheckBoxButtonProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.value);
    }
  };

  const sizeClass = size === "small" ? "size-5" : "size-6";

  const backgroundIconClass =
    checked &&
    (size === "small"
      ? "checked:bg-[url('/icon/check-md.svg')]"
      : "checked:bg-[url('/icon/check-lg.svg')]");

  const disabledClass = disabled
    ? "cursor-default bg-line-100"
    : "cursor-pointer transition-transform duration-200 ease-out active:scale-50";

  const classes = [
    sizeClass,
    "appearance-none rounded border border-gray-200 bg-center bg-no-repeat",
    "checked:border-none checked:bg-orange-300",
    backgroundIconClass,
    disabledClass,
  ]
    .filter(Boolean)
    .join(" ");

  const sizeLableClass = size === "small" ? "text-[14px]" : "text-xl";

  return (
    <div className="flex items-center gap-x-[10px]">
      <input
        id={name}
        type="checkbox"
        name={name}
        value={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={classes}
      />
      <label htmlFor={name} className={`font-medium ${sizeLableClass}`}>
        {name}
      </label>
    </div>
  );
};

export default CheckBoxButton;
