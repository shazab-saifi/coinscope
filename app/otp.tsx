import { CloseButton, Headings, ResendOtp, StateButton } from "@/components";
import { supabase } from "@/lib/supabase";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
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

  const handleOnKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && index > 0) {
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
      return;
    }

    router.replace("/onboarding");
  };

  return (
    <View className="relative flex-1 items-center justify-center bg-black px-6">
      <Image
        source={require("../assets/logo.svg")}
        style={{ width: 42, height: 42, marginBottom: 32 }}
      />
      <View className="items-center gap-5">
        <Headings email={email as string} />
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
                maxLength={1}
                onChangeText={(text) => handleOnChange(text, idx)}
                onKeyPress={(event) =>
                  handleOnKeyPress(event.nativeEvent.key, idx)
                }
                className="h-16 flex-1 rounded-xl border-2 border-neutral-900 bg-neutral-950 px-4 py-1 text-center text-xl text-white focus:border-indigo-400"
              />
            ))}
          </View>
        </View>
        <ResendOtp
          countDown={countDown}
          setCountDown={setCountDown}
          email={email as string}
        />
        <StateButton
          isLoading={isVarifying}
          isDisabled={isDisabled}
          handlerFn={handleOtpVarification}
          text="Log In"
        />
      </View>
      <CloseButton />
    </View>
  );
}
