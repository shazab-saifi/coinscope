import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, Text, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function RecentSearches({ value }: { value?: string }) {
  const [searches, setSearches] = useState<string[]>([]);

  useEffect(() => {
    async function loadExisting() {
      try {
        const stored = (await AsyncStorage.getItem("recent-searches")) ?? null;
        const prev: string[] = stored ? JSON.parse(stored) : [];
        setSearches(prev);
      } catch (error) {
        console.log(error);
      }
    }

    async function checkExisitngVal() {
      try {
        const stored = (await AsyncStorage.getItem("recent-searches")) ?? null;
        const prev: string[] = stored ? JSON.parse(stored) : [];
        if (!value) {
          setSearches(prev);
          return;
        }
        const existingVal = prev.includes(value);

        if (!existingVal && prev.length === 8) return;

        const next = [value, ...prev.filter((item) => item !== value)];
        await AsyncStorage.setItem("recent-searches", JSON.stringify(next));

        setSearches(next);
      } catch (error) {
        console.log(error);
      }
    }

    if (!value) {
      loadExisting();
      return;
    }

    checkExisitngVal();
  }, [value]);

  const clearSearches = async () => {
    try {
      await AsyncStorage.clear();
      setSearches([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="mt-8 h-full">
      <View className="mb-6 flex-row items-center justify-between">
        <Text className="ml-[16] text-xl font-semibold text-white">
          Recent Searches
        </Text>
        <Pressable
          onPress={clearSearches}
          className="items-center rounded-full px-4 py-2 active:bg-neutral-900"
        >
          <Text className="font-semibold text-blue-500">Clear</Text>
        </Pressable>
      </View>

      <View className="gap-2">
        {searches.map((item, idx) => (
          <Pressable
            key={idx}
            className="flex-row items-center justify-between rounded-xl border-neutral-800 p-4 active:bg-neutral-900"
          >
            <View className="flex-row items-center gap-4">
              <Ionicons name="search" size={20} color="#a3a3a3" />
              <Text className="text-lg text-neutral-400">{item}</Text>
            </View>

            <Feather name="arrow-up-right" size={20} color="#a3a3a3" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
