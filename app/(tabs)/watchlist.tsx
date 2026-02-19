import { supabase } from "@/lib/supabase";
import { Pressable, Text, View } from "react-native";
import { toast } from "sonner-native";

export default function Watchlist() {
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Error while logging out: ", error);
      toast.error(error.message);
    }

    toast.info("Logged out!");
  };

  return (
    <View className="h-full items-center justify-center bg-neutral-950">
      <Pressable
        onPress={handleLogOut}
        className="rounded-lg bg-red-500/20 px-4 py-2"
      >
        <Text className="text-red-500">Log Out</Text>
      </Pressable>
    </View>
  );
}
