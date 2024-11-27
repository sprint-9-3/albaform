import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

export const dropdownTriggerAtom = atomFamily((id: string) => atom(false));

// 전체 - 모집 중 - 모집 마감 드롭다운 (isRecruiting)
export const applicationStatusAtom = atom<boolean | undefined>(undefined);

// 전체 - 공개 - 비공개 드롭다운 (isPublic)
export const publicStatusAtom = atom<boolean | undefined>(undefined);
