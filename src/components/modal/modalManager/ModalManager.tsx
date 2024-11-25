"use client";

import { useAtomValue } from "jotai";
import { modalAtom } from "@/atoms/modalAtom";
import CloseAlbaformModal from "../modalContent/ClosedAlbaformModal";
import DeleteAlbaformModal from "../modalContent/DeleteAlbaformModal";
import PatchAlbaformModal from "../modalContent/PatchAlbaformModal";
import SelectProgressModal from "../modalContent/SelectProgressModal";

const ModalManager = () => {
  const modalType = useAtomValue(modalAtom);

  if (!modalType) return null;

  switch (modalType) {
    case "ClosedAlbaformModal":
      return <CloseAlbaformModal />;
    case "DeleteAlbaformModal":
      return <DeleteAlbaformModal />;
    case "PatchAlbaformModal":
      return <PatchAlbaformModal />;
    case "SelectProgressModal":
      return <SelectProgressModal />;
    default:
      return null;
  }
};

export default ModalManager;
