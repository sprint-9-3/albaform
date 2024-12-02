import { calendarAtom } from "@/atoms/calendarAtom";
import { useAtom } from "jotai";
import Image from "next/image";

const RangePicker = ({ range }: { range: [string, string] }) => {
  const [isOpen, setIsOpen] = useAtom(calendarAtom);
  const [startDay, endDay] = range;

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex h-[54px] w-[327px] items-center rounded-lg bg-background-200 p-[14px] disabled:text-gray-400 pc:h-[64px] pc:w-[640px]"
    >
      <span className="relative size-6 pc:size-8">
        <Image src="/icon/calendar-md.svg" fill alt="" />
      </span>
      <span
        className={
          range[0]
            ? "ml-2 text-lg text-black-400 pc:text-xl"
            : "ml-2 text-lg text-gray-400 pc:text-xl"
        }
      >
        {range[0] ? `${startDay} ~ ${endDay}` : "시작일 ~ 종료일"}
      </span>
      <div className="ml-auto">
        <Image
          src={
            isOpen ? "/icon/arrow-fill-top.svg" : "/icon/arrow-fill-bottom.svg"
          }
          width={28}
          height={28}
          alt=""
        />
      </div>
    </button>
  );
};

export default RangePicker;
