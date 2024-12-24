"use client";

import Image from "next/image";
import NoticeProgressToolTip from "./NoticeProgressToolTip";
import getCurrentTime from "@/utils/getCurrentTime";
import translateStatus from "@/utils/translateStatus";
import { useModal } from "@/hooks/useModal";
import { getDday } from "@/utils/getDday";

type ApplicationStatusProps = {
  createdAt: string;
  recruitmentEndDate: string;
  status: "REJECTED" | "INTERVIEW_PENDING" | "INTERVIEW_COMPLETED" | "HIRED";
  role: string;
};

const ApplicationStatus = ({
  createdAt,
  recruitmentEndDate,
  status,
  role,
}: ApplicationStatusProps) => {
  const Dday = getDday(recruitmentEndDate);
  const formattedCreatedTime = getCurrentTime(createdAt);
  const translatedStatus = translateStatus(status);
  const { openModal } = useModal();

  return (
    <div className="w-full pc:rounded-lg pc:border pc:border-line-100 pc:bg-background-100 pc:p-6">
      <div className="flex justify-between border-b border-b-line-100 py-4 text-md text-black-400">
        <span className="text-black-100">
          지원일시 <span className="ml-2 text-orange-300">{Dday}</span>
        </span>
        <span>{formattedCreatedTime}</span>
      </div>
      <div className="flex items-center justify-between border-b border-b-line-100 py-4 text-md text-black-400 pc:border-none">
        <span className="text-black-100">진행 상태</span>
        {role === "OWNER" && (
          <div className="relative mr-auto flex items-center">
            <button
              onClick={() => openModal("SelectProgressModal")}
              className="ml-2 mr-auto"
            >
              <Image src="/icon/edit.svg" width={28} height={28} alt="" />
            </button>
            <div className="absolute -bottom-[180%]">
              <NoticeProgressToolTip />
            </div>
          </div>
        )}
        <span>{translatedStatus}</span>
      </div>
    </div>
  );
};

export default ApplicationStatus;
