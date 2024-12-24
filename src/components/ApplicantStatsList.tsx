"use client";

import Image from "next/image";
import instance from "@/lib/instance";
import addHyphensToPhoneNumber from "@/utils/addHyphensToPhoneNumber";
import formatExperienceMonth from "@/utils/formatExperienceMonth";
import translateStatus from "@/utils/translateStatus";
import LoadingSpinner from "./spinner/LoadingSpinner";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";

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

const ApplicantStatsList = () => {
  const router = useRouter();
  const [list, setList] = useState<ApplicantData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderExperience, setOrderExperience] = useState<"asc" | "desc">("asc");
  const [orderByStatus, setOrderByStatus] = useState<"asc" | "desc">("asc");
  const { formId } = useParams();
  const { closeModal } = useModal();

  useEffect(() => {
    const fetchApplicantList = async () => {
      setIsLoading(true);
      try {
        const res = await instance(
          `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/applications?limit=10&orderExperience=${orderExperience}&orderByStatus=${orderByStatus}`
        );
        setList(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("지원자 현황 조회에 실패했습니다", error);
      }
    };
    fetchApplicantList();
  }, [formId, orderExperience, orderByStatus]);

  const toggleSortButton = (mode: string) => {
    if (mode === "experience")
      orderExperience === "asc"
        ? setOrderExperience("desc")
        : setOrderExperience("asc");
    else if (mode === "status")
      orderByStatus === "asc"
        ? setOrderByStatus("desc")
        : setOrderByStatus("asc");
  };

  const handleNavigate = (id: number) => {
    router.push(`/application/${formId}/${id}`);
    closeModal();
  };

  return (
    <section className="h-[474px] w-[375px] pc:h-[574px] pc:w-[770px]">
      {!isLoading ? (
        <>
          <h2 className="p-4 text-2lg font-semibold text-black-500 pc:text-3xl">
            지원 현황
          </h2>
          <div>
            <table className="w-full text-black-400">
              <thead className="h-[56px] w-[375px]">
                <tr className="text-left text-md text-black-100 pc:text-xl">
                  <th className="pl-4">이름</th>
                  <th className="pl-4">전화번호</th>
                  <th>
                    <div className="flex items-center">
                      경력
                      <button
                        className="relative ml-1 size-8"
                        onClick={() => toggleSortButton("experience")}
                      >
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
                      <button
                        className="relative ml-1 size-8"
                        onClick={() => toggleSortButton("status")}
                      >
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
                {list.length > 0 &&
                  list.map((el) => (
                    <tr
                      key={el.id}
                      className="h-[72px] w-[375px] cursor-pointer border-t border-t-line-100 text-left hover:text-orange-300 pc:text-xl"
                      onClick={() => handleNavigate(el.id)}
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
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </section>
  );
};

export default ApplicantStatsList;
