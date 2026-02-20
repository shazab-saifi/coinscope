import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner-native";
import { useRouter } from "expo-router";
import { CloseButton, LabeledInput } from "@/components";
import { useAuth } from "@/providers/auth-provider";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const router = useRouter();
  const { setSkippedAuth } = useAuth();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailSubmit = async () => {
    if (!isValidEmail) return;

    setIsSendingEmail(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });
    setIsSendingEmail(false);

    if (error) {
      console.log("Login failed: ", error.message);
      toast.error(error.message);
      return;
    }

    toast.success("OTP sent successfully! Check you email.");
    router.push({
      pathname: "/otp",
      params: { email },
    });
  };

  const handleSkipAuth = async () => {
    await setSkippedAuth(true);
    router.replace("/(tabs)");
  };

  return (
    <View className="relative flex-1 items-center justify-center bg-black px-6">
      <Image
        source={require("../assets/logo.svg")}
        style={{ width: 42, height: 42, marginBottom: 32 }}
      />
      <View className="items-center gap-5">
        <Text className="mb-3 text-3xl font-bold text-white">
          Log In or Sign Up
        </Text>
        <LabeledInput
          value={email}
          setValue={setEmail}
          label="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
          autoComplete="email"
          placeholder="Enter your email"
        />
        <Pressable
          onPress={handleEmailSubmit}
          disabled={!isValidEmail}
          className={`w-[78vw] max-w-xs items-center justify-center rounded-xl py-3 ${isValidEmail ? "bg-indigo-400" : "bg-indigo-400/50"}`}
        >
          {isSendingEmail ? (
            <ActivityIndicator color="black" size={24} />
          ) : (
            <Text className="text-lg font-semibold">Continue with email</Text>
          )}
        </Pressable>
      </View>
      <Text className="mt-5 max-w-[80%] text-sm text-neutral-500">
        Skip login at the top right, but some features will be limited.
      </Text>
      <CloseButton handlerFn={handleSkipAuth} />
    </View>
  );
}
