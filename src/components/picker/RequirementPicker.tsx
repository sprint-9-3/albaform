"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import Image from "next/image";
import PickableList from "./PickableList";

type labelType = {
  label: "모집인원" | "성별" | "학력" | "연령" | "우대사항";
  setStepTwoData: React.Dispatch<
    React.SetStateAction<{
      numberOfPositions: number;
      gender: string;
      education: string;
      age: string;
      preferred: string;
    }>
  >;
  initialValue: {
    numberOfPositions: number;
    gender: string;
    education: string;
    age: string;
    preferred: string;
  };
};

const RequirementPicker = ({
  label,
  setStepTwoData,
  initialValue,
}: labelType) => {
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
      setStepTwoData((prev) => ({ ...prev, preferred: value }));
    }
  };

  const matchLabelToStepTwoData = (
    label: "모집인원" | "성별" | "학력" | "연령" | "우대사항"
  ) => {
    switch (label) {
      case "모집인원":
        return "numberOfPositions";
      case "성별":
        return "gender";
      case "학력":
        return "education";
      case "연령":
        return "age";
      case "우대사항":
        return "preferred";
    }
  };

  return (
    <section className="relative h-[92px] w-[327px] pc:h-[112px] pc:w-[640px]">
      <h3 className="text-md text-black-400 pc:text-xl">
        {label}
        <span className="text-orange-300"> *</span>
      </h3>
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
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="mt-2 flex h-[54px] w-[327px] items-center rounded-lg bg-background-200 p-[14px] px-6 text-lg text-black-400 pc:h-[64px] pc:w-[640px] pc:px-8 pc:text-xl"
        >
          <span className="flex-grow text-left text-gray-400">
            {initialValue[matchLabelToStepTwoData(label)]
              ? initialValue[matchLabelToStepTwoData(label)]
              : value || "선택"}
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
        <PickableList
          setValue={setValue}
          setIsOpen={setIsOpen}
          label={label}
          setStepTwoData={setStepTwoData}
        />
      )}
    </section>
  );
};

export default RequirementPicker;
