import Carousel from "@/components/Carousel/Carousel";
import Content from "../components/Content";
import Title from "../components/Title";
import StoreLocation from "../components/StoreLocation";
import SimpleRequirements from "../components/SimpleRequirements";
import EmployerInfo from "../components/EmployerInfo";
import DetailRequirements from "../components/DetailRequirements";
import NoticeApplicant from "../components/NoticeApplicant";
import NoticeIsClosed from "../components/NoticeIsClosed";
import ScrapAndShareButton from "../components/ScrapAndShareButton";
import ApllicantActionButtons from "../components/ApllicantActionButtons";
import OwnerActionButtons from "../components/OwnerActionButtons";
import fetchAlbarformDetailData from "./fetchAlbarformDetailData";
import { cookies } from "next/headers";
import { cls } from "@/utils/dynamicTailwinds";
import { AlbaformDetailData } from "@/types/alba";

type PageProps = {
  params: Promise<{ formId: string }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { formId } = await params;

  const data: AlbaformDetailData = await fetchAlbarformDetailData(formId);

  return {
    title: "알바폼 상세페이지",
    openGraph: {
      title: data.title,
      description: data.description,
      images: [
        {
          url: data.imageUrls[0],
          width: 400,
          height: 400,
        },
      ],
    },
  };
};

const AlbarformDetailPage = async ({ params }: PageProps) => {
  let data: AlbaformDetailData;
  let isMyAlbarform: boolean;
  const cookie = await cookies();
  const role = cookie.get("role")?.value || "nonMember";
  const userId = cookie.get("id")?.value;
  const { formId } = await params;

  try {
    data = await fetchAlbarformDetailData(formId);
    isMyAlbarform = Number(userId) === data.ownerId;
  } catch (error) {
    console.error(error);

    return (
      <div>
        <h1>데이터를 불러올 수 없습니다.</h1>
        <p>잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <>
      <Carousel imageUrls={data.imageUrls} />
      <div className="mt-8 grid gap-[32px] pc:mt-[80px] pc:grid-cols-[770px_640px] pc:grid-rows-[432px_336px_230px_562px] pc:justify-items-center pc:gap-0 pc:gap-x-[150px] pc:gap-y-[40px] pc:grid-areas-layout tablet:w-[550px] tablet:grid-cols-1 tablet:grid-rows-[270px_220px_156px_396px_302px_340px_158px] mobile:w-[327px] mobile:grid-cols-1 mobile:grid-rows-[270px_116px_156px_396px_302px_340px_158px]">
        <section className="self-center pc:grid-in-box1">
          <Title info={data} />
        </section>
        <section className="justify-self-center pc:self-center pc:grid-in-box4 tablet:self-center">
          <SimpleRequirements info={data} />
        </section>
        <section className="pc:grid-in-box5">
          <EmployerInfo info={data} />
        </section>
        <section className="pc:justify-self-start pc:grid-in-box2">
          <Content description={data.description} />
        </section>
        <section
          className={
            role === "APPLICANT" || role === "nonMember"
              ? "pc:grid-in-box7"
              : isMyAlbarform
                ? "pc:grid-in-box7"
                : "pc:grid-in-box6"
          }
        >
          <DetailRequirements info={data} />
        </section>
        <section className="pc:grid-in-box3">
          <StoreLocation location={data.location} />
        </section>
        {role === "APPLICANT" || role === "nonMember" ? (
          <section className="flex w-full flex-col gap-[10px] pc:grid-in-box6">
            <ApllicantActionButtons
              formId={formId}
              recruitmentEndDate={data.recruitmentEndDate}
            />
          </section>
        ) : isMyAlbarform ? (
          <section
            className={cls(
              "flex w-full flex-col gap-[10px]",
              isMyAlbarform ? "pc:grid-in-box6" : ""
            )}
          >
            <OwnerActionButtons formId={formId} />
          </section>
        ) : null}
      </div>
      <NoticeApplicant count={data.applyCount} />
      <NoticeIsClosed closedDate={data.recruitmentEndDate} />
      {role === "APPLICANT" && (
        <ScrapAndShareButton formId={formId} isScrapped={data.isScrapped} />
      )}
    </>
  );
};

export default AlbarformDetailPage;
