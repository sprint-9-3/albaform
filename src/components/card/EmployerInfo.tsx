import { formatDate } from "@/utils/formatDate";
import { getDday } from "@/utils/getDday";

interface EmployerInfoProps {
  info: {
    recruitmentStartDate: string;
    recruitmentEndDate: string;
    storePhoneNumber: string;
    phoneNumber: string;
  };
}

const EmployerInfo = ({ info }: EmployerInfoProps) => {
  const dday = getDday(info.recruitmentEndDate);

  const [formattedStartDay, formattedEndDay] = formatDate(
    info.recruitmentStartDate,
    info.recruitmentEndDate
  );

  const commonStyle =
    "flex h-[96px] w-full items-center justify-between border-b border-b-line-100 text-xl text-black-100";

  return (
    <div className="flex h-[336px] w-[640px] items-center justify-center rounded-md border border-line-100 bg-background-100">
      <div className="flex w-[592px] flex-col p-6">
        <div className={commonStyle}>
          <span>
            모집기간 <b className="ml-4 text-orange-300">{dday}</b>
          </span>
          <span className="text-black-400">
            {formattedStartDay} ~ {formattedEndDay}
          </span>
        </div>
        <div className={commonStyle}>
          <span>가게 전화번호</span>
          <span className="text-black-400">{info.storePhoneNumber}</span>
        </div>
        <div className={commonStyle}>
          <span>사장님 전화번호</span>
          <span className="text-black-400">{info.phoneNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployerInfo;
