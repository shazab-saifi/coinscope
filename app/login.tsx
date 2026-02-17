import { Pressable, Text, TextInput, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");

  return (
    <View className="relative flex-1 items-center justify-center bg-black px-6">
      <Image
        source={require("../assets/logo.svg")}
        style={{ width: 42, height: 42, marginBottom: 32 }}
      />
      <EmailForm email={email} setEmail={setEmail} />
      <Text className="mt-5 max-w-[80%] text-sm text-neutral-500">
        Skip login at the top right, but some features will be limited.
      </Text>
      <Pressable className="absolute right-8 top-12">
        <Text className="font-bold text-blue-600">Skip</Text>
      </Pressable>
    </View>
  );
}

const EmailForm = ({
  email,
  setEmail,
}: {
  email: string;
  setEmail: (email: string) => void;
}) => {
  return (
    <View className="items-center gap-5">
      <Text className="text-3xl font-bold text-white">Log In with OTP</Text>
      <View className="w-[80vw] max-w-xs flex-row items-center gap-2 rounded-xl border-2 border-neutral-900 bg-neutral-950 px-4 focus:border-blue-600">
        <TextInput
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
          autoComplete="email"
          autoFocus
          placeholder="Enter your email"
          className="flex-1 text-white"
          value={email}
          placeholderTextColor="#737373"
          onChangeText={(text) => setEmail(text)}
        />
        {email.length > 0 && (
          <Pressable
            onPress={() => setEmail("")}
            className="rounded-full bg-neutral-900 p-1"
          >
            <Ionicons name="close-outline" size={16} color="#737373" />
          </Pressable>
        )}
      </View>
      <Pressable className="w-[78vw] max-w-xs items-center justify-center rounded-xl bg-neutral-100 py-3">
        <Text className="font-bold">Send OTP</Text>
      </Pressable>
    </View>
  );
};
