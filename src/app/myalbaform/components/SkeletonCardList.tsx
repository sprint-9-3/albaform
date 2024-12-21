export const SkeletonAlbaformCard = () => {
  return (
    <div className="h-[390px] w-[327px] animate-pulse rounded-lg border border-line-100 bg-background-100 pt-2 pc:h-[535px] pc:w-[477px] pc:pt-14 tablet:h-[390px] tablet:w-[327px] tablet:pt-3">
      <div className="h-[207px] w-full rounded-xl bg-gray-100 pc:h-[304px]"></div>
      <div className="mt-4 flex items-center justify-center gap-x-2 pc:mt-6 tablet:mt-6">
        <div className="h-8 w-5/6 rounded-md bg-gray-100 pc:h-9"></div>
        <div className="h-8 w-1/6 rounded-md bg-gray-100 pc:h-9"></div>
      </div>
      <div className="mt-4 h-[52px] w-full rounded-md bg-gray-100 pc:mt-6"></div>
      <div className="mt-7 h-9 rounded-md bg-gray-100 pc:mt-9 pc:h-10 tablet:mt-6"></div>
    </div>
  );
};

export const SkeletonApplyCard = () => {
  return (
    <div className="h-[219px] w-[375px] animate-pulse rounded-lg border border-gray-100 bg-background-100 p-6 pc:h-[328px] pc:w-[477px] pc:px-6 pc:py-[30px]">
      <div className="h-[22px] w-full rounded-md bg-gray-100 pc:h-[26px]"></div>
      <div className="mt-3 flex items-center gap-x-2 pc:mt-8">
        <div className="size-8 rounded-full bg-gray-100 pc:size-12"></div>
        <div className="h-6 w-[287px] rounded-md bg-gray-100 pc:w-[373px]"></div>
      </div>
      <div className="mt-3 h-[46px] w-full rounded-md bg-gray-100 pc:mt-9 pc:h-[58px]"></div>
      <div className="mt-3 h-9 rounded-md bg-gray-100 pc:mt-8 pc:h-10"></div>
    </div>
  );
};

const SkeletonCardList = ({ count, role }: { count: number; role: string }) => {
  return (
    <>
      {role === "OWNER" ? (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-y-8 pc:grid-cols-3 pc:gap-x-6 pc:gap-y-16 tablet:grid-cols-2 tablet:gap-x-4 tablet:gap-y-12">
            {new Array(count).fill(0).map((_, idx) => (
              <SkeletonAlbaformCard key={idx} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 pc:mt-6 pc:grid-cols-3 pc:gap-x-[25px] pc:gap-y-10 tablet:mt-6 tablet:grid-cols-2">
            {new Array(count).fill(0).map((_, idx) => (
              <SkeletonApplyCard key={idx} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SkeletonCardList;
