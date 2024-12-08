import { AlbaformDetailData } from "@/types/alba";
import ApplicantStats from "../../../../components/card/ApplicantStats";
import isPast from "@/utils/isPast";
import getCurrentTime from "@/utils/getCurrentTime";

interface titleData {
  title: string;
  storeName: string;
  location: string;
  isPublic: boolean;
  createdAt: string;
  recruitmentEndDate: string;
  preferred: string;
  scrapCount: number;
  applyCount: number;
}

const Title = ({ info }: { info: titleData }) => {
  const isRecruiting = !isPast(info.recruitmentEndDate);
  const submitDate = getCurrentTime(info.createdAt);

  return (
    <div className="flex w-[327px] flex-col gap-6 pc:w-[720px]">
      <div className="flex items-center justify-between text-xs pc:justify-start pc:text-md">
        <ul className="flex gap-2">
          <li className="rounded-md border border-orange-100 bg-orange-50 px-2 py-1 font-semibold text-orange-300">
            {info.isPublic ? "공개" : "비공개"}
          </li>
          <li className="rounded-md border border-orange-100 bg-orange-50 px-2 py-1 font-semibold text-orange-300">
            {isRecruiting ? "모집중" : "모집완료"}
          </li>
        </ul>
        <span className="text-gray-500 pc:ml-4">{submitDate} 등록</span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex text-md">
          <span className="font-semibold underline">{info.storeName}</span>
          <span className="ml-[10px] flex font-medium text-gray-400">
            <p>{info.location}</p>&nbsp; ・ &nbsp;<p>{info.preferred}</p>
          </span>
        </div>
        <h2 className="text-xl font-semibold text-black-500">{info.title}</h2>
      </div>

      <ApplicantStats
        info={{ scrapCount: info.scrapCount, applyCount: info.applyCount }}
      />
    </div>
  );
};

export default Title;
