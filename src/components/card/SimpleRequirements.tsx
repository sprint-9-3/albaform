import { formatDate } from "@/utils/formatDate";
import Image from "next/image";

interface SimpleRequirementsProps {
  info: {
    workStartDate: string;
    workEndDate: string;
    workStartTime: string;
    workEndTime: string;
    workDays: string[];
    hourlyWage: number;
  };
}

const SimpleRequirements = ({ info }: SimpleRequirementsProps) => {
  const [formaatedStartDate, formaatedEndDate] = formatDate(
    info.workStartDate,
    info.workEndDate
  );

  const workdays = info.workDays.join(",");

  const infoList = [
    {
      id: 0,
      href: "/icon/database-md.svg",
      title: "시급",
      content: info.hourlyWage,
    },
    {
      id: 1,
      href: "/icon/calendar-clock-md.svg",
      title: "기간",
      content: `${formaatedStartDate.slice(2)}~${formaatedEndDate.slice(2)}`,
    },
    { id: 2, href: "/icon/calendar-md.svg", title: "요일", content: workdays },
    {
      id: 3,
      href: "/icon/clock-md.svg",
      title: "시간",
      content: `${info.workStartTime}~${info.workEndTime}`,
    },
  ];

  return (
    <section className="flex w-full justify-center">
      <div className="relative grid h-[116px] w-[327px] grid-cols-2 grid-rows-2 items-center justify-center gap-2 pc:h-[336px] pc:w-[640px] pc:rounded-md pc:border pc:border-b-line-100">
        {infoList.map((list) => (
          <div
            key={list.id}
            className="flex h-[54px] w-[160px] items-center gap-2 rounded-md border border-line-100 p-2 pc:mx-[46px] pc:my-[30px] pc:h-[108px] pc:w-[250px] pc:gap-6 pc:border-none pc:p-4"
          >
            <div className="flex size-9 items-center justify-center rounded-full bg-line-100 pc:size-[56px]">
              <div className="relative size-6 pc:size-9">
                <Image src={list.href} fill alt="시급" />
              </div>
            </div>
            <div className="gap-sm flex flex-col text-xs pc:text-2lg">
              <span className="text-black-100">{list.title}</span>
              <span className="text-orange-300">{list.content}</span>
            </div>
          </div>
        ))}
        <div className="hidden pc:absolute pc:bottom-[168px] pc:left-6 pc:h-1 pc:w-[592px] pc:border pc:border-line-100" />
        <div className="hidden pc:absolute pc:left-[320px] pc:top-[39px] pc:hidden pc:h-[258px] pc:w-[1px] pc:border pc:border-line-100" />
      </div>
    </section>
  );
};
export default SimpleRequirements;
