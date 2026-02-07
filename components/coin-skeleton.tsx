import { View } from "react-native";

export default function CoinSkeleton() {
  return (
    <View className="mt-8 flex-row items-center justify-between">
      <View className="flex-row items-center gap-4">
        <View className="size-10 rounded-full bg-neutral-800" />
        <View>
          <View className="h-5 max-w-[224px] rounded bg-neutral-800" />
          <View className="mt-2 h-4 w-16 rounded bg-neutral-800" />
        </View>
      </View>
      <View className="items-end gap-1">
        <View className="h-5 w-16 rounded bg-neutral-800" />
        <View className="flex-row items-center gap-1">
          <View className="size-4 rounded bg-neutral-800" />
          <View className="h-4 w-12 rounded bg-neutral-800" />
        </View>
      </View>
    </View>
  );
}
