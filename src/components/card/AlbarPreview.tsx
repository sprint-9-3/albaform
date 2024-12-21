"use client";

import Image from "next/image";
import isPast from "@/utils/isPast";
import instance from "@/lib/instance";
import AlbaPreviewDropdown from "../dropdown/AlbaPreviewDropdown";
import { useRouter } from "next/navigation";
import { getDday } from "@/utils/getDday";
import { formatDate } from "@/utils/formatDate";
import { AlbarformData } from "@/types/alba";
import { useToast } from "@/hooks/useToast";
import BlurWrapper from "../blurWrapper/BlurWrapper";
import Link from "next/link";

interface AlbarPreviewProps {
  info: AlbarformData;
  role: string;
}

const AlbarPreview = ({ info, role }: AlbarPreviewProps) => {
  const router = useRouter();
  const isRecruiting = !isPast(info.recruitmentEndDate);
  const dday = getDday(info.recruitmentEndDate);
  const imageStyle = info.imageUrls[0] ? "object-cover" : "p-10 object-contain";
  const { addToast } = useToast();

  const [formattedStartDate, formattedEndDate] = formatDate(
    info.recruitmentStartDate,
    info.recruitmentEndDate
  );

  const goToApply = () => {
    router.push(`/apply/${info.id}`);
  };

  const onScrap = async () => {
    const result = await instance(
      `${process.env.NEXT_PUBLIC_API_URL}/forms/${info.id}/scrap`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (result.error) {
      addToast(`${result.error}`, "warning");
    } else {
      addToast("스크랩이 완료되었습니다.", "success");
    }
  };

  const AlbarPreviewContent = () => (
    <div className="h-[390px] w-[327px] pc:h-[536px] pc:w-[477px]">
      <figure className="relative h-[208px] w-full overflow-hidden rounded-[12px] pc:h-[304px]">
        <Image
          src={info.imageUrls[0] || "/logo/albaform-with-logo.svg"}
          fill
          alt="알바 미리보기 이미지"
          className={imageStyle}
        />
      </figure>
      <time className="mt-[24px] flex h-[28px] w-full items-center justify-between gap-[8px] text-md pc:h-[38px] pc:text-lg">
        <div className="rounded-[4px] bg-orange-50 px-[8px] py-[4px] text-orange-300">
          {info.isPublic ? "공개" : "비공개"}
        </div>
        <div className="rounded-[4px] bg-orange-50 px-[8px] py-[4px] text-orange-300">
          {isRecruiting ? "모집중" : "모집완료"}
        </div>
        <div className="flex-grow text-black-100">
          {formattedStartDate} ~ {formattedEndDate}
        </div>
        {role === "APPLICANT" && (
          <AlbaPreviewDropdown
            id={info.id}
            goToApply={goToApply}
            onScrap={onScrap}
          >
            <Image
              src={"/icon/kebab-md.svg"}
              width={24}
              height={24}
              alt="kebab icon"
              className="pc:size-9"
            />
          </AlbaPreviewDropdown>
        )}
      </time>
      <div className="mt-[16px] h-[52px] pc:mt-[24px] pc:h-[64px]">
        <h2 className="w-[80%] text-2lg font-semibold pc:text-xl">
          {info.title}
        </h2>
      </div>
      <div className="mt-[24px] flex h-[38px] items-center justify-around rounded-[16px] border border-line-100 text-sm text-black-200 pc:h-[50px] pc:text-lg">
        <span className="border-r border-line-100 pr-[20px]">
          지원자 {info.applyCount}명
        </span>
        <span className="border-r border-line-100 pr-[20px]">
          스크랩 {info.scrapCount}명
        </span>
        <span>마감 {dday}</span>
      </div>
    </div>
  );

  return (
    <>
      {info.isPublic ? (
        <Link href={`/alba/${info.id}`}>
          <AlbarPreviewContent />
        </Link>
      ) : (
        <BlurWrapper>
          <AlbarPreviewContent />
        </BlurWrapper>
      )}
    </>
  );
};

export default AlbarPreview;
