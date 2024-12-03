"use client";

import { useState } from "react";
import { cls } from "../../utils/dynamicTailwinds";

const HourlyWageInput = () => {
  const [inputValue, setInputValue] = useState<string>(""); // 입력값 관리
  const [wage, setWage] = useState<string>("9860"); // 최종 상태

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 숫자 및 빈 문자열만 허용
    if (/^\d*$/.test(value)) {
      const numericValue = Number(value);

      // 500만 이하 값만 허용
      if (numericValue <= 5000000 || value === "") {
        setInputValue(value);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setWage(inputValue); // 엔터 키를 눌렀을 때만 최종 상태 업데이트
    }
  };

  return (
    <section className="flex h-[92px] w-[327px] flex-col gap-4 text-md pc:h-[112px] pc:w-[640px] pc:text-xl">
      <h3 className="font-semibold text-black-400">
        시급 <span className="text-orange-300">*</span>
      </h3>
      <div
        className={cls(
          "flex h-[54px] w-full items-center justify-between gap-2 rounded-lg bg-background-200 px-4 py-[14px] pc:h-[64px] pc:px-6",
          inputValue ? "text-black-400" : "text-gray-400"
        )}
      >
        <input
          type="number"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="9860"
          className="w-full bg-inherit"
        />
        <span className="text-right text-black-400">원</span>
      </div>
    </section>
  );
};

export default HourlyWageInput;
