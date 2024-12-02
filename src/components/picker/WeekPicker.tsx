"use client";

import { useState } from "react";
import CheckBoxButton from "../button/CheckBoxButton";

const WeekPicker = () => {
  const weekList = ["일", "월", "화", "수", "목", "금", "토"];
  const [selectedWeeks, setSelectedWeeks] = useState([""]);

  const isSelectedWeek = (week: string) => {
    return selectedWeeks.includes(week);
  };

  const toggleSelect = (week: string) => {
    setSelectedWeeks((prev) =>
      prev.includes(week)
        ? prev.filter((item) => item !== week)
        : [...prev, week]
    );
  };

  return (
    <section className="flex h-[142px] w-[327px] flex-col gap-4 text-lg pc:h-[192px] pc:w-[640px] pc:text-xl">
      <h3 className="text-md font-semibold">
        근무 요일 <span className="text-orange-300">*</span>
      </h3>
      <div className="flex h-[48px] w-[327px] gap-[10px] pc:h-[64px] pc:w-[456px] pc:gap-[17px]">
        {weekList.map((week) => (
          <button
            key={week}
            onClick={() => toggleSelect(week)}
            className={
              isSelectedWeek(week)
                ? "flex h-[48px] w-[38px] items-center justify-center rounded-[12px] bg-orange-200 px-3 py-[6px] text-white hover:bg-orange-200 hover:text-white pc:h-[64px] pc:w-[50px] pc:px-[16px] pc:py-[10px]"
                : "flex h-[48px] w-[38px] items-center justify-center rounded-[12px] bg-background-200 px-3 py-[6px] text-gray-500 hover:bg-orange-200 hover:text-white pc:h-[64px] pc:w-[50px] pc:px-[16px] pc:py-[10px]"
            }
          >
            {week}
          </button>
        ))}
      </div>
      <CheckBoxButton name="요일 협의 가능" value="요일 협의 가능" />
    </section>
  );
};

export default WeekPicker;
