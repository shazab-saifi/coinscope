import { Stack, useRouter, useSegments } from "expo-router";
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider, useAuth } from "@/providers/auth-provider";
import { useEffect, useMemo } from "react";

void SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { session, isLoading } = useAuth();
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 3,
          },
        },
      }),
    []
  );
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      const firstSegment = segments[0];
      const isInTabsGroup = firstSegment === "(tabs)";
      const isInLoginScreen = firstSegment === "login";

      if (!session && !isInLoginScreen) {
        router.replace("/login");
      } else if (session && !isInTabsGroup) {
        router.replace("/(tabs)");
      }

      void SplashScreen.hideAsync();
    }
  }, [session, isLoading, segments, router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </QueryClientProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
