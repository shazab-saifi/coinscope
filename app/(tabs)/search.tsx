import { useDebounce } from "@/hooks/useDebounce";
import { mapSearchResult } from "@/lib/mapper";
import { SearchResult } from "@/lib/types";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TextInput, View, Text, FlatList, Image } from "react-native";

const fetchSearchResult = async (
  debounceQuery: string
): Promise<SearchResult[]> => {
  const searchResult = await fetch(
    `https://api.coingecko.com/api/v3/search?query=${debounceQuery}`,
    {
      method: "GET",
      headers: {
        x_cg_demo_api_key: process.env.EXPO_PUBLIC_API_KEY!,
      },
    }
  );

  const resultedCoins = await searchResult.json();
  return mapSearchResult(resultedCoins);
};

export default function Search() {
  const [query, setQuery] = useState<string>("");
  const debounceQuery = useDebounce(query, 500);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["searchedCoin", debounceQuery],
    queryFn: () => fetchSearchResult(debounceQuery),
    enabled: !!debounceQuery,
  });

  if (isError) {
    console.log(error);
    return (
      <View>
        <Text className="w-full text-center text-white">
          Some server error occured! plesae try again later.
        </Text>
      </View>
    );
  }

  return (
    <View className="h-full bg-neutral-950 px-4">
      <View className="items-center bg-neutral-950">
        <View className="mt-6 flex-row items-center gap-2">
          <View className="flex-1 flex-row items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-1">
            <Ionicons name="search" size={20} color="white" />
            <TextInput
              onChangeText={(text) => setQuery(text)}
              placeholder="Search Coin"
              className="flex-1 text-white outline-none placeholder:text-neutral-400"
            />
          </View>
        </View>
      </View>
      <View className="flex-1">
        {isLoading ? (
          <View className="flex flex-1 items-center justify-center">
            <Text className="text-center text-white">Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="mt-3 flex-row items-center justify-between rounded-2xl px-4 py-2">
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
                <Ionicons name="open-outline" color="white" size={20} />
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}
