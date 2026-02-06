import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { AnimatePresence, MotiView } from "moti";

type Props = {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
};

export default function TabSelect({ tabs }: Props) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [direction, setDirection] = useState<"r" | "l" | null>(null);

  const handleDirection = (nextIndex: number) => {
    if (nextIndex === activeTab) return;

    setDirection(nextIndex > activeTab ? "l" : "r");
    setActiveTab(nextIndex);
  };

  return (
    <View className="flex-1 gap-8">
      <View className="flex-row items-center gap-4">
        {tabs.map((tab, idx) => (
          <Pressable
            key={idx}
            onPress={() => handleDirection(idx)}
            className={`rounded-full px-6 py-3 ${activeTab === idx ? "bg-neutral-100" : "bg-neutral-800"}`}
          >
            <Text
              className={`text-lg font-semibold ${activeTab === idx ? "text-neutral-950" : "text-neutral-100"}`}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <AnimatePresence exitBeforeEnter={true}>
        <MotiView
          key={activeTab}
          from={{
            translateX: direction === "l" ? -100 : 100,
            opacity: 0,
          }}
          animate={{ translateX: 0, opacity: 1 }}
          exit={{
            translateX: direction === "l" ? 100 : -100,
            opacity: 0,
          }}
          transition={{ type: "timing" }}
          style={{ flex: 1 }}
        >
          {tabs[activeTab].content}
        </MotiView>
      </AnimatePresence>
    </View>
  );
}
