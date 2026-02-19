import { CloseButton, StateButton } from "@/components";
import { supabase } from "@/lib/supabase";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  View,
  Pressable,
  TextInputKeyPressEventData,
} from "react-native";
import { toast } from "sonner-native";

export default function OtpScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<TextInput[]>([]);
  const [countDown, setCountDown] = useState(59);
  const isDisabled = otp.some((digit) => digit === "");
  const { email } = useLocalSearchParams();
  const router = useRouter();
  const [isVarifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (countDown === 0) return;
    const timeOut = setTimeout(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [countDown]);

  useEffect(() => {
    if (!inputRefs.current) return;
    inputRefs.current[0].focus();
  }, []);

  const handleOnChange = (text: string, index: number) => {
    if (text.length > 1) {
      const pasted = text.slice(0, otp.length).split("");
      console.log(pasted);
      console.log(text);
      setOtp(pasted);

      if (inputRefs.current) {
        inputRefs.current[pasted.length - 1].focus();
      }
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1 && inputRefs.current) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOnKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (event.nativeEvent.key === "Backspace" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpVarification = async () => {
    setIsVerifying(true);
    const { error } = await supabase.auth.verifyOtp({
      email: email.toString(),
      token: otp.join(""),
      type: "email",
    });
    setIsVerifying(false);

    if (error) {
      console.log("Error while verifying opt: ", error.message);
      toast.error(error.message);
    }

    router.replace("/(tabs)");
    toast.success("Sign in Successfully!");
  };

  return (
    <View className="relative flex-1 items-center justify-center bg-black px-6">
      <Image
        source={require("../assets/logo.svg")}
        style={{ width: 42, height: 42, marginBottom: 32 }}
      />
      <View className="items-center gap-5">
        <View className="mb-3 items-center">
          <Text className="mb-2 text-center text-3xl font-bold text-white">
            We&apos;ve sent you an OTP
          </Text>
          <Text className="max-w-[224px] text-center font-semibold text-neutral-400">
            Enter the OTP we&apos;ve sent you on your email address.
          </Text>
        </View>
        <View>
          <Text className="mb-1 text-sm font-semibold text-white">OTP</Text>
          <View className="w-[80vw] flex-row items-center gap-2">
            {otp.map((digit, idx) => (
              <TextInput
                keyboardType="number-pad"
                key={idx}
                ref={(ref) => {
                  if (inputRefs.current) {
                    if (ref) inputRefs.current[idx] = ref;
                  }
                }}
                value={digit}
                onChangeText={(text) => handleOnChange(text, idx)}
                onKeyPress={(event) => handleOnKeyPress(event, idx)}
                className="h-16 flex-1 rounded-xl border-2 border-neutral-900 bg-neutral-950 px-4 py-1 text-center text-xl text-white focus:border-indigo-400"
              />
            ))}
          </View>
        </View>
        <View className="flex-row items-center gap-1">
          <Text className="text-sm font-semibold text-neutral-400">
            Otp is valid till
          </Text>
          <Text className="text-sm font-semibold text-indigo-400">
            00:{countDown.toString().padStart(2, "0")}
          </Text>
        </View>
        <StateButton
          isLoading={isVarifying}
          isDisabled={isDisabled}
          handlerFn={handleOtpVarification}
          text="Log In"
        />
        <View className="flex-row items-center gap-1">
          <Text className="text-sm font-semibold text-neutral-400">
            Didn&apos;t recieve an OTP?
          </Text>
          <Pressable onPress={() => setCountDown(59)}>
            <Text className="text-sm font-semibold text-indigo-400 underline">
              Resend OTP
            </Text>
          </Pressable>
        </View>
      </View>
      <CloseButton />
    </View>
  );
}
