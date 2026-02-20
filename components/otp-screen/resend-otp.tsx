import { supabase } from "@/lib/supabase";
import { Pressable, Text, View } from "react-native";
import { toast } from "sonner-native";

export default function ResendOtp({
  countDown,
  setCountDown,
  email,
}: {
  countDown: number;
  setCountDown: (count: number) => void;
  email: string;
}) {
  const handleResend = async () => {
    if (countDown !== 0) return;

    setCountDown(59);
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      console.log("Failed to resend otp: ", error);
      toast.error(error.message);
    }
  };

  return (
    <View className="items-center">
      {countDown !== 0 ? (
        <View className="flex-row items-center gap-1">
          <Text className="text-sm font-semibold text-neutral-400">
            Otp is valid till
          </Text>
          <Text className="text-sm font-semibold text-indigo-400">
            00:{countDown.toString().padStart(2, "0")}
          </Text>
        </View>
      ) : (
        <View className="flex-row items-center gap-1">
          <Text className="text-sm font-semibold text-neutral-400">
            Didn&apos;t recieve an OTP?
          </Text>
          <Pressable onPress={handleResend}>
            <Text className="text-sm font-semibold text-indigo-400 underline">
              Resend OTP
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
