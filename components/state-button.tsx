import { ActivityIndicator, Pressable, Text } from "react-native";

export default function StateButton({
  isDisabled,
  handlerFn,
  isLoading,
  text,
}: {
  isDisabled: boolean;
  handlerFn: () => Promise<void> | void;
  isLoading: boolean;
  text: string;
}) {
  return (
    <Pressable
      disabled={isDisabled}
      onPress={handlerFn}
      className={`w-[78vw] max-w-xs items-center justify-center rounded-xl py-3 ${!isDisabled ? "bg-indigo-400" : "bg-indigo-400/50"}`}
    >
      {isLoading ? (
        <ActivityIndicator color="black" size={24} />
      ) : (
        <Text className="text-lg font-semibold">{text}</Text>
      )}
    </Pressable>
  );
}
