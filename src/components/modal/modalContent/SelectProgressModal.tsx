"use client";

import { useState } from "react";
import ModalContainer from "../modalContainer/ModalContainer";

const progressList = [
  { name: "거절" },
  { name: "면접 대기" },
  { name: "면접 완료" },
  { name: "채용 완료" },
];

const SelectProgressModal = () => {
  const [selected, setSelected] = useState("");

  const handleChange = (value: string) => {
    setSelected(value);
  };

  return (
    <ModalContainer>
      <div className="flex flex-col items-center pb-[8px] pt-[4px] pc:mx-[-40px] pc:pb-[8px] pc:pt-[8px]">
        <strong className="modal-title mt-0">진행상태 선택</strong>
        <p className="modal-sub-title">현재 진행상태를 알려주세요.</p>

        <ul className="mt-[24px] flex w-full flex-col gap-[10px] pc:mt-12">
          {progressList.map((progress) => (
            <li key={progress.name}>
              <label
                className={`bg-orang-100 flex items-center justify-between rounded-[8px] border border-line-100 p-[14px] text-md font-medium pc:text-2lg ${selected === progress.name ? "border-orange-300 bg-orange-500" : ""}`}
              >
                {progress.name}
                <input
                  type="radio"
                  name="progress"
                  value={progress.name}
                  checked={selected === progress.name}
                  onChange={() => handleChange(progress.name)}
                  className="size-5 appearance-none rounded-full border-[5px] border-gray-50 ring-1 ring-gray-300 checked:bg-orange-300 checked:ring-orange-300"
                />
              </label>
            </li>
          ))}
        </ul>

        <div className="mt-[30px] flex gap-[11px] pc:gap-[8px]">
          <button className="h-[58px] w-[158px] rounded-[8px] border bg-gray-100 text-white pc:h-[72px] pc:w-[176px]">
            취소
          </button>
          <button className="h-[58px] w-[158px] rounded-[8px] border bg-orange-300 text-gray-50 pc:h-[72px] pc:w-[176px]">
            선택하기
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default SelectProgressModal;
