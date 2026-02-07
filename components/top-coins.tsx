import { coinMapper } from "@/lib/mapper";
import { Coin } from "@/lib/types";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, RefreshControl, View } from "react-native";
import CoinCard from "./coin-card";
import CoinSkeleton from "./coin-skeleton";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchCoins(pageParam = 1): Promise<Coin[]> {
  const coins = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?per_page=20&page=${pageParam}&vs_currency=usd&sparkline=true`,
    {
      method: "GET",
      headers: {
        x_cg_demo_api_key: process.env.EXPO_PUBLIC_API_KEY!,
      },
    }
  );

  const res = await coins.json();
  return coinMapper(res);
}

export default function TopCoins() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["coins"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchCoins(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 20 || allPages.length === 20) {
        return;
      }

      return allPages.length + 1;
    },
  });

  if (isLoading) {
    return (
      <View className="flex-1 bg-neutral-950">
        {Array.from({ length: 12 }).map((_, i) => (
          <CoinSkeleton key={i} />
        ))}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={data?.pages.flat() ?? []}
        keyExtractor={(item: Coin) => item.id}
        className="bg-neutral-950"
        refreshControl={
          <RefreshControl
            tintColor={"blue"}
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        }
        renderItem={({ item }) => <CoinCard item={item} />}
        onEndReachedThreshold={0.2}
        onEndReached={() =>
          hasNextPage && !isFetchingNextPage && fetchNextPage()
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator
              color="blue"
              size="small"
              style={{ marginBottom: 5 }}
            />
          ) : null
        }
      />
    </View>
  );
}
