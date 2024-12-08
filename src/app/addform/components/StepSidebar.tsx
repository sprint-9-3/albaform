import MainButton from "./MainButton";
import StepButton from "./StepButton";

const StepSidebar = () => {
  return (
    <div className="hidden h-[966px] w-[452px] flex-col justify-between rounded-3xl bg-background-200 p-8 pc:flex">
      <div className="flex flex-col space-y-2">
        <StepButton />
      </div>
      <MainButton />
    </div>
  );
};

export default StepSidebar;
