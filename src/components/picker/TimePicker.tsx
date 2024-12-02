"use client";

import { useState } from "react";
import Image from "next/image";
import PickableList from "./PickableList";

const TimePicker = () => {
  const [startTime, setStartTime] = useState({ time: "00:00", updated: false });
  const [endTime, setEndTime] = useState({ time: "24:00", updated: false });
  const [isStartButtonOpen, setIsStartButtonOpen] = useState(false);
  const [isEndButtonOpen, setIsEndButtonOpen] = useState(false);

  return (
    <section className="flex h-[92px] w-[327px] flex-col gap-4">
      <h3 className="text-md font-semibold text-black-400 pc:text-xl">
        근무 시간 <span className="text-orange-300">*</span>
      </h3>
      <div className="flex h-[54px] w-[327px] gap-[27px] text-lg pc:h-[64px] pc:w-[456px] pc:gap-[36px] pc:text-xl">
        {/* 시작시간 설정 버튼 */}
        <button
          onClick={() => setIsStartButtonOpen(!isStartButtonOpen)}
          className={
            startTime.updated
              ? "relative flex items-center gap-2 rounded-[8px] bg-background-200 p-[14px] text-black-400"
              : "relative flex items-center gap-2 rounded-[8px] bg-background-200 p-[14px] text-gray-400"
          }
        >
          <Image src="/icon/clock-blank.svg" width={24} height={24} alt="" />
          <span className="flex-grow">{startTime.time}</span>
          <Image
            src={
              isStartButtonOpen
                ? "/icon/arrow-fill-top.svg"
                : "/icon/arrow-fill-bottom.svg"
            }
            width={24}
            height={24}
            alt=""
          />
          {isStartButtonOpen && (
            <PickableList
              label="근무시간"
              setIsOpen={setIsStartButtonOpen}
              setValue={setStartTime}
            />
          )}
        </button>

        {/* 종료시간 설정 버튼 */}
        <button
          onClick={() => setIsEndButtonOpen(!isEndButtonOpen)}
          className={
            endTime.updated
              ? "relative flex items-center gap-2 rounded-[8px] bg-background-200 p-[14px] text-black-400"
              : "relative flex items-center gap-2 rounded-[8px] bg-background-200 p-[14px] text-gray-400"
          }
        >
          <Image src="/icon/clock-blank.svg" width={24} height={24} alt="" />
          <span className="flex-grow">{endTime.time}</span>
          <Image
            src={
              isEndButtonOpen
                ? "/icon/arrow-fill-top.svg"
                : "/icon/arrow-fill-bottom.svg"
            }
            width={24}
            height={24}
            alt=""
          />
          {isEndButtonOpen && (
            <PickableList
              label="근무시간"
              setIsOpen={setIsEndButtonOpen}
              setValue={setEndTime}
            />
          )}
        </button>
      </div>
    </section>
  );
};

export default TimePicker;
