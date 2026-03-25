import { atomWithMMKV } from "@/store/storage";

export const isLoggedInAtom = atomWithMMKV("isLoggedIn", false);
