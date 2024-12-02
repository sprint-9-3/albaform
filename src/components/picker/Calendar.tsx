"use client";

import { useSetAtom } from "jotai";
import { calendarAtom } from "@/atoms/calendarAtom";
import { Calendar as CalendarItem } from "react-calendar";
import Image from "next/image";
import "@/styles/customCalendar.css";

type SetRangeType = (range: [string, string]) => void;

const Calendar = ({ setRange }: { setRange: SetRangeType }) => {
  const setIsOpen = useSetAtom(calendarAtom);

  const selectRange = (range: Date[]) => {
    if (range.length === 2) {
      setRange([range[0].toLocaleDateString(), range[1].toLocaleDateString()]); //Date 객체를 string으로 바꿔줌.
      setIsOpen(false); // 기간 선택하면 Calendar 닫히게 함.
    }
  };

  return (
    <div className="absolute left-0 top-full z-10 mt-2 flex h-[388px] w-[327px] flex-col rounded-[12px] border border-gray-100 bg-white p-3 shadow-sm pc:h-[480px] pc:w-[640px]">
      <div className="flex h-[48px] items-center justify-between p-3 pc:h-[60px]">
        <span className="ml-3 flex flex-grow justify-center text-lg text-black-400 pc:ml-8 pc:text-xl">
          기간 선택
        </span>
        <button
          onClick={() => setIsOpen(false)}
          className="relative size-6 pc:size-9"
        >
          <Image src="/icon/close-md.svg" fill alt="close button" />
        </button>
      </div>
      <CalendarItem
        selectRange={true} // 범위 선택 활성화
        onChange={(range) => selectRange(range as Date[])} // 범위 선택 활성화 하면 인자로 Date 객체의 배열이 ([start,end]) 들어감
        formatMonthYear={(_, date) => {
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          return `${year}. ${month}`; // "." 뒤에 추가 기호 없음
        }}
        formatDay={(locale, date) => `${date.getDate()}`} // 날짜에 숫자만 보이게
        prevLabel={
          <Image
            src="/icon/arrow-left.svg"
            width={24}
            height={24}
            alt="prev button"
          />
        }
        nextLabel={
          <Image
            src="/icon/arrow-right.svg"
            width={24}
            height={24}
            alt="next button"
          />
        }
        prev2Label={null} // 기본 스타일링인 << 버튼 숨기기
        next2Label={null} // 위와 동일
      />
    </div>
  );
};

export default Calendar;
