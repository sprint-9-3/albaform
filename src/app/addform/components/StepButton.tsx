"use client";

import { cls } from "@/utils/dynamicTailwinds";
import { useEffect } from "react";
import WritingTag from "./WritingTag";
import { addFormStepAtom } from "@/atoms/addFormAtom";
import { useAtom } from "jotai";
import { useSearchParamsCustom } from "@/hooks/useSearchParamsCustom";

const StepButton = () => {
  const [currentStep, setCurrentStep] = useAtom(addFormStepAtom);
  const { updateURL } = useSearchParamsCustom({
    key: "step",
    value: currentStep.value,
  });

  const stepArr = [
    { title: "모집 내용", step: 1, value: "stepOne" },
    { title: "모집 조건", step: 2, value: "stepTwo" },
    { title: "근무 조건", step: 3, value: "stepThree" },
  ];

  const handleClickStep = (value: string) => {
    setCurrentStep({
      title: stepArr.find((item) => item.value === value)?.title,
      value,
      stepNum: stepArr.find((item) => item.value === value)?.step,
    });
    updateURL({ key: "step", value });
  };

  useEffect(() => {
    updateURL({ key: "step", value: currentStep.value });
  }, [currentStep.value, updateURL]);

  return stepArr.map((item) => (
    <button
      key={item.value}
      className={cls(
        "group flex items-center justify-between rounded-2xl bg-background-200 px-8 py-5 transition-all hover:bg-orange-300",
        currentStep.value === item.value ? "bg-orange-300" : ""
      )}
      onClick={() => handleClickStep(item.value)}
    >
      <div className="flex items-center space-x-6">
        <span
          className={cls(
            "flex size-7 items-center justify-center rounded-full bg-background-300 text-gray-200 transition-colors group-hover:bg-orange-50 group-hover:text-orange-300",
            currentStep.value === item.value
              ? "bg-orange-50 text-orange-300"
              : ""
          )}
        >
          {item.step}
        </span>
        <h2
          className={cls(
            "text-xl font-bold text-black-100 transition-colors group-hover:text-white",
            currentStep.value === item.value ? "text-white" : ""
          )}
        >
          {item.title}
        </h2>
      </div>
      <WritingTag currentStep={currentStep.value} value={item.value} />
    </button>
  ));
};

export default StepButton;
