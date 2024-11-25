import { AppliedAlbaData } from "@/types/alba";
import getCurrentTime from "@/utils/getCurrentTime";
import isPast from "@/utils/isPast";
import Image from "next/image";

interface ApplicantCardProps {
  info: AppliedAlbaData;
}

const ApplicantCard = ({ info }: ApplicantCardProps) => {
  const hireStatus =
    info.status === "REJECTED"
      ? "거절"
      : info.status === "INTERVIEW_PENDING"
        ? "면접대기"
        : info.status === "INTERVIEW_COMPLETED"
          ? "면접완료"
          : "채용 완료";

  const createdTime = getCurrentTime(info.createdAt);
  const isRecruiting = isPast(info.form.recruitmentEndDate);

  return (
    <div className="flex h-[219px] w-[375px] flex-col justify-between rounded-[8px] border-gray-100 px-[24px] py-[24px] shadow-md pc:h-[328px] pc:w-[477px] pc:py-[30px]">
      <div className="flex items-center justify-between text-sm text-gray-400 pc:text-lg">
        <span>지원일시</span>
        <span className="ml-[8px] flex-grow border-l border-l-line-100 px-[8px]">
          {createdTime}
        </span>
        <button className="text-black-400 underline">이력서 보기</button>
      </div>

      <div className="flex items-center gap-[8px]">
        <div className="relative h-[32px] w-[32px] overflow-hidden rounded-full pc:h-[48px] pc:w-[48px]">
          <Image
            src={info.form.owner.imageUrl}
            layout="fill"
            objectFit="cover"
            alt="상점 이미지"
          />
        </div>
        <span className="text-[12px] pc:text-[16px]">
          {info.form.owner.storeName}
        </span>
      </div>

      <div>
        <h2 className="text-md font-semibold text-black-400 pc:text-xl">
          {info.form.title}
        </h2>
        <p className="text-sm text-gray-400 pc:text-2lg">
          {info.form.description}
        </p>
      </div>

      <ul className="flex gap-[8px] text-sm">
        <li className="rounded-[4px] border border-orange-100 bg-orange-50 px-[8px] py-[4px] text-orange-300">
          {hireStatus}
        </li>
        <li className="rounded-[4px] border border-orange-100 bg-orange-50 px-[8px] py-[4px] text-orange-300">
          {isRecruiting ? "모집중" : "마감"}
        </li>
      </ul>
    </div>
  );
};

export default ApplicantCard;
