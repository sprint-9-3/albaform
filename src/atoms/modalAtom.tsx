"use client";

import { atom, useSetAtom } from "jotai";
import { ModalType } from "@/types/modal";

// 모달 상태 정의
export const modalAtom = atom<ModalType | null>(null);

// 훅 정의
export const useModal = () => {
  const setModalType = useSetAtom(modalAtom);

  const openModal = (type: keyof typeof ModalType) => {
    setModalType(ModalType[type]);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return { openModal, closeModal };
};
