import { atomWithMMKV } from "@/shared/store/storage";

export interface ShiftData {
  openingCash: number;
  startTime: string;
  cashierName: string;
  note: string;
}

export const isShiftStartedAtom = atomWithMMKV("isShiftStarted", false);

export const shiftDataAtom = atomWithMMKV<ShiftData | null>("shiftData", null);
