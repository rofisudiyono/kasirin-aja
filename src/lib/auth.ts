import { useAtom } from "jotai";
import { isLoggedInAtom } from "@/features/auth/store/auth.store";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  return {
    isLoggedIn,
    login: () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false),
  };
};
