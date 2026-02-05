import {
  TabSelect,
  TopCoin,
  TrendingCoins,
  WatchlistCoins,
} from "@/components";
import { View } from "react-native";

const tabs = [
  { label: "Top", content: <TopCoin /> },
  { label: "Trending", content: <TrendingCoins /> },
  { label: "Watching", content: <WatchlistCoins /> },
];

export default function Index() {
  return (
    <View className="flex-1 bg-neutral-950 px-8 pt-12">
      <TabSelect tabs={tabs} />
    </View>
  );
}
