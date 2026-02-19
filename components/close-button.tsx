import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

export default function CloseButton({
  handlerFn,
}: {
  handlerFn?: () => Promise<void> | void;
}) {
  return (
    <Pressable onPress={handlerFn} className="absolute right-4 top-12">
      <Ionicons name="close-outline" size={28} color="white" />
    </Pressable>
  );
}
