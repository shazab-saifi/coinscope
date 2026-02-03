import { ActivityIndicator, RefreshControl, View } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import { Coin } from "@/lib/types";
import { coinMapper } from "@/lib/mapper";
import { CoinCard } from "@/components";

async function fetchCoins(pageParam = 1): Promise<Coin[]> {
  const coins = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?per_page=50&page=${pageParam}&vs_currency=usd&sparkline=true`,
    {
      method: "GET",
      headers: {
        x_cg_demo_api_key: process.env.EXPO_PUBLIC_API_KEY!,
      },
    }
  );

  const res = await coins.json();
  const neededData = coinMapper(res);

  return neededData;
}

export default function Index() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["coins"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchCoins(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 50) {
        return;
      }

      return allPages.length + 1;
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlashList
        data={data?.pages.flat() ?? []}
        keyExtractor={(item: Coin) => item.id}
        className="bg-neutral-950 p-8"
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
