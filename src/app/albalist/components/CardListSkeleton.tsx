export const CardSkeleton = () => {
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

const CardListSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 gap-y-8 pc:grid-cols-3 pc:gap-6 pc:gap-y-16 tablet:grid-cols-1 tablet:gap-y-12">
        {new Array(count).fill(0).map((_, idx) => (
          <CardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
};

export default CardListSkeleton;
