import { Stack } from "expo-router";
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider, useAuth } from "@/providers/auth-provider";
import { useEffect, useMemo } from "react";
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { session, isLoading, hasSkippedAuth, isSkipAuthLoading } = useAuth();
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

  useEffect(() => {
    if (!isLoading && !isSkipAuthLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading, isSkipAuthLoading]);

  if (isLoading || isSkipAuthLoading) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={!!session || hasSkippedAuth}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>
          <Stack.Protected guard={!session && !hasSkippedAuth}>
            <Stack.Screen name="login" />
            <Stack.Screen name="otp" />
          </Stack.Protected>
          <Stack.Screen name="onboarding" />
        </Stack>
        <Toaster position="top-center" style={{ backgroundColor: "#171717" }} />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <View style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
        <RootNavigator />
      </View>
    </AuthProvider>
  );
}
