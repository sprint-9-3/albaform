import selectRequirementsByLabel from "@/utils/selectRequirementsByLabel";

type PickableListProps<T extends string> = {
  label: T;
  setValue: T extends "근무시간"
    ? (value: { time: string; updated: boolean }) => void
    : (value: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  setStepTwoData?: React.Dispatch<
    React.SetStateAction<{
      numberOfPositions: number;
      gender: string;
      education: string;
      age: string;
      preferred: string;
    }>
  >;
};

const PickableList = <
  T extends "모집인원" | "성별" | "학력" | "연령" | "우대사항" | "근무시간",
>({
  label,
  setValue,
  setIsOpen,
  setStepTwoData,
}: PickableListProps<T>) => {
  let list = selectRequirementsByLabel(label);

  const matchLabelToStepTwoData = (label: T) => {
    switch (label) {
      case "모집인원":
        return "numberOfPositions";
      case "성별":
        return "gender";
      case "학력":
        return "education";
      case "연령":
        return "age";
      case "우대사항":
        return "preferred";
      default:
        return "unknown";
    }
  };

  const handleClick = (el: string) => {
    if (label === "근무시간") {
      // 타입 단언을 통해 컴파일러가 올바른 타입임을 알 수 있게 함
      (setValue as (value: { time: string; updated: boolean }) => void)({
        time: el,
        updated: true,
      });
    } else {
      (setValue as (value: string) => void)(el);
    }
    if (setStepTwoData) {
      setStepTwoData((prev) => ({
        ...prev,
        [matchLabelToStepTwoData(label)]: el,
      }));
    }
    setIsOpen(false);
  };

  return (
    <ul className="picker-container">
      {list?.map((el) => (
        <li
          key={el}
          value={el}
          className="hover:text-orange-100"
          onClick={() => handleClick(el)}
        >
          {el}
        </li>
      ))}
    </ul>
  );
};

export default PickableList;
