import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  value: string;
  setValue: (str: string) => void;
  label: string;
};

export default function LabeledInput({
  value,
  setValue,
  label,
  ...props
}: Props) {
  return (
    <View>
      <Text className="mb-1 text-sm font-semibold text-white">{label}</Text>
      <View className="w-[80vw] max-w-xs flex-row items-center gap-2 rounded-xl border-2 border-neutral-900 bg-neutral-950 px-4 py-1 focus:border-indigo-400">
        <TextInput
          autoFocus
          className="flex-1 text-white"
          value={value}
          placeholderTextColor="#737373"
          onChangeText={(text) => setValue(text)}
          {...props}
        />
        {value.length > 0 && (
          <Pressable
            onPress={() => setValue("")}
            className="rounded-full bg-neutral-900 p-1"
          >
            <Ionicons name="close-outline" size={16} color="#737373" />
          </Pressable>
        )}
      </View>
    </View>
  );
}
