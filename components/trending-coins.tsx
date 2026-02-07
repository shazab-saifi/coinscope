import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Text, View, RefreshControl, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import CoinSkeleton from "./coin-skeleton";
import { mapTrendingCoins } from "@/lib/mapper";
import { TrendingCoin } from "@/lib/types";

const fetchTrendingCoins = async (): Promise<TrendingCoin[]> => {
  const trendingCoins = await fetch(
    "https://api.coingecko.com/api/v3/search/trending",
    {
      headers: {
        method: "GET",
        x_cg_demo_api_key: process.env.EXPO_PUBLIC_API_KEY!,
      },
    }
  );

  const res = await trendingCoins.json();
  return mapTrendingCoins(res);
};

export default function TrendingCoins() {
  const { data, isLoading, error, isRefetching, refetch } = useQuery({
    queryKey: ["trendingCoins"],
    queryFn: fetchTrendingCoins,
  });

  if (error) {
    return (
      <View>
        <Text className="text-white">Could not fetch</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1 }} className="bg-neutral-950">
        {Array.from({ length: 12 }).map((_, i) => (
          <CoinSkeleton key={i} />
        ))}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlashList
        data={data}
        keyExtractor={(item: TrendingCoin) => item.id}
        className="bg-neutral-950"
        refreshControl={
          <RefreshControl
            tintColor={"blue"}
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        }
        renderItem={({ item }) => {
          const isIncreasing = item.change24h > 0;

          return (
            <View className="mt-8 flex-row items-center justify-between">
              <View className="flex-row items-center gap-4">
                <Image
                  source={{ uri: item.image }}
                  className="size-10 rounded-full"
                />

                <View>
                  <Text className="max-w-[200px] truncate text-lg font-semibold text-white">
                    {item.name}
                  </Text>
                  <Text className="uppercase text-neutral-400">
                    {item.symbol}
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-base font-semibold text-white">
                  ${item.priceUsd.toFixed(2)}
                </Text>
                <View className="flex-row items-center gap-1">
                  <Feather
                    name={isIncreasing ? "arrow-up-right" : "arrow-down-right"}
                    size={16}
                    color={isIncreasing ? "green" : "red"}
                  />
                  <Text
                    className={isIncreasing ? "text-green-500" : "text-red-500"}
                  >
                    {item.change24h.toFixed(2)}%
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
