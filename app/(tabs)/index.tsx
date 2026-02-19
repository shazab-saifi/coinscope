import {
  TabSelect,
  TopCoin,
  TrendingCoins,
  WatchlistCoins,
} from "@/components";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

const tabs = [
  { label: "Top", content: <TopCoin /> },
  { label: "Trending", content: <TrendingCoins /> },
  { label: "Watching", content: <WatchlistCoins /> },
];

export default function Index() {
  const router = useRouter();
  const { setSkippedAuth } = useAuth();

  const handlePress = async () => {
    await setSkippedAuth(false);
    router.replace("/login");
  };

  return (
    <View className="flex-1 bg-neutral-950 px-8 pt-12">
      <View className="mb-4 items-end">
        <Pressable onPress={handlePress}>
          <Text className="text-lg font-semibold text-neutral-100">Log In</Text>
        </Pressable>
      </View>
      <TabSelect tabs={tabs} />
    </View>
  );
}
