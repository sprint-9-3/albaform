import { AppliedAlbaData } from "@/types/alba";
import getCurrentTime from "@/utils/getCurrentTime";
import isPast from "@/utils/isPast";
import Image from "next/image";
import ViewResumeButton from "../button/ViewResumeButton";

interface ApplicationInfoProps {
  info: AppliedAlbaData;
}

const ApplicationInfo = ({ info }: ApplicationInfoProps) => {
  const hireStatus =
    {
      REJECTED: "거절",
      INTERVIEW_PENDING: "면접대기",
      INTERVIEW_COMPLETED: "면접완료",
      default: "채용 완료",
    }[info.status] || "채용 완료";

  const createdTime = getCurrentTime(info.createdAt);
  const isRecruiting = isPast(info.form.recruitmentEndDate);

  return (
    <div className="flex h-[219px] w-[375px] flex-col justify-between rounded-lg border-gray-100 p-6 shadow-md pc:h-[328px] pc:w-[477px] pc:py-[30px]">
      <div className="flex items-center justify-between text-sm text-gray-400 pc:text-lg">
        <span>지원일시</span>
        <span className="ml-2 flex-grow border-l border-l-line-100 px-2">
          {createdTime}
        </span>
        <ViewResumeButton id={info.id} />
      </div>

      <div className="flex items-center gap-2">
        <div className="relative size-8 overflow-hidden rounded-full pc:size-12">
          <Image
            src={info.form.owner.imageUrl}
            layout="fill"
            objectFit="cover"
            alt="상점 이미지"
          />
        </div>
        <span className="text-3 pc:text-4">{info.form.owner.storeName}</span>
      </div>

      <div>
        <h2 className="text-md font-semibold text-black-400 pc:text-xl">
          {info.form.title}
        </h2>
        <p className="text-sm text-gray-400 pc:text-2lg">
          {info.form.description}
        </p>
      </div>

      <ul className="flex gap-2 text-sm">
        <li className="rounded-md border border-orange-100 bg-orange-50 px-2 py-1 text-orange-300">
          {hireStatus}
        </li>
        <li className="rounded-md border border-orange-100 bg-orange-50 px-2 py-1 text-orange-300">
          {isRecruiting ? "마감" : "모집중"}
        </li>
      </ul>
    </div>
  );
};

export default ApplicationInfo;
