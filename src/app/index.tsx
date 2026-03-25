import { Redirect } from "expo-router";

import { useAuth } from "@/shared/lib/auth";

export default function Index() {
  const { isLoggedIn } = useAuth();
  return <Redirect href={isLoggedIn ? "/(tabs)" : "/login"} />;
}
