import { zodResolver } from "@hookform/resolvers/zod";
import { addFormSchema } from "@/schema/addForm/addFormSchema";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useCallback, useEffect, useRef } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  addFormIsSubmittingAtom,
  addFormSubmitDisabledAtom,
  stepActiveAtomFamily,
} from "@/atoms/addFormAtomStore";
import { useToast } from "./useToast";
import { formatDate } from "@/utils/formatDate";
import { base64ToFile } from "@/utils/imageFileConvert";
import { useModal } from "./useModal";

// addform 전체 관리
export const useAddForm = () => {
  const methods = useForm<z.infer<typeof addFormSchema>>({
    resolver: zodResolver(addFormSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      description: "",
      recruitmentStartDate: "",
      recruitmentEndDate: "",
      imageUrls: [],
      numberOfPositions: 0,
      gender: "",
      education: "",
      age: "",
      preferred: "",
      location: "",
      workStartDate: "",
      workEndDate: "",
      workStartTime: "",
      workEndTime: "",
      workDays: [],
      isNegotiableWorkDays: false,
      hourlyWage: 0,
      isPublic: true,
    },
  });

  // 단계별 페이지에서 반복하여 모달이 뜨는 것을 방지하기 위한 코드 포함
  const { openModal } = useModal();
  const showModal = useRef(true);
  const modalRef = useRef(openModal);
  const setStepOneActive = useSetAtom(stepActiveAtomFamily("stepOne"));
  const setStepTwoActive = useSetAtom(stepActiveAtomFamily("stepTwo"));
  const setStepThreeActive = useSetAtom(stepActiveAtomFamily("stepThree"));

  useEffect(() => {
    modalRef.current = openModal;
  }, [openModal]);

  // 모달에서 '새로 쓰기' 버튼 클릭 시 전체 임시저장 데이터 초기화
  const resetAllTempData = useCallback(() => {
    methods.reset();
    setStepOneActive(false);
    setStepTwoActive(false);
    setStepThreeActive(false);
    showModal.current = true;
  }, [methods, setStepOneActive, setStepTwoActive, setStepThreeActive]);

  const loadAllTempData = useCallback(() => {
    const TempDataArr = ["stepOne", "stepTwo", "stepThree"];

    const hasTempData = TempDataArr.some((step) => localStorage.getItem(step));

    if (hasTempData && showModal.current) {
      modalRef.current("NewWriteformModal");
      showModal.current = false;
    }

    TempDataArr.forEach((step) => {
      const localStorageData = localStorage.getItem(step);

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);

        Object.entries(parsedData).forEach(([key, value]) => {
          if (key !== "tempImage") {
            methods.setValue(
              key as keyof z.infer<typeof addFormSchema>,
              value as z.infer<typeof addFormSchema>[keyof z.infer<
                typeof addFormSchema
              >]
            );
          }
        });
      }
    });
  }, [methods]);

  return { methods, loadAllTempData, resetAllTempData };
};

// 등록 버튼 활성화 여부, 등록 중 여부
export const useValidateForm = (
  methods: UseFormReturn<z.infer<typeof addFormSchema>>
) => {
  const [submitDisabled, setSubmitDisabled] = useAtom(
    addFormSubmitDisabledAtom
  );
  const [addFormIsSubmitting, setAddFormIsSubmitting] = useAtom(
    addFormIsSubmittingAtom
  );

  const values = methods.getValues();

  // 등록 버튼 활성화 여부 (선택값이 많아서 isValid 미동작으로, 값들이 모두 채워지면 활성화)
  useEffect(() => {
    const subscription = methods.watch((value) => {
      if (!value) return;

      const hourlyWage = values.hourlyWage;
      const workDays = values.workDays;

      const isComplete = Object.values(values).every((value) => {
        if (value === hourlyWage) {
          return value > 0;
        }

        if (value === workDays) {
          return workDays.length > 0;
        }

        if (typeof value === "number") {
          return value !== undefined;
        }

        const result = value !== undefined && value !== "";

        return result;
      });

      setSubmitDisabled(!isComplete);
    });

    return () => subscription.unsubscribe();
  }, [setSubmitDisabled, values, methods]);

  // 등록 중 여부
  useEffect(() => {
    if (methods.formState.isSubmitting) {
      setAddFormIsSubmitting(true);
    } else {
      setAddFormIsSubmitting(false);
    }
  }, [methods.formState.isSubmitting, setAddFormIsSubmitting]);

  return { submitDisabled, addFormIsSubmitting };
};

interface UseAddFormInitProps {
  albaForm?:
    | z.infer<typeof addFormSchema>
    | {
        status: number;
        message: string;
      };
}

// 알바폼 수정하기 초기화
export const useAddFormInit = ({ albaForm }: UseAddFormInitProps) => {
  const isInitialized = useRef(false);
  const setStepOneActive = useSetAtom(stepActiveAtomFamily("stepOne"));
  const setStepTwoActive = useSetAtom(stepActiveAtomFamily("stepTwo"));
  const setStepThreeActive = useSetAtom(stepActiveAtomFamily("stepThree"));
  const { addToast } = useToast();

  const initializeAddForm = useCallback(
    (
      methods: UseFormReturn<z.infer<typeof addFormSchema>>,
      setCurrentImageList: (files: File[]) => void
    ) => {
      if (albaForm && !isInitialized.current) {
        if ("status" in albaForm) {
          addToast(albaForm.message, "warning");
          return;
        } else {
          const workDates = formatDate(
            albaForm.workStartDate,
            albaForm.workEndDate,
            true
          );

          const recruitmentDates = formatDate(
            albaForm.recruitmentStartDate,
            albaForm.recruitmentEndDate,
            true
          );

          methods.reset({
            ...albaForm,
            workStartDate: workDates[0],
            workEndDate: workDates[1],
            recruitmentStartDate: recruitmentDates[0],
            recruitmentEndDate: recruitmentDates[1],
          });

          setStepOneActive(true);
          setStepTwoActive(true);
          setStepThreeActive(true);

          if (albaForm.imageUrls && albaForm.imageUrls.length > 0) {
            const convertToFile = async () => {
              const files = await Promise.all(
                albaForm.imageUrls!.map((url) =>
                  base64ToFile(url, "serverImage")
                )
              );
              setCurrentImageList(files);
            };
            convertToFile();
          }
          isInitialized.current = true;
        }
      }
    },
    [addToast, setStepOneActive, setStepTwoActive, setStepThreeActive, albaForm]
  );

  return { initializeAddForm };
};
