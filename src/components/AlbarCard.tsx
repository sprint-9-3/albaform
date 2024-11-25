import { AlbarformData } from "@/types/alba";
import { formatDate } from "@/utils/formatDate";
import { getDday } from "@/utils/getDday";
import { isPast } from "@/utils/isPast";
import Image from "next/image";

interface AlbarCardProps {
  info: AlbarformData;
}

const AlbarCard = ({ info }: AlbarCardProps) => {
  const isRecruiting = isPast(info.recruitmentEndDate);
  const dday = getDday(info.recruitmentEndDate);

  const [formattedStartDate, formattedEndDate] = formatDate(
    info.recruitmentStartDate,
    info.recruitmentEndDate
  );

  return (
    <div className="h-[390px] w-[327px] pc:h-[536px] pc:w-[477px]">
      <figure className="relative h-[208px] w-full overflow-hidden rounded-[12px] pc:h-[304px]">
        <Image
          src={info.imageUrls[0]}
          fill
          objectFit="cover"
          alt="알바 미리보기 이미지"
        />
      </figure>
      <time className="mt-[24px] flex h-[28px] w-full items-center justify-between gap-[8px] text-md pc:h-[38px] pc:text-lg">
        <div className="rounded-[4px] bg-orange-50 px-[8px] py-[4px] text-orange-300">
          {info.isPublic === true ? "공개" : "비공개"}
        </div>
        <div className="rounded-[4px] bg-orange-50 px-[8px] py-[4px] text-orange-300">
          {isRecruiting ? "모집중" : "모집완료"}
        </div>
        <div className="flex-grow text-black-100">
          {formattedStartDate} ~ {formattedEndDate}
        </div>
        <button className="relative h-[24px] w-[24px] pc:h-[36px] pc:w-[36px]">
          <Image src="icon/kebab-md.svg" fill alt="메뉴 버튼" />
        </button>
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
};

export default AlbarCard;
