import { Coin } from "@/lib/types";
import { Image, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function CoinCard({ item }: { item: Coin }) {
  const isIncreasing = parseInt(item.price_change_percentage_24h) > 0;

  return (
    <View className="mt-8 flex-row items-center justify-between">
      <View className="flex-row items-center gap-4">
        <Image source={{ uri: item.image }} className="size-10 rounded-full" />

        <View>
          <Text className="max-w-[164px] text-lg font-semibold text-white">
            {item.name}
          </Text>
          <Text className="uppercase text-neutral-400">{item.symbol}</Text>
        </View>
      </View>
      <View className="items-end">
        <Text className="text-base font-semibold text-white">
          ${parseInt(item.current_price).toFixed(2)}
        </Text>
        <View className="flex-row items-center gap-1">
          <Feather
            name={isIncreasing ? "arrow-up-right" : "arrow-down-right"}
            size={16}
            color={isIncreasing ? "#22c55e" : "#ef4444"}
          />
          <Text className={isIncreasing ? "text-green-500" : "text-red-500"}>
            {parseInt(item.price_change_percentage_24h).toFixed(2)} %
          </Text>
        </View>
      </View>
    </View>
  );
}
