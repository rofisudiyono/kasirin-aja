import { atomWithMMKV } from "./storage";

export const isLoggedInAtom = atomWithMMKV("isLoggedIn", false);
