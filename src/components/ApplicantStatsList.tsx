import Image from "next/image";
import addHyphensToPhoneNumber from "@/utils/addHyphensToPhoneNumber";
import formatExperienceMonth from "@/utils/formatExperienceMonth";
import translateStatus from "@/utils/translateStatus";

interface ApplicantData {
  applicantId: number;
  updatedAt: string;
  createdAt: string;
  status: "REJECTED" | "INTERVIEW_PENDING" | "INTERVIEW_COMPLETED" | "HIRED";
  introduction: string;
  resumeName: string;
  resumeId: number;
  experienceMonths: number;
  phoneNumber: string;
  name: string;
  id: number;
}

const ApplicantStatsList = ({ list }: { list: ApplicantData[] }) => {
  return (
    <section className="h-[474px] w-[375px] pc:h-[574px] pc:w-[770px]">
      <h2 className="p-4 text-2lg font-semibold text-black-500 pc:text-3xl">
        지원 현황
      </h2>
      <div className="">
        <table className="w-full text-black-400">
          <thead className="h-[56px] w-[375px]">
            <tr className="text-left text-md text-black-100 pc:text-xl">
              <th className="pl-4">이름</th>
              <th className="pl-4">전화번호</th>
              <th>
                <div className="flex items-center">
                  경력
                  <button className="relative ml-1 size-8">
                    <Image
                      src="/icon/sort-ascending-outline-lg.svg"
                      fill
                      alt="정렬"
                    />
                  </button>
                </div>
              </th>
              <th className="pl-6">
                <div className="flex items-center">
                  상태
                  <button className="relative ml-1 size-8">
                    <Image
                      src="/icon/sort-ascending-outline-lg.svg"
                      fill
                      alt="정렬"
                    />
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((el) => (
              <tr
                key={el.id}
                className="h-[72px] w-[375px] border-t border-t-line-100 text-left pc:text-xl"
              >
                <td className="pl-4 underline">{el.name}</td>
                <td className="pl-5">
                  {addHyphensToPhoneNumber(el.phoneNumber)}
                </td>
                <td className="pl-2">
                  {formatExperienceMonth(el.experienceMonths)}
                </td>
                <td className="pl-2">{translateStatus(el.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ApplicantStatsList;
