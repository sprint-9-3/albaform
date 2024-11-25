"use client";

interface RadioButtonProps {
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const RadioButton = ({
  name,
  value,
  checked = false,
  disabled = false,
  onChange,
}: RadioButtonProps) => {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  return (
    <label className={"h-fit w-fit cursor-pointer"}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="peer hidden"
      />
      {/* input 대체 UI */}
      <div
        className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border transition-transform duration-200 ease-out ${disabled ? "" : "active:scale-50"} peer-checked:border-orange-300 ${
          disabled ? "bg-line-100 border-gray-200" : "border-gray-200"
        }`}
      >
        {checked && <div className="h-2.5 w-2.5 rounded-full bg-orange-300" />}
      </div>
    </label>
  );
};

export default RadioButton;
