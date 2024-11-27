"use client";

import { useAtomValue } from "jotai";
import { modalAtom } from "@/atoms/modalAtom";
import CloseAlbaformModal from "../modalContent/ClosedAlbaformModal";
import DeleteAlbaformModal from "../modalContent/DeleteAlbaformModal";
import PatchAlbaformModal from "../modalContent/PatchAlbaformModal";
import GetMyApplicationModal from "../modalContent/GetMyApplicationModal";
import SelectProgressModal from "../modalContent/SelectProgressModal";
import ChangePasswordModal from "../modalContent/ChangePasswordModal";
import ChangeMyInfoModal from "../modalContent/ChangeMyInfoModal";

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
    case "GetMyApplicationModal":
      return <GetMyApplicationModal />;
    case "SelectProgressModal":
      return <SelectProgressModal />;
    case "ChangePasswordModal":
      return <ChangePasswordModal />;
    case "ChangeMyInfoModal":
      return <ChangeMyInfoModal />;
    default:
      return null;
  }
};

export default ModalManager;
