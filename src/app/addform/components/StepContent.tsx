import StepOneContents from "./StepOneContents";
import StepThreeContents from "./StepThreeContents";
import StepTwoContents from "./StepTwoContents";

const StepContent = ({
  step,
  isEdit,
}: {
  step: string;
  isEdit: boolean | undefined;
}) => {
  const componentsByStep = {
    stepOne: StepOneContents,
    stepTwo: StepTwoContents,
    stepThree: StepThreeContents,
  };

  const Component = componentsByStep[step as keyof typeof componentsByStep];

  return Component ? <Component isEdit={isEdit} /> : null;
};

export default StepContent;
