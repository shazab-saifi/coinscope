import { Text, View } from "react-native";
import { Image } from "expo-image";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner-native";
import { useRouter } from "expo-router";
import {
  CloseButton,
  LabeledInput,
  ScreenHeading,
  StateButton,
} from "@/components";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const router = useRouter();
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

  return (
    <View className="relative flex-1 items-center justify-center bg-black px-6">
      <Image
        source={require("../assets/logo.svg")}
        style={{ width: 42, height: 42, marginBottom: 32 }}
      />
      <View className="items-center gap-5">
        <ScreenHeading heading="Log In or Sign Up" />
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
        <StateButton
          text="Continue with email"
          isDisabled={!isValidEmail}
          handlerFn={handleEmailSubmit}
          isLoading={isSendingEmail}
        />
      </View>
      <Text className="mt-5 max-w-[80%] text-sm text-neutral-500">
        Skip login at the top right, but some features will be limited.
      </Text>
      <CloseButton />
    </View>
  );
}
