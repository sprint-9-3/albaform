import { cls } from "@/utils/dynamicTailwinds";
import { formatDate } from "@/utils/formatDate";
import { getDday } from "@/utils/getDday";

interface EmployerInfoProps {
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  storePhoneNumber: string;
  phoneNumber: string;
}

const EmployerInfo = ({ info }: { info: EmployerInfoProps }) => {
  const dday = getDday(info.recruitmentEndDate);

  const [formattedStartDay, formattedEndDay] = formatDate(
    info.recruitmentStartDate,
    info.recruitmentEndDate
  );

  const commonStyle =
    "flex h-[52px] pc:h-[96px] items-center justify-between border-b border-b-line-100 text-black-100";

  return (
    <div className="flex h-[156px] w-full rounded-md text-md pc:h-[336px] pc:w-[640px] pc:border pc:border-line-100 pc:bg-background-100 pc:text-xl">
      <div className="flex w-full flex-col justify-between pc:p-6">
        <div className={commonStyle}>
          <span>
            모집기간
            <b className="ml-4 text-xs text-orange-300 pc:text-xl">{dday}</b>
          </span>
          <span className="ml-auto text-black-400">
            {formattedStartDay} ~ {formattedEndDay}
          </span>
        </div>
        <div className={commonStyle}>
          <span>가게 전화번호</span>
          <span className="text-black-400">{info.storePhoneNumber}</span>
        </div>
        <div className={cls(commonStyle, "border-b-transparent")}>
          <span>사장님 전화번호</span>
          <span className="text-black-400">{info.phoneNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployerInfo;
