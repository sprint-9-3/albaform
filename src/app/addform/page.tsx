import StepSidebar from "./components/StepSidebar";
import Title from "./components/Title";
import AlbaformCreateDropdown from "@/components/dropdown/AlbaformCreateDropdown";
import StepContainer from "./components/StepContainer";
import { Suspense } from "react";
import MainButton from "./components/MainButton";

const AddFormPage = () => {
  return (
    <div className="m-auto flex w-[375px] flex-col space-y-3 pc:m-0 pc:w-full pc:flex-row pc:space-y-0">
      <StepSidebar />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <Title />
          <div className="m-auto w-[327px] pc:hidden">
            <AlbaformCreateDropdown />
          </div>
          <Suspense
            fallback={
              <div className="text-center text-md text-black-500 pc:text-xl">
                잠시만 기다려주세요...
              </div>
            }
          >
            <StepContainer />
          </Suspense>
        </div>
        <div className="pc:hidden">
          <MainButton />
        </div>
      </div>
    </div>
  );
};

export default AddFormPage;
