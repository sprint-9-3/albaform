"use client";

import { useAtomValue } from "jotai";
import { modalAtom } from "@/atoms/modalAtomStore";
import CloseAlbaformModal from "../modalContent/ClosedAlbaformModal";
import DeleteAlbaformModal from "../modalContent/DeleteAlbaformModal";
import PatchAlbaformModal from "../modalContent/PatchAlbaformModal";
import GetMyApplicationModal from "../modalContent/GetMyApplicationModal";
import MyApplicationModal from "../modalContent/MyApplicationModal";
import SelectProgressModal from "../modalContent/SelectProgressModal";
import ChangePasswordModal from "../modalContent/ChangePasswordModal";
import ChangeMyInfoModal from "../modalContent/ChangeMyInfoModal";
import ChangeCEOInfoModal from "../modalContent/ChangeCEOInfoModal";
import ShareSNSModal from "../modalContent/ShareSNSModal";
import SelectLocationModal from "../modalContent/SelectLocationModal";
import ApplicantListModal from "../modalContent/ApplicantListModal";
import ContinueApplyFormModal from "../modalContent/ContinueApplyFormModal";

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
    case "MyApplicationModal":
      return <MyApplicationModal />;
    case "SelectProgressModal":
      return <SelectProgressModal />;
    case "ChangePasswordModal":
      return <ChangePasswordModal />;
    case "ChangeMyInfoModal":
      return <ChangeMyInfoModal />;
    case "ChangeCEOInfoModal":
      return <ChangeCEOInfoModal />;
    case "ShareSNSModal":
      return <ShareSNSModal />;
    case "SelectLocationModal":
      return <SelectLocationModal />;
    case "ApplicantListModal":
      return <ApplicantListModal />;
    case "ContinueApplyFormModal":
      return <ContinueApplyFormModal />;
    default:
      return null;
  }
};

export default ModalManager;
