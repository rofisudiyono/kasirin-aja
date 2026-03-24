import { useAtom } from "jotai";
import { isLoggedInAtom } from "@/store/auth";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  return {
    isLoggedIn,
    login: () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false),
  };
};
