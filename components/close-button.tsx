import { useAuth } from "@/providers/auth-provider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function CloseButton({
  handlerFn,
}: {
  handlerFn?: () => Promise<void> | void;
}) {
  const { setSkippedAuth } = useAuth();
  const router = useRouter();

  const handleSkipAuth = async () => {
    await setSkippedAuth(true);
    router.replace("/(tabs)");
  };

  return (
    <Pressable
      onPress={handlerFn ?? handleSkipAuth}
      className="absolute right-4 top-12"
    >
      <Ionicons name="close-outline" size={28} color="white" />
    </Pressable>
  );
}
