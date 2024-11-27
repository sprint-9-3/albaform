interface DetailRequirementsProps {
  info: {
    preferred: string;
    age: string | "연령무관";
    education: string | "학력무관";
    gender: string | "성별무관";
    numberOfPositions: number | "00명(인원미정)";
  };
}

const DetailRequirements = ({ info }: DetailRequirementsProps) => {
  const requirementList = [
    {
      id: 0,
      title: "모집인원",
      content: info.numberOfPositions,
    },
    {
      id: 1,
      title: "성별",
      content: info.gender,
    },
    {
      id: 2,
      title: "학력",
      content: info.education,
    },
    {
      id: 3,
      title: "연령",
      content: info.age,
    },
    {
      id: 4,
      title: "우대사항",
      content: info.preferred,
    },
  ];

  return (
    <>
      <h2 className="text-black-50 text-2lg font-semibold pc:text-3xl">
        모집 조건
      </h2>
      <ul className="border-bg-line-100 mt-[10px] flex h-[244px] w-[327px] flex-col gap-4 rounded-md border bg-background-100 px-4 py-[10px] text-md pc:h-[288px] pc:w-[640px] pc:p-6 pc:text-xl">
        {requirementList.map((list) => (
          <li key={list.id} className="flex gap-4">
            <h3 className="text-black-200">{list.title}</h3>
            <p className="text-black-400">{list.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DetailRequirements;
