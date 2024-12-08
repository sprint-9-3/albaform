import SolidButton from "@/components/button/SolidButton";
import ApplyForm from "./components/ApplyForm";

const ApplyPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="relative mt-6 pc:mt-[80px]">
      <h2 className="text-xl font-semibold text-black-500 pc:text-3xl">
        알바폼 지원하기
      </h2>
      <ApplyForm id={id} />
      <div className="absolute right-0 top-[-4px] h-10 w-[80px] pc:top-[-6px] pc:h-[56px] pc:w-[122px]">
        <SolidButton style="gray100">작성 취소</SolidButton>
      </div>
    </div>
  );
};

export default ApplyPage;
