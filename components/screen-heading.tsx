import { Text, View } from "react-native";

type ScreenHeadingProps = {
  heading: string;
  subheading?: string;
};

export default function ScreenHeading({
  heading,
  subheading,
}: ScreenHeadingProps) {
  return (
    <View className="mb-3 items-center">
      <Text className="mb-2 text-center text-3xl font-bold text-white">
        {heading}
      </Text>
      {subheading ? (
        <Text className="max-w-[224px] text-center font-semibold text-neutral-400">
          {subheading}
        </Text>
      ) : null}
    </View>
  );
}
