import Image from "next/image";
import emptyIcon from "@/../public/icon/empty-md.svg";

const EmptyState = ({ role }: { role: string }) => {
  return (
    <div className="mx-auto mt-32 flex flex-col items-center gap-y-6 pc:mt-[178px] pc:gap-y-8 tablet:mt-[205px]">
      <Image
        src={emptyIcon}
        width={80}
        height={80}
        alt="null icon"
        className="pc:h-[120px] pc:w-[120px]"
      />
      {role === "OWNER" ? (
        <span className="text-center text-md text-gray-400 pc:text-2lg">
          등록된 알바폼이 없어요.
          <br />
          1분만에 등록하고 알바를 구해보세요!
        </span>
      ) : (
        <span className="text-center text-md text-gray-400 pc:text-2lg">
          지원한 알바폼이 없어요.
          <br />
          알바폼을 둘러보고 지원해보세요!
        </span>
      )}
    </div>
  );
};

export default EmptyState;
