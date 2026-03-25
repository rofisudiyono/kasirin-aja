import { atomWithMMKV } from "@/shared/store/storage";

export const isLoggedInAtom = atomWithMMKV("isLoggedIn", false);
