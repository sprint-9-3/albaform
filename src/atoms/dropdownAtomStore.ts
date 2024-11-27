import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

export const dropdownTriggerAtom = atomFamily((id: string) => atom(false));

// 전체 - 모집 중 - 모집 마감 드롭다운 (isRecruiting)
export const applicationStatusAtom = atom<boolean | undefined>(undefined);

// 수정 및 삭제 드롭다운
export const editDeleteDropdownAtom = atom(false);

// 수정 및 삭제 모달 열림 여부
export const editDeleteOpenAtom = atomFamily((id: string) => atom(false));
