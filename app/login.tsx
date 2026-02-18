import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner-native";
import { useRouter } from "expo-router";

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
    router.replace("/otp");
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
        <View>
          <Text className="mb-1 text-sm font-semibold text-white">Email</Text>
          <View className="w-[80vw] max-w-xs flex-row items-center gap-2 rounded-xl border-2 border-neutral-900 bg-neutral-950 px-4 py-1 focus:border-indigo-400">
            <TextInput
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              autoComplete="email"
              autoFocus
              placeholder="Enter your email"
              className="flex-1 text-white"
              value={email}
              placeholderTextColor="#737373"
              onChangeText={(text) => setEmail(text)}
            />
            {email.length > 0 && (
              <Pressable
                onPress={() => setEmail("")}
                className="rounded-full bg-neutral-900 p-1"
              >
                <Ionicons name="close-outline" size={16} color="#737373" />
              </Pressable>
            )}
          </View>
        </View>
        <Pressable
          onPress={() => handleEmailSubmit}
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
      <Pressable className="absolute right-4 top-12">
        <Ionicons name="close-outline" size={28} color="white" />
      </Pressable>
    </View>
  );
}
