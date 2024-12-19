import { formatDate } from "@/utils/formatDate";
import Image from "next/image";

interface SimpleRequirementsProps {
  workStartDate: string;
  workEndDate: string;
  workStartTime: string;
  workEndTime: string;
  workDays: string[];
  hourlyWage: number;
  isNegotiableWorkDays: boolean;
}

const SimpleRequirements = ({ info }: { info: SimpleRequirementsProps }) => {
  const [formaatedStartDate, formaatedEndDate] = formatDate(
    info.workStartDate,
    info.workEndDate
  );

  const workdays = info.workDays.join(", ");

  const infoList = [
    {
      id: 0,
      href: "/icon/database-md.svg",
      title: "시급",
      content: `${info.hourlyWage}원`,
    },
    {
      id: 1,
      href: "/icon/calendar-clock-lg.svg",
      title: "기간",
      content: `${formaatedStartDate.slice(2)}~${formaatedEndDate.slice(2)}`,
    },
    {
      id: 2,
      href: "/icon/calendar-lg.svg",
      title: info.isNegotiableWorkDays === true ? "요일(협의가능)" : "요일",
      content: workdays === "" ? "협의가능" : workdays,
    },
    {
      id: 3,
      href: "/icon/clock-md.svg",
      title: "시간",
      content: `${info.workStartTime}~${info.workEndTime}`,
    },
  ];

  return (
    <div className="relative grid h-[116px] w-[327px] grid-cols-2 grid-rows-2 items-center justify-center gap-2 pc:h-[336px] pc:w-[640px] pc:rounded-md pc:border pc:border-b-line-100 tablet:h-[220px] tablet:w-[550px] tablet:rounded-md tablet:border tablet:border-b-line-100">
      {infoList.map((list) => (
        <div
          key={list.id}
          className="flex h-[54px] w-[160px] items-center gap-2 rounded-md border border-line-100 p-2 pc:mx-[46px] pc:my-[30px] pc:h-[108px] pc:w-[250px] pc:gap-6 pc:border-none pc:p-4 tablet:ml-[50px] tablet:h-[108px] tablet:w-[250px] tablet:gap-6 tablet:border-none tablet:p-0"
        >
          <div className="flex size-9 items-center justify-center rounded-full bg-line-100 pc:size-[56px] tablet:size-12">
            <div className="relative size-6 pc:size-9 tablet:size-7">
              <Image src={list.href} fill alt="시급" />
            </div>
          </div>
          <div className="gap-sm flex flex-col text-xs pc:text-2lg tablet:text-lg">
            <span className="text-black-100">{list.title}</span>
            <span className="text-orange-300">{list.content}</span>
          </div>
        </div>
      ))}
      <div className="absolute bottom-[168px] left-6 w-[592px] border border-line-100 tablet:bottom-[105px] tablet:w-[490px] mobile:hidden" />
      <div className="absolute left-[320px] top-[39px] h-[258px] border border-line-100 tablet:left-[270px] tablet:top-[24px] tablet:h-[180px] mobile:hidden" />
    </div>
  );
};
export default SimpleRequirements;
