import Carousel from "@/components/Carousel/Carousel";
import Content from "../components/Content";
import Title from "../components/Title";
import StoreLocation from "../components/StoreLocation";
import SimpleRequirements from "../components/SimpleRequirements";
import EmployerInfo from "../components/EmployerInfo";
import DetailRequirements from "../components/DetailRequirements";
import NoticeApplicant from "./components/NoticeApplicant";
import NoticeIsClosed from "../components/NoticeIsClosed";
import ScrapAndShareButton from "../components/ScrapAndShareButton";
import OwnerActionButtons from "../components/OwnerActionButtons";
import fetchAlbarformDetailData from "./fetchAlbarformDetailData";
import ApllicantActionButtons from "./components/ApllicantActionButtons";
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
  const cookie = await cookies();
  const role = cookie.get("role")?.value || "Guest";
  const userId = cookie.get("id")?.value;
  const { formId } = await params;

  const data: AlbaformDetailData = await fetchAlbarformDetailData(formId);
  const isMyAlbarform = Number(userId) === data.ownerId;

  const renderActionButtons = () => {
    if (role === "APPLICANT" || role === "Guest") {
      return (
        <ApllicantActionButtons
          formId={formId}
          recruitmentEndDate={data.recruitmentEndDate}
          isLogin={role !== "Guest"}
        />
      );
    } else if (isMyAlbarform) {
      return <OwnerActionButtons formId={formId} />;
    } else return null;
  };

  return (
    <>
      <Carousel imageUrls={data.imageUrls} />
      <div className="mt-8 grid gap-[32px] pc:grid-cols-[770px_640px] pc:grid-rows-[432px_336px_230px_562px] pc:justify-items-center pc:gap-0 pc:gap-x-[150px] pc:gap-y-[40px] pc:grid-areas-layout tablet:w-[550px] tablet:grid-cols-1 tablet:grid-rows-[270px_220px_156px_396px_302px_340px_158px] mobile:w-[327px] mobile:grid-cols-1 mobile:grid-rows-[270px_116px_156px_396px_302px_340px_158px]">
        <section className="w-full pc:grid-in-box1">
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
        <section className="pc:grid-in-box7">
          <DetailRequirements info={data} />
        </section>
        <section className="pc:grid-in-box3">
          <StoreLocation location={data.location} />
        </section>
        <section
          className={cls(
            "flex w-full flex-col gap-[10px]",
            isMyAlbarform ? "pc:grid-in-box6" : ""
          )}
        >
          {renderActionButtons()}
        </section>
      </div>
      <NoticeIsClosed closedDate={data.recruitmentEndDate} />
      {data.applyCount > 0 && <NoticeApplicant count={data.applyCount} />}
      {role === "APPLICANT" && (
        <ScrapAndShareButton formId={formId} isScrapped={data.isScrapped} />
      )}
    </>
  );
};

export default AlbarformDetailPage;
