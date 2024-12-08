import Image from "next/image";

type ApplicantStatsProps = {
  info: {
    scrapCount: number;
    applyCount: number;
  };
};

const ApplicantStats = ({ info }: ApplicantStatsProps) => {
  const contentList = [
    {
      id: 0,
      href: "/icon/bookmark-orange.svg",
      title: "스크랩",
      content: `${info.scrapCount}회`,
      alt: "스크랩",
    },
    {
      id: 1,
      href: "/icon/people.svg",
      title: "지원현황",
      content: `현재까지 ${info.applyCount}명이 알바폼에 지원했어요!`,
      alt: "지원현황",
    },
  ];

  return (
    <section className="h-[84px] w-full border-b border-t border-line-100 px-2 py-4 text-xs pc:h-[152px] pc:px-4 pc:py-8 pc:text-2lg">
      {contentList.map((list) => (
        <div key={list.id} className="flex items-center gap-3">
          <div className="flex h-[26px] w-[100px] items-center pc:h-[38px] pc:w-[120px]">
            <div className="relative size-6 pc:size-9">
              <Image src={list.href} fill alt={list.alt} />
            </div>
            <h3 className="ml-2 font-semibold text-black-400">{list.title}</h3>
          </div>
          <div className="flex-grow items-center font-semibold text-black-200">
            {list.content}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ApplicantStats;
