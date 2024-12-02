"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import Image from "next/image";
import PickableList from "./PickableList";

type labelType = {
  label: "모집인원" | "성별" | "학력" | "연령" | "우대사항";
};

const RequirementPicker = ({ label }: labelType) => {
  const [value, setValue] = useState("");
  const [isTextMode, setIsTextMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (value === "직접입력") setIsTextMode(true);
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsTextMode(false);
      setValue(value);
    }
  };

  return (
    <section className="relative h-[92px] w-[327px] pc:h-[112px] pc:w-[640px]">
      <h3 className="text-md text-black-400 pc:text-xl">{label}</h3>
      {isTextMode ? (
        <input
          type="text"
          value={value}
          onKeyDown={handleKeyDown}
          onChange={(e) => setValue(e.target.value)} // 텍스트 입력 핸들링
          className="mt-2 h-[54px] w-[327px] rounded-lg bg-background-200 p-[14px] px-6 text-lg text-black-400 pc:h-[64px] pc:w-[640px] pc:px-8 pc:text-xl"
        />
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-2 flex h-[54px] w-[327px] items-center rounded-lg bg-background-200 p-[14px] px-6 text-lg text-black-400 pc:h-[64px] pc:w-[640px] pc:px-8 pc:text-xl"
        >
          <span className="flex-grow text-left text-gray-400">
            {value || "선택"}
          </span>
          <Image
            src="/icon/arrow-fill-bottom.svg"
            width={28}
            height={28}
            alt=""
          />
        </button>
      )}
      {label && isOpen && (
        <PickableList setValue={setValue} setIsOpen={setIsOpen} label={label} />
      )}
    </section>
  );
};

export default RequirementPicker;
